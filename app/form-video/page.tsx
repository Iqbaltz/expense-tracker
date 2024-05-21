"use client";
import React, { useState } from "react";
import YouTube from "react-youtube";

export default function FormVideoPage() {
  const [videoFinished, setVideoFinished] = useState(false);

  const onEnd = () => {
    setVideoFinished(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (videoFinished) {
      alert("Form submitted!");
    } else {
      alert("Please finish watching the video first.");
    }
  };

  const videoOptions = {
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className="min-h-screen">
      <div className="w-[100%] md:w-[388px] p-4 mx-auto space-y-4 bg-slate-50 min-h-screen">
        <YouTube
          videoId="KwNUJ69RbwY"
          opts={videoOptions}
          className="w-full"
          iframeClassName="w-full h-[200px]"
          onEnd={onEnd}
        />
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-3">
            <label className="text-sm font-semibold mb-1" htmlFor="name">
              Nama
            </label>
            <input
              className="bg-white rounded-md border px-2 py-1 outline-none"
              type="text"
              id="name"
              name="name"
              required
              disabled={!videoFinished}
            />
          </div>
          <div className="flex flex-col mb-3">
            <label className="text-sm font-semibold mb-1" htmlFor="date">
              Tanggal
            </label>
            <input
              className="bg-white rounded-md border px-2 py-1 outline-none"
              type="date"
              id="date"
              name="date"
              required
              disabled={!videoFinished}
            />
          </div>
          <button
            type="submit"
            className="mt-2 btn btn-dark w-full text-white"
            disabled={!videoFinished}
          >
            Simpan Data
          </button>
        </form>
      </div>
    </div>
  );
}
