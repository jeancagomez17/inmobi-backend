import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, JoinTable } from 'typeorm';
import { Rol } from './rol.entity';
@Entity('permissions')
export class Permissions {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name:string;

    // @ManyToMany(()=> Rol, (rol) => rol.perm)
    // @JoinTable()
    // roles:Rol[];

}