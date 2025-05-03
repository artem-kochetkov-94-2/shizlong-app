import { bookStore } from '@src/application/store/bookStore';
import { sectorStore } from '@src/application/store/sectorStore';
import { useEffect } from 'react';

export const useSetPeriod = () => {
  const { allPeriods, hourlyPeriods, moduleSchemePeriod, largestPeriod } = bookStore;
  const { activeScheme } = sectorStore;

  useEffect(() => {
    if (moduleSchemePeriod !== null) return;

    if (largestPeriod) {
      bookStore.setPeriod({
        type: 'period',
        startTime: `${largestPeriod[0]}`,
        endTime: `${largestPeriod[1]}`,
      });
      return;
    }

    if (hourlyPeriods.length > 0) {
      bookStore.setPeriod({
        type: 'hourly',
        hours: hourlyPeriods[0],
      });
    }
  }, [allPeriods, largestPeriod, hourlyPeriods, moduleSchemePeriod, activeScheme]);
}