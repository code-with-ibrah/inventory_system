export type ErrorMessage = string | BackendErrors [] | [] | undefined | null

export type Status = 'idle' | 'loading' | 'succeeded' | 'failed'

export type BackendErrors = string

export interface ErrorState {
    status: Status,
    errors?: ErrorMessage,
    message?: string
}

export interface IUpdate {
    id: number,
    data: FormData | any
}


export type User = {
    id: number,
    name: string,
    code: string,
    passwordChanged: boolean,
    email: string,
    roleId: number,
    roleName: string,
    organisation: [],
    isActive: boolean,
}

export interface AuthState {
    authenticated: boolean
    status: Status
    token: string,
    user: User
    error: ErrorMessage
}

export interface Meta {
    last_page: number;
    pageCount?: number;
    current_page: number;
    total: number;
    from: null | number;
    path: string;
    per_page: number,
    to: null | number,
    // links: {
    //     first: string;
    //     last: string;
    //     next: string | null;
    //     prev: string | null;
    // };
    links: any
}

export interface PaginatedData {
    data: any [];
    meta: Meta
}

export type Menu = {
    icon?: string;
    create?: string;
    label: string;
    link: string;
    children?: Menu[]
}

export type StatusType =
    | any
    | "Completed"
    | "Pending"
    | "Cancelled"
    | "In Progress"
    | "Issued";
