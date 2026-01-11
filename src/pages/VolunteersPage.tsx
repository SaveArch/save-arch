import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { VolunteerForm } from '@/components/VolunteerForm';
import { motion } from 'framer-motion';
import { Users, MapPin, Camera, FileText } from 'lucide-react';

const benefits = [
  {
    icon: MapPin,
    title: 'Экспедиции',
    description: 'Участвуйте в полевых выездах для документирования памятников',
  },
  {
    icon: Camera,
    title: 'Фотосъёмка',
    description: 'Создавайте фотоматериалы для 3D-реконструкций',
  },
  {
    icon: FileText,
    title: 'Исследования',
    description: 'Помогайте с анализом данных и подготовкой отчётов',
  },
];

const VolunteersPage = () => {
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
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
                Волонтёры
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Присоединяйтесь к команде SaveArch и помогите сохранить культурное наследие
              </p>
            </motion.div>

            {/* Benefits */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="card-heritage p-6 text-center"
                  >
                    <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </motion.div>
                );
              })}
            </div>

            <VolunteerForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default VolunteersPage;
