import { InitialData, LOCATION } from "../types";
import { parametersToMap } from "../configs/parametersToMap";

import { scrapData } from "./scrapData";

export const getLinksFromDom = (): Promise<InitialData>[] => {
  const scarpResult = scrapData(parametersToMap) as InitialData[];

  return scarpResult.map(function (data) {
    if (data.location !== LOCATION.UNKNOWN && data.links.length > 0) {	
      return Promise.resolve(data);
    } else {
      return Promise.reject(
        "Error: unknown location for counting LOC (lines of code)"
      );
    }
  });
};
