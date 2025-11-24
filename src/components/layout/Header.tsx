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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Find the section that is currently most visible
      const sections = ["home", ...navItems];
      let currentSection = "home";
      
      // Helper to get element by ID including mapped IDs
      const getSectionElement = (id: string) => {
        if (id === 'home') {
          // Hero section usually doesn't have an ID, but it's at the top.
          // Assuming the first section is home or we check scroll position near top.
          return window.scrollY < 100 ? document.body : null;
        }
        
        let elementId = id;
        // Try direct ID first
        let element = document.getElementById(elementId);
        
        // If not found, try mapped Hungarian IDs if applicable, though IDs in DOM should be static usually
        if (!element && i18n.language === 'hu') {
           const huMap: Record<string, string> = {
            'services': 'szolgaltatasok',
            'process': 'folyamat',
            'pricing': 'arak',
            'references': 'referenciak',
            'faq': 'gyik',
            'contact': 'kapcsolat'
          };
          if (huMap[id]) elementId = huMap[id];
          element = document.getElementById(elementId);
        }
        return element;
      };

      for (const section of sections) {
        const element = getSectionElement(section);
        if (element) {
           // Use a simple check: if the section top is within the viewport top area
           // or closest to top.
           // Better logic: check which section occupies most of the screen?
           // Or just simple scrollspy: active if top is <= viewport height * 0.3
           // Since we can't easily get all elements refs here without querySelector,
           // let's use document.getElementById which is cheap enough.
        }
      }
      
      // More robust scroll spy using IntersectionObserver is better, but inside scroll event:
      // Let's just check offsets.
      // Calculate trigger point: 1/3 down the screen
      // This ensures the section is significantly visible before switching
      const scrollPosition = window.scrollY + (window.innerHeight / 3);

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
        // Optionally update URL without scroll
        // Note: updating URL on every scroll section change might be too noisy for browser history
        // window.history.replaceState(null, '', currentSection === 'home' ? '/' : `/${currentSection}`);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

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
            <span className={cn("text-foreground transition-colors", activeSection === "home" && "text-primary")}>Dobos</span>
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
