import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {createClass, deleteClass, getAllClasses, getSingleClass, updateClass} from "./classesActions";
import {ClassState, Class} from "../../types/class.ts";

const initialState: ClassState = {
    classes: {
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
    class: {
        id: 0,
        name: "",
        societyId: 0,
        assistantClassLeaderId: 0,
        classLeaderId: 0,
        classLeader: {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            email: ""
        },
        assistantClassLeader: {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            email: ""
        },
        _count: {
            members: 0
        }
    }
};

const classesSlice = createSlice({
    name: "classes",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createClass.fulfilled, (state, action) => {
            state.classes.data.push(action.payload)
        }).addCase(getAllClasses.fulfilled, (state, action) => {
            state.classes = action.payload
        }).addCase(getSingleClass.fulfilled, (state, action:  PayloadAction<Class>) => {
            state.class = action.payload
        }).addCase(updateClass.fulfilled, (state, action: PayloadAction<Class>) => {
            state.classes.data = state.classes.data.map((_class: Class) => {
                return _class.id === action.payload.id ? action.payload : _class
            })
        }).addCase(deleteClass.fulfilled, (state, action: PayloadAction<number>) => {
            state.classes.data = state.classes.data.filter((_class: Class) => _class.id !== action.payload)
        })
    }
})

export default classesSlice.reducer
