import { ModalAction } from "@/common/constants";
import { useModal } from "./useModal";
import { ModalProps } from "./interface";

export default function Modal({
  selectedText,
  onClose,
  onAccept,
  onInsertBelow,
}: ModalProps) {
  const {
    isAsking,
    userPrompt,
    aiResponse,
    isLoading,
    action,
    setUserPrompt,
    handleAskAIClick,
    handlePromptSubmit,
    handleActionChange,
  } = useModal({ selectedText, onClose, onAccept, onInsertBelow });

  return (
    <div className="p-3 bg-gray-900 rounded-lg shadow-lg mx-auto text-white">
      {!isAsking ? (
        <div className="text-center">
          <p
            onClick={handleAskAIClick}
            className="p-2 rounded hover:bg-blue-600 transition-colors duration-200 text-white"
          >
            Ask AI
          </p>
        </div>
      ) : (
        <div className="flex items-center">
          {!aiResponse ? (
            <>
              <input
                type="text"
                placeholder="Enter your prompt"
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                disabled={isLoading}
                className="w-fit m-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black text-white"
              />
              <button
                onClick={handlePromptSubmit}
                disabled={isLoading}
                className={`w-fit h-fit p-2 rounded text-white transition-colors duration-200 ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {isLoading ? "Loading..." : "Submit"}
              </button>
            </>
          ) : (
            <div>
              <p className="bg-black p-2 rounded mb-2">{aiResponse}</p>
              {aiResponse && (
                <select
                  onChange={handleActionChange}
                  value={action || ""}
                  className="w-fit p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black"
                >
                  <option value="" disabled>
                    Select action
                  </option>
                  <option value={ModalAction.Accept}>Accept</option>
                  <option value={ModalAction.Discard}>Discard</option>
                  <option value={ModalAction.InsertBelow}>Insert Below</option>
                  <option value={ModalAction.TryAgain}>Try Again</option>
                </select>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
