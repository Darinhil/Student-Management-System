import type { Request, Response, NextFunction } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	// Minimal auth stub: attach a dummy user or skip authentication in dev
	// Real implementation should validate tokens/session
	(req as any).user = (req as any).user || null;
	next();
};

export default authMiddleware;
