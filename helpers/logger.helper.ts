import config from '../config/index.config';

class Logger {
  info(message: string) {
    if (config.server.node_env == 'development') {
      console.log(`[INFO]: ${message}`);
    }
  }

  error(error: any, message?: string) {
    if (message) {
      console.error(`[ERROR]: ${message}`, error);
    } else {
      console.error(`[ERROR]:`, error);
    }
  }
}

export default new Logger();
