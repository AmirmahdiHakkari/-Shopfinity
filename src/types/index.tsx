import type { JSX } from "react";

export type Props = {
  children: React.ReactNode;
};

export type dataLoginType = {
  username: string;
  password: string;
};

export type ProductType = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
  description: string;
  quantity: number;
  images?: string[];
  stock?: string;
};

export type ProductCardProps = {
  product: ProductType;
};

export type ContactFormType = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type ThemeContextType = {
  theme: string;
  onChangeTheme: (newTheme: string) => void;
};

export type ForgotPasswordType = {
  email: string;
};

export type CheckoutFormType = {
  Address: string;
  Email: string;
  Name: string;
};

export type TechItemProps = {
  tech: {
    name: string;
    icon: JSX.Element;
  };
};

export type FilterNavProps = {
  categories: string[];
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  selectedCategory: string;
};

export type DashboardSidebarButtonType = {
  to: string;
  content: string;
  isActiveOverride?: (pathname: string) => boolean;
};

export type AppWidgetSummaryProps = {
  header: string;
  subheader: string;
  data: number[];
  cartColor: string;
};

export type BarChartProps = {
  data: number[];
  categories?: string[];
  color?: string;
};

export type MultiLayerDonutChartType = {
  data: number[];
  labels: string[];
  colors?: string[];
};

export type FormValues = {
  title: string;
  category: string;
  price: number;
  stock: number;
  description: string;
};
