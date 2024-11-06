import envSchema from 'env-schema';

const env = envSchema({
  dotenv: true,
  schema: {
    type: 'object',
    required: ['PORT', 'ORIGIN', 'NODE_ENV'],
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
    },
  },
});

const config = {
  server: {
    port: env.PORT,
    origin: env.ORIGIN,
    node_env: env.NODE_ENV,
  },
};

export default config;
