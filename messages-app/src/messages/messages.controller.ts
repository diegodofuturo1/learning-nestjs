import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service'

@Controller('messages')
export class MessagesController {

    constructor(
        private readonly service: MessagesService
    ) {}

    @Get()
    listMessages() {
        return this.service.findAll()
    }

    @Post()
    createMessage(@Body() body: CreateMessageDto) {
        return this.service.create(body.content)
    }

    @Get('/:id')
    async fetchMessage(@Param('id') id: string) {
        const message = await this.service.findOne(id)

        console.log(message)

        if (!message)
         throw new NotFoundException("MessageNotFoundException")

         return message
    }
}
