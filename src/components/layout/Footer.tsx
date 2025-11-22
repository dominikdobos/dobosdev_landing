import { useTranslation } from "react-i18next";
import { Mail, Phone, MapPin } from "lucide-react";

const navItems = ["home", "services", "process", "pricing", "faq", "contact"];

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

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
            <h3 className="text-2xl font-bold mb-2">
              <span className="text-foreground">Dobos</span>
              <span className="text-gray-500">D</span>
              <span className="text-primary">EV</span>
            </h3>
            <p className="text-xs text-muted-foreground mb-3 italic">
              Dobos Dominik Egyéni Vállalkozó
            </p>
            <p className="text-sm text-muted-foreground">
              {t("footer.description")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{t("footer.quickLinks")}</h4>
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors text-left"
                >
                  {t(`nav.${item}`)}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">{t("nav.contact")}</h4>
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
                  href="tel:+36301234567"
                  className="hover:text-primary transition-colors"
                >
                  +36 30 123 4567
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Budapest, Hungary</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>
            © {currentYear} DobosDEV - Dobos Dominik E.V. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
