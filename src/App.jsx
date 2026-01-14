import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TVNoise from "./components/NoiseBackground";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import FooterScreen from "./components/footer";
import Hourglass from "./components/Hourglass";
import "./i18n";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Hourglass />;
  }

  return (
    <>
      <TVNoise />
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      <FooterScreen />
    </>
  );
}

export default App;