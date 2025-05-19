import axios from 'axios';
import dotenv from 'dotenv';
import { GeocodingResult } from '../utils/interfaces';

dotenv.config();

export class GeoApiService {
    private readonly apiKey: string;
    private readonly baseUrl: string;

    constructor() {
        this.apiKey = process.env.API_KEY || '';
        this.baseUrl = process.env.API_BASE_URL || '';
        if (!this.apiKey) {
            throw new Error('Missing Api key');
        }
        if (!this.baseUrl) {
            throw new Error('Missing Api url');
        }
    }

    public async fetchCoordinates(place: string): Promise<GeocodingResult | null> {
        try {
            const response = await axios.get(this.baseUrl, {
                params: {
                    q: place,
                    limit: 1,
                    appid: this.apiKey
                }
            });

            const results = response.data;

            if (results.length > 0) {
                const location = results[0];
                return {
                    latitude: location.lat,
                    longitude: location.lon,
                };
            }

            return null;
        } catch (error) {
            throw new Error('Failed to fetch geolocation data');
        }
    }
}
