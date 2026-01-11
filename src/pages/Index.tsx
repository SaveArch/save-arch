import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { HowItWorks } from '@/components/HowItWorks';
import { HeritageAIChat } from '@/components/HeritageAIChat';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <HowItWorks />
      </main>
      <Footer />
      <HeritageAIChat />
    </div>
  );
};

export default Index;
