export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  timeframe: string;
  price: string;
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface PricingPackage {
  id: string;
  name: string;
  description: string;
  price: string;
  features: string[];
  popular?: boolean;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Reference {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
}

