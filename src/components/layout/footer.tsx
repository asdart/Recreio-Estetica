import Link from "next/link";
import { WHATSAPP_NUMBER, WHATSAPP_BASE_URL } from "@/lib/constants";

const navLinks = [
  { href: "/loja", label: "Loja" },
  { href: "/sobre", label: "Filosofia" },
  { href: "/sobre", label: "Clínica" },
  { href: "/eventos", label: "Diário" },
];

const supportLinks = [
  { href: "/contato", label: "Contato" },
  { href: "/contato", label: "Envios" },
  { href: "/contato", label: "Devoluções" },
  { href: "/contato", label: "FAQ" },
];

const labelClass =
  "font-sans text-[10px] font-medium uppercase tracking-[2px] text-[#faf9f7]";

const linkClass =
  "font-sans text-[10px] uppercase tracking-[2px] text-[#8b8985] transition-colors hover:text-[#faf9f7]";

const bottomClass =
  "font-sans text-[9px] uppercase tracking-[0.9px] text-[#6a6662] transition-colors hover:text-[#8b8985]";

export function Footer() {
  return (
    <footer className="bg-[#2b2927] border-t border-[#3a3835]">
      <div className="mx-auto max-w-[1360px] px-6 md:px-16 pt-24 pb-0">
        {/* Main row */}
        <div className="flex flex-col gap-16 md:flex-row md:items-start md:justify-between">
          {/* Brand + tagline */}
          <div className="flex flex-col gap-6 max-w-[360px]">
            <Link href="/">
              <span className="font-heading text-[30px] leading-9 tracking-[-0.75px] text-[#faf9f7]">
                recreio.estética
              </span>
            </Link>
            <p className="font-sans text-[11px] uppercase leading-[22px] tracking-[1.1px] text-[#8b8985] max-w-[309px]">
              Cuidado honesto que respeita sua pele e a natureza. Uma abordagem clínica com elegância moderna.
            </p>
            <a
              href={`${WHATSAPP_BASE_URL}/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2.5 rounded-full border border-[#3a3835] px-5 py-3 font-sans text-[10px] uppercase tracking-[2px] text-[#faf9f7] transition-colors hover:bg-[#3a3835]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-3.5 w-3.5 shrink-0"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
              Falar no WhatsApp
            </a>
          </div>

          {/* Nav columns */}
          <div className="flex gap-16 md:gap-32">
            {/* Navegar */}
            <div className="flex flex-col gap-[39px]">
              <span className={labelClass}>Navegar</span>
              {navLinks.map((link) => (
                <Link key={link.label} href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Suporte */}
            <div className="flex flex-col gap-[39px]">
              <span className={labelClass}>Suporte</span>
              {supportLinks.map((link) => (
                <Link key={link.label} href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-24 border-t border-[#3a3835] flex items-center justify-between py-[15px]">
          <span className={bottomClass}>
            © {new Date().getFullYear()} Recreio Estética
          </span>
          <div className="flex items-center gap-8">
            <Link href="#" className={bottomClass}>Privacidade</Link>
            <Link href="#" className={bottomClass}>Termos</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
