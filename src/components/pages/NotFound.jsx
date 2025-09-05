import React from "react";

export default function NotFound() {
  return (
    <section className="py-20">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="mt-2">
        Go back <a className="underline" href="#/">home</a>.
      </p>
    </section>
  );
}
