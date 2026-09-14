import Link from "next/link";

import {
  Factory,
  Zap,
  Wrench,
  ShieldCheck,
  Boxes,
  Truck,
  Settings,
  Cpu,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";


// ================= CATEGORIES =================

const categories = [
  {
    label: "Machinery",
    icon: Factory,
  },
  {
    label: "Electrical",
    icon: Zap,
  },
  {
    label: "Fasteners & Hardware",
    icon: Wrench,
  },
  {
    label: "Safety Equipment",
    icon: ShieldCheck,
  },
  {
    label: "Raw Materials",
    icon: Boxes,
  },
  {
    label: "Logistics & Packaging",
    icon: Truck,
  },
  {
    label: "Tools & Equipment",
    icon: Settings,
  },
  {
    label: "Automation & Controls",
    icon: Cpu,
  },
];


// ================= INDUSTRY INSIGHTS =================

const insights = [
  {
    title:
      "Reading lead times right: planning around supplier backlogs",
    tag: "Sourcing",
  },
  {
    title:
      "What a verified supplier badge actually checks for",
    tag: "Trust & Safety",
  },
  {
    title:
      "Steel price trends heading into Q3",
    tag: "Market Watch",
  },
];


// ================= LANDING PAGE =================

export default function Home() {
  return (
    <>
      <Header />

      <main>

        {/* =========================================
            HERO SECTION
        ========================================= */}

        <section className="border-b border-slate-200">

          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center md:py-28">

            {/* Hero Content */}

            <div>

              <p className="mb-4 text-sm font-medium text-indigo-600">
                Industrial sourcing made simple
              </p>

              <h1 className="text-4xl font-semibold leading-tight text-slate-900 md:text-5xl">
                Find the suppliers who actually have what you need.
              </h1>

              <p className="mt-5 max-w-md text-slate-600">
                Search 12,000+ verified industrial suppliers across
                machinery, electrical, safety, and raw materials —
                then request a quote in minutes, not weeks.
              </p>

              {/* Buttons */}

              <div className="mt-8 flex flex-wrap gap-3">

                <Button
                  render={<Link href="/buyer" />}
                  nativeButton={false}
                >
                  Find suppliers

                  <ArrowRight className="ml-1 size-4" />
                </Button>

                <Button
                  variant="outline"
                  render={<Link href="/supplier" />}
                  nativeButton={false}
                >
                  List your company
                </Button>

              </div>

            </div>


            {/* =========================================
                ACTIVITY CARD
            ========================================= */}

            <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">

              <p className="text-xs font-medium text-slate-500">
                Sample request activity
              </p>

              <div className="mt-4 space-y-4">

                {/* Request 1 */}

                <div className="flex items-center justify-between border-b border-slate-100 pb-3">

                  <div>

                    <p className="text-sm font-medium text-slate-900">
                      RFQ #4821 — Hydraulic pump, 15kW
                    </p>

                    <p className="text-xs text-slate-500">
                      Posted 2 hours ago
                    </p>

                  </div>

                  <span className="rounded-sm bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700">
                    3 quotes in
                  </span>

                </div>


                {/* Request 2 */}

                <div className="flex items-center justify-between border-b border-slate-100 pb-3">

                  <div>

                    <p className="text-sm font-medium text-slate-900">
                      RFQ #4819 — Stainless steel sheet, 4mm
                    </p>

                    <p className="text-xs text-slate-500">
                      Posted 6 hours ago
                    </p>

                  </div>

                  <span className="rounded-sm bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700">
                    Awaiting quotes
                  </span>

                </div>


                {/* Response Time */}

                <div className="flex items-center gap-2 pt-1 text-sm text-slate-600">

                  <CheckCircle2 className="size-4 text-indigo-600" />

                  Average response time: 6 hours

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =========================================
            STATS SECTION
        ========================================= */}

        <section className="bg-slate-950">

          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-10 text-white md:grid-cols-4">

            {[
              ["12,400+", "Verified suppliers"],
              ["340+", "Product categories"],
              ["48hr", "Average quote turnaround"],
              ["62", "Countries served"],
            ].map(([value, label]) => (

              <div key={label}>

                <p className="text-2xl font-semibold text-amber-400">
                  {value}
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  {label}
                </p>

              </div>

            ))}

          </div>

        </section>


        {/* =========================================
            BUYER / SUPPLIER SECTION
        ========================================= */}

        <section className="mx-auto max-w-6xl px-6 py-20">

          <div className="grid gap-6 md:grid-cols-2">

            {/* BUYER */}

            <div className="rounded-md border border-slate-200 p-8">

              <p className="text-sm font-medium text-indigo-600">
                For buyers
              </p>

              <h2 className="mt-2 text-xl font-semibold text-slate-900">
                Post a request, compare quotes, order with confidence.
              </h2>

              <ul className="mt-5 space-y-2 text-sm text-slate-600">

                {[
                  "Verified supplier badges on every listing",
                  "Side-by-side quote comparison",
                  "Order tracking from confirmation to delivery",
                ].map((item) => (

                  <li
                    key={item}
                    className="flex gap-2"
                  >

                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-indigo-600" />

                    {item}

                  </li>

                ))}

              </ul>

              <Button
                variant="outline"
                className="mt-6"
                render={<Link href="/buyer" />}
                nativeButton={false}
              >
                Browse categories
              </Button>

            </div>


            {/* SUPPLIER */}

            <div className="rounded-md border border-slate-200 p-8">

              <p className="text-sm font-medium text-indigo-600">
                For suppliers
              </p>

              <h2 className="mt-2 text-xl font-semibold text-slate-900">
                List your catalog once. Reach buyers actively sourcing.
              </h2>

              <ul className="mt-5 space-y-2 text-sm text-slate-600">

                {[
                  "Qualified buyer leads, not cold traffic",
                  "No listing fees under 50 SKUs",
                  "Direct RFQ inbox, no middleman",
                ].map((item) => (

                  <li
                    key={item}
                    className="flex gap-2"
                  >

                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-indigo-600" />

                    {item}

                  </li>

                ))}

              </ul>

              <Button
                variant="outline"
                className="mt-6"
                render={<Link href="/supplier" />}
                nativeButton={false}
              >
                Claim your company
              </Button>

            </div>

          </div>

        </section>


        {/* =========================================
            CATEGORIES SECTION
        ========================================= */}

        <section className="border-y border-slate-200 bg-slate-50">

          <div className="mx-auto max-w-6xl px-6 py-20">

            <h2 className="text-xl font-semibold text-slate-900">
              Browse by category
            </h2>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">

              {categories.map(
                ({ label, icon: Icon }) => (

                  <Link
                    key={label}
                    href="/buyer"
                    className="flex flex-col gap-3 rounded-md border border-slate-200 bg-white p-5 transition hover:border-indigo-300 hover:shadow-sm"
                  >

                    <Icon className="size-5 text-indigo-600" />

                    <span className="text-sm font-medium text-slate-900">
                      {label}
                    </span>

                  </Link>

                )
              )}

            </div>

          </div>

        </section>


        {/* =========================================
            HOW IT WORKS
        ========================================= */}

        <section className="mx-auto max-w-6xl px-6 py-20">

          <h2 className="text-xl font-semibold text-slate-900">
            How sourcing works
          </h2>

          <div className="mt-8 grid gap-8 md:grid-cols-3">

            {[
              [
                "1",
                "Post your requirement",
                "Describe the part, spec, or material — takes under two minutes.",
              ],
              [
                "2",
                "Compare verified quotes",
                "Suppliers respond with pricing, lead time, and certifications.",
              ],
              [
                "3",
                "Order and track delivery",
                "Confirm, pay securely, and track shipment to your dock.",
              ],
            ].map(([num, title, desc]) => (

              <div key={num}>

                <p className="text-sm font-semibold text-amber-500">
                  {num}
                </p>

                <h3 className="mt-2 font-medium text-slate-900">
                  {title}
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                  {desc}
                </p>

              </div>

            ))}

          </div>

        </section>


        {/* =========================================
            INDUSTRY INSIGHTS
        ========================================= */}

        <section className="border-t border-slate-200 bg-slate-50">

          <div className="mx-auto max-w-6xl px-6 py-20">

            <div className="flex items-center justify-between">

              <h2 className="text-xl font-semibold text-slate-900">
                Industry insights
              </h2>

              <Link
                href="/insights"
                className="text-sm font-medium text-indigo-600 transition hover:text-indigo-700"
              >
                View all
              </Link>

            </div>


            <div className="mt-8 grid gap-6 md:grid-cols-3">

              {insights.map(
                ({ title, tag }) => (

                  <div
                    key={title}
                    className="rounded-md border border-slate-200 bg-white p-6 transition hover:border-indigo-200 hover:shadow-sm"
                  >

                    <p className="text-xs font-medium text-indigo-600">
                      {tag}
                    </p>

                    <p className="mt-3 text-sm font-medium text-slate-900">
                      {title}
                    </p>

                  </div>

                )
              )}

            </div>

          </div>

        </section>


        {/* =========================================
            FINAL CTA
        ========================================= */}

        <section className="bg-slate-950">

          <div className="mx-auto max-w-6xl px-6 py-16 text-center">

            <h2 className="text-2xl font-semibold text-white">
              Ready to stop chasing suppliers who don't answer?
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-400">
              Find verified suppliers, compare quotes, and source
              industrial products faster.
            </p>

            <Button
              className="mt-6"
              render={<Link href="/buyer" />}
              nativeButton={false}
            >
              Get started free

              <ArrowRight className="ml-1 size-4" />
            </Button>

          </div>

        </section>

      </main>


      {/* =========================================
          FOOTER
      ========================================= */}

      <Footer />

    </>
  );
}