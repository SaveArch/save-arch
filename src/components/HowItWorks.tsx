import { motion } from 'framer-motion';
import { AlertTriangle, Camera, Shield } from 'lucide-react';

const steps = [
  {
    icon: AlertTriangle,
    title: 'Сообщи',
    description: 'Обнаружили проблему с памятником? Сделайте фото и отправьте репорт.',
    color: 'bg-yellow-100 text-yellow-700',
  },
  {
    icon: Camera,
    title: 'Оцифруй',
    description: 'Создайте 3D-модель памятника по нашей инструкции для сохранения.',
    color: 'bg-blue-100 text-blue-700',
  },
  {
    icon: Shield,
    title: 'Сохрани',
    description: 'Цифровой двойник останется в нашей галерее навсегда.',
    color: 'bg-green-100 text-green-700',
  },
];

export const HowItWorks = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Как это работает
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Три простых шага для сохранения культурного наследия
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-border z-0" />
                )}

                <div className="card-heritage p-8 pt-12 text-center relative z-10 bg-card">
                  {/* Step Number */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-lg">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className={`w-20 h-20 rounded-2xl ${step.color} flex items-center justify-center mx-auto mb-6`}>
                    <Icon className="w-10 h-10" />
                  </div>

                  <h3 className="font-serif text-2xl font-semibold mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
