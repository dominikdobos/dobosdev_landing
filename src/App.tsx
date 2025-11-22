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
import "@/lib/i18n";

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Header />
          <main className="relative">
            {/* Hero section with interactive grid only */}
            <div className="relative overflow-hidden min-h-screen">
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <div className="w-full h-full">
                  <InteractiveGridPattern
                    width={40}
                    height={40}
                    squares={[40, 40]}
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
