import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 p-4 z-10 bg-white">
      <div className="flex justify-between items-center">
        <h1>
          <Link href="/" className="text-black font-bold text-xl">
            Next Weather
          </Link>
        </h1>
        <nav className="flex gap-4">
          <Link href="/weather" className="text-blue-500">
            Weather
          </Link>
          <Link href="/about" className="text-blue-500">
            About
          </Link>
          <Link href="/team" className="text-blue-500">
            Team
          </Link>
          <div className="text-blue-500 flex gap-4">
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </nav>
      </div>
    </header>
  );
}
