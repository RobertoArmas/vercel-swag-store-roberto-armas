import { cacheLife, cacheTag } from "next/cache";

export async function Footer() {
  "use cache";
  cacheLife("days");
  cacheTag("navigation");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-sm text-gray-600">
          &copy; {currentYear} Vercel Swag Store. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
