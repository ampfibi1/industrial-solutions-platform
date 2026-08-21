import Link from "next/link";
import Image from "next/image";
import logo from "@/public/images/logo.svg";

export default function Logo() {
  return (
    <Link href="/" className="inline-flex shrink-0" aria-label="Industrial Solutions">
      <Image src={logo} alt="Industrial Solutions logo" width={32} height={32} />
    </Link>
  );
}