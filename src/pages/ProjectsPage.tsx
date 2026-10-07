import Work from "../components/Work";
import PageHead from "../components/PageHead";
import { useLang } from "../i18n";

export default function ProjectsPage() {
  const { t } = useLang();
  const s = t.work_page;
  return (
    <main className="page">
      <div className="wrap">
        <PageHead index="A" eyebrow={s.eyebrow} title={s.title} lead={s.lead} back={s.back} />
        <Work />
      </div>
    </main>
  );
}
