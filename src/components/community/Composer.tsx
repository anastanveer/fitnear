"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ImagePlus, X, Sparkles } from "lucide-react";
import type { FeedPost } from "@/data/posts";
import { trainers } from "@/data/trainers";
import { categoryBySlug } from "@/data/categories";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";

const personas = trainers.map((t) => ({ value: t.slug, label: t.name }));

export function Composer({ onPost }: { onPost: (post: FeedPost) => void }) {
  const [slug, setSlug] = useState(trainers[0].slug);
  const [text, setText] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const persona = trainers.find((t) => t.slug === slug) ?? trainers[0];

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    if (file.size > 3.5 * 1024 * 1024) {
      setError("Image is too large — please pick one under 3.5 MB.");
      return;
    }
    setError(null);
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const publish = () => {
    if (!text.trim() && !image) return;
    const post: FeedPost = {
      id: "u-" + text.length + "-" + text.slice(0, 4),
      trainerSlug: persona.slug,
      authorName: persona.name,
      authorAvatar: persona.avatar,
      authorRole: `${categoryBySlug[persona.primarySport]?.name} · ${persona.area}`,
      verified: persona.verified,
      sport: persona.primarySport,
      createdAt: Date.now(),
      text: text.trim(),
      image: image ?? undefined,
      tags: [],
      likes: 0,
      comments: [],
    };
    onPost(post);
    setText("");
    setImage(null);
    setError(null);
  };

  return (
    <div className="rounded-3xl border border-ink-900/8 bg-white p-4 sm:p-5">
      <div className="flex items-center gap-2 pb-3">
        <Sparkles className="h-4 w-4 text-lime-600" />
        <span className="text-sm font-semibold">Share an update</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
          <Image src={persona.avatar} alt={persona.name} fill sizes="44px" className="object-cover" />
        </div>
        <div className="flex items-center rounded-full border border-ink-900/10 bg-white px-3 py-2">
          <Select
            ariaLabel="Post as"
            value={slug}
            onChange={setSlug}
            options={personas}
            className="min-w-[9rem]"
          />
        </div>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        placeholder="Share a win, a class, a tip, or an open slot…"
        className="mt-3 w-full resize-none rounded-2xl border border-ink-900/10 bg-white px-4 py-3 text-[15px] focus:border-lime-400 focus:outline-none"
      />

      {image && (
        <div className="relative mt-3 overflow-hidden rounded-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt="Upload preview" className="max-h-72 w-full object-cover" />
          <button
            onClick={() => setImage(null)}
            aria-label="Remove image"
            className="absolute right-2 top-2 rounded-full bg-ink-950/70 p-1.5 text-white backdrop-blur hover:bg-ink-950"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {error && <p className="mt-2 text-xs text-rose-500">{error}</p>}

      <div className="mt-3 flex items-center justify-between">
        <button
          onClick={() => fileRef.current?.click()}
          className="inline-flex items-center gap-2 rounded-full border border-ink-900/10 px-3.5 py-2 text-sm font-medium text-fg transition-colors hover:border-ink-900/25"
        >
          <ImagePlus className="h-4 w-4 text-lime-600" /> Photo
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={onFile}
          className="hidden"
        />
        <Button onClick={publish} disabled={!text.trim() && !image}>
          Post
        </Button>
      </div>
    </div>
  );
}
