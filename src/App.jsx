import './App.css';

import Hero from './components/Hero/Hero';
import Story from './components/Story/Story';
import Gallery from './components/Gallery/Gallery';
import Candle from './components/Candle/Candle';
import Footer from './components/Footer/Footer';

export default function App() {
  return (
    <div className="page-soft-bg" dir="rtl">
      <Hero />
      <main>
        <Story />
        <Gallery />
        <Candle />
      </main>
      <Footer />
    </div>
  );
}
