import React, { useEffect, useMemo, useState } from "react";

function safeDate(dateStr) {
  try {
    return new Date(`${dateStr}T00:00:00`);
  } catch {
    return null;
  }
}

function formatDate(dateStr) {
  const d = safeDate(dateStr);
  if (!d || Number.isNaN(d.getTime())) return dateStr || "";
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function daysSince(dateStr) {
  const d0 = safeDate(dateStr);
  if (!d0 || Number.isNaN(d0.getTime())) return null;
  const now = new Date();
  const ms = now.getTime() - d0.getTime();
  return Math.max(0, Math.floor(ms / (1000 * 60 * 60 * 24)));
}

function initials(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const a = parts[0]?.[0] || "";
  const b = parts[1]?.[0] || "";
  return (a + b).toUpperCase();
}

function TabBtn({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-2xl px-4 py-2 text-sm border transition",
        active
          ? "bg-black text-white dark:bg-white dark:text-black"
          : "bg-transparent hover:bg-black/5 dark:hover:bg-white/10"
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs opacity-80">
      {children}
    </span>
  );
}

export default function JourneyPage() {
  const [tab, setTab] = useState("milestones"); // milestones | collaborators | kindwords
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");

  const [kindFilter, setKindFilter] = useState("all"); // all | client | collaborator
  const [q, setQ] = useState("");

  useEffect(() => {
    let mounted = true;
    fetch("/journey.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("Failed to load journey.json"))))
      .then((json) => mounted && setData(json))
      .catch((e) => mounted && setErr(e?.message || "Failed to load journey"));
    return () => { mounted = false; };
  }, []);

  const launchDays = useMemo(() => daysSince(data?.launchDate), [data?.launchDate]);

  const milestones = useMemo(() => {
    const arr = Array.isArray(data?.milestones) ? [...data.milestones] : [];
    arr.sort((a, b) => (a.date || "").localeCompare(b.date || ""));
    return arr;
  }, [data]);

  const collaborators = useMemo(() => {
    const arr = Array.isArray(data?.collaborators) ? [...data.collaborators] : [];
    // Featured first
    arr.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
    return arr;
  }, [data]);

  const collabById = useMemo(() => {
    const map = new Map();
    collaborators.forEach((c) => c?.id && map.set(c.id, c));
    return map;
  }, [collaborators]);

  const filteredCollaborators = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return collaborators;
    return collaborators.filter((c) => {
      const blob = [
        c.name,
        c.role,
        c.city,
        c.blurb,
        ...(Array.isArray(c.tags) ? c.tags : [])
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return blob.includes(s);
    });
  }, [collaborators, q]);

  const testimonials = useMemo(() => {
    const arr = Array.isArray(data?.testimonials) ? [...data.testimonials] : [];
    arr.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    if (kindFilter === "all") return arr;
    return arr.filter((t) => (t.type || "").toLowerCase() === kindFilter);
  }, [data, kindFilter]);

  if (err) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-2xl font-semibold">Journey</h1>
        <p className="mt-2 text-sm opacity-80">Couldn’t load data.</p>
        <pre className="mt-4 rounded-2xl border p-4 text-xs overflow-auto">{err}</pre>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="h-7 w-48 rounded bg-black/10 dark:bg-white/10" />
        <div className="mt-3 h-4 w-96 rounded bg-black/10 dark:bg-white/10" />
        <div className="mt-8 h-10 w-full rounded-2xl bg-black/10 dark:bg-white/10" />
        <div className="mt-6 space-y-3">
          <div className="h-20 rounded-2xl bg-black/10 dark:bg-white/10" />
          <div className="h-20 rounded-2xl bg-black/10 dark:bg-white/10" />
          <div className="h-20 rounded-2xl bg-black/10 dark:bg-white/10" />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">{data.headline || "Journey"}</h1>
        <p className="text-sm opacity-80">{data.subhead || ""}</p>

        {data.launchDate && (
          <div className="mt-4 inline-flex w-fit items-center gap-2 rounded-2xl border px-4 py-2 text-sm">
            <span className="opacity-80">Since launch</span>
            <span className="font-semibold">{launchDays ?? "—"} days</span>
            <span className="opacity-60">({formatDate(data.launchDate)})</span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="mt-8 flex flex-wrap gap-2">
        <TabBtn active={tab === "milestones"} onClick={() => setTab("milestones")}>
          Milestones
        </TabBtn>
        <TabBtn active={tab === "collaborators"} onClick={() => setTab("collaborators")}>
          Collaborators
        </TabBtn>
        <TabBtn active={tab === "kindwords"} onClick={() => setTab("kindwords")}>
          Kind Words
        </TabBtn>
      </div>

      {/* CONTENT */}
      {tab === "milestones" && (
        <div className="mt-8">
          <div className="relative">
            <div className="absolute left-3 top-0 h-full w-px bg-black/10 dark:bg-white/10" />
            <div className="space-y-6">
              {milestones.map((m, i) => (
                <div key={i} className="relative pl-10">
                  <div className="absolute left-[10px] top-2 h-3 w-3 rounded-full border bg-white dark:bg-black" />
                  <div className="rounded-2xl border p-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="text-xs opacity-70">{formatDate(m.date)}</div>
                      {m.tag ? <Pill>{m.tag}</Pill> : null}
                    </div>
                    <div className="mt-2 text-lg font-semibold">{m.title}</div>
                    {m.note ? <div className="mt-1 text-sm opacity-80">{m.note}</div> : null}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {milestones.length === 0 && (
            <div className="mt-6 rounded-2xl border p-5 text-sm opacity-80">
              No milestones yet — add items in <code className="px-1">public/journey.json</code>.
            </div>
          )}
        </div>
      )}

      {tab === "collaborators" && (
        <div className="mt-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm opacity-80">
              Keep this as your curated shoutout list (designers, artists, MUAs, models, brands).
            </div>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search name, role, tag…"
              className="w-full sm:w-80 rounded-2xl border px-4 py-2 text-sm bg-transparent"
            />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCollaborators.map((c) => (
              <div key={c.id || c.name} className="rounded-2xl border overflow-hidden">
                {/* optional image */}
                {c.image ? (
                  <div className="h-36 w-full overflow-hidden">
                    <img src={c.image} alt={c.name} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                ) : (
                  <div className="h-20 w-full bg-black/5 dark:bg-white/10" />
                )}

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="h-9 w-9 rounded-full border flex items-center justify-center text-xs font-semibold">
                          {initials(c.name)}
                        </div>
                        <div>
                          <div className="text-lg font-semibold">{c.name}</div>
                          <div className="text-xs opacity-70">
                            {[c.role, c.city].filter(Boolean).join(" • ")}
                          </div>
                        </div>
                      </div>
                    </div>
                    {c.featured ? <Pill>Featured</Pill> : null}
                  </div>

                  {c.blurb ? <div className="mt-3 text-sm opacity-80">{c.blurb}</div> : null}

                  {Array.isArray(c.tags) && c.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {c.tags.map((t, idx) => (
                        <Pill key={idx}>{t}</Pill>
                      ))}
                    </div>
                  )}

                  <div className="mt-4 flex flex-wrap gap-2">
                    {c.instagram ? (
                      <a
                        href={c.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-2xl border px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10"
                      >
                        Instagram
                      </a>
                    ) : null}
                    {c.website ? (
                      <a
                        href={c.website}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-2xl border px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10"
                      >
                        Website
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCollaborators.length === 0 && (
            <div className="mt-6 rounded-2xl border p-5 text-sm opacity-80">
              No matches. Try a different keyword.
            </div>
          )}
        </div>
      )}

      {tab === "kindwords" && (
        <div className="mt-8">
          <div className="flex flex-wrap items-center gap-2">
            <TabBtn active={kindFilter === "all"} onClick={() => setKindFilter("all")}>All</TabBtn>
            <TabBtn active={kindFilter === "client"} onClick={() => setKindFilter("client")}>Clients</TabBtn>
            <TabBtn active={kindFilter === "collaborator"} onClick={() => setKindFilter("collaborator")}>Collaborators</TabBtn>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {testimonials.map((t) => {
              const linked = t.authorId ? collabById.get(t.authorId) : null;
              const name = linked?.name || t.authorName || "—";
              const role = linked?.role || t.authorRole || "";
              const ig = linked?.instagram || t.instagram || "";
              return (
                <div key={t.id} className="rounded-2xl border p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm opacity-70">{formatDate(t.date)}</div>
                      <div className="mt-2 text-base font-semibold">{name}</div>
                      {role ? <div className="text-xs opacity-70">{role}</div> : null}
                    </div>
                    {t.type ? <Pill>{t.type}</Pill> : null}
                  </div>

                  <div className="mt-4 text-sm opacity-90">
                    “{t.quote}”
                  </div>

                  {ig ? (
                    <div className="mt-4">
                      <a
                        href={ig}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-2xl border px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10 inline-flex"
                      >
                        View profile
                      </a>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>

          {testimonials.length === 0 && (
            <div className="mt-6 rounded-2xl border p-5 text-sm opacity-80">
              No testimonials yet — add items in <code className="px-1">public/journey.json</code>.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
