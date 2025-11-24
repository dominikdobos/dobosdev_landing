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

interface PrivacyPolicyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PrivacyPolicyModal({
  open,
  onOpenChange,
}: PrivacyPolicyModalProps) {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center justify-between w-full">
            <div>
              <DialogTitle>{t("legal.privacy.title")}</DialogTitle>
              <DialogDescription className="mt-1">
                {t("legal.privacy.subtitle")}
              </DialogDescription>
            </div>
            <DialogClose onClick={() => onOpenChange(false)} />
          </div>
        </DialogHeader>

        <DialogBody>
          <div className="space-y-6">
            {/* Data Controller */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">
                  {t("legal.privacy.dataController.title")}
                </h3>
                <div className="text-muted-foreground space-y-2">
                  <p>{t("legal.privacy.dataController.content")}</p>
                </div>
              </CardContent>
            </Card>

            {/* What Data We Collect */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">
                  {t("legal.privacy.dataCollected.title")}
                </h3>
                <div className="text-muted-foreground space-y-2">
                  <p>{t("legal.privacy.dataCollected.intro")}</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>{t("legal.privacy.dataCollected.name")}</li>
                    <li>{t("legal.privacy.dataCollected.email")}</li>
                    <li>{t("legal.privacy.dataCollected.service")}</li>
                    <li>{t("legal.privacy.dataCollected.message")}</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Purpose of Data Processing */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">
                  {t("legal.privacy.purpose.title")}
                </h3>
                <div className="text-muted-foreground space-y-2">
                  <p>{t("legal.privacy.purpose.content")}</p>
                </div>
              </CardContent>
            </Card>

            {/* Legal Basis */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">
                  {t("legal.privacy.legalBasis.title")}
                </h3>
                <div className="text-muted-foreground space-y-2">
                  <p>{t("legal.privacy.legalBasis.content")}</p>
                </div>
              </CardContent>
            </Card>

            {/* Data Retention */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">
                  {t("legal.privacy.retention.title")}
                </h3>
                <div className="text-muted-foreground space-y-2">
                  <p>{t("legal.privacy.retention.content")}</p>
                </div>
              </CardContent>
            </Card>

            {/* Third-Party Processors */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">
                  {t("legal.privacy.thirdParty.title")}
                </h3>
                <div className="text-muted-foreground space-y-2">
                  <p>{t("legal.privacy.thirdParty.intro")}</p>
                  <div className="mt-3 p-3 bg-muted/50 rounded-md">
                    <p className="font-semibold">Web3Forms</p>
                    <p className="text-sm">
                      {t("legal.privacy.thirdParty.web3forms")}
                    </p>
                    <a
                      href="https://web3forms.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      https://web3forms.com/privacy
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* User Rights */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">
                  {t("legal.privacy.rights.title")}
                </h3>
                <div className="text-muted-foreground space-y-2">
                  <p>{t("legal.privacy.rights.intro")}</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>{t("legal.privacy.rights.access")}</li>
                    <li>{t("legal.privacy.rights.rectification")}</li>
                    <li>{t("legal.privacy.rights.erasure")}</li>
                    <li>{t("legal.privacy.rights.restriction")}</li>
                    <li>{t("legal.privacy.rights.portability")}</li>
                    <li>{t("legal.privacy.rights.objection")}</li>
                    <li>{t("legal.privacy.rights.withdraw")}</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Data Security */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">
                  {t("legal.privacy.security.title")}
                </h3>
                <div className="text-muted-foreground space-y-2">
                  <p>{t("legal.privacy.security.content")}</p>
                </div>
              </CardContent>
            </Card>

            {/* Cookies - Detailed */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">
                  {t("legal.privacy.cookies.title")}
                </h3>
                <div className="text-muted-foreground space-y-4">
                  <p>{t("legal.privacy.cookies.content")}</p>
                  
                  {/* Cookie Types */}
                  <div className="space-y-4 pl-2">
                    <div>
                        <p className="font-semibold text-foreground">{t("legal.privacy.cookies.types.necessary.title")}</p>
                        <p className="text-sm">{t("legal.privacy.cookies.types.necessary.description")}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-foreground">{t("legal.privacy.cookies.types.statistics.title")}</p>
                        <p className="text-sm">{t("legal.privacy.cookies.types.statistics.description")}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-foreground">{t("legal.privacy.cookies.types.marketing.title")}</p>
                        <p className="text-sm">{t("legal.privacy.cookies.types.marketing.description")}</p>
                    </div>
                  </div>

                  {/* Consent */}
                  <div className="mt-2">
                    <h4 className="font-semibold text-foreground mb-1">{t("legal.privacy.cookies.consent.title")}</h4>
                    <p>{t("legal.privacy.cookies.consent.description")}</p>
                  </div>

                  {/* Retention */}
                  <div className="mt-2">
                    <h4 className="font-semibold text-foreground mb-1">{t("legal.privacy.cookies.retention.title")}</h4>
                    <p>{t("legal.privacy.cookies.retention.description")}</p>
                  </div>

                  {/* Google Info */}
                  <p className="italic text-sm mt-2">
                    {t("legal.privacy.cookies.googleInfo")}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Changes to Policy */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">
                  {t("legal.privacy.changes.title")}
                </h3>
                <div className="text-muted-foreground space-y-2">
                  <p>{t("legal.privacy.changes.content")}</p>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">
                  {t("legal.privacy.contact.title")}
                </h3>
                <div className="text-muted-foreground space-y-2">
                  <p>{t("legal.privacy.contact.content")}</p>
                  <div className="mt-3 space-y-1">
                    <p>
                      <span className="font-semibold">Email:</span>{" "}
                      <a
                        href="mailto:info@dobosdev.hu"
                        className="text-primary hover:underline"
                      >
                        info@dobosdev.hu
                      </a>
                    </p>
                    <p>
                      <span className="font-semibold">
                        {t("legal.privacy.contact.phone")}:
                      </span>{" "}
                      <a
                        href="tel:+36301234567"
                        className="text-primary hover:underline"
                      >
                        +36 20 221 5874
                      </a>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Last Updated */}
            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground text-center">
                  {t("legal.privacy.lastUpdated")}:{" "}
                  {new Date().toLocaleDateString("hu-HU")}
                </p>
              </CardContent>
            </Card>
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}
