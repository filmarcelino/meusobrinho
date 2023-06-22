import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ElderlyUserProfileInterface {
  id?: string;
  first_name: string;
  last_name: string;
  age: number;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface ElderlyUserProfileGetQueryInterface extends GetQueryInterface {
  id?: string;
  first_name?: string;
  last_name?: string;
  user_id?: string;
}
