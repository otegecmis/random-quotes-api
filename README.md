## Random Quotes API [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/otegecmis/random-quotes-api/blob/main/LICENSE.md)

- A backend API built with **Node.js**, **TypeScript** and **Express.js** for fetching random quotes.

### 1. Installation

1. Clone the repository

```sh
git clone https://github.com/otegecmis/random-quotes-api.git && cd random-quotes-api
```

2. Generate `.env` file 

```sh
npm run generate-env
```

3. Start the application with Docker

```sh
docker-compose up --build -d
```

### 2. Documentation

#### 1.Swagger

To access `Swagger` documentation, make sure the `NODE_ENV` in the `.env` file is set to `development`.

Then, you can access it via `api/swagger`.
