import { useEffect, useState } from "react";
import { ThemeContext } from "./Theme-Context";
import type { Props } from "../types";

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  function onChangeTheme(newVal: string) {
    setTheme(newVal);
  }

  return (
    <ThemeContext.Provider value={{ theme, onChangeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
