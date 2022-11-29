import { EntitySchema } from 'typeorm';
import { Rol } from '../entities/rol.entity';

export const RolSchema = new EntitySchema<any>({
    name: 'Rol',
    target:Rol,
    tableName:'rol',
    columns:{
        id: {
            type: Number,
            primary: true,
            unique: true,
            generated: true,
          },
          name: {
            type: String,
          },
    },
    relations:{
        users:{
            type: 'one-to-many',
            target: 'users',
            cascade: true,
            inverseSide: 'Rol'
        },
        perm:{
            type: 'many-to-many',
            target: 'permissions',
            cascade: true,
            inverseSide: 'Rol'
        }
    }
})