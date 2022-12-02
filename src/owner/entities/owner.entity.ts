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

import { City } from 'src/direction-info/city/entity/city.entities';
import { Phone } from 'src/direction-info/phone/entities/phone.entity';
@Entity()
export class Owner {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    identity:string

    @Column()
    name:string

    @Column()
    last_name:string

    @Column()
    email:string

    @Column()
    address:string

    @ManyToOne(()=> City, (city)=> city.owner, { cascade: true, nullable: false })
    @JoinTable()
    city:City

    @OneToMany(()=> Phone, (phone)=> phone.owner)
    phone:Phone[]

}
