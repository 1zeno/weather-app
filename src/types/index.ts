export interface Weather {
    minTemp: number;
    maxTemp: number;
    currentTemp: number;
    weatherDescription: string;
}

export interface City{
    city: string;
    state: string;
    country: string;
    lat: number;
    lng: number;
    weather: Weather;
    isFavorite: boolean;
}

export interface NewCity{
    city: string;
    state: string;
    country: string;
    lat: number;
    lng: number;
}

export interface SerachCity{
    formatted: string,
    geometry: {
        lat: number,
        lng: number,
    }
}

export interface Forecast {
    minTemp: number;
    maxTemp: number;
    currentTemp: number;
    weatherDescription: string;
    date: Date;
}