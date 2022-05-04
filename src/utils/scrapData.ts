import { ParameterToMap, ExistenceChecker, Wrapper } from '../configs/parametersToMap';
import { LOCATION, InitialData } from '../types';

export const scrapData = (parameters: ParameterToMap[]): InitialData[] | void => {
	let scrapResult: InitialData[] = [];

	for (let i = 0; i < parameters.length; i++) {
		const config = parameters[i];

		const {
			locationName,
			selector,
			pathToSelect,
			pathToInsert,
			existenceChecker,
			wrapper,
		} = config;

		if (locationName === LOCATION.UNKNOWN) {
			break;
		}

		// @ts-ignore
		const entity = document[selector](pathToSelect);
		// @ts-ignore
		const entityToInsert = document[selector](pathToInsert);

		if ((existenceChecker as ExistenceChecker)(entity)) {
			console.log('scrapData.locationName', locationName);
			console.log('scrapData.links', (wrapper as Wrapper)(entity));
			scrapResult.push({
				location: locationName,
				links: (wrapper as Wrapper)(entity) as HTMLAnchorElement[],
				linksToInsert: (wrapper as Wrapper)(entityToInsert) as HTMLAnchorElement[],
			})
		}
	}

	if(scrapResult.length == 0) {
		return [{
			location: LOCATION.UNKNOWN,
			links: [],
			linksToInsert: [],
		}];
	} else {
		return scrapResult;
	}
};
