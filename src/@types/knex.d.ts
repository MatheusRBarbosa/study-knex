import { Knex } from "knex";

declare module "knex/types/tables" {
  interface User {
    id: number;
    name: string;

    profile: Profile;
    objects: Object[];
  }

  interface Profile {
    id: number;
    name: string;
    user_id: number;

    user: User;
  }

  interface Object {
    id: number;
    name: string;

    users: User[];
  }

  interface UserObject {
    id: number;
    user_id: number;
    object_id: number;

    user: User;
    objects: Object;
  }

  interface Tables {
    users: User;
    profiles: Profile;
    objects: Object;
    user_objects: UserObject;
  }
}
