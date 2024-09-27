import Modal from "../modal/Modal";
import { selectableTextProps } from "./types";
import { useSelectedText } from "./useSelectedText";

export default function SelectableText({text }: selectableTextProps) {
  const {
    displayText,
    showModal,
    modalRef,
    modalPosition,
    selectedText,
    handleTextSelection,
    removeHighlight,
    setShowModal,
    replaceSelectedText,
    insertTextAfter
  } = useSelectedText(text)

  return (
    <div>
      <div
        onMouseUp={handleTextSelection}
        className="whitespace-pre-wrap cursor-text"
      >
        {displayText}
      </div>
      {showModal && (
        <div
          ref={modalRef}
          className="absolute z-[1000]"
          style={{ top: modalPosition.top, left: modalPosition.left }}
        >
          <Modal
            selectedText={selectedText}
            onClose={() => {
              removeHighlight();
              setShowModal(false);
            }}
            onAccept={replaceSelectedText}
            onInsertBelow={insertTextAfter}
          />
        </div>
      )}
    </div>
  );
}
