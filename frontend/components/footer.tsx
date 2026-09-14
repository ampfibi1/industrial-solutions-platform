import Link from "next/link";

import {
  Mail,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

import {
  FaLinkedin,
  FaFacebook,
  FaTwitter,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-6xl px-6 py-14">

        {/* Main Footer */}
        <div className="grid gap-10 md:grid-cols-4">

          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-white"
            >
              Industrial<span className="text-amber-400">Hub</span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-400">
              Connecting businesses with verified industrial suppliers,
              products, and services — all in one place.
            </p>

            {/* Social Icons */}
            <div className="mt-5 flex gap-3">

              <a
                href="#"
                aria-label="LinkedIn"
                className="rounded-md border border-slate-800 p-2 transition hover:border-slate-600 hover:text-white"
              >
                <FaLinkedin className="size-4" />
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="rounded-md border border-slate-800 p-2 transition hover:border-slate-600 hover:text-white"
              >
                <FaFacebook className="size-4" />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="rounded-md border border-slate-800 p-2 transition hover:border-slate-600 hover:text-white"
              >
                <FaTwitter className="size-4" />
              </a>

            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-sm font-semibold text-white">
              Platform
            </h3>

            <ul className="mt-4 space-y-3 text-sm">

              <li>
                <Link
                  href="/buyer"
                  className="transition hover:text-white"
                >
                  Find Suppliers
                </Link>
              </li>

              <li>
                <Link
                  href="/supplier"
                  className="transition hover:text-white"
                >
                  List Your Company
                </Link>
              </li>

              <li>
                <Link
                  href="/categories"
                  className="transition hover:text-white"
                >
                  Browse Categories
                </Link>
              </li>

              <li>
                <Link
                  href="/insights"
                  className="transition hover:text-white"
                >
                  Industry Insights
                </Link>
              </li>

            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white">
              Company
            </h3>

            <ul className="mt-4 space-y-3 text-sm">

              <li>
                <Link
                  href="/about"
                  className="transition hover:text-white"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="transition hover:text-white"
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  href="/careers"
                  className="transition hover:text-white"
                >
                  Careers
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy"
                  className="transition hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>

            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white">
              Get in touch
            </h3>

            <div className="mt-4 space-y-4 text-sm">

              <div className="flex gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-amber-400" />

                <span>
                  hello@industrialhub.com
                </span>
              </div>

              <div className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-amber-400" />

                <span>
                  Dhaka, Bangladesh
                </span>
              </div>

            </div>

            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-amber-400 transition hover:text-amber-300"
            >
              Contact us
              <ArrowUpRight className="size-4" />
            </Link>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">

          <p>
            © {new Date().getFullYear()} IndustrialHub. All rights reserved.
          </p>

          <div className="flex gap-5">

            <Link
              href="/terms"
              className="transition hover:text-slate-300"
            >
              Terms
            </Link>

            <Link
              href="/privacy"
              className="transition hover:text-slate-300"
            >
              Privacy
            </Link>

            <Link
              href="/cookies"
              className="transition hover:text-slate-300"
            >
              Cookies
            </Link>

          </div>

        </div>

      </div>
    </footer>
  );
}