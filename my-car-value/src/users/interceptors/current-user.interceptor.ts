import { Observable } from "rxjs";
import { UsersService } from "../users.service";
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {

    constructor(private readonly service: UsersService) { }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest()
        const id = request.session.user?.id

        if (id) {
            const user = this.service.findOne(id)
            request.currentUser = user
        } else {
            request.currentUser = {}
        }

        return next.handle();
    }
}