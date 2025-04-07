import {PaginatedData} from "./common.ts";

export type Class = {
    id: number;
    name: string;
    societyId: number;
    assistantClassLeaderId: number;
    classLeaderId: number;
    _count: {
        members: number;
    }
    classLeader: {
        firstName: string;
        lastName: string;
        phoneNumber: string;
        email: string;
    };
    assistantClassLeader: {
        firstName: string;
        lastName: string;
        phoneNumber: string;
        email: string;
    };
}

export interface ClassType extends PaginatedData {
    data: Class[];
}

export interface ClassState {
    classes: ClassType,
    class: Class
}
