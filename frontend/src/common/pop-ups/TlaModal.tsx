import {useNavigate} from 'react-router-dom'
import PopUps from './index'
import {Spin} from 'antd'
import {MdClose} from 'react-icons/md'
import {useDispatch} from "react-redux";
import type {AppDispatch} from "../../state/store.ts";
import {useEffect} from "react";
import {resetState} from "../../state/errorSlice.ts";

interface Props {
    width?: number | string
    type?: string
    children?: any
    title?: string
    loading?: boolean
    allowClose?: boolean
    modalAction?: never
}

export const TlaModal = ({ title = '', children, width = 520, loading = false, allowClose = true }: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(resetState())
    }, [dispatch]);


    return (
        <PopUps>
            <div className="tla-modal">
                <div className="ant-modal-mask" style={{ pointerEvents: 'none' }}></div>
                <div className="ant-modal-wrap flex items-center justify-center"
                     aria-labelledby="rc_unique_0">
                    <div role="dialog" aria-modal="true"
                         style={{ pointerEvents: 'none', width, transformOrigin: '-208px 142px', maxHeight: '100vh', borderRadius: 'px' }}>
                        <div className="ant-modal-content tla-modal-content bg-primary-25">

                            <div className={'flex items-center justify-between'}>
                                <div className="ant-modal-header tla-modal-header bg-primary-25">
                                    <div className="font-medium text-xl" id="rc_unique_0">{title}</div>
                                </div>
                                {
                                    allowClose &&
                                    <div onClick={() => { navigate(-1) }}
                                         aria-label="Close"
                                         className="cursor-pointer bg-gray-100 p-2.5 rounded-full">
                                      <MdClose className={'text-gray-600'}/>
                                    </div>
                                }
                            </div>

                            <div className="ant-modal-body">
                                <Spin spinning={loading} tip={'Please Wait...'}>
                                    {children}
                                </Spin>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PopUps>
    )
}
