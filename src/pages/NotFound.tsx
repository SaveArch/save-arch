import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Home, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16 min-h-[80vh] flex items-center justify-center">
        <div className="text-center px-4">
          <div className="text-8xl font-serif font-bold text-primary mb-4">404</div>
          <h1 className="font-serif text-3xl font-bold text-foreground mb-4">
            Страница не найдена
          </h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Похоже, что эта страница ещё не создана или была перемещена.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button className="btn-hero gap-2 w-full sm:w-auto">
                <Home className="w-5 h-5" />
                На главную
              </Button>
            </Link>
            <Link to="/map">
              <Button variant="outline" className="btn-hero-outline gap-2 w-full sm:w-auto">
                <MapPin className="w-5 h-5" />
                Карта репортов
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
