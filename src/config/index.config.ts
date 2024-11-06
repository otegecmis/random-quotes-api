import envSchema from 'env-schema';

const env = envSchema({
  dotenv: true,
  schema: {
    type: 'object',
    required: ['PORT', 'ORIGIN', 'NODE_ENV', 'MONGO_URI'],
    properties: {
      PORT: {
        type: 'number',
      },
      ORIGIN: {
        type: 'string',
      },
      NODE_ENV: {
        type: 'string',
      },
      MONGO_URI: {
        type: 'string',
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
};

export default config;
