import { Dialog } from "@headlessui/react";

type Props = {
  title?: string;
  description?: string;
  children: JSX.Element;
  isOpen: boolean;
  onClose?: () => void;
};
/**
 * モーダルコンポーネント
 * @param title
 * @param description
 * @param children
 * @param isOpen モーダルの開閉状態
 * @param onClose モーダルを閉じたときの処理
 */

const Modal: React.VFC<Props> = ({
  title,
  description,
  children,
  isOpen,
  onClose = () => {},
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed z-40 inset-0 overflow-y-auto text-center"
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="bg-white rounded w-1/2 min-h-[50vh] mx-auto p-10 z-50 flex flex-col justify-between">
          <Dialog.Title className="font-bold text-2xl mb-2">
            {title}
          </Dialog.Title>
          <Dialog.Description className="my-2">
            {description}
          </Dialog.Description>
          <div className="mt-2">{children}</div>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
