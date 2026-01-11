import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, MapPin, Send, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { addReport } from '@/lib/reportStore';
import { problemTypes } from '@/lib/mockData';
import { toast } from 'sonner';

export const ReportForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    type: '' as 'vandalism' | 'erosion' | 'crack' | 'other' | '',
    description: '',
    address: '',
    lat: 55.7558 + (Math.random() - 0.5) * 0.05,
    lng: 37.6173 + (Math.random() - 0.5) * 0.05,
    email: '',
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }));
          toast.success('Местоположение определено');
        },
        () => {
          toast.error('Не удалось определить местоположение');
        }
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.type || !formData.description) {
      toast.error('Заполните обязательные поля');
      return;
    }

    setIsSubmitting(true);

    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newReport = addReport({
      title: `${problemTypes.find((t) => t.value === formData.type)?.label} — ${formData.address || 'Без адреса'}`,
      type: formData.type as 'vandalism' | 'erosion' | 'crack' | 'other',
      description: formData.description,
      location: {
        lat: formData.lat,
        lng: formData.lng,
        address: formData.address,
      },
      imageUrl: imagePreview || 'https://images.unsplash.com/photo-1564399580075-5dfe19c205f3?w=400&h=300&fit=crop',
      has3D: false,
    });

    setIsSubmitting(false);
    navigate(`/thank-you?id=${newReport.id}`);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="card-heritage p-6 md:p-8 max-w-2xl mx-auto"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
          <AlertTriangle className="w-6 h-6 text-destructive" />
        </div>
        <div>
          <h2 className="font-serif text-2xl font-bold">Сообщить о проблеме</h2>
          <p className="text-muted-foreground text-sm">Помогите сохранить памятники истории</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Photo Upload */}
        <div>
          <Label className="text-base font-medium">Фото *</Label>
          <div className="mt-2">
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => setImagePreview(null)}
                  className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                >
                  ×
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-xl cursor-pointer hover:bg-secondary/50 transition-colors">
                <Upload className="w-10 h-10 text-muted-foreground mb-2" />
                <span className="text-muted-foreground">Нажмите для загрузки</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        {/* Problem Type */}
        <div>
          <Label className="text-base font-medium">Тип проблемы *</Label>
          <Select
            value={formData.type}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value as typeof formData.type }))}
          >
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Выберите тип проблемы" />
            </SelectTrigger>
            <SelectContent>
              {problemTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Description */}
        <div>
          <Label className="text-base font-medium">Описание *</Label>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
            placeholder="Опишите проблему подробнее..."
            className="mt-2 min-h-[120px]"
          />
        </div>

        {/* Location */}
        <div>
          <Label className="text-base font-medium">Местоположение</Label>
          <div className="mt-2 flex gap-2">
            <Input
              value={formData.address}
              onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
              placeholder="Адрес или описание места"
              className="flex-1"
            />
            <Button type="button" variant="outline" onClick={handleGeolocation}>
              <MapPin className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Координаты: {formData.lat.toFixed(4)}, {formData.lng.toFixed(4)}
          </p>
        </div>

        {/* Email */}
        <div>
          <Label className="text-base font-medium">Email (необязательно)</Label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
            placeholder="your@email.com"
            className="mt-2"
          />
        </div>

        {/* Submit */}
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
              Отправить репорт
            </>
          )}
        </Button>
      </div>
    </motion.form>
  );
};
