import { z } from "zod";

export const weatherSchema = z.object({
  cod: z.string(),
  message: z.number(),
  cnt: z.number(),
  list: z.array(
    z.object({
      dt: z.number(),
      main: z.object({
        temp: z.number(),
        feels_like: z.number(),
        temp_min: z.number(),
        temp_max: z.number(),
        pressure: z.number(),
        sea_level: z.number(),
        grnd_level: z.number(),
        humidity: z.number(),
        temp_kf: z.number(),
      }),
      weather: z.array(
        z.object({
          id: z.number(),
          main: z.string(),
          description: z.string(),
          icon: z.string(),
        })
      ),
      clouds: z.object({
        all: z.number(),
      }),
      wind: z.object({
        speed: z.number(),
        deg: z.number(),
        gust: z.number(),
      }),
      visibility: z.number(),
      pop: z.number(),
      rain: z
        .object({
          "1h": z.number(),
        })
        .optional(),
      sys: z.object({
        pod: z.string(),
      }),
      dt_txt: z.string(),
    })
  ),
  city: z.object({
    id: z.number(),
    name: z.string(),
    coord: z.object({
      lat: z.number(),
      lon: z.number(),
    }),
    country: z.string(),
    population: z.number(),
    timezone: z.number(),
    sunrise: z.number(),
    sunset: z.number(),
  }),
});

export const aqiSchema = z.object({
  coord: z.object({
    lon: z.number(),
    lat: z.number(),
  }),
  list: z.array(
    z.object({
      main: z.object({
        aqi: z.number(),
      }),
      components: z.object({
        co: z.number(),
        no: z.number(),
        no2: z.number(),
        o3: z.number(),
        so2: z.number(),
        pm2_5: z.number(),
        pm10: z.number(),
        nh3: z.number(),
      }),
      dt: z.number(),
    })
  ),
});

export const newsSchema = z.object({
  status: z.string(),
  totalResults: z.number(),
  articles: z.array(
    z.object({
      source: z.object({
        id: z.string().nullable(),
        name: z.string(),
      }),
      author: z.string().nullable(),
      title: z.string(),
      description: z.string().nullable(),
      url: z.string(),
      urlToImage: z.string().nullable(),
      publishedAt: z.string(),
      content: z.string().nullable(),
    })
  ),
});
