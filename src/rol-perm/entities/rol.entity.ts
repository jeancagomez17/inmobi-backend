import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Permissions } from './perm.entity';
Permissions;
@Entity('rol')
export class Rol {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;

  @ManyToMany(() => Permissions, (perm) => perm.roles)
  perm: Permissions[];

  @OneToMany((type) => User, (user) => user.rol) users: User[];
}
