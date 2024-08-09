// customRouter.ts
import express, { Request, Response, NextFunction } from 'express';

class CustomRouter {
  private router = express.Router();

  public post(path: string, handler: (req: Request, res: Response, next: NextFunction) => void) {
    this.router.post(path, handler);
  }

  public getRouter() {
    return this.router;
  }
}

export default CustomRouter;