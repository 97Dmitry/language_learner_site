import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { Reflector } from "@nestjs/core";
import { PERMISSION_KEY } from "./permission-auth.decorator";

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSION_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      if (!requiredPermissions) {
        return true;
      }
      const authHeader = request.headers.authorization;
      const bearer = authHeader.split(" ")[0];
      const token = authHeader.split(" ")[1];

      if (bearer !== "Bearer" && !token) {
        throw new UnauthorizedException({ message: "You're not authorized" });
      }
      const user = this.jwtService.verify(token);
      request.user = user;
      return user.permissions.some((permission) =>
        requiredPermissions.includes(permission.permission)
      );
    } catch (e) {
      throw new HttpException("You're not authorized", HttpStatus.FORBIDDEN);
    }
  }
}
