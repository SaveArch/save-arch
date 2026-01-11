import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container-main section-padding">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-serif font-bold text-xl">SaveArch</span>
            </Link>
            <p className="text-muted-foreground max-w-sm">
              Краудсорсинговая платформа для сохранения культурного наследия. 
              Вместе мы можем защитить памятники истории для будущих поколений.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-semibold text-lg mb-4">Навигация</h4>
            <div className="space-y-2">
              <Link to="/map" className="block text-muted-foreground hover:text-foreground transition-colors">
                Карта репортов
              </Link>
              <Link to="/digitize" className="block text-muted-foreground hover:text-foreground transition-colors">
                Оцифровка
              </Link>
              <Link to="/volunteers" className="block text-muted-foreground hover:text-foreground transition-colors">
                Волонтёры
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif font-semibold text-lg mb-4">Контакты</h4>
            <div className="space-y-3">
              <a 
                href="mailto:info@savearch.kz" 
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="w-4 h-4" />
                info@savearch.kz
              </a>
              <a 
                href="tel:+77780472006" 
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="w-4 h-4" />
                +7 778 047 2006
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
          <p>© 2026 SaveArch. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};
