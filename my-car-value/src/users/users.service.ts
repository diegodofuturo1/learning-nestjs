import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    
    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>
    ) {}

    async create(email: string, password: string) {
        const newUser = this.repository.create({ email, password }) 
        return await this.repository.save(newUser)
    }

    async findOne(id: number) {
        const user = await this.repository.findOne({ id })

        if (!user)
            throw new NotFoundException('usuário não encontrado')

        return user
    }

    async find(email: string) {
        return await this.repository.find({ email })
    }

    async update(id: number, newAttributes: Partial<User>) {
        const _user = await this.findOne(id)

        if (!_user)
            throw new NotFoundException('usuário não encontrado')

        const user = { ..._user, ...newAttributes }
        return await this.repository.save(user)
    }
    
    async remove(id: number) {
        const user = await this.findOne(id)

        if (!user)
            throw new NotFoundException('usuário não encontrado')

        return await this.repository.remove(user)
    }
}
