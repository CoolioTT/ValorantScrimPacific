import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="p-4 bg-gray-800 flex gap-6 text-white">
      <Link href="/">Home</Link>
      <Link href="/login">Login</Link>
      <Link href="/scrims">Scrims</Link>
    </nav>
  );
}
