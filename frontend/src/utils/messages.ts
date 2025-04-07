import { notification } from 'antd'
import { ErrorMessage } from "../types/common.ts";

/**
 *
 * @param msg
 * @constructor
 */
export const TlaSuccess = (msg: string | null = null) => (
    notification.success({
        message: 'Success',
        description: msg,
        placement: 'top',
        // duration: 0.5
    })
)

/**
 *
 * @param msg
 * @constructor
 */
export const TlaWarning = (msg = null) => (
    notification.warning({
        message: 'Warning',
        description: msg,
        placement: 'top'
    })
)

/**
 *
 * @param msg
 * @constructor
 */
export const TlaError = (msg: ErrorMessage) => (
    notification.warning({
        message: 'Error',
        description: msg,
        placement: 'top'
    })
)
