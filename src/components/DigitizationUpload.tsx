import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Camera, Check, Sun, Layers, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { addPhotoUpload } from '@/lib/reportStore';
import { toast } from 'sonner';

const checklist = [
  { icon: Camera, text: '30–60 фотографий объекта' },
  { icon: Layers, text: 'Перекрытие 60–80% между снимками' },
  { icon: Sun, text: 'Равномерное освещение без теней' },
  { icon: Image, text: 'Высокое разрешение (мин. 12 МП)' },
];

export const DigitizationUpload = () => {
  const [monumentName, setMonumentName] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!monumentName || !files?.length) {
      toast.error('Укажите название и выберите файлы');
      return;
    }

    setIsUploading(true);

    // Simulate upload
    await new Promise((resolve) => setTimeout(resolve, 2000));

    addPhotoUpload(monumentName, files.length);

    setIsUploading(false);
    setUploadComplete(true);
    toast.success('Фотографии успешно загружены!');
  };

  if (uploadComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card-heritage p-8 text-center"
      >
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-primary" />
        </div>
        <h3 className="font-serif text-2xl font-bold mb-2">Загрузка завершена!</h3>
        <p className="text-muted-foreground mb-6">
          Ваши фотографии отправлены на обработку. Мы уведомим вас, когда 3D-модель будет готова.
        </p>
        <Button onClick={() => { setUploadComplete(false); setFiles(null); setMonumentName(''); }}>
          Загрузить ещё
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Checklist */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="card-heritage p-6 md:p-8 clean-section !rounded-2xl"
      >
        <h3 className="font-serif text-2xl font-bold mb-6">Инструкция по съёмке</h3>
        <div className="space-y-4">
          {checklist.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-xl bg-secondary/50"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <p className="text-foreground font-medium pt-2">{item.text}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Upload Form */}
      <motion.form
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleUpload}
        className="card-heritage p-6 md:p-8 clean-section !rounded-2xl"
      >
        <h3 className="font-serif text-2xl font-bold mb-6">Загрузить фотографии</h3>

        <div className="space-y-6">
          <div>
            <Label className="text-base font-medium">Название памятника</Label>
            <Input
              value={monumentName}
              onChange={(e) => setMonumentName(e.target.value)}
              placeholder="Например: Церковь Покрова на Нерли"
              className="mt-2"
            />
          </div>

          <div>
            <Label className="text-base font-medium">Фотографии</Label>
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-xl cursor-pointer hover:bg-secondary/50 transition-colors mt-2">
              <Upload className="w-10 h-10 text-muted-foreground mb-2" />
              <span className="text-muted-foreground text-center px-4">
                {files ? `Выбрано: ${files.length} файлов` : 'Нажмите для выбора файлов'}
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setFiles(e.target.files)}
                className="hidden"
              />
            </label>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full btn-hero"
            disabled={isUploading}
          >
            {isUploading ? 'Загрузка...' : 'Загрузить для обработки'}
          </Button>
        </div>
      </motion.form>
    </div>
  );
};
