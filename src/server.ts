import app from './app';
import config from './config/index.config';

const port: number = config.server.port;

async function start(): Promise<void> {
  try {
    app.listen(port, () => {
      console.log(`Server is running at ${port}.`);
    });
  } catch (err) {
    console.error(err);
  }
}

start();
