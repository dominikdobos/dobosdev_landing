import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { m } from 'framer-motion';

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      aria-label="Toggle language"
      className="font-medium"
    >
      <m.span
        key={language}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
      >
        {language === 'hu' ? '🇭🇺 HU' : '🇬🇧 EN'}
      </m.span>
    </Button>
  );
}

