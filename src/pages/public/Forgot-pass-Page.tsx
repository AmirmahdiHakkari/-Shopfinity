import { useState, useContext, useEffect } from "react";
import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { ThemeContext } from "../../context/Theme-Context";
import ForgotPassForm from "../../components/forgot pass/ForgetPassForm";

const ForgotPassword = () => {
  const { theme } = useContext(ThemeContext);
  const isLight = theme === "light";
  
  const navigate = useNavigate();

  const {
    i18n: { dir },
    t,
  } = useTranslation();

  const [sent, setSent] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(4);

  useEffect(() => {
    if (!sent) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setSent(false);
    }, 4000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      navigate("/Login");
    };
  }, [sent]);

  return (
    <>
      <Helmet>
        <title>{t("pageTitle.forgot-Password")}</title>
      </Helmet>

      <div
        dir={dir()}
        className={clsx(
          "min-h-11/12 flex items-center justify-center px-4 transition",
          isLight ? "bg-gray-100" : "bg-darkBg"
        )}
      >
        <div
          className={clsx(
            "rounded-xl shadow-lg w-full max-w-sm p-6",
            isLight ? "bg-white" : "bg-secondaryDarkBg"
          )}
        >
          <h2
            className={clsx(
              "text-2xl font-bold mb-6 text-center",
              isLight ? "text-gray-900" : "text-white"
            )}
          >
            {t("forgotPassPage.header")}
          </h2>

          {sent ? (
            <div
              className={clsx(
                "text-center font-medium mb-6",
                isLight ? "text-green-600" : "text-green-400"
              )}
            >
              <p>{t("forgotPassPage.form.submit")}</p>
              {sent && (
                <p className="mt-4">{t("forgotPassPage.form.timer") + timer}</p>
              )}
            </div>
          ) : (
            <ForgotPassForm setSent={setSent} setTimer={setTimer} />
          )}

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className={clsx(
                "text-sm font-bold transition",
                isLight
                  ? "text-indigo-600 hover:text-indigo-500"
                  : "text-indigo-500 hover:text-indigo-400"
              )}
            >
              {t("forgotPassPage.form.back")}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
