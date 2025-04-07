import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {createEvent, deleteEvent, getAllEvents, updateEvent} from "./eventActions.ts";
import {EventState, Event} from "../../types/event.ts";

const initialState: EventState = {
    events: {
        data: [],
        meta: {
            pageCount: 0,
            current_page: 0,
            total: 0,
            from: 0,
            links: {
                first: "",
                last: "",
                next: null,
                prev: null
            },
            last_page: 0,
            path: "",
            per_page: 0,
            to: null
        }
    },
    singleEvent: {
        id: "",
        theme: "",
    },
    eventFilter: {
        page: "1",
        pageSize: "10",
    }
}

const eventSlice = createSlice({
    name: "event",
    initialState,
    reducers: {
        setEvent: (state, action: PayloadAction<Event>) => {
            state.singleEvent = action.payload;
        },
        updateEventFilter: (state, action: PayloadAction<any>) => {
            state.eventFilter = { ...state.eventFilter, ...action.payload };
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createEvent.fulfilled, (state, action) => {
            state.events.data.push(action.payload)
        }).addCase(getAllEvents.fulfilled, (state, action) => {
            state.events = action.payload
        }).addCase(updateEvent.fulfilled, (state, action: PayloadAction<Event>) => {
            state.events.data = state.events.data.map((event: Event) => {
                return event.id === action.payload.id ? action.payload : event
            })
        }).addCase(deleteEvent.fulfilled, (state, action: PayloadAction<string>) => {
            state.events.data = state.events.data.filter((event: Event) => event.id !== action.payload)
        })
    }
})

export const { setEvent, updateEventFilter } = eventSlice.actions;

export default eventSlice.reducer
