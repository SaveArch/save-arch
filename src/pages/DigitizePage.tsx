import { useSearchParams } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { DigitizationUpload } from '@/components/DigitizationUpload';
import { SketchfabViewer } from '@/components/SketchfabViewer';
import { motion } from 'framer-motion';
import { Camera, Box } from 'lucide-react';

const DigitizePage = () => {
  const [searchParams] = useSearchParams();
  const modelId = searchParams.get('model') || '9e5af82945d84c7bb0c0a4b92813927e';

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
                <Camera className="w-8 h-8 text-primary" />
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
                Оцифровка памятников
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Создайте 3D-модель памятника для его цифрового сохранения
              </p>
            </motion.div>

            <DigitizationUpload />

            {/* 3D Gallery Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-16"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Box className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl font-bold">Галерея 3D-моделей</h2>
                  <p className="text-muted-foreground">Цифровые двойники памятников</p>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <SketchfabViewer 
                  modelId={modelId} 
                  title="Храм — демонстрационная модель" 
                />
                <SketchfabViewer 
                  modelId="c4edeb0e894441b58e5eb2b9e6cc18b5" 
                  title="Исторический фасад" 
                />
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DigitizePage;
