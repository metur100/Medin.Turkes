import { motion } from "framer-motion";
import { useLang } from "../i18n";
import { PROJECTS } from "../data/projects";
import ProjImage from "./ProjImage";
import { navTo } from "../router";

const EASE = [0.22, 1, 0.36, 1] as const;
const CURATED = ["teretnjaci", "gentle-suite", "skinbloom", "vip-shuttle", "tm-app"];

export default function SignatureWork() {
  const { lang, t } = useLang();
  const s = t.work;
  const items = CURATED.map((id) => PROJECTS.find((p) => p.id === id)!).filter(Boolean);

  return (
    <section className="spot-sec" id="work">
      <div className="wrap">
        <motion.div className="sec-head"
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.9, ease: EASE }}>
          <p className="eyebrow"><span className="idx">04</span> / {s.eyebrow}</p>
          <h2 className="sec-title">{s.title}</h2>
        </motion.div>

        <div className="signature-list">
          {items.map((p, i) => (
            <motion.article className={`signature-item${i % 2 === 1 ? " reverse" : ""}`} key={p.id}
              initial={{ opacity: 0, y: 64 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-140px" }} transition={{ duration: 1.05, ease: EASE }}>
              <div className="signature-media">
                <ProjImage src={p.image} initials={p.initials} alt={p.name} />
              </div>
              <div className="signature-body">
                <span className="signature-index mono">{String(i + 1).padStart(2, "0")}</span>
                <h3>{p.name}</h3>
                <p className="signature-tagline">{p.tagline[lang]}</p>
                <p className="signature-desc">{p.description[lang]}</p>
                <div className="signature-stack">
                  {p.stack.slice(0, 3).map((x) => <span className="tag" key={x}>{x}</span>)}
                </div>
                {p.link ? (
                  <a className="noir-link" href={p.link} target="_blank" rel="noopener noreferrer">
                    <span>{s.visit}</span><i />
                  </a>
                ) : (
                  <span className="signature-nolink mono">{s.noLink}</span>
                )}
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div className="signature-more"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.9, delay: 0.15 }}>
          <a className="noir-link" href="#/projects" onClick={(e) => { e.preventDefault(); navTo("projects"); }}>
            <span>{s.seeAll}</span><i />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
