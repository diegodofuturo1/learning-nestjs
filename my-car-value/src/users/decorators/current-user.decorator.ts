import { createParamDecorator, ExecutionContext } from "@nestjs/common";

const currentUserHandler = (data: any, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()
    return request.currentUser
}

export const CurrentUser = createParamDecorator(currentUserHandler)