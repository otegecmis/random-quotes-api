import { NextFunction, Request, Response } from 'express';

import usersService from '../services/users.service';

import {
  updateEmailValidationSchema,
  updatePasswordValidationSchema,
  updateRoleValidationSchema,
} from '../validations/users.validation';

class UsersController {
  async updatePassword(
    req: Request,
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
      const authID = req.params.userID;

      const result = usersService.updatePassword(id, oldPassword, newPassword);

      res.status(200).json({
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateEmail(
    req: Request,
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
      const authID = req.params.userID;

      const result = usersService.updateEmail(id, oldEmail, newEmail);

      res.status(200).json({
        result,
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

      const result = usersService.updateRole(id, role);

      res.status(200).json({
        result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UsersController();
