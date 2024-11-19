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
      'SMTP_USER',
      'SMTP_PASS',
      'ACCESS_TOKEN_SECRET',
      'ACCESS_TOKEN_EXPIRATION',
      'REFRESH_TOKEN_SECRET',
      'REFRESH_TOKEN_EXPIRATION',
      'PASSWORD_RESET_SECRET',
      'PASSWORD_RESET_EXPIRATION',
    ],
    properties: {
      PORT: {
        type: 'number',
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
      SMTP_USER: {
        type: 'string',
      },
      SMTP_PASS: {
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
      PASSWORD_RESET_SECRET: {
        type: 'string',
      },
      PASSWORD_RESET_EXPIRATION: {
        type: 'string',
        default: '15m',
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
    passwordReset: {
      secret: env.PASSWORD_RESET_SECRET,
      options: {
        expiresIn: env.PASSWORD_RESET_EXPIRATION,
      },
    },
  },
  email: {
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: parseInt('465', 10),
    secure: true,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
  },
};

export default config;
