
import Sidebar from '@/components/Sidebar';
import '@/styles/globals.css';
import Navbar from '@/components/Navbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white">
        <Navbar />
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
