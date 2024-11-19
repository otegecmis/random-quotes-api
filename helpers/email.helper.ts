import createError from 'http-errors';
import nodemailer from 'nodemailer';

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
      throw createError(500, error.message);
    }
  }
}

export default new EMail();
