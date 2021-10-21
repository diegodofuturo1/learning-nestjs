import { Injectable } from '@nestjs/common'
import { readFile, writeFile } from 'fs/promises'

const path = 'src/messages/messages.database.json'

@Injectable()
export class MessagesRepository {
    async findOne(id: string){
        const contents = await readFile(path, 'utf-8')
        const messages = JSON.parse(contents)

        return messages[id]
    }

    async findAll(){
        const contents = await readFile(path, 'utf-8')
        const messages = JSON.parse(contents)

        return messages
    }

    async create(message: string){
        const contents = await readFile(path, 'utf-8')
        const messages = JSON.parse(contents)

        const id = Math.floor(Math.random() * 999)
        
        messages[id] = { id, content: message }

        await writeFile(path, JSON.stringify(messages))

        return id
    }
}