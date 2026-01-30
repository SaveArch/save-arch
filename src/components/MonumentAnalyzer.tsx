import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Sparkles, AlertTriangle, Clock, Shield, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const MonumentAnalyzer = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error('Файл слишком большой. Максимум 10 МБ.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
      setAnalysis(null);
    };
    reader.readAsDataURL(file);
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setAnalysis(null);

    try {
      const { data, error } = await supabase.functions.invoke('heritage-ai', {
        body: {
          type: 'analyze-monument',
          imageBase64: selectedImage,
          message: 'Проанализируй это изображение памятника и дай рекомендации по его сохранению.',
        },
      });

      if (error) throw error;

      setAnalysis(data.response);
      toast.success('Анализ завершён!');
    } catch (error) {
      console.error('Analysis error:', error);
      toast.error('Ошибка анализа. Попробуйте позже.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-heritage p-6 md:p-8 clean-section"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-accent" />
        </div>
        <div>
          <h3 className="font-serif text-xl font-bold">ИИ-анализ памятника</h3>
          <p className="text-sm text-muted-foreground">Heritage AI на базе Gemini</p>
        </div>
      </div>

      {/* Image Upload */}
      <div className="mb-6">
        <label className="block">
          <div
            className={`relative aspect-video w-full border-2 border-dashed rounded-xl cursor-pointer transition-colors overflow-hidden ${
              selectedImage ? 'border-primary' : 'border-border hover:border-primary/50'
            }`}
          >
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Выбранное изображение"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                <Upload className="w-10 h-10 mb-2" />
                <span>Загрузите изображение памятника</span>
                <span className="text-xs mt-1">JPG, PNG до 10 МБ</span>
              </div>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />
        </label>
      </div>

      {selectedImage && !analysis && (
        <Button
          onClick={analyzeImage}
          disabled={isAnalyzing}
          className="w-full btn-hero gap-2"
          size="lg"
        >
          {isAnalyzing ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Анализируем...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Анализировать с Heritage AI
            </>
          )}
        </Button>
      )}

      {/* Analysis Results */}
      {analysis && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 space-y-4"
        >
          <div className="flex items-center gap-2 text-primary">
            <FileText className="w-5 h-5" />
            <h4 className="font-semibold">Результаты анализа</h4>
          </div>

          <div className="bg-secondary/50 rounded-xl p-4 text-sm whitespace-pre-wrap">
            {analysis}
          </div>

          <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800 dark:text-amber-200">
              Результаты носят образовательный и рекомендательный характер. ИИ-анализ не заменяет
              экспертную оценку специалистов.
            </p>
          </div>

          <Button
            variant="outline"
            onClick={() => {
              setSelectedImage(null);
              setAnalysis(null);
            }}
            className="w-full"
          >
            Загрузить другое изображение
          </Button>
        </motion.div>
      )}

      {/* Features */}
      <div className="mt-6 grid grid-cols-3 gap-2 text-center">
        {[
          { icon: AlertTriangle, label: 'Оценка рисков' },
          { icon: Clock, label: 'Прогноз' },
          { icon: Shield, label: 'Рекомендации' },
        ].map((item) => (
          <div key={item.label} className="p-2 bg-secondary/30 rounded-lg">
            <item.icon className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
