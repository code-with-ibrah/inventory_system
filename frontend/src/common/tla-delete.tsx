import type { AsyncThunk } from "@reduxjs/toolkit";
import { unwrapResult } from "@reduxjs/toolkit";
import { resetState, updateState } from "../state/errorSlice.ts";
import { useAppDispatch } from "../hooks";
import TlaConfirm from "./tla-confirm.tsx";

interface Props {
    callBack: AsyncThunk<any, any, any>
    column?: number | string
    title?: string,
    btnName?: string,
    confirmPurpose?: string,
    query?: string
}

const TlaDelete = ({ callBack, query, column, title, btnName = "Delete", confirmPurpose = "delete" }: Props) => {
    const dispatch = useAppDispatch();

    return (
        <TlaConfirm
            title={'Confirm Delete'}
            fullText={`Do you really want to ${confirmPurpose} this ${title}?`}
            callBack={() => {
                dispatch(callBack(query ? query : column))
                    .then(unwrapResult)
                    .then(() => {
                        dispatch(updateState({
                            status: "succeeded",
                            message: `${title} Deleted Successfully`
                        }))
                    })
                    .catch((obj: any) => {
                        dispatch(updateState({
                            status: "failed",
                            errors: obj.errors
                        }))
                    }).finally(() => dispatch(resetState()))
            }}>
            {btnName}
        </TlaConfirm>
    )
}

export default TlaDelete
