"use client";
import React, { useState } from "react";
import YouTube from "react-youtube";

export default function FormVideoPage() {
  const [videoFinished, setVideoFinished] = useState(false);

  const onEnd = () => {
    setVideoFinished(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const name = data.get("name") as string;
    const date = new Date().toISOString().split("T")[0];
    const time = new Date().toLocaleTimeString();

    if (videoFinished) {
      await fetch(
        "https://script.google.com/macros/s/AKfycbxmlChZAKnZjXhG6cEHFDiwEMU28tJbtfK2pLBzH2ysnRf1ha8_u2EDPc7OH6_698TC/exec",
        { method: "POST", body: JSON.stringify({ name, date, time }) }
      ).then(() => {
        alert("Data berhasil disimpan.");
      });
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
        <p>Mohon isi nama anda setelah menonton video di atas!</p>
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
