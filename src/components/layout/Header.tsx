import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { m, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { LanguageToggle } from "@/components/common/LanguageToggle";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = ["services", "process", "pricing", "references", "faq", "contact"];

export function Header() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Helper to get absolute position from top of document
  const getAbsoluteTop = (element: HTMLElement) => {
    let top = 0;
    let current: HTMLElement | null = element;
    while (current) {
      top += current.offsetTop;
      current = current.offsetParent as HTMLElement;
    }
    return top;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      let currentSection = "home";
      
      // Calculate trigger point: 1/3 down the screen
      // This ensures the section is significantly visible before switching
      const scrollPosition = window.scrollY + (window.innerHeight / 3);

      for (const section of navItems) {
        const element = document.getElementById(section);
        if (element) {
          const absoluteTop = getAbsoluteTop(element);
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= absoluteTop && scrollPosition < absoluteTop + offsetHeight) {
            currentSection = section;
            break;
          }
        }
      }
      
      // Default to home if no other section is active (implicit via initialization)
      if (window.scrollY < window.innerHeight / 2) currentSection = "home";
      
      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  const scrollToSection = (sectionId: string) => {
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

    const performScroll = () => {
      if (sectionId === 'home') {
        if (location.pathname === '/') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          navigate('/');
        }
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          const absoluteTop = getAbsoluteTop(element);
          const headerOffset = 80;
          
          window.scrollTo({ 
            top: absoluteTop - headerOffset, 
            behavior: 'smooth' 
          });
          
          window.history.pushState(null, '', `/${path}`);
        } else {
          navigate(`/${path}`);
        }
      }
    };

    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
      // Delay scroll to allow menu closing animation to start/finish
      setTimeout(performScroll, 300);
    } else {
      performScroll();
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
          <div
            className="text-2xl md:text-3xl font-bold cursor-pointer flex items-center"
            onClick={() => scrollToSection("home")}
          >
            <span className={cn("text-foreground transition-colors", activeSection === "home" && "text-primary")}>Dobos</span>
            <span className="text-gray-500">D</span>
            <span className="text-primary">EV</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item, index) => (
              <m.button
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => scrollToSection(item)}
                className={cn(
                  "text-sm font-medium transition-colors relative",
                  activeSection === item ? "text-primary" : "hover:text-primary"
                )}
              >
                {t(`nav.${item}`)}
                {activeSection === item && (
                  <m.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
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
                  className={cn(
                    "text-left py-2 px-4 rounded-md transition-colors",
                    activeSection === item
                      ? "bg-primary/10 text-primary font-medium"
                      : "hover:bg-accent"
                  )}
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
