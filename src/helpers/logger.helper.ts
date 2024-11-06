class Logger {
  info(message: string) {
    console.log(`[INFO]: ${message}`);
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
