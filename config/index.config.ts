import envSchema from 'env-schema';

const env = envSchema({
  dotenv: true,
  schema: {
    type: 'object',
    required: [
      'PORT',
      'ORIGIN',
      'NODE_ENV',
      'MONGO_URI',
      'ACCESS_TOKEN_SECRET',
      'ACCESS_TOKEN_EXPIRATION',
      'REFRESH_TOKEN_SECRET',
      'REFRESH_TOKEN_EXPIRATION',
    ],
    properties: {
      PORT: {
        type: 'number',
        default: 8000,
      },
      ORIGIN: {
        type: 'string',
        default: '*',
      },
      NODE_ENV: {
        type: 'string',
      },
      MONGO_URI: {
        type: 'string',
      },
      ACCESS_TOKEN_SECRET: {
        type: 'string',
      },
      ACCESS_TOKEN_EXPIRATION: {
        type: 'string',
        default: '1h',
      },
      REFRESH_TOKEN_SECRET: {
        type: 'string',
      },
      REFRESH_TOKEN_EXPIRATION: {
        type: 'string',
        default: '7d',
      },
    },
  },
});

const config = {
  server: {
    port: env.PORT,
    origin: env.ORIGIN,
    node_env: env.NODE_ENV,
  },
  database: {
    uri: env.MONGO_URI,
  },
  token: {
    access: {
      secret: env.ACCESS_TOKEN_SECRET,
      options: {
        expiresIn: env.ACCESS_TOKEN_EXPIRATION,
      },
    },
    refresh: {
      secret: env.REFRESH_TOKEN_SECRET,
      options: {
        expiresIn: env.REFRESH_TOKEN_EXPIRATION,
      },
    },
  },
};

export default config;
