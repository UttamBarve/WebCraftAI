import React from "react";

const EditorChat = ({messages}) => {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
      {messages.map((m, i) => (
        <div
          key={i}
          className={`max-w-[80%] ${m.role === "user" ? "ml-auto" : "mr-auto"}`}
        >
          <div
            className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
              m.role === "user"
                ? "bg-amber-50 text-black"
                : "bg-white/5 border border-white/10 text-zinc-200"
            }`}
          >
            {m.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EditorChat;
