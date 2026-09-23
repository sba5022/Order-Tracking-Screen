"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="text-center max-w-md">
                <div className="text-7xl font-bold text-red-500 mb-4">
                    404
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                    Something went wrong!
                </h1>

                <p className="text-gray-600 mb-6">
                    We’re sorry, but something unexpected happened. Please try again.
                </p>

                <button
                    onClick={() => reset()}
                    className="px-6 py-3 rounded-lg bg-black text-white font-medium hover:bg-gray-800 transition"
                >
                    Try Again
                </button>
            </div>
        </main>
    );
}