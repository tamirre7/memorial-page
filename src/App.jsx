import Hero from './components/Hero/Hero';
import Story from './components/Story/Story';
import Gallery from './components/Gallery/Gallery';
import Candle from './components/Candle/Candle';
import Footer from './components/Footer/Footer';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <div className="page-soft-bg" dir="rtl">
        <Hero />
        <main>
          <ErrorBoundary>
            <Story />
          </ErrorBoundary>
          <ErrorBoundary>
            <Gallery />
          </ErrorBoundary>
          <ErrorBoundary>
            <Candle />
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
