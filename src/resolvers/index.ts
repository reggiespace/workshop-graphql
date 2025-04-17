import axios from 'axios';
import { UserInputError } from 'apollo-server';
import { City, ConfigInput} from '../types'
import dotenv from 'dotenv';
dotenv.config(); 

const WEATHER_API = `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.OPENWEATHER_API_KEY}`;
const GROUP_API = `https://api.openweathermap.org/data/2.5/group?appid=${process.env.OPENWEATHER_API_KEY}`;

interface WeatherApiResponse {
  id: number;
  name: string;
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      main: string;
      description: string;
      icon: string;
    }
  ];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  visibility: number;
  sys: {
    country: string;
  };
  dt: number;
}

interface GroupApiResponse {
  list: WeatherApiResponse[];
}

interface ResolverContext {
  // Define any context types if needed
}

export const resolvers = {
  Query: {
    getCityByName: async (
      obj: any,
      args: { name: string; country?: string; config?: ConfigInput },
      context: ResolverContext,
      info: any
    ): Promise<City | null> => {
      const { name, country, config } = args;
      let url = `${WEATHER_API}&q=${name}`;

      if (country) url = url + `,${country}`;
      if (config?.units) url = url + `&units=${config.units}`;
      if (config?.lang) url = url + `&lang=${config.lang}`;

      try {
        const { data } = await axios.get<WeatherApiResponse>(url);

        if (country && country.toUpperCase() !== data.sys.country) {
          throw new UserInputError('Country code was invalid', {
            invalidArgs: { country },
          });
        }

        return {
          id: String(data.id),
          name: data.name,
          country: data.sys.country,
          coord: data.coord,
          weather: {
            summary: {
              title: data.weather[0].main,
              description: data.weather[0].description,
              icon: data.weather[0].icon,
            },
            temperature: {
              actual: data.main.temp,
              feelsLike: data.main.feels_like,
              min: data.main.temp_min,
              max: data.main.temp_max,
            },
            wind: {
              speed: data.wind.speed,
              deg: data.wind.deg,
            },
            clouds: {
              all: data.clouds.all,
              visibility: data.visibility,
              humidity: data.main.humidity,
            },
            timestamp: data.dt,
          },
        };
      } catch (e: any) {
        console.error('Error fetching city by name:', e.message);
        return null;
      }
    },

    getCityById: async (
      obj: any,
      args: { id: string[] | string; config?: ConfigInput },
      context: ResolverContext,
      info: any
    ): Promise<City[] | null> => {
      const { id, config } = args;
      const ids = Array.isArray(id) ? id.join(',') : id;
      let url = `${GROUP_API}&id=${ids}`;

      if (config?.units) url = url + `&units=${config.units}`;
      if (config?.lang) url = url + `&lang=${config.lang}`;

      try {
        const { data } = await axios.get<GroupApiResponse>(url);
        const cityList = data.list.map((city) => ({
          id: String(city.id),
          name: city.name,
          country: city.sys.country,
          coord: city.coord,
          weather: {
            summary: {
              title: city.weather[0].main,
              description: city.weather[0].description,
              icon: city.weather[0].icon,
            },
            temperature: {
              actual: city.main.temp,
              feelsLike: city.main.feels_like,
              min: city.main.temp_min,
              max: city.main.temp_max,
            },
            wind: {
              speed: city.wind.speed,
              deg: city.wind.deg,
            },
            clouds: {
              all: city.clouds.all,
              visibility: city.visibility,
              humidity: city.main.humidity,
            },
            timestamp: city.dt,
          },
        }));
        return cityList;
      } catch (e: any) {
        console.error('Error fetching cities by ID:', e.message);
        return null;
      }
    },
  },
};