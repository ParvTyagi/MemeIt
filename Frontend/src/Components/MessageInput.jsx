import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X, Paperclip, Smile } from "lucide-react";
import { handleError } from "../assets/utils";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);
  const { sendMessage } = useChatStore();

  // Auto-resize textarea
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
    adjustTextareaHeight();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      handleError("Please select an image file");
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      handleError("Image size must be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    if (isLoading) return;

    setIsLoading(true);
    
    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      handleError("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const canSend = (text.trim() || imagePreview) && !isLoading;

  return (
    <div className="border-t border-base-300 bg-base-100">
      {/* Image Preview */}
      {imagePreview && (
        <div className="p-4 pb-2">
          <div className="relative inline-block">
            <div className="relative overflow-hidden rounded-xl border-2 border-base-300">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-24 h-24 object-cover"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-200" />
            </div>
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 btn btn-circle btn-xs btn-error shadow-lg hover:scale-110 transition-transform"
              type="button"
              aria-label="Remove image"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4">
        <form onSubmit={handleSendMessage} className="flex items-end gap-2">
          {/* Main Input Container */}
          <div className="flex-1 relative">
            <div className="flex items-end bg-base-200 rounded-2xl border border-base-300 focus-within:border-primary transition-colors">
              {/* Textarea */}
              <textarea
                ref={textareaRef}
                className="flex-1 textarea textarea-ghost resize-none min-h-0 h-auto py-3 px-4 rounded-2xl border-none focus:outline-none bg-transparent placeholder:text-base-content/50"
                placeholder="Type a message..."
                value={text}
                onChange={handleTextChange}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                rows={1}
                style={{ lineHeight: '1.5' }}
              />
              
              {/* Attachment Button */}
              <div className="flex items-center pr-2 pb-2">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                />
                
                <div className="tooltip tooltip-top" data-tip="Attach image">
                  <button
                    type="button"
                    className={`btn btn-ghost btn-sm btn-circle transition-colors ${
                      imagePreview 
                        ? "text-success hover:text-success" 
                        : "text-base-content/60 hover:text-base-content"
                    }`}
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isLoading}
                    aria-label="Attach image"
                  >
                    <Image className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Send Button */}
          <div className="tooltip tooltip-top" data-tip={canSend ? "Send message" : "Enter message to send"}>
            <button
              type="submit"
              className={`btn btn-circle transition-all duration-200 ${
                canSend
                  ? "btn-primary hover:scale-105 shadow-lg"
                  : "btn-disabled"
              }`}
              disabled={!canSend}
              aria-label="Send message"
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MessageInput;