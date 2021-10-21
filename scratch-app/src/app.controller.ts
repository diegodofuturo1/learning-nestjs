import { Controller, Get } from "@nestjs/common";

@Controller('/api')
export default class AppController {

    @Get('/get') 
    getRootRoute() {
        return 'hello world'
    } 
}