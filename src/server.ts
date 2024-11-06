import app from './app';
import config from './config/index.config';

const port = config.server.port;

async function start() {
  try {
    app.listen(port, () => {
      console.log(`Server is running at ${port}.`);
    });
  } catch (err) {
    console.error(err);
  }
}

start();
