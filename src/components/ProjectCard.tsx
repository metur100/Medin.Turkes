import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Project } from "../data/projects";
import { EASE } from "../lib/motion";
import ProjImage from "./ProjImage";

/* Each card tracks its own pass through the viewport so the thumbnail
   parallaxes independently of where the grid sits on the page. */
export default function ProjectCard({
  p, lang, onOpen, index = 0, openLabel,
}: {
  p: Project; lang: "en" | "de"; onOpen: () => void; index?: number; openLabel: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  return (
    <motion.button
      ref={ref} className="pcard" layout data-cursor={openLabel}
      initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.8, ease: EASE, delay: (index % 3) * 0.08 }}
      onClick={onOpen}
    >
      <div className="pcard-thumb">
        <motion.div className="pcard-img" style={{ y }}>
          <ProjImage src={p.image} initials={p.initials} alt={p.name} />
        </motion.div>
        <span className="pcard-cat mono">{p.category[lang]}</span>
      </div>
      <div className="pcard-body">
        <div className="pcard-row">
          <h3>{p.name}</h3>
          <span className="pcard-arrow" aria-hidden>↗</span>
        </div>
        <p>{p.tagline[lang]}</p>
      </div>
    </motion.button>
  );
}
