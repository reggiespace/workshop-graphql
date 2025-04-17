# GraphQL Weather API

A simple GraphQL API to fetch weather data for cities using the OpenWeatherMap API.

## Prerequisites

*   Node.js (version 16 or higher)
*   npm or yarn

## Setup

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd graphql-weather-api-ts
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up environment variables:**

    *   Create a `.env` file in the root directory of the project.
    *   Add your OpenWeatherMap API key to the `.env` file. You can obtain an API key from [OpenWeatherMap](https://openweathermap.org/).

        ```bash
        OPENWEATHER_API_KEY=your_api_key
        ```

    *   **Note:** The [.env](http://_vscodecontentref_/0) file is gitignored to prevent accidental commits of your API key.

## Running the application

1.  **Start the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

2.  **Access the GraphQL Playground:**

    *   Open your browser and navigate to `http://localhost:4000`. This will open the GraphQL Playground, where you can explore the API and execute queries.

## API Endpoints

The GraphQL API provides the following queries:

*   [getCityByName(name: String!, country: String, config: ConfigInput): City](http://_vscodecontentref_/1)
    *   Fetches weather data for a city by name.
    *   Arguments:
        *   [name](http://_vscodecontentref_/2) (String!): The name of the city (required).
        *   [country](http://_vscodecontentref_/3) (String): The country code (optional).
        *   [config](http://_vscodecontentref_/4) (ConfigInput): Configuration options (optional).
            *   [units](http://_vscodecontentref_/5) (Unit): The units for temperature (optional). Possible values: [metric](http://_vscodecontentref_/6), [imperial](http://_vscodecontentref_/7), [kelvin](http://_vscodecontentref_/8).
            *   [lang](http://_vscodecontentref_/9) (Language): The language for the description (optional). See the [OpenWeatherMap API documentation](https://openweathermap.org/current#multi) for available languages.
*   [getCityById(id: [String!], config: ConfigInput): [City]](http://_vscodecontentref_/10)
    *   Fetches weather data for a list of cities by their IDs.
    *   Arguments:
        *   [id](http://_vscodecontentref_/11) (\[String!] ): An array of city IDs (required).
        *   [config](http://_vscodecontentref_/12) (ConfigInput): Configuration options (optional).
            *   [units](http://_vscodecontentref_/13) (Unit): The units for temperature (optional). Possible values: [metric](http://_vscodecontentref_/14), [imperial](http://_vscodecontentref_/15), [kelvin](http://_vscodecontentref_/16).
            *   [lang](http://_vscodecontentref_/17) (Language): The language for the description (optional). See the [OpenWeatherMap API documentation](https://openweathermap.org/current#multi) for available languages.

## Example Queries

### Get weather by city name

```graphql
query {
  getCityByName(name: "London", country: "GB", config: { units: metric, lang: en }) {
    id
    name
    country
    coord {
      lon
      lat
    }
    weather {
      summary {
        title
        description
        icon
      }
      temperature {
        actual
        feelsLike
        min
        max
      }
      wind {
        speed
        deg
      }
      clouds {
        all
        visibility
        humidity
      }
      timestamp
    }
  }
}