import {PaginatedData} from "./common.ts";

export type Organisation = {
    id: number,
    name: string,
    organisationUserCode: string,
    image: string,
    thumbnail: string,
}

export interface OrganisationType extends PaginatedData {
    data: Organisation[];
    links: any
}

export interface OrganisationsState {
    organisation: OrganisationType,
    organisationItem: Organisation
}
