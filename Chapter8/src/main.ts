import { GeoApiService } from './services/GeoApiService';
import { printCoordinates,takeUserInput } from './utils/helpers';

const main = async () => {
    const geoApi = new GeoApiService();
    const place = takeUserInput('Enter a place name: ');

    try {
        const coordinates = await geoApi.fetchCoordinates(place);
        printCoordinates(coordinates);
    } catch (error:any) {
        console.error(error.message);
    }
}

main();
