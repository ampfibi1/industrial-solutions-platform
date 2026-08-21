import Footer from "@/components/footer";
import Header from "@/components/header";

export default function Home() {
  return (
    <>
      <Header />

      <main className="min-h-screen">
        <section className="flex min-h-[70vh] flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl font-bold">
            Industrial Solutions Platform
          </h1>

          <p className="mt-4 max-w-xl text-gray-600">
            Connect businesses with reliable industrial products and solutions.
          </p>

          <button className="mt-6 rounded-md bg-black px-6 py-3 text-white">
            Get Started
          </button>
        </section>
      </main>

      <Footer />
    </>
  );
}