import React from "react";
import { X } from "lucide-react";
const EditorHeader = ({ onclose, website }) => {
  return (
    <div className="h-14 px-4 flex items-center justify-between border-b border-white/10">
      <span className="font-semibold truncate">{website.title}</span>
      {onclose && (
        <button onClick={onclose}>
          <X size={18} color="white" />
        </button>
      )}
    </div>
  );
};

export default EditorHeader;
