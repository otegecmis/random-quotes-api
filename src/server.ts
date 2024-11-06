import app from './app';
import config from './config/index.config';
import logger from './helpers/logger.helper';

const port: number = config.server.port;

async function start(): Promise<void> {
  try {
    app.listen(port, () => {
      logger.info(`Server is running at ${port}.`);
    });
  } catch (err) {
    logger.error(err);
  }
}

start();
