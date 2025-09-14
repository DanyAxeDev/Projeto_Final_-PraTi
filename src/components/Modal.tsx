import { Button } from "./ui/button";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  confirmText?: string;
  onConfirm?: () => void;
  variant?: 'default' | 'danger';
}

function Modal({ isOpen, onClose, title, children, confirmText, onConfirm, variant = 'default' }: ModalProps) {
  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 flex flex-col gap-4 animate-in fade-in-90 zoom-in-95">
        <h2 className={`text-xl font-bold font-raleway ${variant === 'danger' ? 'text-destructive' : 'text-blue'}`}>
          {title}
        </h2>
        <div className="text-gray-600 font-raleway">
          {children}
        </div>
        <div className="flex justify-end gap-3 mt-4">
          <Button variant="outline" onClick={onClose}>
            {onConfirm ? "Cancelar" : "Fechar"}
          </Button>
          {onConfirm && confirmText && (
            <Button
              variant={variant === 'danger' ? 'destructive' : 'default'}
              onClick={onConfirm}
            >
              {confirmText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;

