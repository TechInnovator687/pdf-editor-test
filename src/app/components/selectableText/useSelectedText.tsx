import { useState, useEffect, useRef } from "react";


export const useSelectedText = (text: string) => {
    const [selectedText, setSelectedText] = useState<string>("");
    const [showModal, setShowModal] = useState<boolean>(false);
    const [modalPosition, setModalPosition] = useState<{ top: number; left: number; }>({ top: 0, left: 0 });
    const [displayText, setDisplayText] = useState<string>(text);
    const modalRef = useRef<HTMLDivElement>(null);
    const highlightRef = useRef<HTMLElement | null>(null);
  
    const handleTextSelection = () => {
      const selection = window.getSelection();
      const selected = selection?.toString();
  
      if (selected) {
        setSelectedText(selected);
  
        const range = selection?.getRangeAt(0).getBoundingClientRect();
        if (range) {
          setModalPosition({
            top: range.bottom + window.scrollY,
            left: range.left + window.scrollX,
          });
        }
  
        highlightSelectedText(selection);
        setShowModal(true);
      }
    };
  
    const highlightSelectedText = (selection: Selection | null) => {
      const range = selection?.getRangeAt(0);
      if (range) {
        const span = document.createElement("span");
        span.style.backgroundColor = "blue";
        range.surroundContents(span);
        highlightRef.current = span;
      }
    };
  
    const removeHighlight = () => {
      if (highlightRef.current) {
        const parent = highlightRef.current.parentNode;
        if (parent) {
          parent.replaceChild(
            document.createTextNode(highlightRef.current.textContent || ""),
            highlightRef.current
          );
          highlightRef.current = null;
        }
      }
    };
  
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        removeHighlight();
        setShowModal(false);
      }
    };
  
    const replaceSelectedText = (newText: string) => {
      setDisplayText((prevText) => prevText.replace(selectedText, newText));
      setShowModal(false);
    };
    
    const insertTextAfter = (newText: string) => {
      setDisplayText((prevText) => {
        const index = prevText.indexOf(selectedText);
        if (index !== -1) {
          return (
            prevText.slice(0, index + selectedText.length) +
            " " +
            newText +
            prevText.slice(index + selectedText.length)
          );
        }
        return prevText;
      });
    };

  
    useEffect(() => {
      if (showModal) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [showModal]);
  return {
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
  }
}
