import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HexagonBackground } from "@/components/common/HexagonBackground";
import { m } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReferenceItem {
  id: string;
  title: string;
  description: string;
  category: string;
  scrollAnimationUrl?: string;
  galleryImages?: string[];
}

export function AboutReferencesSection() {
  const { t } = useTranslation();

  const references = t("references.items", {
    returnObjects: true,
  }) as ReferenceItem[];
  const nextReferenceData = t("references.nextReference", {
    returnObjects: true,
  }) as { title: string; description: string; cta: string };

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="references" className="py-20 px-4 relative overflow-hidden">
      {/* Hexagon Background with right-side fade */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <HexagonBackground
          hexagonSize={40}
          hexagonMargin={1}
          className="[mask-image:radial-gradient(450px_circle_at_85%_50%,white,transparent)]"
        />
      </div>

      <div className="container mx-auto relative z-10 pointer-events-none">
        {/* About */}
        <AnimatedSection className="mb-16 max-w-3xl mx-auto" variant="scale">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t("about.title")}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("about.description")}
            </p>
          </div>
        </AnimatedSection>

        {/* References */}
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-12" variant="rotate">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("references.title")}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t("references.subtitle")}
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {references.map((reference, index) => {
              const animationVariants = [
                "fadeLeft",
                "fadeUp",
                "fadeRight",
              ] as const;
              const variantIndex = index % 3;

              return (
                <AnimatedSection
                  key={reference.id}
                  delay={index * 0.1}
                  variant={animationVariants[variantIndex]}
                >
                  <Link to={`/reference/${reference.id}`} className="block h-full">
                    <m.div
                      layoutId={`card-${reference.id}`}
                      whileHover={{ scale: 1.02, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="pointer-events-auto h-full cursor-pointer group"
                    >
                      <Card className="h-full hover:shadow-xl transition-all duration-300 flex flex-col border-muted-foreground/10 overflow-hidden bg-background/50 backdrop-blur-sm">
                        {/* Hero Image / Preview (Placeholder gradient or first gallery image) */}
                        <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 relative overflow-hidden">
                          {reference.galleryImages &&
                            reference.galleryImages[0] && (
                              <img
                                src={reference.galleryImages[0]}
                                alt={reference.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                loading="lazy"
                              />
                            )}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                        </div>

                        <CardHeader className="flex-grow relative">
                          <div className="flex items-center justify-between mb-3">
                            <Badge
                              variant="secondary"
                              className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                            >
                              {reference.category}
                            </Badge>
                          </div>
                          <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                            {reference.title}
                          </CardTitle>
                          <CardDescription className="line-clamp-3 leading-relaxed">
                            {reference.description}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    </m.div>
                  </Link>
                </AnimatedSection>
              );
            })}

            {/* Next Reference CTA Card */}
            <AnimatedSection
              delay={references.length * 0.1}
              variant="fadeRight"
            >
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToContact();
                }}
                className="block h-full"
              >
                <m.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="pointer-events-auto h-full cursor-pointer group"
                >
                  <Card className="h-full flex flex-col items-center justify-center p-6 text-center border-dashed border-2 border-primary/50 bg-primary/5 hover:bg-primary/10 transition-all duration-300">
                    <h3 className="text-2xl font-bold text-primary mb-3">
                      {nextReferenceData.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {nextReferenceData.description}
                    </p>
                    <Button variant="default" className="group">
                      {nextReferenceData.cta}
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Card>
                </m.div>
              </a>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
