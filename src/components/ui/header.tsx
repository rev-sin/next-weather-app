import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 p-4 shadow-md z-10 bg-white">
      <div className="flex justify-between items-center">
        <h1>
          <Link href="/" className="text-blue-500 hover:underline">
            Next Weather
          </Link>
        </h1>
        <nav className="flex gap-4">
          <Link href="/weather" className="text-blue-500 hover:underline">
            Weather
          </Link>
          <Link href="/about" className="text-blue-500 hover:underline">
            About
          </Link>
          <Link href="/team" className="text-blue-500 hover:underline">
            Team
          </Link>
        </nav>
      </div>
    </header>
  );
}
