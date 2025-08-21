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
