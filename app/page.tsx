"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Globe, Play, Terminal, Folder, Volume2, Sun, AppWindow, Clipboard, Code, Bell, Mouse, Music, Mic,
  Sparkles, Brain, Wrench, Lock, Hand, Link2, Shuffle, ShieldCheck, Cpu, Ear, Smile, CircleDot, Mail,
  PartyPopper, Heart, Bot, Star, Loader2,
} from "lucide-react";

const PHOTOS = [
  ["/photos/image.jpeg", "Knoc8 held in a hand", "Fits in your palm"],
  ["/photos/image3.jpeg", "Knoc8 side view", "Say hi to the ears"],
  ["/photos/image2.jpeg", "Knoc8 front view", "Look, it's smiling"],
];
const STEPS = ["run: mkdir backend", "run: npm init -y", "create_folder: routes"];
const LABEL = { idle: "hold to talk", listening: "listening…", thinking: "thinking…", working: "", speaking: "all done, sir!" };
const BUBBLE = {
  idle: "Hi! Press my button!", listening: "I'm all ears!", thinking: "Hmm, let me think…",
  working: "On it, boss!", speaking: "Ta-da! Anything else?",
};

function Demo() {
  const [state, setState] = useState("idle");
  const [step, setStep] = useState(STEPS[0]);
  const timers = useRef([]);
  const robot = useRef(null);
  const clear = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));

  useEffect(() => {
    const move = (e) => {
      const el = robot.current; if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / 500));
      const dy = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / 500));
      el.style.setProperty("--ex", `${dx * 14}px`);
      el.style.setProperty("--ey", `${dy * 8}px`);
    };
    window.addEventListener("pointermove", move);
    return () => { window.removeEventListener("pointermove", move); clear(); };
  }, []);

  const down = (e) => { e.preventDefault(); clear(); setState("listening"); };
  const up = () => {
    if (state !== "listening") return;
    setState("thinking");
    later(() => { setState("working"); setStep(STEPS[0]); }, 1200);
    later(() => setStep(STEPS[1]), 2500);
    later(() => setStep(STEPS[2]), 3800);
    later(() => setState("speaking"), 5000);
    later(() => setState("idle"), 7500);
  };

  return (
    <div className="stage">
      <p className="bubble" key={state}>{BUBBLE[state]}</p>
      <div className={`robot s-${state}`} ref={robot}>
        <span className="ear l"><u /></span><span className="ear r"><u /></span>
        <span className="mic" />
        <div className="head">
          <div className="screen" aria-live="polite">
            <div className="eyes"><i /><i /></div>
            <p className="caption">{state === "working" ? step : LABEL[state]}</p>
            {state === "working" && <b className="bar" />}
          </div>
          <span className="blush l" /><span className="blush r" />
        </div>
        <span className="foot l" /><span className="foot r" />
        {state === "speaking" && <span className="notes"><i><Music size={26} /></i><i><Music size={20} /></i><i><Music size={24} /></i></span>}
      </div>
      <button className={`hold ${state === "listening" ? "on" : ""}`}
        onPointerDown={down} onPointerUp={up} onPointerLeave={up}
        onKeyDown={(e) => (e.key === " " || e.key === "Enter") && !e.repeat && down(e)}
        onKeyUp={(e) => (e.key === " " || e.key === "Enter") && up()}>
        {state === "idle" ? "Press and hold me" : state === "listening" ? "Now let go!" : "Working on it…"}
      </button>
      <p className="tiny">Try it. This is how the real device feels.</p>
    </div>
  );
}

const CHIPS = [
  [Globe, "Chrome"], [Play, "YouTube"], [Terminal, "Terminal"], [Folder, "Files"], [Volume2, "Volume"],
  [Sun, "Brightness"], [AppWindow, "Windows"], [Clipboard, "Clipboard"], [Code, "Claude Code"], [Bell, "Notifications"],
  [Mouse, "Mouse"], [Music, "Spotify"],
];

const HOW = [
  [Mic, "Hold the button", "Press it, speak, let go. It only hears you while your finger is down."],
  [Sparkles, "It cleans and listens", "Your voice is tidied up and turned into text right on your PC."],
  [Brain, "It makes a plan", "A smart model works out the steps, in order, in plain language."],
  [Wrench, "It does the work", "Chrome, files, terminal, volume, even building an app. Risky things ask first."],
  [Volume2, "It tells you how it went", "Its face shows each step live, then it speaks the answer through your speakers."],
];

const CAN = [
  ["“Open Chrome and play CO2 on YouTube.”", "Opens your profile, finds the video, plays it."],
  ["“Build me a React todo app with dark mode.”", "Hands the job to Claude Code in its own window."],
  ["“Set volume to 40 and brightness to 70.”", "Two settings, one sentence."],
  ["“Delete the old backup folder.”", "Asks Yes or No before touching anything."],
];

const FACES = [
  ["Waiting", "Round eyes that blink and glance around.", "idle"],
  ["Listening", "Big wide eyes. It's all ears.", "listening"],
  ["Thinking", "Squinty eyes darting side to side.", "thinking"],
  ["Working", "Focused eyes with a live step ticker.", "working"],
  ["Happy", "Smiling bouncy eyes when it's done.", "speaking"],
];

const WHY = [
  [Lock, "Private", "No always-on mic. Audio moves only while you hold the button.", "mint"],
  [Hand, "Interruptible", "Press while it talks and it stops, ready for your next command.", "pink"],
  [Brain, "Remembers", "Facts you tell it and every task it does, even after a restart.", "sky"],
  [Link2, "Chains tasks", "Up to 20 steps in one go, with timed waits between them.", "sun"],
  [Shuffle, "Your choice of brain", "Ollama Cloud, Claude or OpenAI. Switch with one setting.", "mint"],
  [ShieldCheck, "Safe", "Deleting, shutdown and risky commands need your confirmation.", "pink"],
];

const PARTS = [
  [Cpu, "ESP32-C3", "The little brain of the cube"],
  [Ear, "INMP441", "Its tiny ear (the microphone)"],
  [Smile, "OLED screen", "Where the face lives"],
  [CircleDot, "Push button", "Hold it to talk"],
];

const FAQ = [
  ["Is it always listening?", "No. The mic only streams while you physically hold the button."],
  ["Where does the thinking happen?", "On your PC. The cube only records and shows the face."],
  ["Which AI does it use?", "Ollama Cloud (MiniMax), Claude or OpenAI. You pick in settings."],
  ["Can it break my computer?", "It asks Yes or No before deleting, shutting down or running risky commands."],
  ["Do I need the cube?", "No. Without it, a text mode runs the same brain from your console."],
];

function Waitlist() {
  const [done, setDone] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
      } else {
        setDone(true);
      }
    } catch (err) {
      setError("Failed to connect.");
    } finally {
      setLoading(false);
    }
  };

  return done ? (
    <p className="thanks">
      <PartyPopper size={24} /> You're on the list{email ? `, ${email}` : ""}. Knoc8 will say hi soon.
    </p>
  ) : (
    <form className="join" onSubmit={handleSubmit}>
      <input 
        type="email" 
        placeholder="you@email.com" 
        value={email}
        onChange={(e) => setEmail(e.target.value)} 
        aria-label="Email address" 
        disabled={loading}
      />
      <button type="submit" className="cta" disabled={loading}>
        {loading && <Loader2 size={18} className="spin" />}
        {loading ? "Joining..." : "Tell me when it's alive"}
      </button>
      {error && <p style={{ color: "var(--pink)", marginTop: "8px", fontSize: "0.9rem", fontWeight: "bold", width: "100%" }}>{error}</p>}
    </form>
  );
}

export default function Page() {
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))), { threshold: 0.15 });
    document.querySelectorAll(".rv").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <main>
      <nav className="nav">
        <a href="#top" className="brand"><Image src="/icon.svg" alt="" width={34} height={34} unoptimized />Knoc8</a>
        <div><a href="#how">How it works</a><a href="#can">What it does</a><a href="#build">The device</a><a href="#faq">Questions</a>
          <a href="#join" className="pill">Get early access</a></div>
      </nav>

      <section className="hero" id="top">
        <span className="spark a"><Star size={24} fill="currentColor" /></span><span className="spark b"><Star size={24} fill="currentColor" /></span><span className="spark c"><Star size={24} fill="currentColor" /></span><span className="spark d"><Star size={24} fill="currentColor" /></span>
        <div className="copy">
          <p className="soon"><span className="dot" /> Coming soon to your desk</p>
          <h1>A tiny robot that actually uses your computer.</h1>
          <p className="lead">Hold the button, say what you need, and Knoc8 opens, types, searches, builds and tells you when it's done. Not a chatbot. A companion with a face.</p>
          <a className="cta" href="#join">Join the waitlist <Mail size={18} /></a>
          <a className="ghost" href="#how">See how it works</a>
        </div>
        <Demo />
      </section>

      <div className="marquee" aria-hidden="true"><div>{[...CHIPS, ...CHIPS].map(([Ic, t], i) => <span key={i}><Ic size={16} />{t}</span>)}</div></div>

      <section id="how" className="band">
        <h2 className="rv">How Knoc8 works for you</h2>
        <ol className="steps">
          {HOW.map(([Ic, t, d], i) => (
            <li key={t} className="rv" style={{ transitionDelay: `${i * 90}ms` }}><span><Ic size={32} strokeWidth={2.2} /></span><h3>{t}</h3><p>{d}</p></li>
          ))}
        </ol>
      </section>

      <section id="can" className="can">
        <h2 className="rv">Just say it</h2>
        <div className="chat">
          {CAN.map(([q, a], i) => (
            <div key={q} className="rv" style={{ transitionDelay: `${i * 80}ms` }}>
              <p className="you">{q}</p>
              <p className="bot"><b className="av"><Bot size={20} /></b>{a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="faces">
        <h2 className="rv">A face for every mood</h2>
        <p className="lead rv">The screen shows what Knoc8 is doing, so you never have to guess.</p>
        <div className="mini">
          {FACES.map(([t, d, s]) => (
            <figure key={t} className={`rv s-${s}`}>
              <div className="screen sm"><div className="eyes"><i /><i /></div></div>
              <h3>{t}</h3><p>{d}</p>
            </figure>
          ))}
        </div>
      </section>

      <section className="band why">
        <h2 className="rv">Friendly, but careful</h2>
        <ul>{WHY.map(([Ic, t, d, c]) => <li key={t} className={`rv ${c}`}><em><Ic size={34} strokeWidth={2.2} /></em><h3>{t}</h3><p>{d}</p></li>)}</ul>
      </section>

      <section id="build" className="build">
        <h2 className="rv">The device</h2>
        <p className="lead rv">A 3D-printed cube with a mic, a tiny OLED face and one button. It only streams audio. All the thinking happens on your PC.</p>
        <div className="photos">
          {PHOTOS.map(([src, alt, cap], i) => (
            <figure key={src} className="rv" style={{ transitionDelay: `${i * 120}ms` }}>
              <i className="tape" />
              <Image src={src} alt={alt} width={450} height={800} />
              <figcaption>{cap}</figcaption>
            </figure>
          ))}
        </div>
        <div className="parts">{PARTS.map(([Ic, t, d]) => <div key={t} className="rv"><b><Ic size={34} strokeWidth={2.2} /></b><h3>{t}</h3><p>{d}</p></div>)}</div>
      </section>

      <section id="faq" className="faq">
        <h2 className="rv">Little questions</h2>
        {FAQ.map(([q, a]) => <details key={q} className="rv"><summary>{q}</summary><p>{a}</p></details>)}
      </section>

      <section id="join" className="joinsec">
        <div className="mailbot" aria-hidden="true">
          <div className="screen sm"><div className="eyes"><i /><i /></div></div>
        </div>
        <h2>Want one on your desk?</h2>
        <p className="lead">Leave your email and we'll tell you the moment it's ready.</p>
        <Waitlist />
      </section>

      <footer>Made with <Heart size={16} fill="currentColor" /> and a lot of PLA. © Knoc8</footer>
    </main>
  );
}