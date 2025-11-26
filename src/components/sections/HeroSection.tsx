import { useTranslation } from "react-i18next";
import { m } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export function HeroSection() {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-20 px-4"
    >
      <div className="container mx-auto">
        <div className="max-w-5xl mx-auto">
          {/* Refined DobosDEV Branding - LCP Optimized (Removed Animations) */}
          <div className="mb-12 text-center">
            {/* Subtle full name */}
            <p className="text-sm md:text-sm text-muted-foreground/80 mb-3 md:mb-6 tracking-wide uppercase">
              {t("hero.soleProprietor")}
            </p>

            {/* Main DobosDEV Logo - Image Based */}
            <div className="flex justify-center mb-3 md:mb-6">
              <img
                src={
                  theme === "light"
                    ? "/assets/logo/logo_noicon_light.png"
                    : "/assets/logo/logo_noicon_dark.png"
                }
                alt="DobosDEV Logo"
                width="291"
                height="35"
                // @ts-ignore - fetchpriority is a valid attribute but React types might be outdated
                fetchpriority="high"
                className="h-6 md:h-8 lg:h-10 w-auto"
              />
            </div>

            {/* Subtle wordplay hint */}
            <p className="text-sm md:text-sm text-muted-foreground/70 tracking-widest">
              D · E · V · E · L · O · P · E · R
            </p>
          </div>

          {/* Main Heading - LCP Optimized (Removed Animations) */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-center">
            {t("hero.title")}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-center">
            {t("hero.subtitle")}
          </p>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid md:grid-cols-3 gap-4 mb-10 max-w-3xl mx-auto"
          >
            <div className="flex items-start gap-2 text-left">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm">{t("hero.forWho")}</span>
            </div>
            <div className="flex items-start gap-2 text-left">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm">{t("hero.whatYouGet")}</span>
            </div>
            <div className="flex items-start gap-2 text-left">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm">{t("hero.whatsDifferent")}</span>
            </div>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center pointer-events-auto"
          >
            <Button size="lg" onClick={scrollToContact} className="group">
              {t("hero.cta")}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </m.div>
        </div>
      </div>
    </section>
  );
}
