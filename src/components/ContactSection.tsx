"use client";

import { useState, FormEvent, useEffect } from "react";
import { sendContactEmail } from "@/app/actions";

interface ContactSectionProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactSection({
  isOpen,
  onClose,
}: ContactSectionProps) {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    try {
      const targetForm = e.currentTarget;
      const formData = new FormData(targetForm);
      const result = await sendContactEmail(formData);

      if (result.success) {
        setStatus("success");
        targetForm.reset();

        setTimeout(() => {
          setStatus("idle");
          onClose();
        }, 2000);
      } else {
        console.error("Resend API error:", result.error);
        setStatus("error");
      }
    } catch (error) {
      console.error("Form transmission crash:", error);
      setStatus("error");
    }
  }

  return (
    /* CRITICAL VISUAL FIX: fixed overlay, huge z-index, explicit width/height placement */
    <div className="fixed inset-0 w-screen h-screen z-9999 flex items-center justify-center p-4">
      {/* Background dimmer backdrop overlay */}
      <div
        className="absolute inset-0 w-full h-full bg-black/60 backdrop-blur-xs cursor-pointer"
        onClick={onClose}
      />

      {/* Main Form Box Content Panel */}
      <div className="relative w-full max-w-lg bg-(--color-brand-cream) border border-slate-200 p-6 sm:p-8 rounded-2xl shadow-2xl z-50 max-h-[90vh] overflow-y-auto">
        {/* Close Button element option */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-(--color-brand-plum) opacity-60 hover:opacity-100 p-1 text-lg font-bold cursor-pointer border-0 bg-transparent"
          aria-label="Close dialog"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-(--color-brand-plum) tracking-tight mb-2">
            Let’s Build Something Premium
          </h2>
          <p className="text-slate-600 opacity-80 text-xs sm:text-sm max-w-xs mx-auto">
            Drop your project brief or custom requirements below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="modal-name"
              className="text-xs font-bold uppercase tracking-wider text-(--color-brand-plum)"
            >
              Your Name
            </label>
            <input
              type="text"
              id="modal-name"
              name="name"
              required
              className="px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-sm focus:outline-hidden focus:ring-1 focus:ring-amber-500 transition-all text-slate-900"
              placeholder="Your name"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="modal-email"
              className="text-xs font-bold uppercase tracking-wider text-(--color-brand-plum)"
            >
              Email Address
            </label>
            <input
              type="email"
              id="modal-email"
              name="email"
              required
              className="px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-sm focus:outline-hidden focus:ring-1 focus:ring-amber-500 transition-all text-slate-900"
              placeholder="you@example.com"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="modal-message"
              className="text-xs font-bold uppercase tracking-wider text-(--color-brand-plum)"
            >
              Project Brief / Message
            </label>
            <textarea
              id="modal-message"
              name="message"
              rows={4}
              required
              className="px-4 py-3 rounded-lg border border-slate-200 bg-white text-sm focus:outline-hidden focus:ring-1 focus:ring-amber-500 transition-all resize-none text-slate-900"
              placeholder="Describe your design or animation objectives..."
            />
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full py-3 rounded-lg font-semibold tracking-wide bg-(--color-brand-plum) text-(--color-brand-cream) hover:bg-opacity-95 transition-all disabled:opacity-50 text-sm shadow-xs cursor-pointer border-0"
          >
            {status === "submitting" ? "Sending..." : "Send Message →"}
          </button>

          {status === "success" && (
            <p className="text-center text-xs font-semibold text-emerald-600 bg-emerald-50 py-2.5 rounded-lg">
              ✓ Transmission successful! Talk soon.
            </p>
          )}
          {status === "error" && (
            <p className="text-center text-xs font-semibold text-rose-600 bg-rose-50 py-2.5 rounded-lg">
              ✕ System failure. Please retry.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
