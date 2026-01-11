import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { toast } from 'sonner';

const ContactsPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    toast.success('Сообщение отправлено!');
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        <section className="section-padding">
          <div className="container-main">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
                Контакты
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Свяжитесь с нами для сотрудничества или по любым вопросам
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="font-serif text-2xl font-bold mb-6">Как с нами связаться</h2>
                
                <div className="space-y-6">
                  <a 
                    href="mailto:info@savearch.ru"
                    className="card-heritage p-6 flex items-center gap-4 hover:shadow-elevated transition-shadow"
                  >
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Mail className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-lg">Email</div>
                      <div className="text-muted-foreground">info@savearch.ru</div>
                    </div>
                  </a>

                  <a 
                    href="tel:+74951234567"
                    className="card-heritage p-6 flex items-center gap-4 hover:shadow-elevated transition-shadow"
                  >
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Phone className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-lg">Телефон</div>
                      <div className="text-muted-foreground">+7 (495) 123-45-67</div>
                    </div>
                  </a>

                  <div className="card-heritage p-6 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-lg">Адрес</div>
                      <div className="text-muted-foreground">Москва, ул. Примерная, д. 1</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.form
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                onSubmit={handleSubmit}
                className="card-heritage p-6 md:p-8"
              >
                <h2 className="font-serif text-2xl font-bold mb-6">Написать нам</h2>

                <div className="space-y-5">
                  <div>
                    <Label className="text-base font-medium">Имя</Label>
                    <Input placeholder="Ваше имя" className="mt-2" />
                  </div>

                  <div>
                    <Label className="text-base font-medium">Email</Label>
                    <Input type="email" placeholder="your@email.com" className="mt-2" />
                  </div>

                  <div>
                    <Label className="text-base font-medium">Тема</Label>
                    <Input placeholder="Тема сообщения" className="mt-2" />
                  </div>

                  <div>
                    <Label className="text-base font-medium">Сообщение</Label>
                    <Textarea 
                      placeholder="Ваше сообщение..." 
                      className="mt-2 min-h-[120px]" 
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
                        Отправить
                      </>
                    )}
                  </Button>
                </div>
              </motion.form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactsPage;
