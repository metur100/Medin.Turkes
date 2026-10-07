import { motion } from "framer-motion";
import { EASE, useIntroDone } from "../lib/motion";
import { navTo } from "../router";
import { SplitReveal } from "./fx/Text";

/* Shared header for the secondary pages (archive, certifications). */
export default function PageHead({ index, eyebrow, title, lead, back }: { index: string; eyebrow: string; title: string; lead: string; back: string }) {
  const ready = useIntroDone();
  return (
    <header className="page-head">
      <motion.button className="page-back mono" onClick={() => navTo("home")}
        initial={{ opacity: 0, x: -10 }} animate={ready ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}>
        <span aria-hidden>←</span> {back}
      </motion.button>
      <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.25 }}>
        <span className="eyebrow-idx">({index})</span><i /><span>{eyebrow}</span>
      </motion.p>
      <SplitReveal as="h1" className="page-title" text={title} play={ready} delay={0.3} stagger={0.07} duration={1.2} />
      <motion.p className="page-lead" initial={{ opacity: 0, y: 16 }} animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: EASE, delay: 0.6 }}>
        {lead}
      </motion.p>
    </header>
  );
}
