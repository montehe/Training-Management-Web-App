import { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const hasRole =
  (...roles: string[]) =>
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userId = req?.user?.id;
    console.log("user: ", req.user);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!roles.includes(req?.user?.role)) {
      return res.status(403).json({ message: "Forbidden: Admins only" });
    }

    next();
  };
