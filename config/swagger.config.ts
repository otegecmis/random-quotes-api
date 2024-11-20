import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';
import packageJSON from '../package.json';

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: packageJSON.name,
      description: packageJSON.description,
      version: packageJSON.version,
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./routes/*.ts'],
});

const theme = new SwaggerTheme();
const options = {
  explorer: false,
  customCss: theme.getBuffer(SwaggerThemeNameEnum.FLATTOP),
};

export const serve = swaggerUI.serve;
export const setup = swaggerUI.setup(swaggerSpec, options);
