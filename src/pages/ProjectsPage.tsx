import Work from "../components/Work";
import { navTo } from "../router";
import { useLang } from "../i18n";

export default function ProjectsPage() {
  const { lang } = useLang();
  return (
    <div style={{ paddingTop: 86 }}>
      <div className="wrap" style={{ paddingBottom: 10 }}>
        <button className="btn btn-ghost" onClick={() => navTo("home")}>
          {lang === "de" ? "← Zurück" : "← Back"}
        </button>
      </div>
      <Work />
    </div>
  );
}
