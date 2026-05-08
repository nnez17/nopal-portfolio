"use client";

import { useEffect, useState, useRef } from "react";

const LETTER = `Kharin...

Aku tau kamu mungkin masih sakit hati. Dan aku nggak akan nyalahin kamu buat itu.

Waktu kamu cerita ke aku tadi — kamu lagi sedih, kamu butuh seseorang buat dengerin kamu, kamu percaya sama aku buat nampung semua itu — dan aku malah jadiin bahan bercanda.

Itu salah aku. Sepenuhnya.

Aku nggak punya alasan yang bisa nge-justify itu. Nggak ada yang bisa. Kamu lagi di titik yang rapuh, kamu milih aku, dan aku malah bikin kamu ngerasa nggak didengar. Nggak dihargai. Mungkin bahkan ngerasa kayak perasaan kamu nggak penting.

Perasaan kamu penting, Kharin. Sangat penting.

Dan aku minta maaf — bukan karena aku takut kamu marah, tapi karena aku beneran nyesel. Nyesel banget. Aku harusnya lebih peka. Harusnya ngerti kapan waktunya serius. Harusnya jadi tempat yang aman buat kamu, bukan malah bikin kamu ngerasa sebaliknya.

Aku tau minta maaf doang nggak langsung ngapus rasa sakitnya. Tapi aku mau kamu tau — aku nggak mau jadi orang yang bikin kamu ngerasa nggak aman buat cerita. Kamu berhak punya tempat curhat yang beneran dengerin. Dan aku mau jadi tempat itu.

Jadi kalau kamu masih mau cerita ke aku — tentang apapun, kapanpun — aku akan dengerin. Beneran. Tanpa bercanda, tanpa nge-skip, tanpa bikin kamu ngerasa kecil.

Kamu nggak harus langsung percaya lagi. Aku ngerti itu. Tapi aku harap kamu kasih aku kesempatan buat buktiin.

Maafin aku ya, sayang.

— Nopal 🤍`;

function getDelay(char: string, prev: string): number {
  if (char === "\n") return 60;
  if ([".", "?", "!"].includes(char)) return 140;
  if (char === ",") return 75;
  if (char === " " && prev === "\n") return 20;
  return 24;
}

type Particle = {
  id: number;
  x: number;
  delay: number;
  dur: number;
  size: number;
};

export default function SorryPage() {
  const [displayed, setDisplayed] = useState("");
  const [idx, setIdx] = useState(0);
  const [done, setDone] = useState(false);
  const [showEnding, setShowEnding] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setParticles(
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 12,
        dur: 8 + Math.random() * 8,
        size: 10 + Math.random() * 10,
      })),
    );
  }, []);

  useEffect(() => {
    if (idx >= LETTER.length) {
      setDone(true);
      setTimeout(() => setShowEnding(true), 800);
      return;
    }
    const prev = LETTER[idx - 1] ?? "";
    const t = setTimeout(
      () => {
        setDisplayed(LETTER.slice(0, idx + 1));
        setIdx((i) => i + 1);
      },
      idx === 0 ? 1000 : getDelay(LETTER[idx], prev),
    );
    return () => clearTimeout(t);
  }, [idx]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll to bottom when text updates
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [displayed]);

  const renderBody = () => {
    return displayed.split("\n\n").map((para, i) => {
      if (!para) return null;
      const isOpening = i === 0;
      const isClosing = para.startsWith("—");
      const isHighlight =
        para.startsWith("Itu salah aku") ||
        para.startsWith("Perasaan kamu penting");

      return (
        <p
          // biome-ignore lint/suspicious/noArrayIndexKey: order is static
          key={`para-${i}`}
          style={{
            lineHeight: 1.9,
            marginTop: i === 0 ? 0 : 20,
            fontSize: isOpening ? 22 : 15,
            fontWeight: isOpening ? 600 : isHighlight ? 500 : 400,
            color: isOpening
              ? "rgba(255,255,255,0.92)"
              : isClosing
                ? "rgba(255,255,255,0.4)"
                : isHighlight
                  ? "rgba(255,255,255,0.85)"
                  : "rgba(255,255,255,0.55)",
            textAlign: isClosing ? "right" : "left",
            fontStyle: isClosing ? "italic" : "normal",
            borderLeft: isHighlight ? "2px solid rgba(244,63,94,0.45)" : "none",
            paddingLeft: isHighlight ? 14 : 0,
          }}
        >
          {para.split("\n").map((line, j, arr) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: order is static
            <span key={`line-${i}-${j}`}>
              {line}
              {j < arr.length - 1 && <br />}
            </span>
          ))}
        </p>
      );
    });
  };

  const progress = Math.round((idx / LETTER.length) * 100);

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { background: #030303; min-height: 100vh; }
        body { font-family: 'Inter', -apple-system, sans-serif; }

        .blob {
          position: fixed; border-radius: 50%;
          filter: blur(130px); pointer-events: none; z-index: 0;
        }
        .glass {
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 24px;
        }
        .badge {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 5px 14px; border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04);
          font-size: 12px; color: rgba(255,255,255,0.45);
          letter-spacing: 0.05em;
        }
        .badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #f43f5e; box-shadow: 0 0 8px #f43f5e;
          animation: dotpulse 2s ease-in-out infinite;
        }
        @keyframes dotpulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.35;transform:scale(0.75)} }

        .grad-white {
          background: linear-gradient(135deg,#fff 0%,rgba(255,255,255,0.5) 100%);
          -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent;
        }
        .grad-rose {
          background: linear-gradient(135deg,#fda4af 0%,#fb7185 40%,#f43f5e 100%);
          -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent;
        }

        .cursor {
          display:inline-block; width:2px; height:16px;
          background:rgba(255,255,255,0.5); margin-left:2px;
          vertical-align:middle; animation:blink 0.85s step-end infinite;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

        .progress-track { width:100%; height:2px; background:rgba(255,255,255,0.05); border-radius:999px; overflow:hidden; }
        .progress-fill  { height:100%; background:linear-gradient(90deg,#f43f5e,#fb7185); border-radius:999px; transition:width 0.3s ease; }

        .scroll-area::-webkit-scrollbar { width: 3px; }
        .scroll-area::-webkit-scrollbar-track { background: transparent; }
        .scroll-area::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.07); border-radius: 3px; }
        .scroll-area { scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.07) transparent; }

        @keyframes petalfall {
          0%   { transform:translateY(-50px) rotate(0deg) translateX(0); opacity:0; }
          10%  { opacity:0.65; }
          50%  { transform:translateY(50vh) rotate(180deg) translateX(18px); }
          90%  { opacity:0.4; }
          100% { transform:translateY(110vh) rotate(360deg) translateX(-12px); opacity:0; }
        }

        @keyframes fadeup { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        .fade-up { animation: fadeup 0.9s ease forwards; }
        @keyframes heartbeat { 0%,100%{transform:scale(1)} 20%{transform:scale(1.3)} 40%{transform:scale(1)} 60%{transform:scale(1.2)} }
        .heart { display:inline-block; animation:heartbeat 1.8s ease-in-out infinite; }

        .skip-btn {
          display:inline-flex; align-items:center; gap:6px;
          padding:8px 18px; border-radius:10px;
          border:1px solid rgba(255,255,255,0.08);
          background:rgba(255,255,255,0.04);
          color:rgba(255,255,255,0.4); font-size:12px;
          cursor:pointer; transition:all 0.2s; outline:none; font-family:inherit;
        }
        .skip-btn:hover { background:rgba(255,255,255,0.08); color:rgba(255,255,255,0.7); border-color:rgba(255,255,255,0.14); }

        .label { font-size:10px; letter-spacing:0.14em; text-transform:uppercase; color:rgba(255,255,255,0.2); margin-bottom:20px; }
        .divider { border:none; border-top:1px solid rgba(255,255,255,0.05); margin:22px 0; }
        .stat-num { font-size:20px; font-weight:700; color:#fff; }
        .stat-label { font-size:10px; color:rgba(255,255,255,0.3); letter-spacing:0.04em; margin-top:4px; }
      `}</style>

      {/* Blobs */}
      <div
        className="blob"
        style={{
          width: 560,
          height: 560,
          top: "-15%",
          left: "-12%",
          background: "rgba(244,63,94,0.07)",
        }}
      />
      <div
        className="blob"
        style={{
          width: 480,
          height: 480,
          bottom: "-12%",
          right: "-8%",
          background: "rgba(251,113,133,0.05)",
        }}
      />
      <div
        className="blob"
        style={{
          width: 300,
          height: 300,
          top: "45%",
          left: "50%",
          background: "rgba(253,164,175,0.04)",
        }}
      />

      {/* Petals */}
      {particles.map((p) => (
        <span
          key={p.id}
          style={{
            position: "fixed",
            top: -50,
            left: `${p.x}%`,
            fontSize: p.size,
            zIndex: 5,
            pointerEvents: "none",
            userSelect: "none",
            animation: `petalfall ${p.dur}s ${p.delay}s ease-in-out infinite`,
          }}
        >
          🌸
        </span>
      ))}

      {/* Main */}
      <main
        style={{
          minHeight: "100vh",
          padding: "clamp(40px,8vw,80px) clamp(18px,5vw,24px) 80px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          zIndex: 10,
          maxWidth: 680,
          margin: "0 auto",
        }}
      >
        {/* Hero */}
        <div style={{ width: "100%", textAlign: "center", marginBottom: 36 }}>
          <div style={{ marginBottom: 18 }}>
            <span className="badge">
              <span className="badge-dot" />
              Untuk Kharinnn yang tersayang
            </span>
          </div>
          <h1
            style={{
              fontSize: "clamp(1.8rem,6vw,3rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              marginBottom: 12,
            }}
          >
            <span className="grad-white">Maaf udah bikin kamu </span>
            <span className="grad-rose">sakit hati</span>
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.3)",
              fontSize: 14,
              lineHeight: 1.6,
            }}
          >
            Just someone who should have listened, not joked
          </p>
        </div>

        {/* Progress bar */}
        {!done && (
          <div style={{ width: "100%", marginBottom: 12 }}>
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Letter card */}
        <div
          className="glass"
          style={{ width: "100%", padding: "clamp(24px,5vw,44px)" }}
        >
          <p className="label">— surat untukmu —</p>

          <div
            ref={scrollRef}
            className="scroll-area"
            style={{ maxHeight: "54vh", overflowY: "auto", paddingRight: 4 }}
          >
            <div style={{ fontFamily: "'Georgia','Times New Roman',serif" }}>
              {renderBody()}
              {!done && <span className="cursor" />}
            </div>

            {showEnding && (
              <div
                className="fade-up"
                style={{ marginTop: 40, textAlign: "center" }}
              >
                <div style={{ marginBottom: 10, fontSize: 38 }}>
                  <span className="heart">❤️</span>
                </div>
                <p
                  style={{
                    color: "rgba(255,255,255,0.2)",
                    fontSize: 11,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  dibuat dengan cinta, khusus buat kamu
                </p>
              </div>
            )}
          </div>

          <hr className="divider" />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            <span
              style={{
                color: "rgba(255,255,255,0.18)",
                fontSize: 11,
                letterSpacing: "0.04em",
              }}
            >
              {done ? "✓ selesai dibaca" : `mengetik... ${progress}%`}
            </span>
            {!done && (
              <button
                type="button"
                className="skip-btn"
                onClick={() => {
                  setDisplayed(LETTER);
                  setIdx(LETTER.length);
                }}
              >
                Langsung lihat semua →
              </button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div
          className="glass"
          style={{
            width: "100%",
            marginTop: 14,
            padding: "18px 32px",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {[
            { num: "∞", label: "Rasa Sayang" },
            { num: "1×", label: "Permintaan Maaf" },
            { num: "100%", label: "Tulus" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div className="stat-num">{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p
          style={{
            marginTop: 28,
            color: "rgba(255,255,255,0.12)",
            fontSize: 11,
            textAlign: "center",
            letterSpacing: "0.04em",
          }}
        >
          © {new Date().getFullYear()} Noval · Made within Indonesia 🇮🇩
        </p>
      </main>
    </>
  );
}
