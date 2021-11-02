import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { randomBytes, scrypt } from "crypto";
import { promisify } from "util";
import { UsersService } from "./users.service";

const encrypt = async (password: string, salt?: string)  => {
    const encoding = 'hex'
    const encrypter = promisify(scrypt)
    salt = salt ?? randomBytes(8).toString(encoding)
    const response = await encrypter(password, salt, 32)
    const buffer = response as Buffer
    const hash = buffer.toString(encoding)
    const encriptedPassword = `${salt}.${hash}`

    return {
        encoding,
        salt,
        hash,
        password,
        encriptedPassword
    }
}

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService) {}

    async signup(email: string, password: string) {
        const users = await this.userService.find(email)

        if (users.length)
            throw new BadRequestException('email já cadastrado')
        
        const encripted = await encrypt(password)
        
        return await this.userService.create(email, encripted.encriptedPassword)
    }
    
    async signin(email: string, password: string) {
        const [ user ] = await this.userService.find(email)

        if (!user)
            throw new NotFoundException('usuário não encontrado')

        const [ salt, hash ] = user.password.split('.')
        
        const encrypted = await encrypt(password, salt)
        
        if (encrypted.hash != hash)
            throw new  BadRequestException('senha incorreta')

        return user
    }
}