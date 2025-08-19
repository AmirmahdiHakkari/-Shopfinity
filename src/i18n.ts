import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "./locale/en";
import { fa } from "./locale/fa";
import { fr } from "./locale/fr";

const resources = {
  en: { translation: en },
  fa: { translation: fa },
  fr: { translation: fr },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("lang") || "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

i18n.on("languageChanged", (lng) => {
  localStorage.setItem("lang", lng);
});

export default i18n;
