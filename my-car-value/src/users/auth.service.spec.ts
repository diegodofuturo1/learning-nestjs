import { Test } from "@nestjs/testing"
import { AuthService } from "./auth.service"
import { UsersService } from "./users.service"

it('criando uma instância do serviço auth', async () => {
    const fakeUserService = {
        find: () => Promise.resolve([]),
        create: (email: string, password: string) => Promise.resolve({ id: 1, email, password })
    }

    const metadata = { 
        providers: [AuthService, { provide: UsersService, useValue: fakeUserService }] 
    }
    const module = await Test.createTestingModule(metadata).compile()

    const service = module.get(AuthService)

    expect(service).toBeDefined()
})