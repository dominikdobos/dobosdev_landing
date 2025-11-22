import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatedSection } from '@/components/common/AnimatedSection';
import { ParticlesBackground } from '@/components/common/ParticlesBackground';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function FAQSection() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = t('faq.items', { returnObjects: true }) as Array<{ question: string; answer: string }>;

  return (
    <section id="faq" className="py-20 px-4 relative">
      {/* Particles Background with center fade */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <ParticlesBackground 
          className="[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]"
          quantity={80}
          staticity={30}
          ease={60}
          size={0.8}
          color="#ea580c"
        />
      </div>
      
      <div className="container mx-auto max-w-3xl relative z-10">
        <AnimatedSection className="text-center mb-12" variant="slideDown">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('faq.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('faq.subtitle')}
          </p>
        </AnimatedSection>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const animationVariants = ['fadeLeft', 'fadeRight'] as const;
            const variantIndex = index % 2;
            
            return (
              <AnimatedSection 
                key={index} 
                delay={index * 0.1}
                variant={animationVariants[variantIndex]}
              >
                <div className="border rounded-lg bg-card overflow-hidden">
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-accent/50 transition-colors"
                  >
                    <span className="font-semibold pr-4">{faq.question}</span>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-4 text-muted-foreground">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

