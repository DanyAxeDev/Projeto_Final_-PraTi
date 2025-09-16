import { useRef, useEffect, type ReactNode } from "react"

type ModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
  children: ReactNode;
}

function Modal({ isModalOpen, closeModal, children }: ModalProps) {
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
    className={`${isModalOpen ? "" : "hidden"} m-auto py-6 px-4 rounded-sm max-w-[90vw] flex flex-col items-center gap-4 sm:p-6 sm:max-w-[500px]`}
    >
      {children}
    </dialog>
  )
}

export default Modal
