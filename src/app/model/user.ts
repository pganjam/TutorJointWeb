import { Role } from "./role";

export class User {
    id?: string;
    username?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    roles?: Role[] | undefined;
    accessToken?: string;
}