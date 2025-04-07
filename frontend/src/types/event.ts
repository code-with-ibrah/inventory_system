import {PaginatedData} from "./common.ts";

export type Event = {
    id: string;
    theme: string;
}

export interface EventType extends PaginatedData {
    data: Event[];
}

export interface EventState {
    events: EventType,
    singleEvent: Event,
    eventFilter: any
}