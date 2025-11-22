import { useTranslation } from "react-i18next";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { MessageSquare, FileCheck, Code, Rocket } from "lucide-react";

const processSteps = [
  { id: "consultation", icon: MessageSquare },
  { id: "proposal", icon: FileCheck },
  { id: "development", icon: Code },
  { id: "delivery", icon: Rocket },
];

export function ProcessSection() {
  const { t } = useTranslation();

  return (
    <section id="process" className="py-20 px-4">
      <div className="container mx-auto relative z-10">
        <AnimatedSection className="text-center mb-16" variant="slideDown">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("process.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("process.subtitle")}
          </p>
        </AnimatedSection>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting line - desktop only, centered through circles */}
            <div
              className="hidden lg:block absolute top-10 left-0 right-0 h-0.5 bg-primary/20 -z-10"
              style={{ width: "calc(100% - 10rem)", left: "5rem" }}
            />

            {processSteps.map((step, index) => {
              const Icon = step.icon;
              const animationVariants = [
                "scale",
                "rotate",
                "fadeUp",
                "slideUp",
              ] as const;

              return (
                <AnimatedSection
                  key={step.id}
                  delay={index * 0.15}
                  variant={animationVariants[index % animationVariants.length]}
                >
                  <div className="relative">
                    <div className="flex flex-col items-center text-center">
                      {/* Background blocker for the line */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-background z-10"></div>

                      {/* Icon circle */}
                      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-3 relative z-20">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>

                      <div className="text-4xl font-bold text-primary mb-2">
                        {index + 1}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        {t(`process.steps.${step.id}.title`)}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {t(`process.steps.${step.id}.description`)}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
