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
} from "lucide-react";
import { useRef } from "react";
import { AnimatePresence, motion } from "motion/react";

const Editor = () => {
  const { id } = useParams();
  const [website, setWebsite] = useState(null);
  const [error, setError] = useState("");
  // const [code, setCode] = useState("");
  // const [messages, setMessages] = useState([]);
  // const [prompt, setPrompt] = useState("");
  // const iframeRef = useRef(null);
  // const [updateLoading, setUpdateLoading] = useState(false);
  // const [thinkingIndex, setThinkingIndex] = useState(0);
  // const [showCode, setShowCode] = useState(false);
  // const [showFullPreview, setShowFullPreview] = useState(false);
  // const [showChat, setShowChat] = useState(false);
  useEffect(() => {
    const handleGetWebsite = async () => {
      try {
        const result = await api.get(`/v0/website/getWebsite/${id}`);
        setWebsite(result.data);
        // setCode(result.data.latestCode)
        // setMessages(result.data.conversation)
        console.log(result);
      } catch (error) {
        console.log(error);
        setError(error.response.data.message);
      }
    };
    handleGetWebsite();
  }, []);

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-red-400">
        {error}
      </div>
    );
  }
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
        <Header />
      </aside>
    </div>
  );

  function Header({ onclose }) {
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
  }
};

export default Editor;



// 5:31:47