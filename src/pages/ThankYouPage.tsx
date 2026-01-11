import { useSearchParams, Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { CheckCircle, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ThankYouPage = () => {
  const [searchParams] = useSearchParams();
  const reportId = searchParams.get('id') || 'XXX';

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16 min-h-[80vh] flex items-center">
        <section className="section-padding w-full">
          <div className="container-main">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="card-heritage p-8 md:p-12 text-center max-w-xl mx-auto"
            >
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-primary" />
              </div>

              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                Спасибо!
              </h1>

              <p className="text-lg text-muted-foreground mb-2">
                Ваш репорт успешно отправлен
              </p>

              <div className="inline-block bg-secondary px-6 py-3 rounded-xl mb-8">
                <span className="text-muted-foreground">Номер репорта: </span>
                <span className="font-mono font-bold text-foreground">#{reportId}</span>
              </div>

              <p className="text-muted-foreground mb-8">
                Мы рассмотрим вашу заявку и примем необходимые меры. 
                Вы можете отслеживать статус на карте.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/map">
                  <Button className="btn-hero gap-2 w-full sm:w-auto">
                    <MapPin className="w-5 h-5" />
                    Посмотреть на карте
                  </Button>
                </Link>
                <Link to="/">
                  <Button variant="outline" className="btn-hero-outline gap-2 w-full sm:w-auto">
                    На главную
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ThankYouPage;
