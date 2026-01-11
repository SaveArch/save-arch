import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, imageBase64, type } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    let systemPrompt = "";
    let userContent: any[] = [];

    if (type === "analyze-monument") {
      systemPrompt = `Ты — Heritage AI, экспертный ИИ-ассистент по культурному наследию на базе Google Gemini.

Твоя задача — анализировать ТОЛЬКО визуальное состояние объектов на изображениях и давать ОЦЕНОЧНЫЕ рекомендации.

ВАЖНО:
– НЕ пытайся угадывать город, страну или конкретное место по изображению.
– НЕ сравнивай объект с известными памятниками других стран.
– НЕ делай выводы о географическом расположении.
– НЕ называй конкретные города (Санкт-Петербург, Москва и т.д.).
– НЕ утверждай точное местоположение.
– НЕ делай исторические утверждения без данных.

КОНТЕКСТ: Пользователь загружает изображение памятника из Атырау, Казахстан, или из региона с похожими климатическими условиями.

РАЗРЕШЕНО:
– Описывать материал, форму, степень износа
– Упоминать климатические факторы (ветер, влажность, перепады температур, резко континентальный климат)
– Давать ориентировочные прогнозы (например: 20–50 лет)

ФОРМАТ ОТВЕТА:
1. ОБЩЕЕ ВИЗУАЛЬНОЕ СОСТОЯНИЕ ОБЪЕКТА
2. ВОЗМОЖНЫЕ РИСКИ РАЗРУШЕНИЯ (эрозия, трещины, коррозия, биологическое поражение)
3. ВЛИЯНИЕ ВРЕМЕНИ И КЛИМАТА
4. РЕКОМЕНДАЦИИ ПО МОНИТОРИНГУ
5. ДИСКЛЕЙМЕР: Выводы носят рекомендательный характер и не заменяют экспертную оценку.

Отвечай структурированно, кратко и понятно. Используй русский язык.`;

      userContent = [
        { type: "text", text: message || "Проанализируй это изображение памятника архитектуры и дай рекомендации по его сохранению." }
      ];

      if (imageBase64) {
        userContent.push({
          type: "image_url",
          image_url: { url: imageBase64 }
        });
      }
    } else {
      // Chat assistant mode
      systemPrompt = `Ты — Heritage AI, интеллектуальный помощник платформы SaveArch.

SaveArch — это платформа для краудсорсингового мониторинга и цифрового сохранения культурного наследия.

Ты помогаешь пользователям:
- Ориентироваться по функциям платформы
- Объяснять, как работает система мониторинга и оцифровки
- Рассказывать о 3D-сканировании и фотограмметрии
- Давать советы по съёмке объектов для создания 3D-моделей
- Отвечать на вопросы о культурном наследии Атырауской области

Отвечай кратко, дружелюбно и по существу. Используй русский язык.`;

      userContent = [{ type: "text", text: message }];
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userContent },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Превышен лимит запросов. Попробуйте позже." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Требуется пополнение баланса." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "Не удалось получить ответ";

    return new Response(JSON.stringify({ response: content }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Heritage AI error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
