export interface IDailyWeather {
  clouds: number
  dew_point: number
  dt: number
  feels_like: {
    day: number
    eve: number
    morn: number
    night: number
  }
  humidity: number
  moon_phase: number
  moonrise: number
  moonset: number
  pop: 0
  pressure: number
  sunrise: number
  sunset: number
  temp: {
    day: number
    eve: number
    max: number
    min: number
    morn: number
    night: number
  }
  uvi: number
  weather: [
    {
      description: string
      icon: string
      id: number
      main: string
    }
  ]
  wind_deg: number
  wind_gust: number
  wind_speed: number
}

export interface DailyWeatherAPIResponse {
  daily: IDailyWeather[]
}
