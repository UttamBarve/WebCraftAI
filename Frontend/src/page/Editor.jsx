import api from "@/service/api";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  ArrowLeft,
  Code,
  Code2,
  MessageCircle,
  MessageSquare,
  Monitor,
  Rocket,
  Send,
  X,
  Fullscreen,
  Expand,
} from "lucide-react";
import { useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import EditorHeader from "@/components/EditorHeader";
import EditorChat from "@/components/EditorChat";
import Tooltip from "@/components/Tooltip";

const Editor = () => {
  const { id } = useParams();
  const [website, setWebsite] = useState(null);
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const [messages, setMessages] = useState([]);
  // const [prompt, setPrompt] = useState("");
  const iframeRef = useRef(null);
  // const [updateLoading, setUpdateLoading] = useState(false);
  // const [thinkingIndex, setThinkingIndex] = useState(0);
  // const [showCode, setShowCode] = useState(false);
  // const [showFullPreview, setShowFullPreview] = useState(false);
  // const [showChat, setShowChat] = useState(false);

  // Get Website Data
  useEffect(() => {
    const handleGetWebsite = async () => {
      try {
        const result = await api.get(`/v0/website/getWebsite/${id}`);
        setWebsite(result.data);
        setCode(result.data.latestCode)
        setMessages(result.data.conversation);
        console.log(result);
      } catch (error) {
        console.log(error);
        setError(error.response.data.message);
      }
    };
    handleGetWebsite();
  }, []);

  useEffect(() => {
    if (!iframeRef.current || !code) return;
    const blob = new Blob([code], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    iframeRef.current.src = url;
    return () => URL.revokeObjectURL(url);
  }, [code]);

  // Throw Error...
  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-red-400">
        {error}
      </div>
    );
  }
  // Loading State...
  if (!website) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex bg-black text-white overflow-hidden">
      <aside className="hidden lg:flex w-95 flex-col border-r border-white/10 bg-black/80">
        <EditorHeader onclose={null} website={website} />
        <div>
          <EditorChat messages={messages} />
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <div className="h-14 px-4 flex justify-between items-center border-b border-white/10 bg-black/80">
          <span className="text-xs text-zinc-400">Live Preview</span>

          <div className="flex gap-2">
            {!website.deployed && (
              <button
                className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-linear-to-r from-indigo-500 to-purple-500 text-sm font-semibold hover:scale-105 transition"
                // onClick={handleDeploy}
              >
                <Rocket size={14} /> Deploy
              </button>
            )}

            {/* For Small screen */}
            <Tooltip text="Show Chat">
              <button
                className="p-2 lg:hidden"
                onClick={() => setShowChat(true)}
              >
                <MessageSquare size={18} />
              </button>
            </Tooltip>
            <Tooltip text="Show Code">
              <button className="p-2" onClick={() => setShowCode(true)}>
                <Code2 size={18} />
              </button>
            </Tooltip>

            <Tooltip text="Full Screen">
              <button className="p-2" onClick={() => setShowFullPreview(true)}>
                <Expand size={18} />
              </button>
            </Tooltip>
          </div>
        </div>
        <iframe
          ref={iframeRef}
          sandbox="allow-scripts allow-same-origin allow-forms"
          className="flex-1 w-full bg-white"
        />
      </div>
    </div>
  );
};

export default Editor;

// 5:31:47
