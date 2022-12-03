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
import { Owner } from 'src/owner/entities/owner.entity';
@Entity()  
export class Phone{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    number_phone:number
    
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

    @ManyToOne(()=> Owner, (owner)=> owner.phone, { cascade: true, nullable: false })
    owner:Owner

}