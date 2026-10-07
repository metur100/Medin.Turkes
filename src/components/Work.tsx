import { useCallback, useMemo, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useLang } from "../i18n";
import { PROJECTS, FILTER_GROUPS, FilterGroup, Project } from "../data/projects";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { EASE } from "../lib/motion";

export default function Work() {
  const { lang, t } = useLang();
  const s = t.work_page;
  const [filter, setFilter] = useState<FilterGroup>("all");
  const [open, setOpen] = useState<Project | null>(null);
  const close = useCallback(() => setOpen(null), []);

  const list = useMemo(
    () => (filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.group === filter)),
    [filter]
  );
  const count = (g: FilterGroup) => (g === "all" ? PROJECTS.length : PROJECTS.filter((p) => p.group === g).length);

  return (
    <>
      <LayoutGroup>
        <motion.div className="filter-bar" role="tablist"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}>
          {FILTER_GROUPS.map((g) => (
            <button key={g} className={`filter${filter === g ? " on" : ""}`} role="tab"
              onClick={() => setFilter(g)} aria-selected={filter === g}>
              {filter === g && <motion.span className="filter-pill" layoutId="filter-pill" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
              <span className="filter-label">{s.filters[g]}</span>
              <sup className="mono">{count(g)}</sup>
            </button>
          ))}
        </motion.div>

        <motion.div className="pgrid" layout>
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <ProjectCard key={p.id} p={p} lang={lang} index={i} openLabel={lang === "de" ? "Öffnen" : "Open"} onOpen={() => setOpen(p)} />
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      <ProjectModal project={open} onClose={close} />
    </>
  );
}
