## Random Quotes API [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/otegecmis/random-quotes-api/blob/main/LICENSE.md)

- A backend API built with **Node.js**, **MongoDB**, **Express.js** and **TypeScript** for fetching random quotes.
- The project follows a `Layered Architecture` (MVC, Service, Repository).
- Data is managed using `Mongoose.`
- `JSON Web Token (JWT)` is implemented to secure user accounts with token-based authentication.
- The API is documented clearly using `Swagger.`
- `GitHub Actions` is configured to automate releases with `Semantic Release.`

### 1. Installation

- **Clone the repository**

```sh
git clone https://github.com/otegecmis/random-quotes-api.git && cd random-quotes-api
```

- **Generate `.env`**

```sh
npm run env
```

Update the generated `.env` file as needed.

- **Start the project**

| Action                                 | Command                             |
| -------------------------------------- | ----------------------------------- |
| Start in Development Mode              | `npm run dev`                       |
| Build and Start for Production         | `npm run build && npm run start`    |
| Start with Docker                      | `npm run docker`                    |

That's it! 🥳

### 2. Documentation (Swagger)

To access `Swagger` documentation, make sure the `NODE_ENV` in the `.env` file is set to `development`.

<div style="float: left;">
    <img src="assets/swagger.jpeg" style="width: 80%;" />
</div>


