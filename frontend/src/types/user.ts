import {PaginatedData, User} from "./common.ts";

export interface UserType extends PaginatedData {
    data: User[];
    links: any
}


export interface UserState {
    users: UserType,
    userItem: User
}
