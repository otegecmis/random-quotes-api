import mongoose from 'mongoose';

import config from '../config/index.config';
import logger from '../helpers/logger.helper';

class MongoDB {
  async connect(): Promise<void> {
    try {
      const uri: string = config.database.uri;
      await mongoose.connect(uri);

      logger.info('MongoDB connection successful.');
    } catch (err) {
      logger.error(err);
      throw new Error('Could not connect to MongoDB.');
    }
  }

  async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      logger.info('MongoDB disconnection successful.');
    } catch (err) {
      logger.error(err);
      throw new Error('Could not disconnect from MongoDB.');
    }
  }
}

export default new MongoDB();
