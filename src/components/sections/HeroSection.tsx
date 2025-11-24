import { useTranslation } from "react-i18next";
import { m } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function HeroSection() {
  const { t } = useTranslation();

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
          {/* Refined DobosDEV Branding */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            {/* Subtle full name */}
            <m.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-sm md:text-sm text-muted-foreground/80 mb-3 tracking-wide uppercase"
            >
              {t("hero.soleProprietor")}
            </m.p>

          {/* Main DobosDEV Logo */}
          <h1 className="text-3xl md:text-3xl lg:text-5xl font-black mb-2 tracking-tight">
            <span className="text-foreground">Dobos</span>
            <span className="text-gray-500">D</span>
            <span className="text-primary">EV</span>
          </h1>

            {/* Subtle wordplay hint */}
            <m.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-sm md:text-sm text-muted-foreground/70 tracking-widest"
            >
              D · E · V · E · L · O · P · E · R
            </m.p>
          </m.div>

          {/* Main Heading */}
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-center"
          >
            {t("hero.title")}
          </m.h2>

          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-center"
          >
            {t("hero.subtitle")}
          </m.p>

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
