import createError from 'http-errors';
import nodemailer from 'nodemailer';

import config from '../config/index.config';

class Mail {
  private transporter = nodemailer.createTransport({
    host: config.mail.host,
    port: config.mail.port,
    secure: config.mail.secure,
    auth: {
      user: config.mail.auth.user,
      pass: config.mail.auth.pass,
    },
  });

  async sendMail(to: string, subject: string, text: string): Promise<{ message: string }> {
    try {
      await this.transporter.sendMail({
        from: config.mail.auth.user,
        to,
        subject,
        text,
      });

      return {
        message: 'Email sent successfully.',
      }
    } catch (error: any) {
      throw createError(500, error.message);
    }
  }
}

export default new Mail();
