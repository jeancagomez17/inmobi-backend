import { EntitySchema } from 'typeorm';
import { Permissions } from '../entities/perm.entity';

export  const PermSchema = new EntitySchema<Permissions>({
    name: 'Permissions',
    target:Permissions,
    tableName: 'Permissions',
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
        }, relations:{
            roles:{
                type: 'many-to-many',
                target: 'rol',
                cascade: true,
                inverseSide: 'Perm'
            }
        }
})