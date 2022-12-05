import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { City } from 'src/direction-info/city/entity/city.entities';
import { Customer } from 'src/customer/entities/customer.entity';
import { State } from '../state/entites/state.entity';

export enum type_contrat {
  rental = 'rental',
  purchase = 'purchase',
}

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  description_prop: string;
  @Column()
  address_prop: string;
  @Column()
  startum_prop: number;
  @Column()
  price_prop: number;
  @Column()
  old_property_prop: number;
  @Column({
    type: 'enum',
    enum: type_contrat,
    default: type_contrat.rental,
  })
  type_contract_prop: type_contrat;

  @ManyToOne(() => State, (state) => state.property, {
    cascade: true,
    nullable: false,
  })
  @JoinTable()
  state: State;

  @ManyToOne(() => City, (city) => city.property, {
    cascade: true,
    nullable: false,
  })
  @JoinTable()
  city: City;

  @ManyToOne(() => Customer, (customer) => customer.property, {
    cascade: true,
    nullable: false,
  })
  customer: Customer;

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
}
