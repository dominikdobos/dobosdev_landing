import { useTranslation } from 'react-i18next';
import { AnimatedSection } from '@/components/common/AnimatedSection';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HexagonBackground } from '@/components/common/HexagonBackground';
import { motion } from 'framer-motion';

export function AboutReferencesSection() {
  const { t } = useTranslation();
  const references = t('references.items', { returnObjects: true }) as Array<{
    title: string;
    description: string;
    category: string;
  }>;

  return (
    <section className="py-20 px-4 relative overflow-hidden">
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
              {t('about.title')}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('about.description')}
            </p>
          </div>
        </AnimatedSection>

        {/* References */}
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-12" variant="rotate">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('references.title')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('references.subtitle')}
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {references.map((reference, index) => {
              const animationVariants = ['fadeUp', 'slideUp', 'scale'] as const;
              const variantIndex = index % 3;
              
              return (
                <AnimatedSection 
                  key={index} 
                  delay={index * 0.1}
                  variant={animationVariants[variantIndex]}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    className="pointer-events-auto"
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-t-lg" />
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="secondary">{reference.category}</Badge>
                        </div>
                        <CardTitle>{reference.title}</CardTitle>
                        <CardDescription>{reference.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

