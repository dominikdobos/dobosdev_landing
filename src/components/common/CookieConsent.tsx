import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface CookieConsentProps {
  onOpenPrivacy?: () => void;
}

export function CookieConsent({ onOpenPrivacy }: CookieConsentProps) {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShow(false);
    // Enable all cookies/tracking here
  };

  const handleNecessaryOnly = () => {
    localStorage.setItem("cookie-consent", "necessary");
    setShow(false);
    // Disable non-essential tracking here
  };

  return (
    <AnimatePresence>
      {show && (
        <m.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, type: "spring", damping: 20 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-[400px] z-[100] safe-area-bottom"
        >
          <div className="bg-background/95 backdrop-blur-md border rounded-lg shadow-lg p-4 md:p-6 max-h-[80dvh] overflow-y-auto overscroll-contain scrollbar-hide">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg leading-none">
                    {t("cookie.title")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t("cookie.text")}
                  </p>
                  {/* Link triggers the modal */}
                  <button
                    onClick={onOpenPrivacy}
                    className="text-xs text-primary hover:underline block mt-1 text-left"
                  >
                    {t("legal.privacy.title")}
                  </button>
                </div>
                <button
                  onClick={() => setShow(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex flex-col md:flex-row gap-2 w-full md:justify-end">
                <Button
                  variant="outline"
                  onClick={handleNecessaryOnly}
                  className="w-full md:w-auto"
                >
                  {t("cookie.necessary")}
                </Button>
                <Button onClick={handleAcceptAll} className="w-full md:w-auto">
                  {t("cookie.acceptAll")}
                </Button>
              </div>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
