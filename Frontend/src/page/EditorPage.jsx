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
  LoaderCircle,
  Minimize2,
} from "lucide-react";
import { useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import EditorHeader from "@/components/EditorHeader";
import EditorChat from "@/components/EditorChat";
import Tooltip from "@/components/Tooltip";
import Editor from "@monaco-editor/react";

const EditorPage = () => {
  const { id } = useParams();
  const [website, setWebsite] = useState(null);
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const iframeRef = useRef(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [thinkingIndex, setThinkingIndex] = useState(0);
  const [showCode, setShowCode] = useState(false);
  const [showFullPreview, setShowFullPreview] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const thinkingSteps = [
    "Understanding your request…",
    "Planning layout changes…",
    "Improving responsiveness…",
    "Applying animations…",
    "Finalizing update…",
  ];

  // Get Website Data
  useEffect(() => {
    const handleGetWebsite = async () => {
      try {
        const result = await api.get(`/v0/website/getWebsite/${id}`);
        setWebsite(result.data);
        setCode(result.data.latestCode);
        setMessages(result.data.conversation);
        console.log(result);
      } catch (error) {
        console.log(error);
        setError(error.response.data.message);
      }
    };
    handleGetWebsite();
  }, []);

  // Render Website
  useEffect(() => {
    if (!iframeRef.current || !code) return;
    const blob = new Blob([code], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    iframeRef.current.src = url;
    return () => URL.revokeObjectURL(url);
  }, [code]);

  //show thinking Steps
  useEffect(() => {
    if (!updateLoading) return;
    const i = setInterval(() => {
      setThinkingIndex((i) => (i + 1) % thinkingSteps.length);
    }, 30000);

    return () => clearInterval(i);
  }, [updateLoading]);

  const handleUpdate = async () => {
    if (!prompt) return;
    setUpdateLoading(true);
    const text = prompt;
    setPrompt("");
    setMessages((m) => [...m, { role: "user", content: prompt }]);
    try {
      const result = await api.post(`/v0/website/updateWebsite/${id}`, {
        prompt: text,
      });
      console.log(result);
      setUpdateLoading(false);
      setMessages((m) => [...m, { role: "ai", content: result.data.message }]);
      setCode(result.data.code);
    } catch (error) {
      setUpdateLoading(false);
      console.log(error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const result = await api.put(`/v0/website/saveWebsiteCode/${id}`, {
        code,
      });

      console.log(result.data);

      setWebsite((prev) => ({
        ...prev,
        latestCode: result.data.code,
      }));

      setShowCode(false);
    } catch (error) {
      console.log(error);
    }
  };

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
        <EditorHeader onclose={false} website={website} />

        <div className="flex h-full flex-col">
          {/* Messages */}
          <div className="flex-1 scrollbar-hide overflow-y-auto px-4 py-4 space-y-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`w-fit max-w-[75%] ${
                  m.role === "user" ? "ml-auto" : "mr-auto"
                }`}
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
            {/* Loading steps... */}
            {updateLoading && (
              <div className="max-w-[85%] mr-auto">
                <div className="px-4 py-2.5 rounded-2xl text-xs bg-white/5 border border-white/10 text-zinc-400 italic">
                  {thinkingSteps[thinkingIndex]}
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="shrink-0 p-3 ">
            <div className="flex gap-2 mb-5 justify-center items-center">
              <textarea
                placeholder="Describe Changes..."
                className="flex-1 resize-none rounded-2xl px-4 py-3 bg-white/5 border border-white/10 text-sm outline-none scrollbar-hide"
                onChange={(e) => setPrompt(e.target.value)}
                value={prompt}
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    if (!updateLoading) {
                      handleUpdate();
                    }
                  }
                }}
              />

              <button
                className=" px-4 py-3 rounded-2xl bg-white text-black"
                disabled={updateLoading}
                onClick={handleUpdate}
              >
                {updateLoading ? (
                  <LoaderCircle size={14} className="animate-spin" />
                ) : (
                  <Send size={14} />
                )}
              </button>
            </div>
          </div>
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
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-10 bg-black flex flex-col"
          >
            {/* Header */}
            <EditorHeader
              onclose={() => setShowChat(false)}
              website={website}
            />
            <>
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`max-w-[85%] ${
                      m.role === "user" ? "ml-auto" : "mr-auto"
                    }`}
                  >
                    <div
                      className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        m.role === "user"
                          ? "bg-white text-black"
                          : "bg-white/5 border border-white/10 text-zinc-200"
                      }`}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}

                {updateLoading && (
                  <div className="max-w-[85%] mr-auto">
                    <div className="px-4 py-2.5 rounded-2xl text-xs bg-white/5 border border-white/10 text-zinc-400 italic">
                      {thinkingSteps[thinkingIndex]}
                    </div>
                  </div>
                )}
              </div>

              {/* Changes Input Box */}
              <div className="p-3 border-t border-white/10">
                <div className="flex gap-2">
                  <input
                    placeholder="Describe Changes..."
                    className="flex-1 resize-none rounded-2xl px-4 py-3 bg-white/5 border border-white/10 text-sm outline-none"
                    onChange={(e) => setPrompt(e.target.value)}
                    value={prompt}
                  />
                  <button
                    className="px-4 py-3 rounded-2xl bg-white text-black"
                    disabled={updateLoading}
                    onClick={handleUpdate}
                  >
                    <Send size={14} />
                  </button>
                </div>
              </div>
            </>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCode && (
          //  {/* Code Editor Header */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.25 }}
            className="fixed inset-y-0 right-0 w-full lg:w-[45%] z-10 bg-[#1e1e1e] flex flex-col"
          >
            {/* index.html */}
            {/* Close Button */}
            <div className="h-12 px-4 flex justify-between items-center border-b border-white/10 bg-[#1e1e1e]">
              <span className="text-sm font-medium">index.html</span>

              <div className="flex items-center justify-center gap-3">
                <button
                  className="px-3 py-1.5 rounded-md bg-white text-black text-xs font-medium hover:bg-zinc-200 transition"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </button>
                <button onClick={() => setShowCode(false)}>
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Monaco Code Editor */}
            <Editor
              theme="vs-dark"
              value={code}
              language="html"
              onChange={(v) => setCode(v)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showFullPreview && (
          <motion.div
            className="fixed inset-0 z-10 bg-black"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.25 }}
          >
            {/* Full Screen Website Preview */}
            <iframe
              className="w-full h-full bg-white"
              srcDoc={code}
              sandbox="allow-scripts allow-same-origin allow-forms"
            />

            {/* Close Button */}
            <button
              onClick={() => setShowFullPreview(false)}
              className="absolute top-4 right-4 p-1 mr-1 bg-black/70 rounded-lg"
            >
              <Minimize2 className="opacity-10 hover:opacity-100" size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EditorPage;

// 5:31:47
