import readline from "readline-sync";
import { GeocodingResult } from "./interfaces";

export const takeUserInput = (message: string) => {
    const input = readline.question(`${message}\n`).trim();
    return input;
}

export const printCoordinates = (coordinates: GeocodingResult | null): void => {
    if (coordinates === null) {
        console.log("Could not find coordinates");
        return;
    }

    console.log(`Latitude: ${coordinates.latitude}`);
    console.log(`Longitude: ${coordinates.longitude}`);
}
