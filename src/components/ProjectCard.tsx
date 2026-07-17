import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Project } from "../data/projects";
import ProjImage from "./ProjImage";

/* Each card tracks its own scroll progress through the viewport,
   so the thumbnail parallaxes as it passes — not tied to a page-wide
   scrollY range that goes dead once the section is far down the page. */
export default function ProjectCard({
  p, lang, onOpen, index = 0,
}: {
  p: Project; lang: "en" | "de"; onOpen: () => void; index?: number;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [22, -22]);

  return (
    <motion.button
      ref={ref} className="proj" layout
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: index * 0.05 }}
      onClick={onOpen}
    >
      <div className="proj-thumb">
        <motion.div style={{ y }} whileHover={{ scale: 1.05 }} transition={{ duration: 0.35 }}>
          <ProjImage src={p.image} initials={p.initials} alt={p.name} />
        </motion.div>
        <span className="proj-cat">{p.category[lang]}</span>
      </div>
      <div className="proj-body">
        <h3>{p.name}</h3>
        <p>{p.tagline[lang]}</p>
        <div className="proj-stack">
          {p.stack.slice(0, 4).map((x) => <span className="tag" key={x}>{x}</span>)}
        </div>
      </div>
    </motion.button>
  );
}
