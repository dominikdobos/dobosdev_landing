import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogClose,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import {
  Building2,
  User,
  FileText,
  Hash,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";

interface ImpresszumModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ImpresszumModal({ open, onOpenChange }: ImpresszumModalProps) {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center justify-between w-full">
            <div>
              <DialogTitle>{t("legal.impresszum.title")}</DialogTitle>
              <DialogDescription className="mt-1">
                {t("legal.impresszum.subtitle")}
              </DialogDescription>
            </div>
            <DialogClose onClick={() => onOpenChange(false)} />
          </div>
        </DialogHeader>

        <DialogBody>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {/* Business Name */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold mb-1">
                      {t("legal.impresszum.businessName")}
                    </div>
                    <div className="text-muted-foreground">
                      {t("legal.impresszum.businessNameValue")}
                    </div>
                  </div>
                </div>

                {/* Owner Name */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold mb-1">
                      {t("legal.impresszum.ownerName")}
                    </div>
                    <div className="text-muted-foreground">
                      {t("legal.impresszum.ownerNameValue")}
                    </div>
                  </div>
                </div>

                {/* Registration Number */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold mb-1">
                      {t("legal.impresszum.registrationNumber")}
                    </div>
                    <div className="text-muted-foreground">
                      {t("legal.impresszum.registrationNumberValue")}
                    </div>
                  </div>
                </div>

                {/* Tax Number */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Hash className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold mb-1">
                      {t("legal.impresszum.taxNumber")}
                    </div>
                    <div className="text-muted-foreground">
                      {t("legal.impresszum.taxNumberValue")}
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold mb-1">
                      {t("legal.impresszum.address")}
                    </div>
                    <div className="text-muted-foreground">
                      {t("legal.impresszum.addressValue")}
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Email</div>
                    <a
                      href="mailto:info@dobosdev.hu"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      info@dobosdev.hu
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold mb-1">
                      {t("legal.impresszum.phone")}
                    </div>
                    <a
                      href="tel:+36301234567"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      +36 20 221 5874
                    </a>
                  </div>
                </div>

                {/* Chamber */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold mb-1">
                      {t("legal.impresszum.chamber")}
                    </div>
                    <div className="text-muted-foreground">
                      {t("legal.impresszum.chamberValue")}
                    </div>
                  </div>
                </div>
              </div>

              {/* EU Online Dispute Resolution */}
              <div className="mt-8 pt-6 border-t">
                <p className="text-sm text-muted-foreground">
                  {t("legal.impresszum.euDispute")}{" "}
                  <a
                    href="https://ec.europa.eu/consumers/odr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    https://ec.europa.eu/consumers/odr
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}

