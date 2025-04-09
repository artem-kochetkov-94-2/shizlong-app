import { bookStore } from "@src/application/store/bookStore";
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
        bookStore.setSelectedModule(null);
        return;
      }
  
      const module = modules.find((m) => m.module.id === Number(moduleId));
      if (!module) return;
  
      const scheme = schemes.find((s) => s.id === module.module.sector_scheme_id);
      if (!scheme) return;
  
      bookStore.setSelectedModule(module);
      sectorStore.setActiveScheme(scheme);
    }, [moduleId, modules, schemes]);
};
