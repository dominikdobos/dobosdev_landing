import { m } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";

export function NotFoundPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
      {/* Background elements similar to Hero */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background z-0" />
      
      <m.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-md mx-auto"
      >
        <h1 className="text-9xl font-bold text-primary/20 mb-4 select-none">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
          {t("notfound.title")}
        </h2>
        <p className="text-muted-foreground text-lg mb-8">
          {t("notfound.description")}
        </p>
        <Button 
          size="lg" 
          onClick={() => navigate("/")}
          className="gap-2"
        >
          <Home className="w-4 h-4" />
          {t("notfound.button")}
        </Button>
      </m.div>
    </div>
  );
}

