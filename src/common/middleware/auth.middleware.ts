import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        if (req.path === '/auth/login') {
            return next(); // Permite la ruta sin autenticación
        }

        // Aquí verificas autenticación, por ejemplo, con un token en los headers
        if (!req.headers.authorization) {
            return res.status(401).json({ message: 'Requiere token para el accesos a los servicios' });
        }

        next();
    }
}
