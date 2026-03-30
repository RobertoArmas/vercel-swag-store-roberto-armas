"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw, ArrowLeft } from "lucide-react";
import Link from "next/link";

type ErrorPageProps = Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>;

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("[ErrorPage]", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center py-12 md:py-24 max-w-3xl mx-auto text-center">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-6">
        <AlertTriangle className="w-8 h-8 text-red-500" />
      </div>

      <h1 className="text-3xl md:text-4xl font-bold leading-tight text-black mb-3">
        Something went wrong
      </h1>

      <p className="text-base text-gray-600 mb-2 max-w-lg leading-normal">
        We hit an unexpected error while loading this page. You can try again or
        head back to the homepage.
      </p>

      {error.digest && (
        <p className="text-xs text-gray-400 mb-6 font-mono">
          Error ID: {error.digest}
        </p>
      )}

      <div className="flex flex-col sm:flex-row items-center gap-3 mt-4">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors font-medium text-sm cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          Try Again
        </button>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors px-6 py-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
