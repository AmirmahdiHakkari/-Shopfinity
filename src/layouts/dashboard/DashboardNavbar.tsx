import clsx from "clsx";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/Theme-Context";
import ReactCountryFlag from "react-country-flag";
import { FaBell, FaChevronDown } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

type Props = {
  onMenuClick: () => void;
};

const DashboardNavbar = ({ onMenuClick }: Props) => {
  const { theme, onChangeTheme } = useContext(ThemeContext);
  const isLight = theme === "light";

  const {
    i18n: { changeLanguage, language, dir },
    t,
  } = useTranslation();

  const isLTR = dir() === "ltr";

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [langOpen, setLangOpen] = useState(false);
  const languages = [
    { code: "en", label: "English", flag: "US" },
    { code: "fa", label: "فارسی", flag: "IR" },
    { code: "fr", label: "Français", flag: "FR" },
  ];

  return (
    <div
      dir="ltr"
      className={clsx(
        "max-h-1/12 p-4 transition flex items-center justify-end gap-5 sticky top-0 z-40",
        isLight
          ? scrolled
            ? "bg-[#ffffff7d] backdrop-blur-sm shadow"
            : "bg-gray-100"
          : scrolled
          ? "bg-[#1c252e6b] backdrop-blur-sm shadow"
          : "bg-darkBg"
      )}
    >
      <div className="min-w-1/12 gap-2 flex items-center justify-evenly">
        <FaBell
          size={24}
          className={clsx(
            "transition",
            isLight ? "text-gray-800" : "text-white"
          )}
        />

        <div className="bg-gray-300 w-12 h-12 rounded-full flex items-center justify-center">
          <img
            src="https://static.vecteezy.com/system/resources/previews/051/767/450/large_2x/3d-cartoon-man-with-glasses-and-beard-illustration-free-png.png"
            alt="Avatar"
            className="w-4/5"
          />
        </div>
      </div>

      <div className="min-w-1/12 gap-2 flex items-center justify-evenly">
        <div className="relative">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className={clsx(
              "flex items-center gap-2 px-4 py-2 rounded-lg border shadow-sm transition max-w-40 justify-between cursor-pointer",
              isLight
                ? "bg-white border-gray-300 text-gray-800 hover:bg-gray-100"
                : "bg-[#2A3645] border-gray-600 text-white hover:bg-[#3A4656]"
            )}
          >
            <div className="flex items-center gap-2">
              <ReactCountryFlag
                countryCode={
                  languages.find((l) => l.code === language)?.flag || "US"
                }
                svg
                style={{
                  color: "red",
                  width: "20px",
                  height: "20px",
                  borderRadius: "4px",
                }}
              />
              <span>{languages.find((l) => l.code === language)?.label}</span>
            </div>
            <FaChevronDown
              className={clsx(
                "transition-transform duration-200",
                langOpen ? "rotate-180" : "rotate-0"
              )}
            />
          </button>

          {langOpen && (
            <div
              className={clsx(
                "absolute right-0 mt-2 w-40 rounded-lg shadow-lg z-50 overflow-hidden",
                isLight
                  ? "bg-white text-gray-800 border border-gray-200"
                  : "bg-[#2A3645] text-white border border-gray-600"
              )}
            >
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    changeLanguage(l.code);
                    setLangOpen(false);
                    toast.success(
                      t("dashboard.toast.languageChanged", { lang: l.label }),
                      {
                        position: isLTR ? "top-right" : "top-left",
                        style: {
                          background: isLight ? "#f9fafb" : "#1C252E",
                          color: isLight ? "#000000" : "#ffffff",
                        },
                      }
                    );
                  }}
                  className={clsx(
                    "flex items-center gap-2 px-4 py-2 w-full transition text-left cursor-pointer",
                    isLight ? "hover:bg-gray-100" : "hover:bg-indigo-600"
                  )}
                >
                  <ReactCountryFlag
                    countryCode={l.flag}
                    svg
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "4px",
                    }}
                  />
                  {l.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => onChangeTheme(isLight ? "dark" : "light")}
          className="p-2 flex items-center justify-center outline-none"
        >
          {isLight ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gray-800 hover:text-indigo-600 transition cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-yellow-400 hover:text-yellow-500 transition cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <circle
                cx="12"
                cy="12"
                r="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          )}
        </button>
      </div>
      <button
        className={clsx(
          "md:hidden text-2xl",
          isLight ? "text-black" : "text-white"
        )}
        onClick={onMenuClick}
      >
        ☰
      </button>
    </div>
  );
};

export default DashboardNavbar;
