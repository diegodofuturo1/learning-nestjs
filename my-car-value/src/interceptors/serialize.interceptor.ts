import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { map, Observable } from "rxjs";
import { User } from "src/users/user.entity";

export interface ClassConstructor {
    new (...args: any[]): {}
}

export function Serialize(dto: ClassConstructor) {
    return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor {
    constructor (private readonly dto: ClassConstructor) {}
    
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {  
        const options = { excludeExtraneousValues: true }
        return next.handle().pipe(map((user: User) => 
            plainToClass(this.dto, user, options)
        ));
    }
}