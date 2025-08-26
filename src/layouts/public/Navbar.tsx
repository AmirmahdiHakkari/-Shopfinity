import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ThemeContext } from "../../context/Theme-Context";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import ReactCountryFlag from "react-country-flag";
import { toast } from "react-toastify";

const Navbar = () => {
  const { theme, onChangeTheme } = useContext(ThemeContext);
  const isLight = theme === "light";

  const {
    i18n: { changeLanguage, language, dir },
    t,
  } = useTranslation();

  const isLTR = dir() === "ltr";

  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const languages = [
    { code: "en", label: "English", flag: "US" },
    { code: "fa", label: "فارسی", flag: "IR" },
    { code: "fr", label: "Français", flag: "FR" },
  ];

  return (
    <div
      dir="lrt"
      className={clsx(
        "w-full min-h-1/12 p-4 flex items-center justify-between font-bold shadow ",
        isLight ? "bg-white text-gray-800" : "bg-secondaryDarkBg text-white"
      )}
    >
      <div className="text-2xl font-bold">{t("navbar.header")}</div>
      <div className="hidden md:flex items-center gap-6">
        {localStorage.getItem("token") && (
          <NavLink
            to="/dashboard/Overview"
            className={({ isActive }) =>
              clsx(
                "transition pl-2 hover:scale-105",
                isLight
                  ? isActive
                    ? "scale-105 text-indigo-600 underline"
                    : "hover:text-indigo-600"
                  : isActive
                  ? "scale-105 text-indigo-500 underline"
                  : "hover:text-indigo-500"
              )
            }
          >
            {t("navbar.dashboard")}
          </NavLink>
        )}

        <NavLink
          to="/products"
          className={({ isActive }) =>
            clsx(
              "transition pl-2 hover:scale-105",
              isLight
                ? isActive
                  ? "scale-105 text-indigo-600 underline"
                  : "hover:text-indigo-600"
                : isActive
                ? "scale-105 text-indigo-500 underline"
                : "hover:text-indigo-500"
            )
          }
        >
          {t("navbar.product")}
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            clsx(
              "transition pl-2 hover:scale-105",
              isLight
                ? isActive
                  ? "scale-105 text-indigo-600 underline"
                  : "hover:text-indigo-600"
                : isActive
                ? "scale-105 text-indigo-500 underline"
                : "hover:text-indigo-500"
            )
          }
        >
          {t("navbar.about")}
        </NavLink>
        <NavLink
          to="/Contact"
          className={({ isActive }) =>
            clsx(
              "transition pl-2 hover:scale-105",
              isLight
                ? isActive
                  ? "scale-105 text-indigo-600 underline"
                  : "hover:text-indigo-600"
                : isActive
                ? "scale-105 text-indigo-500 underline"
                : "hover:text-indigo-500"
            )
          }
        >
          {t("navbar.contactUs")}
        </NavLink>

        <Link
          to="/login"
          onClick={(e) => {
            if (localStorage.getItem("token")) {
              e.preventDefault();
              localStorage.removeItem("token");
            }
          }}
          className={clsx(
            "px-4 py-2 rounded-lg text-white transition",
            localStorage.getItem("token")
              ? "bg-red-600 hover:bg-red-700"
              : "bg-indigo-600 hover:bg-indigo-700"
          )}
        >
          {!localStorage.getItem("token")
            ? t("navbar.login")
            : t("navbar.logout")}
        </Link>

        <div className="relative">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className={clsx(
              "flex items-center gap-2 px-4 py-2 rounded-lg border shadow-sm transition w-40 justify-between cursor-pointer",
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
          className="p-2 flex items-center justify-center"
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

      <div className="md:hidden mt-3">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {menuOpen && (
          <div
            className={clsx(
              "absolute top-0 w-64 min-h-screen shadow-lg flex flex-col p-6 z-50 transition",
              dir() === "ltr" ? "left-0" : "right-0",
              isLight
                ? "bg-white text-gray-800"
                : "bg-secondaryDarkBg text-white"
            )}
          >
            <button
              className="self-end mb-6"
              onClick={() => setMenuOpen(false)}
            >
              <FaTimes size={24} />
            </button>
            <hr className="text-neutral-500 mb-4" />
            <div className="h-32">
              <h4
                className={clsx(
                  "h-1/6 mb-2",
                  isLight ? "text-neutral-500" : "text-neutral-400"
                )}
              >
                {t("navbar.pages")}
              </h4>
              <div className="h-5/6 flex flex-col justify-evenly">
                <NavLink
                  to="/Products"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    clsx(
                      "transition pl-2 hover:scale-105",
                      isLight
                        ? isActive
                          ? "scale-105 text-indigo-600 underline"
                          : "hover:text-indigo-600"
                        : isActive
                        ? "scale-105 text-indigo-500 underline"
                        : "hover:text-indigo-500"
                    )
                  }
                >
                  {t("navbar.product")}
                </NavLink>
                <NavLink
                  to="/about"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    clsx(
                      "transition pl-2 hover:scale-105",
                      isLight
                        ? isActive
                          ? "scale-105 text-indigo-600 underline"
                          : "hover:text-indigo-600"
                        : isActive
                        ? "scale-105 text-indigo-500 underline"
                        : "hover:text-indigo-500"
                    )
                  }
                >
                  {t("navbar.about")}
                </NavLink>
                <NavLink
                  to="/Contact"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    clsx(
                      "transition pl-2 hover:scale-105",
                      isLight
                        ? isActive
                          ? "scale-105 text-indigo-600 underline"
                          : "hover:text-indigo-600"
                        : isActive
                        ? "scale-105 text-indigo-500 underline"
                        : "hover:text-indigo-500"
                    )
                  }
                >
                  {t("navbar.contactUs")}
                </NavLink>
              </div>
            </div>
            <Link
              to={localStorage.getItem("token") ? "#" : "/login"}
              onClick={(e) => {
                if (localStorage.getItem("token")) {
                  e.preventDefault();
                  localStorage.removeItem("token");
                  window.location.href = "/";
                }
                setMenuOpen(false);
              }}
              className="px-4 py-2.5 mt-6 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition text-center"
            >
              {!localStorage.getItem("token")
                ? t("navbar.login")
                : t("navbar.logout")}
            </Link>

            <div className="mt-8 ">
              <h4
                className={clsx(
                  "mb-2",
                  isLight ? "text-neutral-500" : "text-neutral-400"
                )}
              >
                {t("navbar.languages")}
              </h4>
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    changeLanguage(l.code);
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 w-full transition hover:bg-indigo-600 hover:text-white rounded"
                >
                  <ReactCountryFlag
                    countryCode={l.flag}
                    svg
                    style={{ width: "20px", height: "20px" }}
                  />
                  {l.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => onChangeTheme(isLight ? "dark" : "light")}
              className="relative rounded-lg font-bold cursor-pointer transition bg-gradient-to-tr px-4 py-3 mt-6 from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white"
            >
              {isLight ? "🌙 Dark Mode" : "☀️ Light Mode"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
