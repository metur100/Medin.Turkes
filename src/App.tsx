import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { LangProvider, useLang } from "./i18n";
import { IntroCtx, EASE } from "./lib/motion";
import { scrollToTarget } from "./lib/scroll";
import { useRoute } from "./router";
import SmoothScroll from "./components/fx/SmoothScroll";
import Preloader from "./components/fx/Preloader";
import Cursor from "./components/fx/Cursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Focus from "./components/Focus";
import SignatureWork from "./components/SignatureWork";
import Stack from "./components/Stack";
import Timeline from "./components/Timeline";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ProjectsPage from "./pages/ProjectsPage";
import CertificationsPage from "./pages/CertificationsPage";
import SectionPage from "./pages/SectionPage";

function Home() {
  return (
    <main className="home">
      <Hero />
      <div className="content">
        <About />
        <Focus />
        <SignatureWork />
        <Stack />
        <Timeline />
        <Contact />
      </div>
    </main>
  );
}

function Shell() {
  const route = useRoute();
  const { t } = useLang();
  const [ready, setReady] = useState(false);

  useEffect(() => { scrollToTarget(0, true); }, [route]);

  return (
    <IntroCtx.Provider value={ready}>
      <SmoothScroll />
      <Cursor />
      <Preloader onReveal={() => setReady(true)} label={t.loader.label} />
      <Nav />

      <AnimatePresence mode="wait">
        <motion.div key={route}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}>
          {route === "home" ? <Home /> : route === "projects" ? <ProjectsPage /> : route === "certifications" ? <CertificationsPage /> : <SectionPage route={route} />}
          <Footer />
        </motion.div>
      </AnimatePresence>
    </IntroCtx.Provider>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <LangProvider>
        <Shell />
      </LangProvider>
    </MotionConfig>
  );
}
