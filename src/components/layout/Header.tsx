import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { m, AnimatePresence } from "framer-motion";
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

    // Handle navigation
    if (sectionId === 'home') {
      if (location.pathname === '/') {
        // If already on home, just scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/');
        // Scroll will be handled by App.tsx useEffect
      }
    } else {
      // Check if we are already on the page but just need to scroll
      // Note: For now, we always navigate to ensure URL updates, but we could optimize this
      // if we are already on the right route pattern.
      
      // If we are already on the main page (any section), try to scroll directly first
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        // Update URL without full navigation if possible, or just let it be
        // navigate(`/${path}`, { replace: true }); // Optional: might trigger router
        window.history.pushState(null, '', `/${path}`);
      } else {
        navigate(`/${path}`);
      }
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
          <m.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl md:text-3xl font-bold cursor-pointer"
            onClick={() => scrollToSection("home")}
          >
            <span className="text-foreground">Dobos</span>
            <span className="text-gray-500">D</span>
            <span className="text-primary">EV</span>
          </m.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item, index) => (
              <m.button
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => scrollToSection(item)}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {t(`nav.${item}`)}
              </m.button>
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
          <m.div
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
                <m.button
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
                </m.button>
              ))}
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
