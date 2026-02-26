import { useState, useEffect, useRef } from "react";

const DEFAULT_AVATAR = "data:image/png;base64,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";
import imagenBrando from "./img/brando.jpeg";
import imagenBrahian from "./img/brahian.jpeg";
import imagenVanessa from "./img/vanessa.jpeg";
import imagenJenny from "./img/jenny.jpeg";
import imagenZule from "./img/zule.jpeg";
import imagenCristian from "./img/cristian.jpeg";
import imagenSofía from "./img/sofia.jpeg";
import imagenSebastián from "./img/sebastian.jpeg";
import imagenAndrea from "./img/andrea.jpeg";
import imagenJulieta from "./img/julieta.jpeg";
import imagenMaria from "./img/maria.jpeg";
import imagenJavier from "./img/javier.jpeg";
import imagenEdwin from "./img/edwin.jpeg";

const familyData = {
  parents: [
    { id: "maria", name: "Maria", role: "My Mother", age: 54, emoji: "👩", color: "#e91e8c", details: ["🏠 Homemaker", "📍 Ituango", "👨‍👩‍👧‍👦 Mother of 6"] },
    { id: "javier", name: "Javier", role: "My Father", age: 64, emoji: "👨", color: "#2196f3", details: ["🌾 Farm Manager", "📍 Ituango", "👨‍👩‍👧‍👦 Father of 6"] },
  ],
  siblings: [
    { id: "jenny", name: "Jenny", role: "Oldest Sister", age: 32, emoji: "👩‍💼", color: "#ff6b35", details: ["🍦 Paleta Business Owner", "🏛️ Collaborates with Alcaldía de Medellín", "👦👦👦 3 children", "📍 Medellín, Enciso"] },
    { id: "zule", name: "Zule", role: "Second Sister", age: 29, emoji: "🎧", color: "#9c27b0", details: ["📞 Call Center Advisor", "👧👧 2 daughters", "📍 Medellín, Enciso"] },
    { id: "edwin", name: "Edwin", role: "Older Brother", age: 26, emoji: "🔧", color: "#4caf50", details: ["🏍️ Motorcycle Mechanic Shop Owner", "📍 Medellín, Enciso (shared home)", "No children"] },
    { id: "brando", name: "Brando", role: "Me 👋", age: 22, emoji: "💻", color: "#ff9800", details: ["💻 Software Developer", "🏍️ Moto enthusiast", "📍 Medellín, Enciso (shared home)", "No children planned"], isMe: true },
    { id: "brahian", name: "Brahian", role: "Twin Brother", age: 22, emoji: "💻", color: "#00bcd4", details: ["💻 Software Developer", "👨‍👩‍👧 Dreams of an atomic family", "📍 Medellín, Enciso (shared home)", "No children yet"], isTwin: true },
    { id: "vanessa", name: "Vanessa", role: "Youngest Sister", age: 18, emoji: "👗", color: "#e91e63", details: ["👜 Works at Vélez (fashion brand)", "📍 Medellín, Enciso (shared home)", "Children planned far in the future"] },
  ],
  // Hijos de Jenny
  jennysKids: [
    { id: "jenny_kid1", name: "Cristian", role: "Jenny's Son", age: 19, emoji: "👦", color: "#ff6b35", isNephew: true, parentId: "jenny" },
    { id: "jenny_kid2", name: "Sofía", role: "Jenny's Daughter", age: 17, emoji: "👧", color: "#ff8c55", isNephew: true, parentId: "jenny" },
    { id: "jenny_kid3", name: "Sebastián", role: "Jenny's Son", age: 14, emoji: "👦", color: "#ffaa77", isNephew: true, parentId: "jenny" },
  ],
  // Hijas de Zule
  zulesKids: [
    { id: "zule_kid1", name: "Andrea", role: "Zule's Daughter", age: 15, emoji: "👧", color: "#9c27b0", isNiece: true, parentId: "zule" },
    { id: "zule_kid2", name: "Julieta", role: "Zule's Daughter", age: 5, emoji: "👧", color: "#c060d0", isNiece: true, parentId: "zule" },
  ],
};

// ─── Avatar ───────────────────────────────────────────────────────────────────
const Avatar = ({ person, size = 80, onClick, photos = {} }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ width: size, height: size, borderRadius: "50%", background: `radial-gradient(circle at 30% 30%, ${person.color}dd, ${person.color}88)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", border: `3px solid ${person.color}`, boxShadow: hovered ? `0 0 0 4px ${person.color}44, 0 8px 32px ${person.color}66` : `0 4px 16px ${person.color}44`, transform: hovered ? "scale(1.12)" : "scale(1)", transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)", position: "relative", flexShrink: 0, overflow: "hidden" }}>
      <span style={{ fontSize: size * 0.38, lineHeight: 1, position: "relative", zIndex: 2 }}>{person.emoji}</span>
      {person.isMe && <div style={{ position: "absolute", top: -4, right: -4, width: 18, height: 18, borderRadius: "50%", background: "#ffeb3b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, border: "2px solid #fff", zIndex: 3 }}>⭐</div>}
      {person.isTwin && <div style={{ position: "absolute", top: -4, right: -4, width: 18, height: 18, borderRadius: "50%", background: "#00bcd4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, border: "2px solid #fff", zIndex: 3 }}>♊</div>}
    </div>
  );
};

// ─── PersonCard (adults) ──────────────────────────────────────────────────────
const PersonCard = ({ person, onClick, photos = {} }) => (
  <div onClick={() => onClick(person)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, cursor: "pointer", padding: "12px 10px", borderRadius: 16, transition: "background 0.2s" }}
    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
    <Avatar person={person} size={72} photos={photos} />
    <div style={{ textAlign: "center" }}>
      <div style={{ color: "#fff", fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 13, letterSpacing: 0.5 }}>{person.name}</div>
      <div style={{ color: person.color, fontSize: 10, fontFamily: "'DM Sans', sans-serif", fontWeight: 500, marginTop: 2 }}>{person.role}</div>
      {person.age && <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, marginTop: 1 }}>{person.age} years</div>}
    </div>
  </div>
);

// ─── KidCard (sobrinos — solo emoji, nombre y foto en modal) ──────────────────
const KidCard = ({ kid, onClick, photos = {} }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div onClick={() => onClick(kid)} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer", padding: "8px 8px", borderRadius: 12, transition: "background 0.2s", background: hovered ? "rgba(255,255,255,0.06)" : "transparent" }}>
      <div style={{ width: 52, height: 52, borderRadius: "50%", background: `radial-gradient(circle at 30% 30%, ${kid.color}cc, ${kid.color}77)`, border: `2px solid ${kid.color}`, boxShadow: hovered ? `0 0 0 3px ${kid.color}44` : `0 2px 10px ${kid.color}33`, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", position: "relative", transform: hovered ? "scale(1.1)" : "scale(1)", transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)", flexShrink: 0 }}>
        <span style={{ fontSize: 22, position: "relative", zIndex: 2 }}>{kid.emoji}</span>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ color: "#fff", fontSize: 10, fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>{kid.name}</div>
        <div style={{ color: kid.color, fontSize: 9, fontFamily: "'DM Sans', sans-serif", marginTop: 1 }}>{kid.role}</div>
        {kid.age && <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 8, marginTop: 1 }}>{kid.age} yrs</div>}
      </div>
    </div>
  );
};

// ─── KidsGroup (fila de hijos bajo un hermano) ────────────────────────────────
const KidsGroup = ({ kids, onSelect, photos }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 12 }}>
    {/* vertical connector from sibling to kids section */}
    <div style={{ width: 2, height: 24, background: "linear-gradient(to bottom, rgba(255,255,255,0.25), rgba(255,255,255,0.1))" }} />
    {/* kids container with border */}
    <div style={{ padding: "8px 12px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.01)", display: "flex", gap: 6, position: "relative" }}>
      {/* top right corner angle */}
      <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", width: 2, height: 12, background: "linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,255,255,0.08))" }} />
      {kids.map((kid) => <KidCard key={kid.id} kid={kid} onClick={onSelect} photos={photos} />)}
    </div>
  </div>
);

// ─── Modal for adults ─────────────────────────────────────────────────────────
const Modal = ({ person, onClose, photos, onPhotoChange }) => {
  const [visible, setVisible] = useState(false);
  const [imgHovered, setImgHovered] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [zoomVisible, setZoomVisible] = useState(false);
  const [imageZoom, setImageZoom] = useState(1);

  useEffect(() => { if (person) setTimeout(() => setVisible(true), 10); }, [person]);
  const handleClose = () => { setVisible(false); setTimeout(onClose, 300); };
  const handleZoomOpen = (e) => { e.stopPropagation(); setImageZoom(1); setZoomed(true); setTimeout(() => setZoomVisible(true), 10); };
  const handleZoomClose = (e) => { e.stopPropagation(); setZoomVisible(false); setTimeout(() => setZoomed(false), 300); };
  const handleWheel = (e) => { e.preventDefault(); setImageZoom(Math.min(Math.max(imageZoom + (e.deltaY > 0 ? -0.1 : 0.1), 0.5), 3)); };

  if (!person) return null;
  const photo = photos[person.id];
  const isDefault = photo === DEFAULT_AVATAR;

  return (
    <div onClick={handleClose} style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", background: visible ? "rgba(0,0,0,0.88)" : "rgba(0,0,0,0)", backdropFilter: visible ? "blur(18px)" : "blur(0px)", transition: "all 0.3s ease", padding: 20 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)", borderRadius: 28, border: `2px solid ${person.color}55`, boxShadow: `0 32px 80px rgba(0,0,0,0.8), 0 0 60px ${person.color}22`, maxWidth: 460, width: "100%", transform: visible ? "scale(1) translateY(0)" : "scale(0.7) translateY(40px)", transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)", overflow: "hidden", position: "relative" }}>
        <div style={{ height: 6, background: `linear-gradient(90deg, ${person.color}, ${person.color}44, transparent)` }} />
        <div style={{ padding: "28px 28px 24px" }}>
          <button onClick={handleClose} style={{ position: "absolute", top: 18, right: 18, width: 32, height: 32, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.08)", color: "#fff", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}>×</button>
          <div style={{ display: "flex", gap: 20, marginBottom: 22, alignItems: "flex-start" }}>
            <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <div onMouseEnter={() => setImgHovered(true)} onMouseLeave={() => setImgHovered(false)}
                style={{ width: 110, height: 110, borderRadius: 18, border: `2px dashed ${imgHovered ? person.color : person.color + "66"}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", position: "relative", transition: "all 0.2s ease", boxShadow: !isDefault ? `0 0 20px ${person.color}44` : "none", background: isDefault ? `${person.color}11` : "transparent" }}>
                <img src={photo} alt={person.name} onClick={handleZoomOpen} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, opacity: imgHovered ? 1 : 0, transition: "opacity 0.2s", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, background: "rgba(0,0,0,0.6)" }}>
                  <button onClick={handleZoomOpen} style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", borderRadius: 8, padding: "4px 10px", fontSize: 10, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>🔍 View full</button>
                </div>
              </div>
            </div>
            <div style={{ flex: 1, paddingTop: 4 }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: "#fff", lineHeight: 1.1 }}>{person.name}</div>
              <div style={{ color: person.color, fontFamily: "'DM Sans', sans-serif", fontSize: 13, marginTop: 5, fontWeight: 500 }}>{person.role}</div>
              <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, marginTop: 3 }}>{person.age} years old</div>
            </div>
          </div>
          <div style={{ height: 1, background: `linear-gradient(to right, ${person.color}44, transparent)`, marginBottom: 18 }} />
          <p style={{ color: "rgba(255,255,255,0.8)", fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, lineHeight: 1.7, margin: "0 0 18px" }}>{person.description}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
            {person.details.map((d, i) => <span key={i} style={{ background: `${person.color}1a`, border: `1px solid ${person.color}44`, color: "#fff", borderRadius: 20, padding: "5px 12px", fontSize: 11, fontFamily: "'DM Sans', sans-serif" }}>{d}</span>)}
          </div>
        </div>
        {zoomed && (
          <div onClick={handleZoomClose} onWheel={handleWheel} style={{ position: "fixed", inset: 0, zIndex: 2000, background: zoomVisible ? "rgba(0,0,0,0.98)" : "rgba(0,0,0,0)", backdropFilter: zoomVisible ? "blur(20px)" : "blur(0px)", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s ease", padding: 0, overflow: "hidden", cursor: imageZoom > 1 ? "grab" : "pointer" }}>
            <button onClick={handleZoomClose} style={{ position: "absolute", top: 20, right: 20, width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.1)", color: "#fff", cursor: "pointer", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2001 }}>×</button>
            <img src={photo} alt={person.name} onClick={(e) => e.stopPropagation()} style={{ width: "100vw", height: "100vh", border: "none", boxShadow: "none", transform: `scale(${imageZoom})`, transition: "transform 0.2s ease", objectFit: "contain", cursor: imageZoom > 1 ? "grab" : "pointer" }} />
            <div style={{ position: "absolute", bottom: 28, color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: 1, opacity: zoomVisible ? 1 : 0, transition: "opacity 0.5s ease 0.2s", pointerEvents: "none" }}>Scroll para zoom · Click para cerrar</div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── KidModal — solo foto grande, nombre y botón para cambiar foto ─────────────
const KidModal = ({ kid, onClose, photos, onPhotoChange }) => {
  const [visible, setVisible] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [zoomVisible, setZoomVisible] = useState(false);
  const [imageZoom, setImageZoom] = useState(1);

  useEffect(() => { if (kid) setTimeout(() => setVisible(true), 10); }, [kid]);
  const handleClose = () => { setVisible(false); setTimeout(onClose, 300); };
  const handleZoomOpen = (e) => { e.stopPropagation(); setImageZoom(1); setZoomed(true); setTimeout(() => setZoomVisible(true), 10); };
  const handleZoomClose = (e) => { e.stopPropagation(); setZoomVisible(false); setTimeout(() => setZoomed(false), 300); };
  const handleWheel = (e) => { e.preventDefault(); setImageZoom(Math.min(Math.max(imageZoom + (e.deltaY > 0 ? -0.1 : 0.1), 0.5), 3)); };

  if (!kid) return null;
  const photo = photos[kid.id] || DEFAULT_AVATAR;
  const isDefault = photo === DEFAULT_AVATAR;

  return (
    <div onClick={handleClose} style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", background: visible ? "rgba(0,0,0,0.9)" : "rgba(0,0,0,0)", backdropFilter: visible ? "blur(20px)" : "blur(0px)", transition: "all 0.3s ease", padding: 20 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)", borderRadius: 28, border: `2px solid ${kid.color}55`, boxShadow: `0 32px 80px rgba(0,0,0,0.8), 0 0 60px ${kid.color}22`, maxWidth: 340, width: "100%", transform: visible ? "scale(1) translateY(0)" : "scale(0.7) translateY(40px)", transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)", overflow: "hidden", position: "relative" }}>
        <div style={{ height: 5, background: `linear-gradient(90deg, ${kid.color}, ${kid.color}44, transparent)` }} />
        <button onClick={handleClose} style={{ position: "absolute", top: 14, right: 14, width: 30, height: 30, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.08)", color: "#fff", cursor: "pointer", fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}>×</button>
        <div style={{ padding: "24px 24px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          {/* Big photo */}
          <div onClick={handleZoomOpen} style={{ width: 180, height: 180, borderRadius: 20, overflow: "hidden", border: `3px solid ${kid.color}`, boxShadow: `0 0 30px ${kid.color}44`, cursor: "pointer", position: "relative", background: `${kid.color}22`, flexShrink: 0 }}>
            <img src={photo} alt={kid.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transition: "opacity 0.2s" }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
              onMouseLeave={(e) => e.currentTarget.style.opacity = 0}>
              <span style={{ fontSize: 28 }}>🔍</span>
            </div>
          </div>
          {/* Name */}
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#fff" }}>{kid.name}</div>
            <div style={{ color: kid.color, fontSize: 12, fontFamily: "'DM Sans', sans-serif", marginTop: 4 }}>{kid.role}</div>
            {kid.age && <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, marginTop: 3 }}>{kid.age} years old</div>}
          </div>
        </div>
        {zoomed && (
          <div onClick={handleZoomClose} onWheel={handleWheel} style={{ position: "fixed", inset: 0, zIndex: 2000, background: zoomVisible ? "rgba(0,0,0,0.98)" : "rgba(0,0,0,0)", backdropFilter: zoomVisible ? "blur(20px)" : "blur(0px)", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s ease", padding: 0, overflow: "hidden", cursor: imageZoom > 1 ? "grab" : "pointer" }}>
            <button onClick={handleZoomClose} style={{ position: "absolute", top: 20, right: 20, width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.1)", color: "#fff", cursor: "pointer", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2001 }}>×</button>
            <img src={photo} alt={kid.name} onClick={(e) => e.stopPropagation()} style={{ width: "100vw", height: "100vh", border: "none", boxShadow: "none", transform: `scale(${imageZoom})`, transition: "transform 0.2s ease", objectFit: "contain", cursor: imageZoom > 1 ? "grab" : "pointer" }} />
            <div style={{ position: "absolute", bottom: 28, color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif", fontSize: 12, opacity: zoomVisible ? 1 : 0, transition: "opacity 0.5s ease 0.2s", pointerEvents: "none" }}>Scroll para zoom · Click para cerrar</div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function FamilyTree() {
  const [selected, setSelected] = useState(null);
  const [selectedKid, setSelectedKid] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const allKidIds = [...familyData.jennysKids, ...familyData.zulesKids].map(k => k.id);
  const defaultPhotos = {
    maria: imagenMaria,
    javier: imagenJavier,
    jenny: imagenJenny,
    zule: imagenZule,
    edwin: imagenEdwin,
    brando: imagenBrando,
    brahian: imagenBrahian,
    vanessa: imagenVanessa,
    jenny_kid1: imagenCristian,
    jenny_kid2: imagenSofía,
    jenny_kid3: imagenSebastián,
    zule_kid1: imagenAndrea,
    zule_kid2: imagenJulieta,
  };
  const [photos, setPhotos] = useState(defaultPhotos);
  const handlePhotoChange = (id, dataUrl) => setPhotos((prev) => ({ ...prev, [id]: dataUrl }));

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@400;500;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    setTimeout(() => setLoaded(true), 100);
  }, []);

  // Map siblings to their kids
  const kidsMap = {
    jenny: familyData.jennysKids,
    zule: familyData.zulesKids,
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0a0a1a 0%, #0d1b2a 40%, #0a1628 70%, #0c0c1e 100%)", fontFamily: "'DM Sans', sans-serif", padding: "40px 20px 60px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "fixed", top: -200, right: -200, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(233,30,140,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "fixed", bottom: -150, left: -150, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(33,150,243,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 48, opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(-20px)", transition: "all 0.6s ease" }}>
        <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, letterSpacing: 4, marginBottom: 8, textTransform: "uppercase" }}>English Presentation</div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, color: "#fff", margin: 0, letterSpacing: -1 }}>My Family Tree</h1>
        <p style={{ color: "rgba(255,255,255,0.4)", margin: "10px 0 0", fontSize: 13 }}>Click on any family member to learn more</p>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", opacity: loaded ? 1 : 0, transition: "opacity 0.8s ease 0.3s" }}>
        {/* PARENTS */}
        <div style={{ display: "flex", justifyContent: "center", gap: 60 }}>
          {familyData.parents.map((p) => <PersonCard key={p.id} person={p} onClick={setSelected} photos={photos} />)}
        </div>

        {/* Parent → children connector */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <div style={{ position: "relative", width: "100%" }}>
            {/* Lines from parents down */}
            <div style={{ display: "flex", justifyContent: "center", gap: "240px", paddingX: 60 }}>
              <div style={{ width: 2, height: 50, background: "linear-gradient(to bottom, #e91e8c66, #e91e8c22)" }} />
              <div style={{ width: 2, height: 50, background: "linear-gradient(to bottom, #2196f366, #2196f322)" }} />
            </div>
            {/* Horizontal line connecting parents */}
            <div style={{ position: "absolute", top: 50, left: "20%", right: "20%", height: 2, background: "linear-gradient(to right, #e91e8c44, rgba(255,255,255,0.1), #2196f344)", pointerEvents: "none" }} />
            {/* Center vertical line down */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ width: 2, height: 30, background: "linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,255,255,0.05))" }} />
            </div>
          </div>
        </div>

        {/* Children label */}
        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, letterSpacing: 3, textTransform: "uppercase" }}>Children</span>
        </div>

        {/* Horizontal siblings bar with better distribution */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 30 }}>
          <div style={{ width: "calc(100% - 40px)", height: 2, background: "linear-gradient(to right, transparent, rgba(255,255,255,0.2) 5%, rgba(255,255,255,0.2) 95%, transparent)", position: "relative" }}>
            {familyData.siblings.map((_, i) => (
              <div key={i} style={{ position: "absolute", top: -9, left: `calc(${(i / (familyData.siblings.length - 1)) * 100}% - 1px)`, width: 2, height: 20, background: "linear-gradient(to bottom, rgba(255,255,255,0.3), rgba(255,255,255,0.1))", borderRadius: 1 }} />
            ))}
          </div>
        </div>

        {/* SIBLINGS + their kids below */}
        <div style={{ display: "flex", justifyContent: "center", overflowX: "auto", paddingBottom: 10, gap: 0 }}>
          {familyData.siblings.map((s) => (
            <div key={s.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
              {s.isMe && <div style={{ position: "absolute", top: 36, right: -12, width: 24, height: 2, background: "linear-gradient(to right, #ff9800, #00bcd4)", zIndex: 5 }} />}
              <PersonCard person={s} onClick={setSelected} photos={photos} />
              {kidsMap[s.id] && <KidsGroup kids={kidsMap[s.id]} onSelect={setSelectedKid} photos={photos} />}
            </div>
          ))}
        </div>

        {/* Twin badge */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
          <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "4px 14px", fontSize: 10, color: "rgba(255,255,255,0.5)", letterSpacing: 1 }}>♊ Brando & Brahian are twins</div>
        </div>

        {/* Location tags */}
        <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 32, flexWrap: "wrap" }}>
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "10px 20px", fontSize: 12, color: "rgba(255,255,255,0.5)", display: "flex", alignItems: "center", gap: 8 }}>
            <span>🏡</span><span><strong style={{ color: "rgba(255,255,255,0.8)" }}>Maria & Javier</strong> — Ituango</span>
          </div>
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "10px 20px", fontSize: 12, color: "rgba(255,255,255,0.5)", display: "flex", alignItems: "center", gap: 8 }}>
            <span>🏙️</span><span><strong style={{ color: "rgba(255,255,255,0.8)" }}>All siblings</strong> — Medellín, Barrio Enciso</span>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 12 }}>
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px dashed rgba(255,255,255,0.08)", borderRadius: 12, padding: "8px 20px", fontSize: 11, color: "rgba(255,255,255,0.35)", textAlign: "center", maxWidth: 540 }}>
            Jenny & Zule live with their children 👦👧 · Edwin, Brando, Brahian & Vanessa share the same home 🏠
          </div>
        </div>
      </div>

      <Modal person={selected} onClose={() => setSelected(null)} photos={photos} onPhotoChange={handlePhotoChange} />
      <KidModal kid={selectedKid} onClose={() => setSelectedKid(null)} photos={photos} onPhotoChange={handlePhotoChange} />
    </div>
  );
}
