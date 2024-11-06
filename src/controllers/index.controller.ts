import { Request, Response } from 'express';

import indexService from '../services/index.service';

class IndexController {
  async welcomePage(req: Request, res: Response): Promise<void> {
    try {
      const result: string = await indexService.welcomePage();

      res.json({
        result: {
          message: result,
        },
      });
    } catch (error) {
      res
        .status(500)
        .json('An error occurred while fetching the welcome message.');
    }
  }
}

export default new IndexController();
