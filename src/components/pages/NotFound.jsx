// src/components/pages/NotFound.jsx
import React from "react";
import { usePageMeta } from "@/app/seo";

export default function NotFound() {
  usePageMeta("Page Not Found | PRADHU Photography", "The page you’re looking for doesn’t exist. Head back to the homepage.");

  return (
    <div className="mx-auto w-full max-w-[1800px] px-4 xl:px-8 py-20">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="mt-2">
        Go back{" "}
        <a className="underline" href="#/">
          home
        </a>
        .
      </p>
    </div>
  );
}
