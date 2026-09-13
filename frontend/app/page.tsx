import Footer from "@/components/footer";
import Header from "@/components/header";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />

      <main className="bg-white text-black">
        {/* Hero Section */}
        <section className="bg-gray-100">
          <div className="mx-auto flex min-h-[75vh] max-w-6xl flex-col items-center justify-center px-6 py-20 text-center">
            <div className="mb-6 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-700">
              Industrial Solutions Platform
            </div>

            <h1 className="max-w-4xl text-5xl font-bold leading-tight md:text-6xl">
              Reliable Industrial Solutions,
              <span className="block">Connected in One Place</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Connect with industrial products, professional engineers, and
              reliable service support through one easy-to-use platform.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/auth/signup"
                className="rounded-md bg-black px-7 py-3 font-medium text-white transition hover:bg-gray-800"
              >
                Get Started
              </Link>

              <Link
                href="/auth/signin"
                className="rounded-md border border-gray-400 bg-white px-7 py-3 font-medium text-black transition hover:bg-gray-100"
              >
                Sign In
              </Link>
            </div>
          </div>
        </section>

        {/* Platform Features */}
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="text-center">
              <h2 className="text-3xl font-bold md:text-4xl">
                Everything You Need for Industrial Services
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                Our platform brings products, customers, engineers, and sales
                professionals together to make industrial service management
                easier.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <div className="rounded-xl border border-gray-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="mb-5 text-3xl">🏭</div>

                <h3 className="text-xl font-bold">Industrial Products</h3>

                <p className="mt-3 leading-7 text-gray-600">
                  Explore industrial products and solutions designed to meet
                  different business and operational needs.
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="mb-5 text-3xl">🛠️</div>

                <h3 className="text-xl font-bold">Expert Engineers</h3>

                <p className="mt-3 leading-7 text-gray-600">
                  Get connected with engineers who can handle service requests
                  and provide professional technical support.
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="mb-5 text-3xl">📋</div>

                <h3 className="text-xl font-bold">Service Management</h3>

                <p className="mt-3 leading-7 text-gray-600">
                  Submit, track, and manage service requests from one
                  centralized platform.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-gray-100">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="text-center">
              <h2 className="text-3xl font-bold md:text-4xl">
                How It Works
              </h2>

              <p className="mt-4 text-gray-600">
                A simple process for getting the industrial support you need.
              </p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div className="rounded-xl bg-white p-8 text-center shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-black text-xl font-bold text-white">
                  1
                </div>

                <h3 className="mt-5 text-xl font-semibold">
                  Choose a Solution
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  Find the industrial product or service that matches your
                  requirements.
                </p>
              </div>

              <div className="rounded-xl bg-white p-8 text-center shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-black text-xl font-bold text-white">
                  2
                </div>

                <h3 className="mt-5 text-xl font-semibold">
                  Submit a Request
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  Send your service requirements through the platform and
                  provide the necessary details.
                </p>
              </div>

              <div className="rounded-xl bg-white p-8 text-center shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-black text-xl font-bold text-white">
                  3
                </div>

                <h3 className="mt-5 text-xl font-semibold">
                  Get Professional Support
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  Qualified professionals can manage your request and help
                  resolve your industrial service needs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Roles */}
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="text-center">
              <h2 className="text-3xl font-bold md:text-4xl">
                Built for Every Role
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                Different users get the tools they need to manage their work
                efficiently.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-7">
                <h3 className="text-xl font-bold">Customers</h3>

                <p className="mt-3 leading-7 text-gray-600">
                  Find products, submit service requests, and keep track of
                  your service activities.
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-gray-50 p-7">
                <h3 className="text-xl font-bold">Engineers</h3>

                <p className="mt-3 leading-7 text-gray-600">
                  Manage assigned service requests, update their progress, and
                  maintain your areas of expertise.
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-gray-50 p-7">
                <h3 className="text-xl font-bold">Sales Executives</h3>

                <p className="mt-3 leading-7 text-gray-600">
                  Manage customers, products, and sales-related activities
                  through a centralized workspace.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call To Action */}
        <section className="bg-black text-white">
          <div className="mx-auto max-w-4xl px-6 py-20 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Ready to Get Started?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-300">
              Create your account and start managing your industrial solutions
              through one connected platform.
            </p>

            <Link
              href="/auth/signup"
              className="mt-8 inline-block rounded-md bg-white px-7 py-3 font-medium text-black transition hover:bg-gray-200"
            >
              Create an Account
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}