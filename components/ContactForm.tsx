"use client";

import { useState, FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setStatus("error");
      setErrorMessage("Please fill in your name, email, and message.");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Something went wrong sending your message.");
      }

      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-white rounded-2xl border border-gold/40 shadow-md p-8 sm:p-10 text-center">
        <div className="w-14 h-14 rounded-full bg-gold mx-auto flex items-center justify-center mb-5">
          <svg className="w-7 h-7 text-navy" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-black text-navy mb-2">Message sent!</h3>
        <p className="text-gray-500 leading-relaxed">
          Ricky reads every message himself and will reach out within 24 hours
          — usually much sooner.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-gold-dark hover:text-navy font-semibold text-sm transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-5"
      noValidate
    >
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-navy mb-2">
          Your name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          disabled={status === "submitting"}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all text-navy disabled:bg-gray-50"
          placeholder="Alex Johnson"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-navy mb-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            disabled={status === "submitting"}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all text-navy disabled:bg-gray-50"
            placeholder="you@email.com"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-navy mb-2">
            Phone <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            disabled={status === "submitting"}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all text-navy disabled:bg-gray-50"
            placeholder="(714) 555-0102"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-navy mb-2">
          What can Ricky help with?
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          disabled={status === "submitting"}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all text-navy resize-y disabled:bg-gray-50"
          placeholder="I just got my permit and would love to get started — what's the best package for a total beginner?"
        />
      </div>

      {status === "error" && errorMessage && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark disabled:opacity-60 disabled:cursor-not-allowed text-navy font-bold py-3.5 rounded-xl transition-all shadow-md"
      >
        {status === "submitting" ? (
          <>
            <svg
              className="w-4 h-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
                className="opacity-25"
              />
              <path
                fill="currentColor"
                className="opacity-75"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            Sending…
          </>
        ) : (
          <>
            Send message
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </>
        )}
      </button>

      <p className="text-xs text-gray-400 text-center">
        By submitting, you agree to be contacted about driving lessons. We
        don&apos;t share your info — ever.
      </p>
    </form>
  );
}
