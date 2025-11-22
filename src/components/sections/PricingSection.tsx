import { useTranslation } from 'react-i18next';
import { AnimatedSection } from '@/components/common/AnimatedSection';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

const packages = ['landing', 'business', 'redesign', 'maintenance'];

export function PricingSection() {
  const { t } = useTranslation();

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="py-20 px-4">
      <div className="container mx-auto relative z-10">
        <AnimatedSection className="text-center mb-12" variant="scale">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('pricing.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('pricing.subtitle')}
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {packages.map((pkg, index) => {
            const isPopular = t(`pricing.packages.${pkg}.popular`) === 'true';
            const animationVariants = ['fadeUp', 'fadeDown', 'fadeLeft', 'fadeRight'] as const;
            const variantIndex = index % animationVariants.length;
            
            return (
              <AnimatedSection 
                key={pkg} 
                delay={index * 0.1}
                variant={animationVariants[variantIndex]}
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="h-full"
                >
                  <Card className={`h-full flex flex-col ${isPopular ? 'border-primary shadow-lg ring-2 ring-primary/20' : ''}`}>
                    {isPopular && (
                      <motion.div 
                        className="bg-primary text-primary-foreground text-center py-1 text-sm font-semibold rounded-t-lg"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        Népszerű
                      </motion.div>
                    )}
                    <CardHeader className="pb-4">
                      <CardTitle className="text-2xl">{t(`pricing.packages.${pkg}.name`)}</CardTitle>
                      <CardDescription className="min-h-[3rem] text-sm leading-relaxed">
                        {t(`pricing.packages.${pkg}.description`)}
                      </CardDescription>
                      <div className="text-3xl font-bold text-primary pt-4">
                        {t(`pricing.packages.${pkg}.price`)}
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow py-4">
                      <ul className="space-y-3">
                        {(t(`pricing.packages.${pkg}.features`, { returnObjects: true }) as string[]).map((feature, i) => (
                          <motion.li 
                            key={i} 
                            className="flex items-start gap-2 text-sm"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                          >
                            <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter className="pt-4 mt-auto">
                      <Button 
                        className="w-full" 
                        variant={isPopular ? 'default' : 'outline'}
                        onClick={scrollToContact}
                      >
                        Ajánlatot kérek
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>

        <AnimatedSection delay={0.4} variant="scale">
          <Card className="max-w-2xl mx-auto bg-muted/50">
            <CardHeader>
              <CardTitle>{t('pricing.hourlyRate.title')}</CardTitle>
              <CardDescription>{t('pricing.hourlyRate.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {t('pricing.hourlyRate.price')}
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        <AnimatedSection delay={0.5} className="text-center mt-8 space-y-2" variant="fadeUp">
          <p className="text-sm text-muted-foreground italic">
            {t('pricing.disclaimer')}
          </p>
          <p className="text-sm text-muted-foreground">
            {t('pricing.paymentTerms')}
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

