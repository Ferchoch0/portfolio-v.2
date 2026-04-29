import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const HomeScreen = lazy(() => import("../pages/Home"));
const ProjectDetails = lazy(() => import("../pages/ProjectDetails"));
const ContactScreen = lazy(() => import("../pages/Contact"));
const InfrastructureScreen = lazy(() => import("../pages/Infrastructure"));

export default function AppRoutes() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', backgroundColor: 'var(--rock-color, #0e0e0e)' }} />}>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="/contact" element={<ContactScreen />} />
        <Route path="/infrastructure" element={<InfrastructureScreen />} />
      </Routes>
    </Suspense>
  );
}
