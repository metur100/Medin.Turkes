import { useLang } from "../i18n";
import { navTo } from "../router";

export default function CertificationsPage() {
  const { lang } = useLang();

  const items = [
    {
      code: "AZ-204",
      title: lang === "de" ? "Developing Solutions for Microsoft Azure" : "Developing Solutions for Microsoft Azure",
      img: `${import.meta.env.BASE_URL}images/AZ-204.jpg`,
      link: "https://learn.microsoft.com/api/credentials/share/en-us/MedinTurkes/B75568EF6554FF05?sharingId=2FC7333E7C13C43F",
    },
    {
      code: "AZ-400",
      title: lang === "de" ? "DevOps Engineer Expert" : "DevOps Engineer Expert",
      img: `${import.meta.env.BASE_URL}images/AZ-400.jpg`,
      link: "https://learn.microsoft.com/api/credentials/share/en-us/MedinTurkes/F1DF60653B363978?sharingId=2FC7333E7C13C43F",
    },
  ];

  return (
    <div style={{ paddingTop: 86 }}>
      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <button className="btn btn-ghost" onClick={() => navTo("home")}>
              {lang === "de" ? "← Zurück" : "← Back"}
            </button>
            <p className="eyebrow" style={{ marginTop: 18 }}>
              <span className="idx">§C1</span> / {lang === "de" ? "Zertifikate" : "Certifications"}
            </p>
            <h2 className="sec-title">Azure <span className="amber">Credentials</span></h2>
            <p className="lead" style={{ maxWidth: 560 }}>
              {lang === "de" ? "Zwei Zertifikate — verifizierbar über Microsoft." : "Two certifications — verifiable via Microsoft."}
            </p>
          </div>

          <div className="proj-grid">
            {items.map((c) => (
              <a key={c.code} className="proj" href={c.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                <div className="proj-thumb">
                  <img src={c.img} alt={c.code} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                  <div className="proj-fallback" aria-hidden="true">{c.code}</div>
                </div>
                <div className="proj-body">
                  <h3>{c.code}</h3>
                  <p>{c.title}</p>
                  <div className="proj-stack"><span className="tag">Microsoft Learn</span><span className="tag">Verified</span></div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
