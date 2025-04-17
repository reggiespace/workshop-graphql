// Define Types to match typeDefs
export interface City {
    id: string;
    name: string;
    country: string;
    coord: Coordinates;
    weather: Weather;
  }
  
  export interface Coordinates {
    lon: number;
    lat: number;
  }
  
  export interface Summary {
    title: string;
    description: string;
    icon: string;
  }
  
  export interface Temperature {
    actual: number;
    feelsLike: number;
    min: number;
    max: number;
  }
  
  export interface Wind {
    speed: number;
    deg: number;
  }
  
  export interface Clouds {
    all: number;
    visibility: number;
    humidity: number;
  }
  
  export interface Weather {
    summary: Summary;
    temperature: Temperature;
    wind: Wind;
    clouds: Clouds;
    timestamp: number;
  }
  
  export interface ConfigInput {
    units?: Unit;
    lang?: Language;
  }
  
  export enum Unit {
    metric = "metric",
    imperial = "imperial",
    kelvin = "kelvin"
  }
  
  export enum Language {
    af = "af",
    al = "al",
    ar = "ar",
    az = "az",
    bg = "bg",
    ca = "ca",
    cz = "cz",
    da = "da",
    de = "de",
    el = "el",
    en = "en",
    eu = "eu",
    fa = "fa",
    fi = "fi",
    fr = "fr",
    gl = "gl",
    he = "he",
    hi = "hi",
    hr = "hr",
    hu = "hu",
    id = "id",
    it = "it",
    ja = "ja",
    kr = "kr",
    la = "la",
    lt = "lt",
    mk = "mk",
    no = "no",
    nl = "nl",
    pl = "pl",
    pt = "pt",
    pt_br = "pt_br",
    ro = "ro",
    ru = "ru",
    sv = "sv",
    se = "se",
    sk = "sk",
    sl = "sl",
    sp = "sp",
    es = "es",
    sr = "sr",
    th = "th",
    tr = "tr",
    ua = "ua",
    uk = "uk",
    vi = "vi",
    zh_cn = "zh_cn",
    zh_tw = "zh_tw",
    zu = "zu"
  }