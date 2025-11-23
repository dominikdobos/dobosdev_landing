import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { LanguageToggle } from "@/components/common/LanguageToggle";
import { useNavigate } from "react-router-dom";

const navItems = ["services", "process", "pricing", "references", "faq", "contact"];

export function Header() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    // Close menu first for better UX
    setIsMobileMenuOpen(false);

    // Map section ID to URL path based on language
    let path = sectionId;
    if (i18n.language === 'hu') {
      const huMap: Record<string, string> = {
        'services': 'szolgaltatasok',
        'process': 'folyamat',
        'pricing': 'arak',
        'references': 'referenciak',
        'faq': 'gyik',
        'contact': 'kapcsolat'
      };
      if (huMap[sectionId]) {
        path = huMap[sectionId];
      }
    }

    // Navigate to the URL (App.tsx will handle scrolling)
    if (sectionId === 'home') {
      navigate('/');
    } else {
      navigate(`/${path}`);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? "bg-background/95 backdrop-blur-sm shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Simple Logo - No Tooltip */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl md:text-3xl font-bold cursor-pointer"
            onClick={() => scrollToSection("home")}
          >
            <span className="text-foreground">Dobos</span>
            <span className="text-gray-500">D</span>
            <span className="text-primary">EV</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item, index) => (
              <motion.button
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => scrollToSection(item)}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {t(`nav.${item}`)}
              </motion.button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageToggle />

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: 1,
              height: "auto",
              transition: {
                height: {
                  duration: 0.3,
                },
                opacity: {
                  duration: 0.3,
                  delay: 0.1,
                },
              },
            }}
            exit={{
              opacity: 0,
              height: 0,
              transition: {
                height: {
                  duration: 0.3,
                  delay: 0.1,
                },
                opacity: {
                  duration: 0.2,
                },
              },
            }}
            className="md:hidden bg-background border-t overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {navItems.map((item, index) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: {
                      delay: 0.1 + index * 0.05,
                    },
                  }}
                  exit={{ opacity: 0, x: -20 }}
                  onClick={() => scrollToSection(item)}
                  className="text-left py-2 px-4 rounded-md hover:bg-accent transition-colors"
                >
                  {t(`nav.${item}`)}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
