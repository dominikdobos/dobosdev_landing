import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { InteractiveGridPattern } from "@/components/common/InteractiveGridPattern";
import { CookieConsent } from "@/components/common/CookieConsent";
import { PrivacyPolicyModal } from "@/components/modals/PrivacyPolicyModal";
import { cn } from "@/lib/utils";
import { useState, useEffect, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { LazyMotion } from "framer-motion";
import "@/lib/i18n";

// Load Framer Motion features asynchronously to reduce initial bundle size
const loadFeatures = () => import("./features").then((res) => res.default);

const ServicesSection = lazy(() =>
  import("@/components/sections/ServicesSection").then((module) => ({
    default: module.ServicesSection,
  }))
);
const ProcessSection = lazy(() =>
  import("@/components/sections/ProcessSection").then((module) => ({
    default: module.ProcessSection,
  }))
);
const PricingSection = lazy(() =>
  import("@/components/sections/PricingSection").then((module) => ({
    default: module.PricingSection,
  }))
);
const FAQSection = lazy(() =>
  import("@/components/sections/FAQSection").then((module) => ({
    default: module.FAQSection,
  }))
);
const AboutReferencesSection = lazy(() =>
  import("@/components/sections/AboutReferencesSection").then((module) => ({
    default: module.AboutReferencesSection,
  }))
);
const ContactSection = lazy(() =>
  import("@/components/sections/ContactSection").then((module) => ({
    default: module.ContactSection,
  }))
);
const ReferencePage = lazy(() =>
  import("@/pages/ReferencePage").then((module) => ({
    default: module.ReferencePage,
  }))
);

function MainPage() {
  // Responsive grid square counts based on viewport width
  const [gridSquares, setGridSquares] = useState<[number, number]>([16, 16]);
  const [showGrid, setShowGrid] = useState(true);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const location = useLocation();

  // ... hash scrolling and path redirects ...
  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.replace("#", "");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location.hash]);

  useEffect(() => {
    const path = location.pathname.substring(1); // remove leading slash
    if (
      [
        "services",
        "process",
        "pricing",
        "faq",
        "contact",
        "references",
        "szolgaltatasok",
        "folyamat",
        "arak",
        "referenciak",
        "gyik",
        "kapcsolat",
      ].includes(path)
    ) {
      // Map hungarian paths to english IDs
      const pathToIdMap: Record<string, string> = {
        szolgaltatasok: "services",
        folyamat: "process",
        arak: "pricing",
        referenciak: "references",
        gyik: "faq",
        kapcsolat: "contact",
      };

      const elementId = pathToIdMap[path] || path;

      // Try immediately first
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        // If not found (due to lazy loading), try again after a short delay
        setTimeout(() => {
          const el = document.getElementById(elementId);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }, 300);
      }
    }
  }, [location.pathname]);

  useEffect(() => {
    const updateGridSquares = () => {
      const width = window.innerWidth;
      if (width < 768) {
        // Mobile: Use -1 flag to signal static path rendering
        setGridSquares([-1, -1]);
        setShowGrid(true);
      } else if (width < 1024) {
        // Tablet: 12x12 squares
        setGridSquares([12, 12]);
        setShowGrid(true);
      } else {
        // Desktop: 16x16 squares
        setGridSquares([16, 16]);
        setShowGrid(true);
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
              {showGrid && (
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
              )}
            </div>
          </div>
          <div className="relative z-10 pointer-events-none">
            <HeroSection />
          </div>
        </div>

        {/* Other sections */}
        <div className="relative z-10">
          <Suspense fallback={<div className="py-20" />}>
            <div className="content-visibility-auto contain-intrinsic-size-[1000px]">
               <ServicesSection />
            </div>
            <div className="content-visibility-auto contain-intrinsic-size-[1000px]">
               <ProcessSection />
            </div>
            <div className="content-visibility-auto contain-intrinsic-size-[1000px]">
               <PricingSection />
            </div>
            <div className="content-visibility-auto contain-intrinsic-size-[1000px]">
               <AboutReferencesSection />
            </div>
            <div className="content-visibility-auto contain-intrinsic-size-[1000px]">
               <FAQSection />
            </div>
            <div className="content-visibility-auto contain-intrinsic-size-[1000px]">
               <ContactSection />
            </div>
          </Suspense>
        </div>
      </main>
      <Footer onOpenPrivacy={() => setPrivacyOpen(true)} />
      <CookieConsent onOpenPrivacy={() => setPrivacyOpen(true)} />
      <PrivacyPolicyModal open={privacyOpen} onOpenChange={setPrivacyOpen} />
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <LazyMotion features={loadFeatures}>
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
        </LazyMotion>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
