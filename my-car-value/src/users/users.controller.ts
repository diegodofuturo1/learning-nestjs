import { User } from './user.entity';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { Body, Controller, Post, Get, Patch, Param, Query, Delete, Session, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('user')
@Serialize(UserDto)
export class UsersController {

    constructor(
        private readonly service: UsersService,
        private readonly auth: AuthService
    ) {}

    @Get('/whoami')
    @UseGuards(AuthGuard)
    async whoami(@CurrentUser() user: User) {
        return user
    }

    @Post('/signup')
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.auth.signup(body.email, body.password) 
        session.user = user
        return user
    }

    @Post('/signin')
    async signin(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.auth.signin(body.email, body.password) 
        session.user = user
        return user
    }

    @Post('/signout')
    async signout(@Session() session: any) {
        session.user = null
    }

    @Get('/:id')
    async findUser(@Param('id') id: string) {
        return await this.service.findOne(parseInt(id))
    }
    
    @Get()
    async findAllUsers(@Query('email') email: string) {
        return await this.service.find(email)
    }

    @Patch('/:id')
    async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.service.update(parseInt(id), body)
    }

    @Delete('/:id')
    async removeUser(@Param('id') id: string) {
        return await this.service.remove(parseInt(id))
    }
} 
