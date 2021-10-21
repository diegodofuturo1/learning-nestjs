import { Injectable } from '@nestjs/common'
import { MessagesRepository } from './messages.repository'

@Injectable()
export class MessagesService {
    
    constructor(
        public readonly repository: MessagesRepository
    ) {}

    async findOne(id: string){
        return this.repository.findOne(id)
    }

    async findAll(){
        return this.repository.findAll()
    }

    async create(message: string){
        return this.repository.create(message)
    }
}