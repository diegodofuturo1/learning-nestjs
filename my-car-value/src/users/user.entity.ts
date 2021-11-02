import { Exclude } from "class-transformer";
import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn() id: number;
    
    @Column() email: string
    
    @Column() password: string

    @AfterInsert()
    logInsert() {
        console.log(`[User][${Date.now()}] Usuário inserido com o id: ${this.id}`)
    } 
    
    @AfterUpdate()
    logUpdate() {
        console.log(`[User][${Date.now()}] Usuário atualizado com o id: ${this.id}`)
    }
    
    @AfterRemove()
    logRemove() {
        console.log(`[User][${Date.now()}] Usuário deletado com o id: ${this.id}`)
    }
}