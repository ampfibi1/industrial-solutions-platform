"use client";

import Link from "next/link";
import Logo from "./logo";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-4 border-b">
        <Logo/>
        <Link href="/" className="text-xl font-bold left">Industrial Solutions</Link>
        <nav className="flex items-center gap-6" aria-label="Primary navigation">
            <Link href="/" className="text-sm font-medium hover:text-blue-600">Buyer</Link>
            <Link href="/" className="text-sm font-medium hover:text-blue-600">Supplier</Link>
            <Link href="/" className="text-sm font-medium hover:text-blue-600">Industry Insights</Link>
            <Link href="/" className="text-sm font-medium hover:text-blue-600">Claim Your Company</Link>
        </nav>
        <span className="flex items-center gap-4">
            <Link href="/auth/signin" className="px-4 py-2 text-sm font-medium hover:text-blue-600">Sign In</Link>
            <Link href="/auth/signup" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">Sign Up</Link>
            
        </span>
    </header>
  );
}