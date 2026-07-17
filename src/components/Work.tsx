import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../i18n";
import { PROJECTS, FILTER_GROUPS, FilterGroup, Project } from "../data/projects";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

export default function Work() {
  const { lang, t } = useLang();
  const s = t.work_page;
  const [filter, setFilter] = useState<FilterGroup>("all");
  const [open, setOpen] = useState<Project | null>(null);

  const list = useMemo(
    () => (filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.group === filter)),
    [filter]
  );

  return (
    <section className="sec">
      <div className="wrap">
        <div className="sec-head">
          <p className="eyebrow"><span className="idx">§04</span> / {s.eyebrow}</p>
          <h2 className="sec-title">{s.title}</h2>
          <p className="lead">{s.lead}</p>
        </div>

        <div className="filter-bar" role="tablist">
          {FILTER_GROUPS.map((g) => (
            <button key={g} className={`chip${filter === g ? " on" : ""}`}
              onClick={() => setFilter(g)} aria-selected={filter === g} role="tab">
              {s.filters[g]}
            </button>
          ))}
        </div>

        <motion.div className="proj-grid" layout>
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <ProjectCard key={p.id} p={p} lang={lang} index={i} onOpen={() => setOpen(p)} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <ProjectModal project={open} onClose={() => setOpen(null)} />
    </section>
  );
}
