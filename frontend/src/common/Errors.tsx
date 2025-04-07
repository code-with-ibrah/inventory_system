import { useEffect } from "react";
import { TlaError, TlaSuccess } from "../utils/messages.ts";
import { getErrors } from "../utils";
import { useAppSelector } from "../hooks";


const Errors = () => {
    const slice = useAppSelector((state) => state.errors)

    useEffect(() => {
        if (slice.status === 'failed') {
            TlaError(getErrors(slice.errors));
        }

        if (slice.status === 'succeeded') {
            TlaSuccess(slice.message);
        }
    }, [slice]);

    return (
        <></>
    )
}

export default Errors