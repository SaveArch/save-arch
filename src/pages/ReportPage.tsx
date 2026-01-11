import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ReportForm } from '@/components/ReportForm';

const ReportPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        <section className="section-padding">
          <div className="container-main">
            <ReportForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ReportPage;
