import { EntitySchema } from 'typeorm';
import { User } from '../entities/user.entity';

export const UserSchema = new EntitySchema<User>({
  name: 'User',
  target: User,
  tableName: 'users',
  columns: {
    id: {
      type: Number,
      primary: true,
      unique: true,
      generated: true,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  }
});
