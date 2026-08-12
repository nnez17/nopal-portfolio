"use client";

import { useRef, useState, type DragEvent } from "react";
import { ArrowRight, Check, Trophy, X } from "lucide-react";

type Tiles = { id: number; text: string }[];
type Question = { hint: string; tiles: Tiles; answer: string; bank: number[] };

const QUESTIONS: { hint: string; tiles: string[] }[] = [
  {
    hint: "Definisi latar belakang cerpen",
    tiles: [
      "Latar",
      "belakang",
      "membantu",
      "pembaca",
      "memahami",
      "mengapa",
      "pengarang",
      "menulis",
      "cerita",
    ],
  },
  {
    hint: "Cinta dalam karya Dee Lestari",
    tiles: [
      "Dee",
      "memandang",
      "cinta",
      "sebagai",
      "cara",
      "untuk",
      "membahas",
      "identitas",
      "kehilangan",
      "dan",
      "kesetiaan",
    ],
  },
  {
    hint: "Kutipan Dee Lestari tentang proses menulis",
    tiles: [
      "Proses",
      "menulis",
      "dari",
      "awal",
      "sampai",
      "rampung",
      "adalah",
      "proses",
      "untuk",
      "mengenali",
      "diri",
      "sendiri",
    ],
  },
  {
    hint: "Latar yang mendominasi cerpen Cinta Tak Bertuan",
    tiles: [
      "Latar",
      "belakang",
      "cerpen",
      "didominasi",
      "oleh",
      "latar",
      "belakang",
      "psikologis",
    ],
  },
  {
    hint: "Kutipan tentang batas cinta",
    tiles: [
      "Cinta",
      "harus",
      "satu,",
      "cinta",
      "tak",
      "boleh",
      "dua,",
      "cinta",
      "maksimal",
      "empat",
    ],
  },
];

function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const DATA: Question[] = QUESTIONS.map((q, i) => {
  const tiles: Tiles = q.tiles.map((text, id) => ({ id, text }));
  const rand = mulberry32(42 + i * 97);
  const bank = tiles.map((t) => t.id);
  for (let j = bank.length - 1; j > 0; j--) {
    const k = Math.floor(rand() * (j + 1));
    [bank[j], bank[k]] = [bank[k], bank[j]];
  }
  return { hint: q.hint, tiles, answer: q.tiles.join(" "), bank };
});

export default function QuizPage() {
  const [idx, setIdx] = useState(0);
  const [placed, setPlaced] = useState<number[]>([]);
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [over, setOver] = useState<number | null>(null);
  const drag = useRef<{ id: number; from: number | "bank" } | null>(null);

  const finished = idx >= DATA.length;

  if (finished) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 p-6">
        <Background />
        <div className="relative z-10 w-full max-w-md rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center shadow-2xl backdrop-blur-xl">
          <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-amber-400/15 text-amber-400">
            <Trophy size={40} />
          </div>
          <h1 className="mt-5 text-3xl font-extrabold text-white">Selesai!</h1>
          <p className="mt-2 text-white/60">
            Kamu menyusun semua kalimat dengan benar!
          </p>
          <button
            onClick={() => {
              setIdx(0);
              setPlaced([]);
              setStatus("idle");
            }}
            className="mt-6 w-full rounded-2xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-6 py-3.5 font-bold text-white shadow-lg shadow-indigo-500/25 transition hover:brightness-110 active:scale-[0.98]"
            type="button"
          >
            Main Lagi
          </button>
        </div>
      </main>
    );
  }

  const q = DATA[idx];
  const answer = placed.map((id) => q.tiles[id].text).join(" ");
  const complete = placed.length === q.tiles.length;
  const displayBank = q.bank.filter((id) => !placed.includes(id));

  function startDrag(e: DragEvent, id: number, from: number | "bank") {
    drag.current = { id, from };
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", String(id));
  }

  function endDrag() {
    drag.current = null;
    setOver(null);
  }

  function dropAt(e: DragEvent, i: number) {
    e.preventDefault();
    e.stopPropagation();
    const d = drag.current;
    if (!d || status !== "idle") return;
    setOver(null);
    if (d.from === "bank") {
      if (placed.includes(d.id)) return;
      const next = [...placed];
      next.splice(i, 0, d.id);
      setPlaced(next);
    } else if (placed.includes(d.id)) {
      const pos = placed.indexOf(d.id);
      const next = placed.filter((id) => id !== d.id);
      let insert = i;
      if (pos < i) insert -= 1;
      next.splice(Math.min(insert, next.length), 0, d.id);
      setPlaced(next);
    }
  }

  function dropEnd(e: DragEvent) {
    e.preventDefault();
    const d = drag.current;
    if (!d || status !== "idle") return;
    setOver(null);
    if (d.from === "bank") {
      if (!placed.includes(d.id)) setPlaced([...placed, d.id]);
    } else if (placed.includes(d.id)) {
      setPlaced([...placed.filter((id) => id !== d.id), d.id]);
    }
  }

  function dropBank(e: DragEvent) {
    e.preventDefault();
    const d = drag.current;
    if (!d || status !== "idle") return;
    setOver(null);
    if (d.from !== "bank" && placed.includes(d.id)) {
      setPlaced(placed.filter((id) => id !== d.id));
    }
  }

  function next() {
    setIdx(idx + 1);
    setPlaced([]);
    setStatus("idle");
  }

  function check() {
    if (answer === q.answer) {
      setStatus("correct");
      return;
    }
    setStatus("wrong");
    setTimeout(() => {
      setPlaced([]);
      setStatus("idle");
    }, 700);
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 p-4 sm:p-6">
      <style>{`
				@keyframes shake {
					0%, 100% { transform: translateX(0); }
					25% { transform: translateX(-8px); }
					75% { transform: translateX(8px); }
				}
				.shake { animation: shake 0.3s ease-in-out 2; }
			`}</style>
      <Background />
      <div className="relative z-10 w-full max-w-xl">
        <div className="flex items-center justify-between py-4">
          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm font-semibold text-white/40 backdrop-blur">
            Quiz Susun Kata
          </div>
          <div className="rounded-full border border-white/10 bg-white/10 px-4 py-1 text-sm font-semibold text-white/80 backdrop-blur">
            {idx + 1} / {DATA.length}
          </div>
        </div>

        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 transition-all"
            style={{ width: `${(idx / DATA.length) * 100}%` }}
          />
        </div>

        <div
          className={`mt-6 rounded-[2rem] border p-6 shadow-2xl backdrop-blur-xl transition-colors sm:p-8 ${
            status === "correct"
              ? "border-emerald-400/50 bg-emerald-400/10"
              : status === "wrong"
                ? "border-red-500/60 bg-red-500/10"
                : "border-white/10 bg-white/5"
          }`}
        >
          <p className="flex items-center gap-2 text-sm font-medium text-white/50">
            <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
            Susun kalimat dengan drag kata-kata di bawah
          </p>
          <h1 className="mt-1.5 text-xl font-bold text-white sm:text-2xl">
            {q.hint}
          </h1>

          <div
            className={`mt-6 flex min-h-24 flex-wrap items-center gap-2 rounded-2xl border-2 border-dashed p-3 transition-colors ${
              status === "wrong"
                ? "shake border-red-500"
                : status === "correct"
                  ? "border-emerald-400/60 bg-emerald-400/5"
                  : over !== null
                    ? "border-fuchsia-400/80 bg-fuchsia-400/10"
                    : "border-white/20 bg-white/5"
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setOver(placed.length);
            }}
            onDragLeave={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node))
                setOver(null);
            }}
            onDrop={dropEnd}
            role="group"
          >
            {placed.length === 0 ? (
              <span className="px-2 py-3 text-sm text-white/35">
                Tarik kata ke sini untuk menyusun kalimat
              </span>
            ) : (
              placed.map((id, i) => (
                <div
                  key={id}
                  className="relative"
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setOver(i);
                  }}
                  onDrop={(e) => dropAt(e, i)}
                  role="group"
                >
                  {over === i && (
                    <div className="absolute -left-1.5 top-1/2 h-9 w-1 -translate-y-1/2 rounded-full bg-fuchsia-400" />
                  )}
                  <button
                    type="button"
                    draggable={status === "idle"}
                    onDragStart={(e) => startDrag(e, id, i)}
                    onDragEnd={endDrag}
                    className="cursor-grab select-none rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 px-3.5 py-2 font-semibold text-white shadow-lg shadow-fuchsia-500/20 transition hover:-translate-y-0.5 hover:shadow-xl active:cursor-grabbing"
                  >
                    {q.tiles[id].text}
                  </button>
                </div>
              ))
            )}
          </div>

          {status === "wrong" && (
            <p className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-red-400">
              <X size={16} /> Jawaban salah, coba susun ulang!
            </p>
          )}
        </div>

        <div
          className="mt-4 flex min-h-16 flex-wrap items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl"
          onDragOver={(e) => e.preventDefault()}
          onDrop={dropBank}
          role="group"
        >
          {displayBank.length === 0 ? (
            <span className="px-2 py-3 text-sm text-white/35">
              Semua kata sudah digunakan
            </span>
          ) : (
            displayBank.map((id) => (
              <button
                key={id}
                type="button"
                draggable={status === "idle"}
                onDragStart={(e) => startDrag(e, id, "bank")}
                onDragEnd={endDrag}
                className="cursor-grab select-none rounded-xl border border-white/15 bg-white/10 px-3.5 py-2 font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/15 active:cursor-grabbing"
              >
                {q.tiles[id].text}
              </button>
            ))
          )}
        </div>

        <button
          onClick={status === "correct" ? next : check}
          disabled={!complete || status === "wrong"}
          className={`mt-6 flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 text-lg font-extrabold transition active:scale-[0.98] ${
            status === "correct"
              ? "bg-gradient-to-r from-emerald-400 to-teal-400 text-emerald-950 shadow-lg shadow-emerald-400/25 hover:brightness-110"
              : complete
                ? "bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/25 hover:brightness-110"
                : "cursor-not-allowed border border-white/10 bg-white/5 text-white/25"
          }`}
          type="button"
        >
          {status === "correct" ? (
            <>
              <Check size={22} /> Lanjut
            </>
          ) : status === "wrong" ? (
            <>Silakan coba lagi</>
          ) : (
            <>
              Periksa <ArrowRight size={22} />
            </>
          )}
        </button>
      </div>
    </main>
  );
}

function Background() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <div className="absolute -left-32 -top-32 size-96 rounded-full bg-indigo-600/25 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 size-96 rounded-full bg-fuchsia-600/20 blur-3xl" />
      <div className="absolute left-1/2 top-1/3 size-72 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
    </div>
  );
}
