import { useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "../i18n";

const REVEAL = { duration: 1.1, ease: [0.22, 1, 0.36, 1] as const };

export default function Hero() {
  const { t } = useLang();

  const photoPath = `${import.meta.env.BASE_URL}images/profile.png`;
  const [photoFail, setPhotoFail] = useState(false);

  return (
    <section className="noir-hero" id="top">
      <div className="noir-glow" aria-hidden />

      <div className="wrap noir-hero-grid">
        <div className="noir-hero-left">
          <motion.p className="noir-kicker"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            {t.hero.kicker}
          </motion.p>

          <div className="noir-name" aria-label="Medin Turkes">
            <span className="noir-line-mask">
              <motion.span className="noir-word"
                initial={{ clipPath: "inset(100% 0 0 0)" }} animate={{ clipPath: "inset(0% 0 0 0)" }}
                transition={{ ...REVEAL, delay: 0.15 }}>
                MEDIN
              </motion.span>
            </span>
            <span className="noir-line-mask">
              <motion.span className="noir-word outline"
                initial={{ clipPath: "inset(100% 0 0 0)" }} animate={{ clipPath: "inset(0% 0 0 0)" }}
                transition={{ ...REVEAL, delay: 0.32 }}>
                TURKES
              </motion.span>
            </span>
          </div>

          <motion.a href="#work" className="noir-link"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.1 }}>
            <span>{t.hero.viewWork}</span><i />
          </motion.a>
        </div>

        <motion.div className="noir-portrait"
          initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}>
          <div className="noir-portrait-frame">
            {!photoFail ? (
              <img src={photoPath} alt="Medin Turkes" onError={() => setPhotoFail(true)} />
            ) : (
              <div className="noir-portrait-fallback">
                <div className="noir-portrait-mark">MT</div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
