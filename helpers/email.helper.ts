import createError from 'http-errors';
import nodemailer from 'nodemailer';

import logger from "../helpers/logger.helper"
import config from '../config/index.config';

class EMail {
  private transporter = nodemailer.createTransport({
    host: config.email.host,
    port: config.email.port,
    secure: config.email.secure,
    auth: {
      user: config.email.auth.user,
      pass: config.email.auth.pass,
    },
  });

  async sendEMail(
    to: string,
    subject: string,
    text: string,
  ): Promise<{ message: string }> {
    try {
      await this.transporter.sendMail({
        from: config.email.auth.user,
        to,
        subject,
        text,
      });

      return {
        message: 'Email sent successfully.',
      };
    } catch (error: any) {
      logger.error(error.message);

      throw createError(500, 'Email could not be sent.');
    }
  }
}

export default new EMail();
