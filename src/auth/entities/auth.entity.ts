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
export class Auth {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  password: string;
//   @Column('uuid')
//   id_rol: string;

  @ManyToOne(() => Rol, (rol) => rol.id)
  rol: Rol;
}
