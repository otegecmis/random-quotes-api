import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';

import usersService from '../services/users.service';

import { AuthRequest } from '../middleware/auth-check.middleware'; 
import {
  updateEmailValidationSchema,
  updatePasswordValidationSchema,
  updateRoleValidationSchema,
} from '../validations/users.validation';

class UsersController {
  async updatePassword(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { error } = updatePasswordValidationSchema.validate({
        ...req.params,
        ...req.body,
      });

      if (error) {
        res.status(400).json({
          result: {
            message: error.details[0].message,
          },
        });

        return;
      }

      const { oldPassword, newPassword } = req.body;
      const { id } = req.params;
      const authID = req.payload.aud
      
      if (id !== authID) {
        return next(createError.Unauthorized());
      }

      const result = await usersService.updatePassword(id, oldPassword, newPassword);

      res.status(200).json({
        result: {
            message: result.message
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async updateEmail(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { error } = updateEmailValidationSchema.validate({
        ...req.params,
        ...req.body,
      });

      if (error) {
        res.status(400).json({
          result: {
            message: error.details[0].message,
          },
        });

        return;
      }

      const { oldEmail, newEmail } = req.body;
      const { id } = req.params;
      const authID = req.payload.aud
      
      if (id !== authID) {
        return next(createError.Unauthorized());
      }

      const result = await usersService.updateEmail(id, oldEmail, newEmail);

      res.status(200).json({
        result: {
            message: result.message
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async updateRole(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { error } = updateRoleValidationSchema.validate({
        ...req.params,
        ...req.body,
      });

      if (error) {
        res.status(400).json({
          result: {
            message: error.details[0].message,
          },
        });

        return;
      }

      const { role } = req.body;
      const { id } = req.params;

      const result = await usersService.updateRole(id, role);

      res.status(200).json({
        result: {
            message: result.message
        }
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UsersController();