import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="gradient-navy py-16">
    <div className="section-container">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="font-display text-xl font-bold text-cream">PristineMotors</h3>
          <p className="mt-3 text-cream/60 text-sm leading-relaxed max-w-xs">
            Premium auto parts for enthusiasts and professionals. Quality you can trust, performance you can feel.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold text-cream mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {["Home", "Parts", "Cars", "Contact"].map((l) => (
              <Link
                key={l}
                to={l === "Home" ? "/" : l === "Contact" ? "/contact" : `/${l.toLowerCase()}`}
                className="text-cream/60 hover:text-cream text-sm transition-colors"
              >
                {l}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold text-cream mb-4">Connect</h4>
          <div className="flex gap-4">
            {["Facebook", "Instagram", "Twitter"].map((s) => (
              <a key={s} href="#" className="text-cream/60 hover:text-cream text-sm transition-colors">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-cream/10 text-center">
        <p className="text-cream/40 text-xs">© 2025 Pristine Motors. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
