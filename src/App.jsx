import Hero from "./components/Hero/Hero";
import Story from "./components/Story/Story";
import Gallery from "./components/Gallery/Gallery";
import Candle from "./components/Candle/Candle";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="page-soft-bg">
      {/* Hero section at the top of the page */}
      <Hero />

      {/* Story section */}
      <Story />

      {/* Gallery section */}
      <Gallery />

      {/* Candle section */}
      <Candle />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;

