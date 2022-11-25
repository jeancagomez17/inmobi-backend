import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, JoinTable, OneToMany } from 'typeorm';
import { Permissions } from './perm.entity';
Permissions
@Entity('rol')
export class Rol{
    @PrimaryGeneratedColumn()
     id: string;
     @Column()
     name:string;

    //  @ManyToMany(() => Permissions, (perm) => perm.roles)
    //  perm:Permissions[]

     @OneToMany(type => User, user => user.rol) users: User[]; 
}