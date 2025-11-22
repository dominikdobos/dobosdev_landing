import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { AboutReferencesSection } from "@/components/sections/AboutReferencesSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { InteractiveGridPattern } from "@/components/common/InteractiveGridPattern";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import "@/lib/i18n";

function App() {
  // Responsive grid square counts based on viewport width
  const [gridSquares, setGridSquares] = useState<[number, number]>([16, 16]);

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
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-background text-foreground">
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
              <ServicesSection />
              <ProcessSection />
              <PricingSection />
              <AboutReferencesSection />
              <FAQSection />
              <ContactSection />
            </div>
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
