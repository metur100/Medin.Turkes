import { Fragment } from "react";
import { motion, Variants } from "framer-motion";
import { EASE } from "../../lib/motion";

type Word = { w: string; em: boolean; space: boolean };

/* "*word*" marks the italic serif accent. Emphasis may span several words,
   and may sit inside a compound ("Azure-*Zertifikate*") without adding a space. */
export function richWords(text: string): Word[] {
  const out: Word[] = [];
  text.split(/(\*[^*]+\*)/g).filter(Boolean).forEach((chunk) => {
    const em = chunk.startsWith("*") && chunk.endsWith("*");
    const body = em ? chunk.slice(1, -1) : chunk;
    for (const [tok] of body.matchAll(/\S+|\s+/g)) {
      if (/^\s/.test(tok)) { if (out.length) out[out.length - 1].space = true; }
      else out.push({ w: tok, em, space: false });
    }
  });
  return out;
}

export const plain = (text: string) => text.replace(/\*/g, "");

export function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*[^*]+\*)/g).filter(Boolean).map((c, i) =>
        c.startsWith("*") && c.endsWith("*")
          ? <em key={i} className="serif">{c.slice(1, -1)}</em>
          : <Fragment key={i}>{c}</Fragment>
      )}
    </>
  );
}

type Tag = "h1" | "h2" | "h3" | "p" | "div";

/* Word-by-word masked rise. Plays on scroll-into-view, or when `play`
   becomes true if the caller controls timing (e.g. after the preloader). */
export function SplitReveal({
  text, as = "h2", className, play, delay = 0, stagger = 0.045, duration = 1.1,
}: {
  text: string; as?: Tag; className?: string; play?: boolean; delay?: number; stagger?: number; duration?: number;
}) {
  const words = richWords(text);
  const Comp = motion[as] as typeof motion.div;
  const parent: Variants = { hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } };
  const child: Variants = {
    hidden: { y: "115%", rotate: 3 },
    show: { y: "0%", rotate: 0, transition: { duration, ease: EASE } },
  };
  const trigger = play === undefined
    ? { initial: "hidden", whileInView: "show", viewport: { once: true, margin: "0px 0px -12% 0px" } }
    : { initial: "hidden", animate: play ? "show" : "hidden" };

  return (
    <Comp className={className} variants={parent} {...trigger}>
      <span className="sr-only">{plain(text)}</span>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="sw" aria-hidden>
            <motion.span className={`sw-i${w.em ? " serif" : ""}`} variants={child}>{w.w}</motion.span>
          </span>
          {w.space ? " " : null}
        </Fragment>
      ))}
    </Comp>
  );
}

/* Small mono label with an animated rule, used to open every section. */
export function Eyebrow({ index, label, light = false }: { index: string; label: string; light?: boolean }) {
  return (
    <motion.div className={`eyebrow${light ? " on-light" : ""}`}
      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8 }}>
      <span className="eyebrow-idx">({index})</span>
      <motion.i initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.1 }} />
      <span>{label}</span>
    </motion.div>
  );
}

/* Hover "roll": label slides up and an identical copy rolls in from below. */
export function Roll({ children }: { children: string }) {
  return (
    <span className="roll" data-text={children}>
      <span>{children}</span>
    </span>
  );
}
