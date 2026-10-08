import { useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "../i18n";
import { EASE } from "../lib/motion";
import PageHead from "../components/PageHead";

const CERTS = [
  {
    code: "AZ-204",
    title: "Developing Solutions for Microsoft Azure",
    level: "Associate",
    img: "AZ-204.png",
    link: "https://learn.microsoft.com/api/credentials/share/en-us/MedinTurkes/B75568EF6554FF05?sharingId=2FC7333E7C13C43F",
  },
  {
    code: "AZ-400",
    title: "DevOps Engineer Expert",
    level: "Expert",
    img: "AZ-400.png",
    link: "https://learn.microsoft.com/api/credentials/share/en-us/MedinTurkes/F1DF60653B363978?sharingId=2FC7333E7C13C43F",
  },
  {
    code: "AI-901",
    title: "Azure AI Fundamentals",
    level: "Fundamentals",
    img: "AI-901.png",
    link: "https://learn.microsoft.com/api/credentials/share/en-us/MedinTurkes/46DC706FE2883F3F?sharingId=2FC7333E7C13C43F",
  },
];

function CertCard({ c, i, verify }: { c: (typeof CERTS)[number]; i: number; verify: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <motion.a className="cert" href={c.link} target="_blank" rel="noopener noreferrer" data-cursor={verify}
      initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: EASE, delay: 0.7 + i * 0.12 }}>
      <div className="cert-thumb">
        {!failed
          ? <img src={`${import.meta.env.BASE_URL}images/${c.img}`} alt={c.code} onError={() => setFailed(true)} />
          : <span className="cert-fallback">{c.code}</span>}
      </div>
      <div className="cert-body">
        <span className="cert-level mono">Microsoft · {c.level}</span>
        <h3>{c.code}</h3>
        <p>{c.title}</p>
        <span className="cert-verify mono">{verify} ↗</span>
      </div>
    </motion.a>
  );
}

export default function CertificationsPage() {
  const { t } = useLang();
  const s = t.certs;
  return (
    <main className="page">
      <div className="wrap">
        <PageHead index="B" eyebrow={s.eyebrow} title={s.title} lead={s.lead} back={s.back} />
        <div className="cert-grid">
          {CERTS.map((c, i) => <CertCard key={c.code} c={c} i={i} verify={s.verify} />)}
        </div>
      </div>
    </main>
  );
}
