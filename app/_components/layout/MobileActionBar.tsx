import { MessageCircle, Phone } from "lucide-react";
import { site } from "../../_content/site";
import { EnquireButton } from "../ui/EnquireButton";

/** Call / WhatsApp / Enquire, pinned to the bottom of the screen on phones. */
export function MobileActionBar() {
  const action =
    "flex flex-1 items-center justify-center gap-2 py-3.5 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-cream";
  return (
    <div className="fixed inset-x-3 bottom-3 z-30 flex items-center rounded-full border border-gold/30 bg-aubergine/95 p-1.5 shadow-[0_18px_40px_-12px_rgba(53,21,0,0.9)] backdrop-blur-md md:hidden">
      <a href={site.phoneHref} className={action}>
        <Phone className="size-4 text-gold" />
        Call
      </a>
      <span className="h-5 w-px bg-gold/25" aria-hidden />
      <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className={action}>
        <MessageCircle className="size-4 text-gold" />
        WhatsApp
      </a>
      <EnquireButton source="mobile-bar" className="shrink-0 px-6 py-3.5">
        Enquire
      </EnquireButton>
    </div>
  );
}
