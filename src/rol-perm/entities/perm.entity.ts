import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Rol } from './rol.entity';
@Entity('permissions')
export class Permissions {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name:string;
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
public created_at: Date;

@UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
public updated_at: Date;

    @ManyToMany(()=> Rol, (rol) => rol.perm)
    @JoinTable()
    roles:Rol[];

}