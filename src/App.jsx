import ScrollToTop from "./components/ScrollToTop";
import { ReactLenis } from 'lenis/react';
import Navbar from "./components/Navbar";
import FooterScreen from "./components/footer";
import SmoothLoader from "./components/SmoothLoader";
import AppRoutes from "./routes/AppRoutes";
import "./i18n";

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <>
        <ScrollToTop />
        <SmoothLoader />
        <Navbar />
        <div className="container">
          <AppRoutes />
        </div>
        <FooterScreen />
      </>
    </ReactLenis>
  );
}

export default App;