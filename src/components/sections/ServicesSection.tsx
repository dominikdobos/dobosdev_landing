import { useTranslation } from "react-i18next";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Globe,
  RefreshCw,
  Settings,
  FileText,
  Search,
  Sparkles,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";

const serviceIcons = {
  website: Globe,
  redesign: RefreshCw,
  maintenance: Settings,
  landing: FileText,
  seo: Search,
  extras: Sparkles,
};

const services = [
  "website",
  "redesign",
  "maintenance",
  "landing",
  "seo",
  "extras",
];

export function ServicesSection() {
  const { t } = useTranslation();

  return (
    <section id="services" className="py-20 px-4">
      <div className="container mx-auto relative z-10">
        <AnimatedSection className="text-center mb-16" variant="rotate">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t("services.title")}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("services.subtitle")}
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = serviceIcons[service as keyof typeof serviceIcons];
            const animationVariants = [
              "scale",
              "fadeLeft",
              "fadeRight",
              "rotate",
              "slideUp",
              "fadeUp",
            ] as const;
            const variantIndex = index % animationVariants.length;

            return (
              <AnimatedSection
                key={service}
                delay={index * 0.1}
                variant={animationVariants[variantIndex]}
              >
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="h-full"
                >
                  <Card className="h-full hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 border-2 hover:border-primary/50 group flex flex-col">
                    <CardHeader className="space-y-4">
                      <motion.div
                        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-colors"
                        whileHover={{
                          rotate: [0, -10, 10, -10, 0],
                          scale: 1.1,
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon className="h-8 w-8 text-primary" />
                      </motion.div>
                      <div>
                        <CardTitle className="text-xl md:text-2xl mb-2 group-hover:text-primary transition-colors">
                          {t(`services.items.${service}.title`)}
                        </CardTitle>
                        <CardDescription className="text-base">
                          {t(`services.items.${service}.description`)}
                        </CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4 flex-grow">
                      <ul className="space-y-2 text-sm">
                        {(
                          t(`services.items.${service}.features`, {
                            returnObjects: true,
                          }) as string[]
                        ).map((feature, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className="flex gap-2 items-center"
                          >
                            <span className="text-primary text-lg">
                              <div className="w-[6px] h-[6px] bg-primary rounded-full"></div>
                            </span>
                            <span className="text-muted-foreground">
                              {feature}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter className="flex flex-col items-start gap-3 pt-6 border-t mt-auto">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{t(`services.items.${service}.timeframe`)}</span>
                      </div>
                      <div className="flex items-center gap-2 ">
                        <Badge
                          variant="secondary"
                          className="text-base font-bold px-3 py-1"
                        >
                          {t(`services.items.${service}.price`)}
                        </Badge>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
