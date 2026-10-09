import Link from "next/link";
import { ChevronRight } from "lucide-react";
export function Breadcrumb({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav className="breadcrumb" aria-label="Morzsamenü">
      <Link href="/">Főoldal</Link>
      {items.map((item, i) => (
        <span key={i}>
          <ChevronRight size={13} />
          {item.href ? (
            <Link href={item.href}>{item.label}</Link>
          ) : (
            <span aria-current="page">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
