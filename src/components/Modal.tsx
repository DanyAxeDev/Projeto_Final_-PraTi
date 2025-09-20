import { useRef, useEffect, type ReactNode } from "react"

type ModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
  children: ReactNode;
  title?: string;
}

function Modal({ isModalOpen, closeModal, children, title }: ModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (isModalOpen) {
      modalRef.current?.showModal()
    } else {
      modalRef.current?.close()
    }
  }, [isModalOpen])

  return (
    <dialog 
    ref={modalRef} 
    onCancel={closeModal}
    className={`${isModalOpen ? "" : "hidden"} m-auto py-6 px-4 rounded-sm max-w-[90vw] flex flex-col items-center gap-4 text-center font-medium font-raleway animate-in fade-in-90 zoom-in-95 sm:p-6 sm:max-w-[500px]`}
    >
      {title && <h3 className="text-2xl font-bold">{title}</h3>}
      
      {children}
    </dialog>
  )
}

export default Modal
