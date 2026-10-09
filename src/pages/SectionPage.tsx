import { useLang } from "../i18n";
import { navTo, SECTION_ROUTES, SectionRoute } from "../router";
import About from "../components/About";
import Focus from "../components/Focus";
import SignatureWork from "../components/SignatureWork";
import Stack from "../components/Stack";
import Timeline from "../components/Timeline";
import Contact from "../components/Contact";
import { Roll } from "../components/fx/Text";

/* Each nav item gets its own page; the home page keeps the full scroll story. */
const VIEWS: Record<SectionRoute, () => JSX.Element> = {
  about: () => <><About /><Stack /></>,
  services: () => <Focus />,
  work: () => <SignatureWork />,
  path: () => <Timeline />,
  contact: () => <Contact />,
};

export default function SectionPage({ route }: { route: SectionRoute }) {
  const { t } = useLang();
  const View = VIEWS[route];
  const labels: Record<SectionRoute, string> = {
    about: t.nav.about, services: t.nav.focus, work: t.nav.work, path: t.nav.timeline, contact: t.nav.contact,
  };
  const i = SECTION_ROUTES.indexOf(route);
  const next = SECTION_ROUTES[(i + 1) % SECTION_ROUTES.length];

  return (
    <main className={`subpage subpage-${route}`}>
      <div className="content"><View /></div>
      {route !== "contact" && (
        <div className="subpage-next">
          <a href={`#/${next}`} className="wrap subpage-next-in" onClick={(e) => { e.preventDefault(); navTo(next); }}>
            <span className="mono">{t.nav.next}</span>
            <span className="subpage-next-label"><Roll>{labels[next]}</Roll><span aria-hidden> →</span></span>
          </a>
        </div>
      )}
    </main>
  );
}
