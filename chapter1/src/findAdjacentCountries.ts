type AdjacentCountries = { [key: string]: string[] };
const adjacentCountriesOfEveryCountry: AdjacentCountries = require('./allCountriesWithTheirAdjacentCountries.json');

const getAdjacentCountries = (countryCode: string): string[] => {
    const adjacentCountries = adjacentCountriesOfEveryCountry[countryCode.toUpperCase()];
    return adjacentCountries || [];
};

const validateCountryCode = (countryCode: string): boolean => {
    if (countryCode in adjacentCountriesOfEveryCountry) return true;
    else return false;
}

const main = (): void => {
    const readline = require("readline");
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question(
        "Enter the country code (ex. 'IN'): ",
        (countryCode: string) => {
            countryCode = countryCode.toUpperCase();

            if (!validateCountryCode(countryCode)) {
                console.error('Please enter an valid country code.');
                rl.close();
                return;
            }

            const adjacentCountries = getAdjacentCountries(countryCode);
            if (adjacentCountries.length > 0) {
                console.log(`Adjacent countries`);
                adjacentCountries.forEach(adjacentCountry => console.log(`- ${adjacentCountry}`));
            } else {
                console.log(
                    `No adjacent countries found.`
                );
            }
            rl.close();
        }
    );
};

main();