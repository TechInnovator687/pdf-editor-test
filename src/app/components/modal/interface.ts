export interface ModalProps {
    selectedText: string;
    onClose: () => void;
    onAccept: (response: string) => void;
    onInsertBelow: (response: string) => void;
}
  