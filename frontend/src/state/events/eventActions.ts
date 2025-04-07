import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.ts";
import { IUpdate } from "../../types/common.ts";

export const deleteEvent = createAsyncThunk(
    "event/deleteEvent", async (eventId: string, {rejectWithValue}) => {
        try {
            await api().delete(`/events/${eventId}`)

            return eventId

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const createEvent = createAsyncThunk(
    "auth/createEvent", async (data: any, {rejectWithValue}) => {
        try {
            const res = await api('multipart/form-data').post('/events', data)

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const updateEvent = createAsyncThunk(
    "auth/updateEvent", async (data: IUpdate, {rejectWithValue}) => {
        try {
            const res = await api().patch(`/events/${data.id}`, data.data)

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)

export const getAllEvents = createAsyncThunk("event/getAllEvents", async (params: URLSearchParams, {rejectWithValue}) => {
        try {
            const res = await api().get(`/events?${params}`)

            return res.data.data

        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            throw rejectWithValue(err.response.data)
        }
    }
)
