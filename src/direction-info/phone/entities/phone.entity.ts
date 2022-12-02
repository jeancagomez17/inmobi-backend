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

    @ManyToOne(()=> Owner, (owner)=> owner.phone, { cascade: true, nullable: false })
    owner:Owner

}