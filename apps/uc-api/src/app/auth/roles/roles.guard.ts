import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "./role.enum";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requireRole = this.reflector.getAllAndOverride<Role>('role', [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requireRole)
            return true;

        const { user } = context.switchToHttp().getRequest();

        return requireRole === user?.role;
    }
}