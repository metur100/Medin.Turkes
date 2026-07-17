import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "../data/projects";
import { useLang } from "../i18n";

export default function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const { lang, t } = useLang();
  const s = t.work_page;

  useEffect(() => {
    if (!project) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", esc); document.body.style.overflow = ""; };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div className="modal-back" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div className="modal" role="dialog" aria-modal="true" aria-label={project.name}
            initial={{ opacity: 0, y: 28, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.96 }} transition={{ duration: 0.28 }}
            onClick={(e) => e.stopPropagation()}>
            <div className="modal-hero">
              <img src={`${import.meta.env.BASE_URL}images/${project.image}`} alt={project.name}
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
              <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
            </div>
            <div className="modal-body">
              <span className="proj-cat" style={{ position: "static", display: "inline-block" }}>
                {project.category[lang]}
              </span>
              <h3 style={{ marginTop: 12 }}>{project.name}</h3>
              <p className="tl">{project.tagline[lang]}</p>
              <p className="desc">{project.description[lang]}</p>
              <p className="modal-sub">{s.stackLabel}</p>
              <div className="proj-stack">{project.stack.map((x) => <span className="tag" key={x}>{x}</span>)}</div>
              {project.link ? (
                <a className="modal-visit" href={project.link} target="_blank" rel="noopener noreferrer">{s.visit}</a>
              ) : (
                <p className="modal-visit" style={{ color: "var(--paper-faint)" }}>{s.noLink}</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
