import { bookStore } from '@src/application/store/bookStore';
import { sectorStore } from '@src/application/store/sectorStore';
import { useEffect } from 'react';
import { locationStore } from '@src/application/store/locationStore';

export const useClearStates = () => {
  const { bookModules } = bookStore;
  const { activeScheme, sector } = sectorStore;
  const { location, modules } = locationStore;

  // clear states after change scheme
  useEffect(() => {
    bookStore.clear();
  }, [activeScheme]);

  // clear modules from another sector or scheme
  useEffect(() => {
    if (!sector || !location || !bookModules.size) return;

    const first = bookModules.values().next().value;

    if (first?.sector_id !== sector.id || first?.sector_scheme_id !== activeScheme?.id) {
      bookStore.clear();
    }
  }, [sector, location, bookModules, modules, activeScheme]);
};
