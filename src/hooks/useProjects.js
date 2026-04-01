import { useTranslation } from "react-i18next";
import { projectsData } from "../data/projectsData";
import { useMemo } from "react";

export const useProjects = () => {
  const { t } = useTranslation();

  const projects = useMemo(() => {
    return projectsData.map((p) => ({
      ...p,
      title: t(`works.projects.${p.key}.title`),
      subtitle: t(`works.projects.${p.key}.subtitle`),
      description: t(`works.projects.${p.key}.description`),
      longDescription: t(`works.projects.${p.key}.longDescription`, ""),
      moreDetailsText: t("works.moreDetails"),
      year: t(`works.projects.${p.key}.year`, p.year),
      duration: t(`works.projects.${p.key}.duration`, p.duration),
      role: t(`works.projects.${p.key}.role`, p.role),
      collaborators: t(`works.projects.${p.key}.collaborators`, p.collaborators),
      features: p.features
        ? p.features.map((feature, i) =>
            t(`works.projects.${p.key}.features.${i}`, feature)
          )
        : [],
    }));
  }, [t]);

  const getProjectByKey = (key) => {
    return projects.find((p) => p.key === key);
  };

  return { projects, getProjectByKey };
};
