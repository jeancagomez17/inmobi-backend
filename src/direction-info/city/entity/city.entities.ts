import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Department } from '../../department/entity/department.entities';
import { Owner } from 'src/owner/entities/owner.entity';

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name_city: string;

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
  @ManyToOne(()=> Department, (department)=> department.city, { cascade: true, nullable: false })
    @JoinTable()
    department:Department

    @OneToMany(()=> Owner, (owner)=> owner.city)
    owner: Owner[]
}
