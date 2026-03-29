export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-white p-4 mt-auto">
      <p className="text-center">
        &copy; 2024 Vercel Swag Store. All rights reserved.
      </p>
    </footer>
  );
}
