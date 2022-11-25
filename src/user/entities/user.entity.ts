import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { Rol } from 'src/rol-perm/entities/rol.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  password: string;

  @Column()
  Rol:string

   @ManyToOne(() => Rol, (rol) => rol.users, {cascade:true, nullable: false})
   @JoinTable()
   rol: Rol;
 
}