import { useContext } from "react";
import { ThemeContext } from "../context/Theme-Context";
import clsx from "clsx";
import { FaReact, FaCss3Alt, FaGithub, FaHtml5, FaJs } from "react-icons/fa";

import {
  SiTypescript,
  SiTailwindcss,
  SiReactrouter,
  SiReacthookform,
  SiAxios,
  SiRedux,
  SiI18Next,
} from "react-icons/si";

import { MdOutlineSettingsEthernet } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import TechItem from "../components/about/Tech-item";

const AboutPage = () => {
  const { theme } = useContext(ThemeContext);
  const isLight = theme === "light";

  const {
    i18n: { dir },
    t,
  } = useTranslation();

  const techStack = [
    { name: "React", icon: <FaReact className="text-sky-500" /> },
    { name: "JavaScript", icon: <FaJs className="text-yellow-400" /> },
    { name: "TypeScript", icon: <SiTypescript className="text-blue-600" /> },
    { name: "HTML5", icon: <FaHtml5 className="text-orange-500" /> },
    { name: "CSS3", icon: <FaCss3Alt className="text-blue-500" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-sky-400" /> },
    { name: "React Router", icon: <SiReactrouter className="text-red-500" /> },
    {
      name: "React Hook Form",
      icon: <SiReacthookform className="text-pink-500" />,
    },
    { name: "Axios", icon: <SiAxios className="text-blue-400" /> },
    {
      name: "Context API",
      icon: <MdOutlineSettingsEthernet className="text-green-500" />,
    },
    { name: "Redux Toolkit", icon: <SiRedux className="text-purple-600" /> },
    { name: "i18next", icon: <SiI18Next className="text-blue-500" /> },
    { name: "GitHub", icon: <FaGithub className="text-gray-700" /> },
  ];

  return (
    <>
      <Helmet>
        <title>{t("pageTitle.about")}</title>
      </Helmet>

      <div
        dir={dir()}
        className={clsx(
          "min-h-11/12 py-12 px-6",
          isLight ? "bg-gray-100 text-gray-800" : "bg-darkBg text-gray-200"
        )}
      >
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center">
            {t("aboutPage.header")}
          </h1>
          <p
            className={clsx(
              "text-center mb-12 max-w-2xl mx-auto",
              isLight ? "text-gray-700" : "text-gray-400"
            )}
          >
            {t("aboutPage.description")}
          </p>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {techStack.map((tech, index) => (
              <TechItem key={index} tech={tech} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
