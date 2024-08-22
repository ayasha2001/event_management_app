import React from 'react'

const Modal = ({isOpen, children}:any) => {
    if( !isOpen) return <></>;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        {children}
    </div>
  )
}

export default Modal