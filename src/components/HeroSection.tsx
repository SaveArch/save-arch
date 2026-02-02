import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AlertTriangle, Camera, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Archaeological Hero Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-100/90 via-orange-50/80 to-amber-50/70" />
      
      {/* Large Archaeological SVG Pattern */}
      <div className="absolute inset-0 opacity-50">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-archaeology" x="0" y="0" width="300" height="300" patternUnits="userSpaceOnUse">
              {/* Excavation grid */}
              <rect x="20" y="20" width="80" height="80" rx="4" fill="none" stroke="hsl(30 50% 40%)" strokeWidth="2" strokeOpacity="0.4" />
              <line x1="46" y1="20" x2="46" y2="100" stroke="hsl(30 50% 40%)" strokeWidth="1" strokeOpacity="0.3" />
              <line x1="73" y1="20" x2="73" y2="100" stroke="hsl(30 50% 40%)" strokeWidth="1" strokeOpacity="0.3" />
              <line x1="20" y1="46" x2="100" y2="46" stroke="hsl(30 50% 40%)" strokeWidth="1" strokeOpacity="0.3" />
              <line x1="20" y1="73" x2="100" y2="73" stroke="hsl(30 50% 40%)" strokeWidth="1" strokeOpacity="0.3" />
              
              {/* Skull */}
              <ellipse cx="180" cy="60" rx="22" ry="26" fill="hsl(35 40% 50%)" fillOpacity="0.3" stroke="hsl(30 45% 40%)" strokeWidth="1.5" strokeOpacity="0.5" />
              <ellipse cx="172" cy="52" rx="5" ry="6" fill="hsl(25 35% 35%)" fillOpacity="0.4" />
              <ellipse cx="188" cy="52" rx="5" ry="6" fill="hsl(25 35% 35%)" fillOpacity="0.4" />
              <path d="M176 68 L180 76 L184 68" fill="none" stroke="hsl(30 45% 40%)" strokeWidth="1.5" strokeOpacity="0.5" />
              
              {/* Amphora */}
              <path d="M250 120 Q235 140 238 180 Q242 215 260 225 Q278 215 282 180 Q285 140 270 120" fill="hsl(28 50% 55%)" fillOpacity="0.25" stroke="hsl(25 45% 40%)" strokeWidth="1.5" strokeOpacity="0.5" />
              <ellipse cx="260" cy="118" rx="14" ry="5" fill="none" stroke="hsl(25 45% 40%)" strokeWidth="1.5" strokeOpacity="0.5" />
              <path d="M238 155 Q222 145 218 165" fill="none" stroke="hsl(25 45% 40%)" strokeWidth="2" strokeOpacity="0.4" />
              <path d="M282 155 Q298 145 302 165" fill="none" stroke="hsl(25 45% 40%)" strokeWidth="2" strokeOpacity="0.4" />
              
              {/* Bone */}
              <path d="M40 180 L110 175" stroke="hsl(35 30% 50%)" strokeWidth="4" strokeLinecap="round" strokeOpacity="0.4" />
              <circle cx="38" cy="178" r="6" fill="hsl(35 30% 50%)" fillOpacity="0.35" />
              <circle cx="112" cy="173" r="6" fill="hsl(35 30% 50%)" fillOpacity="0.35" />
              
              {/* Pottery shard */}
              <path d="M150 200 Q175 185 190 210 Q185 240 160 245 Q135 235 150 200 Z" fill="hsl(25 55% 50%)" fillOpacity="0.2" stroke="hsl(25 50% 40%)" strokeWidth="1.5" strokeOpacity="0.4" />
              <path d="M158 215 L180 225" fill="none" stroke="hsl(25 50% 40%)" strokeWidth="1.5" strokeOpacity="0.4" />
              
              {/* Spearhead */}
              <path d="M60 230 L80 200 L100 230 L80 220 Z" fill="hsl(200 15% 50%)" fillOpacity="0.25" stroke="hsl(200 20% 40%)" strokeWidth="1.5" strokeOpacity="0.4" />
              <line x1="80" y1="230" x2="80" y2="270" stroke="hsl(30 40% 45%)" strokeWidth="3" strokeOpacity="0.4" />
              
              {/* Coin */}
              <circle cx="240" cy="270" r="18" fill="hsl(42 65% 55%)" fillOpacity="0.25" stroke="hsl(40 60% 45%)" strokeWidth="1.5" strokeOpacity="0.4" />
              <circle cx="240" cy="270" r="12" fill="none" stroke="hsl(40 60% 45%)" strokeWidth="1" strokeOpacity="0.3" />
              
              {/* Sand particles */}
              <circle cx="130" cy="140" r="3" fill="hsl(35 45% 50%)" fillOpacity="0.25" />
              <circle cx="210" cy="165" r="2" fill="hsl(35 45% 50%)" fillOpacity="0.2" />
              <circle cx="30" cy="260" r="2.5" fill="hsl(35 45% 50%)" fillOpacity="0.25" />
              <circle cx="290" cy="50" r="2" fill="hsl(35 45% 50%)" fillOpacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-archaeology)" />
        </svg>
      </div>
      
      {/* Warm overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-200/30 via-transparent to-orange-200/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

      <div className="container-main px-4 py-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-foreground mb-6">
              SaveArch
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-primary font-medium mb-4"
          >
            Сообщай. Оцифровывай. Сохраняй.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto"
          >
            Краудсорсинговая платформа для защиты культурного наследия. 
            Помогите сохранить памятники истории для будущих поколений.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/report">
              <Button size="lg" className="btn-hero gap-2 w-full sm:w-auto">
                <AlertTriangle className="w-5 h-5" />
                Сообщить проблему
              </Button>
            </Link>
            <Link to="/digitize">
              <Button size="lg" variant="outline" className="btn-hero-outline gap-2 w-full sm:w-auto">
                <Camera className="w-5 h-5" />
                Оцифровать памятник
              </Button>
            </Link>
            <Link to="/map">
              <Button size="lg" variant="outline" className="btn-hero-outline gap-2 w-full sm:w-auto">
                <MapPin className="w-5 h-5" />
                Посмотреть карту
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};
