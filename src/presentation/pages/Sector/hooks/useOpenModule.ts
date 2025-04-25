import { locationStore } from "@src/application/store/locationStore";
import { sectorStore } from "@src/application/store/sectorStore";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const useOpenModule = () => {
  const [searchParams] = useSearchParams();
  const moduleId = searchParams.get('module');
  const { modules } = locationStore;
  const { schemes } = sectorStore;

  useEffect(() => {
    if (!moduleId) {
      return;
    }

    const module = modules.find((m) => m.id === Number(moduleId));
    if (!module) return;

    const scheme = schemes.find((s) => s.id === module.sector_scheme_id);
    if (!scheme) return;

    sectorStore.setActiveScheme(scheme);
  }, [moduleId, modules, schemes]);
};
