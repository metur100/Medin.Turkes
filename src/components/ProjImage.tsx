import { useState } from "react";

/* Shows the real image from /images if present, otherwise a clean
   blueprint-style placeholder with the project initials.
   Caller owns the .proj-thumb wrapper. */
export default function ProjImage({ src, initials, alt }: { src: string; initials: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className="proj-fallback" aria-hidden="true">{initials}</div>;
  return (
    <img src={`${import.meta.env.BASE_URL}images/${src}`} alt={alt}
      loading="lazy" onError={() => setFailed(true)} />
  );
}
