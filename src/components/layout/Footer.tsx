import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Mail, Phone, MapPin } from "lucide-react";
import { ImpresszumModal } from "@/components/modals/ImpresszumModal";
import { useTheme } from "@/contexts/ThemeContext";

const navItems = ["home", "services", "process", "pricing", "faq", "contact"];

interface FooterProps {
  onOpenPrivacy?: () => void;
}

export function Footer({ onOpenPrivacy }: FooterProps) {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();
  const [impresszumOpen, setImpresszumOpen] = useState(false);

  const huMap: Record<string, string> = {
    services: "szolgaltatasok",
    process: "folyamat",
    pricing: "arak",
    references: "referenciak",
    faq: "gyik",
    contact: "kapcsolat",
  };

  const getHref = (sectionId: string) => {
    if (sectionId === "home") return "/";
    let path = sectionId;
    if (i18n.language === "hu" && huMap[sectionId]) {
      path = huMap[sectionId];
    }
    return `/${path}`;
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-muted/50 border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <img
                src={
                  theme === "light"
                    ? "/assets/logo/logo_full_light.png"
                    : "/assets/logo/logo_full_dark.png"
                }
                alt="DobosDEV Logo"
                width="240"
                height="35"
                className="h-6 md:h-8 w-auto"
              />
            </div>
            <p className="text-xs text-muted-foreground mb-3 italic">
              {t("footer.businessName")}
            </p>
            <p className="text-sm text-muted-foreground">
              {t("footer.description")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">{t("footer.quickLinks")}</h3>
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={getHref(item)}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item);
                  }}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors text-left block py-2"
                >
                  {t(`nav.${item}`)}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">{t("nav.contact")}</h3>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a
                  href="mailto:info@dobosdev.hu"
                  className="hover:text-primary transition-colors"
                >
                  info@dobosdev.hu
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <a
                  href="tel:+36202215874"
                  className="hover:text-primary transition-colors"
                >
                  +36 20 221 5874
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Budapest, Hungary</span>
              </div>
            </div>

            {/* Legal Links */}
            <div className="mt-6">
              <h3 className="font-semibold mb-3 text-sm">
                {t("footer.legalInfo")}
              </h3>
              <nav className="flex flex-col gap-2">
                <button
                  onClick={() => setImpresszumOpen(true)}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors text-left py-2"
                >
                  {t("legal.impresszum.title")}
                </button>
                <button
                  onClick={onOpenPrivacy}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors text-left py-2"
                >
                  {t("legal.privacy.title")}
                </button>
              </nav>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>
            © {currentYear} DobosDEV - Dobos Dominik E.V. {t("footer.rights")}
          </p>
        </div>
      </div>

      {/* Modals */}
      <ImpresszumModal open={impresszumOpen} onOpenChange={setImpresszumOpen} />
    </footer>
  );
}
