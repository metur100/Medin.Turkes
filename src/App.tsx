import { useEffect } from "react";
import { LangProvider } from "./i18n";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Timeline from "./components/Timeline";
import Proof from "./components/Proof";
import Focus from "./components/Focus";
import SignatureWork from "./components/SignatureWork";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { useRoute } from "./router";
import ProjectsPage from "./pages/ProjectsPage";
import CertificationsPage from "./pages/CertificationsPage";

function ScrollToTopOnRoute() {
  const r = useRoute();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior }); }, [r]);
  return null;
}

export default function App() {
  const route = useRoute();

  return (
    <LangProvider>
      <ScrollToTopOnRoute />
      <Nav />

      {route === "home" ? (
        <>
          <main>
            <Hero />
            <Timeline />
            <Proof />
            <Focus />
            <SignatureWork />
            <Contact />
          </main>
          <Footer />
        </>
      ) : route === "projects" ? (
        <>
          <ProjectsPage />
          <Footer />
        </>
      ) : (
        <>
          <CertificationsPage />
          <Footer />
        </>
      )}
    </LangProvider>
  );
}
