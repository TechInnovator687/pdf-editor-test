import { ModalAction } from "@/common/constants";
import { useState } from "react";
import { ModalProps } from "./interface";

export function useModal({
  selectedText,
  onClose,
  onAccept,
  onInsertBelow,
}: ModalProps) {
  const [isAsking, setIsAsking] = useState<boolean>(false);
  const [userPrompt, setUserPrompt] = useState<string>("");
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [action, setAction] = useState<string | null>(null);

  const handleAskAIClick = () => {
    setIsAsking(true);
  };

  const handlePromptSubmit = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/ask-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `${userPrompt}: ${selectedText}`,
        }),
      });
      const aiData = await response.json();
      const promptResponse = aiData.result ? aiData.result : aiData.error;
      setAiResponse(promptResponse);
    } catch (error) {
      setAiResponse("Error getting AI response");
    } 
    setIsLoading(false);
  };

  const handleActionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAction = event.target.value as ModalAction;
    setAction(selectedAction);

    switch (selectedAction) {
      case ModalAction.Accept:
        if (aiResponse) {
          onAccept(aiResponse);
        }
        break;
      case ModalAction.Discard:
        setAiResponse(null);
        onClose();
        break;
      case ModalAction.InsertBelow:
        if (aiResponse) {
          onInsertBelow(aiResponse);
        }
        onClose();
        break;
      case ModalAction.TryAgain:
        setAiResponse(null);
        setIsAsking(false);
        break;
      default:
        break;
    }
  };

  return {
    isAsking,
    userPrompt,
    aiResponse,
    isLoading,
    action,
    setUserPrompt,
    handleAskAIClick,
    handlePromptSubmit,
    handleActionChange,
  };
}
