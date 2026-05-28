import type { Request, Response, NextFunction } from 'express';

export const roleMiddleware = (allowedRoles: string[]) => {
	return (req: Request, res: Response, next: NextFunction) => {
		// Minimal role check stub: allow everything in dev
		// Real implementation should check `(req as any).user.role`
		next();
	};
};

export default roleMiddleware;
