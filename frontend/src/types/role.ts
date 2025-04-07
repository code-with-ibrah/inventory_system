import {PaginatedData} from "./common.ts";

export type Role = {
    id: number,
    name: string,
    isActive: boolean,
}

export interface RoleType extends PaginatedData {
    data: Role[];
    links: any
}

export interface RolesState {
    role: RoleType,
    roleItem: Role
}
