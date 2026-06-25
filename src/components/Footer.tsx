import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-black border-t border-white/5 py-12">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-xs tracking-widest uppercase text-white/40 font-semibold mb-4">Explore</h4>
            <ul className="space-y-2">
              {[{l:"Why Luxus",h:"/why-luxus"},{l:"Reviews",h:"#"},{l:"Gallery",h:"#"},{l:"Installation Guide",h:"#"}].map(l => (
                <li key={l.l}><Link href={l.h} className="text-sm text-white/30 hover:text-white/60 transition-colors">{l.l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs tracking-widest uppercase text-white/40 font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {[{l:"FAQ",h:"/faq"},{l:"Shipping",h:"#"},{l:"Returns",h:"#"},{l:"Warranty",h:"#"}].map(l => (
                <li key={l.l}><Link href={l.h} className="text-sm text-white/30 hover:text-white/60 transition-colors">{l.l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs tracking-widest uppercase text-white/40 font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {[{l:"About",h:"/why-luxus"},{l:"Contact",h:"/contact"},{l:"Privacy",h:"#"},{l:"Terms",h:"#"}].map(l => (
                <li key={l.l}><Link href={l.h} className="text-sm text-white/30 hover:text-white/60 transition-colors">{l.l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs tracking-widest uppercase text-white/40 font-semibold mb-4">Follow</h4>
            <ul className="space-y-2">
              {["Instagram","Facebook","YouTube","TikTok"].map(l => (
                <li key={l}><Link href="#" className="text-sm text-white/30 hover:text-white/60 transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">&copy; 2026 Luxus Car Mats. All rights reserved.</p>
          <Link href="/" className="text-white font-bold text-sm tracking-widest uppercase">LUXUS</Link>
        </div>
      </div>
    </footer>
  );
}
