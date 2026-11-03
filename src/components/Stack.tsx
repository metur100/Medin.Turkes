import { Fragment } from "react";
import { useLang } from "../i18n";
import Marquee from "./fx/Marquee";
import { Eyebrow } from "./fx/Text";

const ROW_A = ["React", "TypeScript", "Next.js", "ASP.NET Core", "C#", "Node.js", "React Native", "Vite"];
const ROW_B = ["Azure", "Terraform", "Azure DevOps", "API Management", "Entra ID", "MS SQL", "Key Vault", "Cloudflare"];

function Row({ items, outline }: { items: string[]; outline?: boolean }) {
  return (
    <>
      {items.map((x) => (
        <Fragment key={x}>
          <span className={`stack-word${outline ? " outline" : ""}`}>{x}</span>
          <span className="stack-sep" aria-hidden>✦</span>
        </Fragment>
      ))}
    </>
  );
}

export default function Stack() {
  const { t } = useLang();
  return (
    <section className="stack" aria-label={t.stack.eyebrow}>
      <div className="wrap"><Eyebrow index="04" label={t.stack.eyebrow} /></div>
      <p className="sr-only">{[...ROW_A, ...ROW_B].join(", ")}</p>
      <Marquee speed={2.2}><Row items={ROW_A} /></Marquee>
      <Marquee speed={1.8} reverse><Row items={ROW_B} outline /></Marquee>
    </section>
  );
}
