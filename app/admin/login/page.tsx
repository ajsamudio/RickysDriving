"use client";

import { useState, FormEvent, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export const dynamic = "force-dynamic";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") ?? "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const supabase = createSupabaseBrowserClient();
    const { error: signInErr } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (signInErr) {
      setError(signInErr.message);
      setSubmitting(false);
      return;
    }

    router.replace(nextPath.startsWith("/admin") ? nextPath : "/admin");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-gray-200 shadow-xl p-8 sm:p-10 w-full max-w-md"
    >
      <div className="text-center mb-7">
        <span className="inline-block w-12 h-12 rounded-xl bg-navy text-gold flex items-center justify-center mb-4 mx-auto">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 11c0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3-3-1.343-3-3zM5 21h14a2 2 0 002-2v-6a2 2 0 00-2-2h-1V7a4 4 0 10-8 0v4H5a2 2 0 00-2 2v6a2 2 0 002 2z"
            />
          </svg>
        </span>
        <h1 className="text-2xl font-black text-navy mb-1">Admin Sign In</h1>
        <p className="text-sm text-gray-500">Ricky&apos;s portal</p>
      </div>

      <div className="space-y-4">
        <label className="block">
          <span className="block text-sm font-semibold text-navy mb-2">Email</span>
          <input
            type="email"
            autoComplete="email"
            required
            disabled={submitting}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all text-navy disabled:bg-gray-50"
            placeholder="ricky@rickysdriving.com"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-semibold text-navy mb-2">Password</span>
          <input
            type="password"
            autoComplete="current-password"
            required
            disabled={submitting}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all text-navy disabled:bg-gray-50"
          />
        </label>
      </div>

      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full mt-6 inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark disabled:opacity-60 disabled:cursor-not-allowed text-navy font-bold py-3.5 rounded-xl transition-all shadow-md"
      >
        {submitting ? "Signing in…" : "Sign in"}
      </button>

      <p className="text-xs text-gray-400 text-center mt-6">
        <Link href="/" className="hover:text-navy transition-colors">
          ← Back to site
        </Link>
      </p>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <section className="min-h-[80vh] bg-off-white flex items-center justify-center py-16 px-4">
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </section>
  );
}
