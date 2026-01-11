import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Send, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { addVolunteer } from '@/lib/reportStore';
import { toast } from 'sonner';

export const VolunteerForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    interests: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      toast.error('Заполните обязательные поля');
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    addVolunteer(formData);
    setIsSubmitting(false);
    setIsComplete(true);
    toast.success('Заявка отправлена!');
  };

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card-heritage p-8 text-center max-w-lg mx-auto"
      >
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-primary" />
        </div>
        <h3 className="font-serif text-2xl font-bold mb-2">Добро пожаловать в команду!</h3>
        <p className="text-muted-foreground">
          Мы свяжемся с вами в ближайшее время с информацией о ближайших проектах в вашем городе.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="card-heritage p-6 md:p-8 max-w-lg mx-auto"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Users className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="font-serif text-2xl font-bold">Стать волонтёром</h2>
          <p className="text-muted-foreground text-sm">Присоединяйтесь к нашей команде</p>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <Label className="text-base font-medium">Имя *</Label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="Ваше имя"
            className="mt-2"
          />
        </div>

        <div>
          <Label className="text-base font-medium">Email *</Label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
            placeholder="your@email.com"
            className="mt-2"
          />
        </div>

        <div>
          <Label className="text-base font-medium">Город</Label>
          <Input
            value={formData.city}
            onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
            placeholder="Ваш город"
            className="mt-2"
          />
        </div>

        <div>
          <Label className="text-base font-medium">Интересы</Label>
          <Textarea
            value={formData.interests}
            onChange={(e) => setFormData((prev) => ({ ...prev, interests: e.target.value }))}
            placeholder="Чем бы вы хотели заниматься? (фотосъёмка, экспедиции, работа с данными...)"
            className="mt-2 min-h-[100px]"
          />
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full btn-hero"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            'Отправка...'
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              Стать волонтёром
            </>
          )}
        </Button>
      </div>
    </motion.form>
  );
};
