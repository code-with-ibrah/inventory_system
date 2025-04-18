import { Modal } from 'antd'
import { useEffect } from 'react'
import { FiTrash2 } from 'react-icons/fi'

interface Props {
  title?: string,
  fullText?: string,
  children?: any,
  callBack?: () => void,
  showIcon?: boolean,
  okText?: string,
  cancelText?: string,
  okClass?: string,
  danger?: boolean,
  close?: boolean
}

const TlaConfirm = (props : Props) => {

  const { title = '', callBack, children, showIcon = true, okText = "Delete", fullText = 'Do you want to delete', cancelText = 'No, keep it', close = false, danger = true, okClass = "confirm-delete-btn" } = props

  useEffect(() => {
    if (close) {
      Modal.destroyAll()
    }
  }, [close])
  const confirm = () => {
    Modal.confirm({
      title,
      icon: <></>,
      content: fullText,
      okText,
      cancelText,
      className: 'tla-delete-confirm',
      okButtonProps: {
        className: `btn btn-red ${okClass}`,
        danger,
        size: 'large',
        block: true
      },
      cancelButtonProps: {
        className: 'btn tla-delete-cancel',
        style: { color: "blue"},
        size: 'large',
        block: true
      },
      onOk: callBack
    })
  }
  return (
      <div className={'flex items-center gap-x-2 cursor-pointer'}
              onClick={confirm}>
        {showIcon && <FiTrash2 title={'Delete'}/>}
        {children}
      </div>

  )
}

export default TlaConfirm
