import createError from 'http-errors';
import jsonwebtoken from 'jsonwebtoken';

import config from '../config/index.config';
import logger from '../helpers/logger.helper';

class TokenService {
  async createAccessToken(userID: string): Promise<string> {
    try {
      const secret = config.token.access.secret;
      const options = {
        expiresIn: config.token.access.options.expiresIn,
        issuer: 'otegecmis.github.io',
        audience: String(userID),
      };

      return jsonwebtoken.sign({}, secret, options);
    } catch (error) {
      logger.error(error);
      throw createError.InternalServerError('Unable to create access token.');
    }
  }

  async createRefreshToken(userID: string): Promise<string> {
    try {
      const secret = config.token.refresh.secret;
      const options = {
        expiresIn: config.token.refresh.options.expiresIn,
        issuer: 'otegecmis.github.io',
        audience: String(userID),
      };

      return jsonwebtoken.sign({}, secret, options);
    } catch (error) {
      logger.error(error);
      throw createError.InternalServerError('Unable to create refresh token.');
    }
  }

  async verifyAccessToken(accessToken: string): Promise<object> {
    try {
      return jsonwebtoken.verify(accessToken, config.token.access.secret);
    } catch (error) {
      throw createError.Unauthorized('Please sign in again.');
    }
  }

  async verifyRefreshToken(refreshToken: string): Promise<string> {
    try {
      const secret = config.token.refresh.secret;
      const payload = jsonwebtoken.verify(refreshToken, secret) as {
        aud: string;
      };
      const userID = payload.aud;

      return userID;
    } catch (error) {
      throw createError.Unauthorized('Please sign in again.');
    }
  }

  async createResetPasswordToken(userID: string): Promise<string> {
    try {
      const secret = config.token.passwordReset.secret;
      const options = {
        expiresIn: config.token.passwordReset.options.expiresIn,
        issuer: 'otegecmis.github.io',
        audience: String(userID),
      };

      return jsonwebtoken.sign({}, secret, options);
    } catch (error) {
      throw createError.InternalServerError(
        'Something went wrong while creating the reset password token.',
      );
    }
  }

  async verifyResetPasswordToken(resetCode: string): Promise<string> {
    try {
      const secret = config.token.passwordReset.secret;
      const payload = jsonwebtoken.verify(resetCode, secret) as {
        aud: string;
      };
      const userID = payload.aud;

      return userID;
    } catch (error) {
      throw createError.Unauthorized('Ops! Something went wrong.');
    }
  }
}

export default new TokenService();
