import type { AsyncThunk } from "@reduxjs/toolkit";
import { unwrapResult } from "@reduxjs/toolkit";
import { resetState, updateState } from "../state/errorSlice.ts";
import { useAppDispatch } from "../hooks";
import TlaConfirm from "./tla-confirm.tsx";

interface Props {
    callBack: AsyncThunk<any, any, any>
    column: number | string | any
    title?: string,
    text?: string,
    message?: string,
}

const TlaToggleActive = ({ callBack, column, title, text,
                             message = `Do you want to change the active status for this ${title}?`
}: Props) => {
    const dispatch = useAppDispatch()

    return (
        <TlaConfirm
            okText={'Confirm'}
            showIcon={false}
            title={'Confirmation'}
            fullText={message}
            callBack={() => {
                dispatch(callBack(column))
                    .then(unwrapResult)
                    .then(() => {
                        dispatch(updateState({
                            status: "succeeded",
                            message: `${title} updated Successfully`
                        }))
                    })
                    .catch((obj) => {
                        dispatch(updateState({
                            status: "failed",
                            errors: obj.errors
                        }))
                    }).finally(() => dispatch(resetState()))
            }}>
            {text ? text : "Toggle Active"}
        </TlaConfirm>
    )
}

export default TlaToggleActive
