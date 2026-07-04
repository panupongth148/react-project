import { useState, useEffect, useRef } from "react";
import { Coffee, MapPin, Clock, ArrowRight, Plus, Check } from "lucide-react";

const TOKENS = {
  bg: "#1B1712",
  bgAlt: "#221C15",
  panel: "#28211A",
  paper: "#F2EBDD",
  ink: "#F2EBDD",
  inkMuted: "rgba(242,235,221,0.62)",
  inkFaint: "rgba(242,235,221,0.36)",
  accent: "#E3A23A",
  accent2: "#6E9280",
  line: "rgba(242,235,221,0.14)",
};

const NOTES = ["citrus", "caramel", "stone fruit", "dark cocoa", "toasted almond"];

const MENU = [
  {
    name: "Espresso",
    note: "bright, syrupy, citrus finish",
    price: 55,
    tone: TOKENS.accent,
  },
  {
    name: "Latte",
    note: "steamed milk, soft caramel",
    price: 65,
    tone: TOKENS.accent,
  },
  {
    name: "Cappuccino",
    note: "thick foam, cocoa dust",
    price: 65,
    tone: TOKENS.accent,
  },
  {
    name: "Iced coffee",
    note: "cold brewed, stone fruit",
    price: 60,
    tone: TOKENS.accent2,
  },
];

const STEPS = [
  { n: "01", title: "แตะสั่งบนหน้าจอ", body: "เลือกเมนู เลือกความหวาน กดยืนยันครั้งเดียว" },
  { n: "02", title: "บาริสต้าเห็นทันที", body: "ออเดอร์ขึ้นจอหลังร้านทันทีที่คุณกดส่ง" },
  { n: "03", title: "ฟังเลขที่เรียก", body: "ตั๋วของคุณจะขึ้นคิว รอฟังเลขแล้วมารับได้เลย" },
];

function useGoogleFonts() {
  useEffect(() => {
    const id = "smart-cafe-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,500;0,600;1,500&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap";
    document.head.appendChild(link);
  }, []);
}

function TicketStub() {
  const [num, setNum] = useState(47);
  const [noteIdx, setNoteIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setNum((n) => (n >= 99 ? 40 : n + 1)), 4000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setNoteIdx((i) => (i + 1) % NOTES.length), 2600);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 320,
        background: TOKENS.paper,
        color: TOKENS.bg,
        borderRadius: 4,
        padding: "28px 24px 24px",
        fontFamily: "'JetBrains Mono', monospace",
        boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -9,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-evenly",
        }}
        aria-hidden="true"
      >
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: TOKENS.bg,
            }}
          />
        ))}
      </div>

      <p style={{ fontSize: 11, letterSpacing: "0.14em", margin: 0, opacity: 0.55 }}>
        SMART CAFE · ORDER TICKET
      </p>

      <div style={{ display: "flex", alignItems: "baseline", gap: 10, margin: "14px 0 6px" }}>
        <span style={{ fontSize: 12, opacity: 0.55 }}>NOW SERVING</span>
      </div>
      <p
        style={{
          fontSize: 56,
          fontWeight: 500,
          margin: 0,
          lineHeight: 1,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        #{num}
      </p>

      <div
        style={{
          borderTop: `1px dashed ${TOKENS.bg}55`,
          marginTop: 18,
          paddingTop: 14,
          display: "flex",
          justifyContent: "space-between",
          fontSize: 12,
        }}
      >
        <span style={{ opacity: 0.55 }}>TASTING NOTE</span>
        <span style={{ fontWeight: 500, transition: "opacity 0.3s" }}>{NOTES[noteIdx]}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginTop: 6 }}>
        <span style={{ opacity: 0.55 }}>EST. WAIT</span>
        <span style={{ fontWeight: 500 }}>4 min</span>
      </div>
    </div>
  );
}

export default function Home() {
  useGoogleFonts();
  const [orderCount, setOrderCount] = useState(0);
  const [addedId, setAddedId] = useState(null);
  const menuRef = useRef(null);

  const handleAdd = (idx) => {
    setOrderCount((c) => c + 1);
    setAddedId(idx);
    setTimeout(() => setAddedId((cur) => (cur === idx ? null : cur)), 900);
  };

  const scrollToMenu = () => {
    menuRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      style={{
        background: TOKENS.bg,
        color: TOKENS.ink,
        fontFamily: "'Inter', sans-serif",
        minHeight: "100vh",
      }}
    >
      {/* Nav */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: `${TOKENS.bg}E6`,
          backdropFilter: "blur(8px)",
          borderBottom: `1px solid ${TOKENS.line}`,
        }}
      >
        <div
          style={{
            maxWidth: 1120,
            margin: "0 auto",
            padding: "16px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: TOKENS.accent,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Coffee size={17} color={TOKENS.bg} aria-hidden="true" />
            </div>
            <span
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              Smart Cafe
            </span>
          </div>

          <nav style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <a
              href="#menu"
              onClick={(e) => {
                e.preventDefault();
                scrollToMenu();
              }}
              style={{ color: TOKENS.inkMuted, fontSize: 14, textDecoration: "none" }}
            >
              เมนู
            </a>
            <span style={{ color: TOKENS.inkFaint, fontSize: 14 }}>วิธีสั่ง</span>
            <span style={{ color: TOKENS.inkFaint, fontSize: 14 }}>สาขา</span>
            <button
              onClick={scrollToMenu}
              style={{
                background: TOKENS.accent,
                color: TOKENS.bg,
                border: "none",
                borderRadius: 999,
                padding: "9px 18px",
                fontSize: 14,
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                gap: 6,
                cursor: "pointer",
              }}
            >
              สั่งเลย <ArrowRight size={14} aria-hidden="true" />
            </button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "72px 24px 88px",
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: 56,
          alignItems: "center",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              letterSpacing: "0.16em",
              color: TOKENS.accent,
              margin: "0 0 18px",
            }}
          >
            คั่วเช้านี้ · ชงตอนคุณกดสั่ง
          </p>
          <h1
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: 48,
              lineHeight: 1.12,
              fontWeight: 600,
              margin: "0 0 20px",
            }}
          >
            สั่งกาแฟก่อนถึงร้าน{" "}
            <em style={{ color: TOKENS.accent, fontStyle: "italic" }}>รอแค่ตั๋วเรียกเลข</em>
          </h1>
          <p
            style={{
              fontSize: 16,
              color: TOKENS.inkMuted,
              lineHeight: 1.7,
              maxWidth: 440,
              margin: "0 0 32px",
            }}
          >
            กดเมนูจากมือถือ ออเดอร์ขึ้นหลังร้านทันที บาริสต้าเริ่มชงโดยไม่ต้องรอคิวเข้าคุย
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <button
              onClick={scrollToMenu}
              style={{
                background: TOKENS.paper,
                color: TOKENS.bg,
                border: "none",
                borderRadius: 8,
                padding: "13px 22px",
                fontSize: 15,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              ดูเมนูทั้งหมด
            </button>
            <span style={{ fontSize: 13, color: TOKENS.inkFaint }}>
              เปิดทุกวัน 07:00–19:00
            </span>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <TicketStub />
        </div>
      </section>

      {/* Origin / tasting strip */}
      <section style={{ borderTop: `1px solid ${TOKENS.line}`, borderBottom: `1px solid ${TOKENS.line}` }}>
        <div
          style={{
            maxWidth: 1120,
            margin: "0 auto",
            padding: "22px 24px",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          {[
            ["ORIGIN", "เชียงราย"],
            ["ALTITUDE", "1,200 ม."],
            ["PROCESS", "Washed"],
            ["ROAST DATE", "วันนี้"],
          ].map(([label, val]) => (
            <div key={label}>
              <p style={{ fontSize: 11, letterSpacing: "0.1em", color: TOKENS.inkFaint, margin: "0 0 4px" }}>
                {label}
              </p>
              <p style={{ fontSize: 14, margin: 0 }}>{val}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Menu */}
      <section ref={menuRef} id="menu" style={{ maxWidth: 1120, margin: "0 auto", padding: "72px 24px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 32 }}>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 600, margin: 0 }}>
            เมนูวันนี้
          </h2>
          {orderCount > 0 && (
            <span style={{ fontSize: 13, color: TOKENS.accent, fontFamily: "'JetBrains Mono', monospace" }}>
              {orderCount} รายการในตะกร้า
            </span>
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 16 }}>
          {MENU.map((item, idx) => (
            <div
              key={item.name}
              style={{
                background: TOKENS.panel,
                border: `1px solid ${TOKENS.line}`,
                borderRadius: 12,
                padding: "20px 18px",
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: `${item.tone}22`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Coffee size={17} color={item.tone} aria-hidden="true" />
              </div>
              <div>
                <p style={{ fontSize: 16, fontWeight: 500, margin: "0 0 4px" }}>{item.name}</p>
                <p style={{ fontSize: 13, color: TOKENS.inkMuted, margin: 0, lineHeight: 1.5 }}>
                  {item.note}
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 15 }}>
                  ฿{item.price}
                </span>
                <button
                  onClick={() => handleAdd(idx)}
                  aria-label={`เพิ่ม ${item.name}`}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    border: `1px solid ${TOKENS.line}`,
                    background: addedId === idx ? TOKENS.accent : "transparent",
                    color: addedId === idx ? TOKENS.bg : TOKENS.ink,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "background 0.2s, color 0.2s",
                  }}
                >
                  {addedId === idx ? <Check size={15} /> : <Plus size={15} />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{ borderTop: `1px solid ${TOKENS.line}` }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "72px 24px" }}>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 600, margin: "0 0 32px" }}>
            สั่งยังไง
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0 }}>
            {STEPS.map((s, i) => (
              <div
                key={s.n}
                style={{
                  padding: "0 24px",
                  borderLeft: i === 0 ? "none" : `1px dashed ${TOKENS.line}`,
                }}
              >
                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 13,
                    color: TOKENS.accent,
                    margin: "0 0 10px",
                  }}
                >
                  {s.n}
                </p>
                <p style={{ fontSize: 16, fontWeight: 500, margin: "0 0 8px" }}>{s.title}</p>
                <p style={{ fontSize: 14, color: TOKENS.inkMuted, lineHeight: 1.6, margin: 0 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${TOKENS.line}` }}>
        <div
          style={{
            maxWidth: 1120,
            margin: "0 auto",
            padding: "32px 24px",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
            fontSize: 13,
            color: TOKENS.inkFaint,
          }}
        >
          <span style={{ fontFamily: "'Fraunces', serif", color: TOKENS.inkMuted }}>Smart Cafe</span>
          <div style={{ display: "flex", gap: 20 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <MapPin size={14} aria-hidden="true" /> สาขาสมุทรปราการ
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Clock size={14} aria-hidden="true" /> 07:00–19:00
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
