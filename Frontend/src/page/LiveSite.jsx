import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import api from "@/service/api";

function LiveSite() {
  const { id } = useParams();
  const [html, setHtml] = useState("");
  const [error, setError] = useState("");
  const [title, setTitle] = useState("")
  useEffect(() => {
    const handleGetWebsite = async () => {
      try {
        const result = await api.get(
          `/v0/website/getWebsiteBySlug/${id}`,
        );
        setHtml(result.data.latestCode);
        setTitle(result.data.title);
      } catch (error) {
        console.log(error);
        setError("site not found");
      }
    };
    handleGetWebsite();
  }, [id]);

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        {error}
      </div>
    );
  }
  return (
    <iframe
      title={title}
      srcDoc={html}
      className="w-screen h-screen border-none"
      sandbox="allow-scripts allow-same-origin allow-forms"
    />
  );
}

export default LiveSite;
