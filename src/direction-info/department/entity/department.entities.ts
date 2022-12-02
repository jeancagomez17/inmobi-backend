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
  import { Country } from 'src/direction-info/country/entities/country.entity';
  import { City } from '../../city/entity/city.entities';

  @Entity()
  export class Department{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    name_department:string
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

    @ManyToOne(()=> Country, (country)=> country.departments, { cascade: true, nullable: false })
    @JoinTable()
    country:Country

    @OneToMany(()=> City, (city)=> city.department)
    city: City[]

  }