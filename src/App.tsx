import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { InteractiveGridPattern } from "@/components/common/InteractiveGridPattern";
import { cn } from "@/lib/utils";
import { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "@/lib/i18n";

const ServicesSection = lazy(() => import("@/components/sections/ServicesSection").then(module => ({ default: module.ServicesSection })));
const ProcessSection = lazy(() => import("@/components/sections/ProcessSection").then(module => ({ default: module.ProcessSection })));
const PricingSection = lazy(() => import("@/components/sections/PricingSection").then(module => ({ default: module.PricingSection })));
const FAQSection = lazy(() => import("@/components/sections/FAQSection").then(module => ({ default: module.FAQSection })));
const AboutReferencesSection = lazy(() => import("@/components/sections/AboutReferencesSection").then(module => ({ default: module.AboutReferencesSection })));
const ContactSection = lazy(() => import("@/components/sections/ContactSection").then(module => ({ default: module.ContactSection })));
const ReferencePage = lazy(() => import("@/pages/ReferencePage").then(module => ({ default: module.ReferencePage })));

function MainPage() {
  // Responsive grid square counts based on viewport width
  const [gridSquares, setGridSquares] = useState<[number, number]>([16, 16]);
  const location = useLocation();

  // Handle hash scrolling
  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.replace("#", "");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100); // Small delay to ensure rendering
    }
  }, [location]);

  // Handle specific path redirects to sections
  useEffect(() => {
    const path = location.pathname.substring(1); // remove leading slash
    if (['services', 'process', 'pricing', 'faq', 'contact', 'references', 'szolgaltatasok', 'folyamat', 'arak', 'referenciak', 'gyik', 'kapcsolat'].includes(path)) {
      // Map hungarian paths to english IDs
      const pathToIdMap: Record<string, string> = {
        'szolgaltatasok': 'services',
        'folyamat': 'process',
        'arak': 'pricing',
        'referenciak': 'references',
        'gyik': 'faq',
        'kapcsolat': 'contact'
      };
      
      const elementId = pathToIdMap[path] || path;
      
      setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location]);

  useEffect(() => {
    const updateGridSquares = () => {
      const width = window.innerWidth;
      if (width < 768) {
        // Mobile: 8x8 squares
        setGridSquares([8, 8]);
      } else if (width < 1024) {
        // Tablet: 12x12 squares
        setGridSquares([12, 12]);
      } else {
        // Desktop: 16x16 squares
        setGridSquares([16, 16]);
      }
    };

    updateGridSquares();
    window.addEventListener("resize", updateGridSquares);
    return () => window.removeEventListener("resize", updateGridSquares);
  }, []);

  return (
    <>
      <Header />
      <main className="relative">
        {/* Hero section with interactive grid only */}
        <div className="relative min-h-screen">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full">
              <InteractiveGridPattern
                width={40}
                height={40}
                squares={gridSquares}
                className={cn(
                  "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
                  "md:[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
                  "skew-y-12"
                )}
              />
            </div>
          </div>
          <div className="relative z-10 pointer-events-none">
            <HeroSection />
          </div>
        </div>

        {/* Other sections */}
        <div className="relative z-10">
          <Suspense fallback={<div className="py-20" />}>
            <ServicesSection />
            <ProcessSection />
            <PricingSection />
            <AboutReferencesSection />
            <FAQSection />
            <ContactSection />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <div className="min-h-screen bg-background text-foreground">
            <Suspense fallback={<div className="min-h-screen" />}>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/services" element={<MainPage />} />
                <Route path="/process" element={<MainPage />} />
                <Route path="/pricing" element={<MainPage />} />
                <Route path="/faq" element={<MainPage />} />
                <Route path="/contact" element={<MainPage />} />
                <Route path="/references" element={<MainPage />} />
                <Route path="/szolgaltatasok" element={<MainPage />} />
                <Route path="/folyamat" element={<MainPage />} />
                <Route path="/arak" element={<MainPage />} />
                <Route path="/referenciak" element={<MainPage />} />
                <Route path="/gyik" element={<MainPage />} />
                <Route path="/kapcsolat" element={<MainPage />} />
                <Route path="/reference/:id" element={<ReferencePage />} />
              </Routes>
            </Suspense>
          </div>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
