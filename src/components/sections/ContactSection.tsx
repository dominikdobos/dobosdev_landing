import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatedSection } from '@/components/common/AnimatedSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, AlertCircle, CheckCircle2 } from 'lucide-react';

export function ContactSection() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          name: formData.name,
          email: formData.email,
          service: formData.service,
          message: formData.message,
          subject: `Új ajánlatkérés: ${formData.service}`,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          service: '',
          message: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-20 px-4">
      <div className="container mx-auto max-w-5xl relative z-10">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('contact.subtitle')}
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <AnimatedSection delay={0.2}>
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold">Email</div>
                        <a href="mailto:info@dobosdev.hu" className="text-sm text-muted-foreground hover:text-primary">
                          info@dobosdev.hu
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold">Telefon</div>
                        <a href="tel:+36301234567" className="text-sm text-muted-foreground hover:text-primary">
                          +36 30 123 4567
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold">Helyszín</div>
                        <div className="text-sm text-muted-foreground">
                          Budapest, Hungary
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>
          </AnimatedSection>

          {/* Contact Form */}
          <AnimatedSection delay={0.3}>
            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      {t('contact.form.name')}
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      {t('contact.form.email')}
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium mb-2">
                      {t('contact.form.service')}
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange as any}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={isSubmitting}
                      required
                    >
                      <option value="">Válassz...</option>
                      <option value="website">{t('contact.form.serviceOptions.website')}</option>
                      <option value="redesign">{t('contact.form.serviceOptions.redesign')}</option>
                      <option value="landing">{t('contact.form.serviceOptions.landing')}</option>
                      <option value="maintenance">{t('contact.form.serviceOptions.maintenance')}</option>
                      <option value="seo">{t('contact.form.serviceOptions.seo')}</option>
                      <option value="other">{t('contact.form.serviceOptions.other')}</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      {t('contact.form.message')}
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      disabled={isSubmitting}
                      required
                    />
                  </div>

                  {/* Success Message */}
                  {submitStatus === 'success' && (
                    <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900">
                      <CardContent className="pt-6">
                        <div className="flex gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-green-800 dark:text-green-200">
                            {t('contact.form.success')}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Error Message */}
                  {submitStatus === 'error' && (
                    <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900">
                      <CardContent className="pt-6">
                        <div className="flex gap-3">
                          <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-red-800 dark:text-red-200">
                            {t('contact.form.error')}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? t('contact.form.sending') : t('contact.form.submit')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

