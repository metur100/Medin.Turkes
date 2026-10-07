import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "../data/projects";
import { useLang } from "../i18n";
import { EASE } from "../lib/motion";
import { lockScroll } from "../lib/scroll";

export default function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const { lang, t } = useLang();
  const s = t.work_page;

  useEffect(() => {
    if (!project) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    lockScroll(true);
    return () => { window.removeEventListener("keydown", esc); lockScroll(false); };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div className="modal-back" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          exit={{ opacity: 0 }} transition={{ duration: 0.4 }} onClick={onClose}>
          <motion.div className="modal" role="dialog" aria-modal="true" aria-label={project.name} data-lenis-prevent
            initial={{ opacity: 0, y: 60, clipPath: "inset(10% 0% 0% 0% round 24px)" }}
            animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0% round 24px)" }}
            exit={{ opacity: 0, y: 40 }} transition={{ duration: 0.7, ease: EASE }}
            onClick={(e) => e.stopPropagation()}>
            <div className="modal-hero">
              <motion.img src={`${import.meta.env.BASE_URL}images/${project.image}`} alt={project.name}
                initial={{ scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 1.2, ease: EASE }}
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
              <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
            </div>
            <div className="modal-body">
              <span className="pcard-cat mono is-static">{project.category[lang]}</span>
              <h3>{project.name}</h3>
              <p className="modal-tag serif">{project.tagline[lang]}</p>
              <p className="modal-desc">{project.description[lang]}</p>
              <p className="modal-sub mono">{s.stackLabel}</p>
              <ul className="chips">{project.stack.map((x) => <li className="mono" key={x}>{x}</li>)}</ul>
              {project.link ? (
                <a className="btn btn-light modal-visit" href={project.link} target="_blank" rel="noopener noreferrer">
                  {s.visit} <span aria-hidden>↗</span>
                </a>
              ) : (
                <p className="modal-nolink mono">{s.noLink}</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
