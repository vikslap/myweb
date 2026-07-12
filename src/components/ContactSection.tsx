"use client";

import { useState, FormEvent, useEffect } from "react";

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

  // Lock body scroll layers when the modal container mounts actively
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

  // Clean exit if state flag registers false
  if (!isOpen) return null;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);

    // CRITICAL WEB3FORMS KEY: Paste the access key you receive in email here
    formData.append("access_key", "YOUR_ACCESS_KEY_HERE");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();

        setTimeout(() => {
          setStatus("idle");
          onClose();
        }, 2000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  return (
    /* CRITICAL FIX: Explicitly setting fixed viewport layout + high layer stacking index */
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Visual Backdrop Dimmer Overlay Layer */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs cursor-pointer transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Main Form Center Content Container Box */}
      <div className="relative w-full max-w-lg bg-(--color-brand-cream) border border-(--color-border) p-6 sm:p-8 rounded-2xl shadow-2xl z-10 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button element option */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-(--color-brand-plum) opacity-60 hover:opacity-100 transition-opacity p-1 text-lg font-bold cursor-pointer"
          aria-label="Close dialog"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-(--color-brand-plum) tracking-tight mb-2">
            Let’s Build Something Premium
          </h2>
          <p className="text-(--color-body-text) opacity-80 text-xs sm:text-sm max-w-xs mx-auto">
            Drop your project brief or custom media requirements below.
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
              className="px-4 py-2.5 rounded-lg border border-(--color-border) bg-(--color-card-bg) text-sm focus:outline-hidden focus:ring-1 focus:ring-(--color-brand-mustard) transition-all"
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
              className="px-4 py-2.5 rounded-lg border border-(--color-border) bg-(--color-card-bg) text-sm focus:outline-hidden focus:ring-1 focus:ring-(--color-brand-mustard) transition-all"
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
              className="px-4 py-3 rounded-lg border border-(--color-border) bg-(--color-card-bg) text-sm focus:outline-hidden focus:ring-1 focus:ring-(--color-brand-mustard) transition-all resize-none"
              placeholder="Describe your design or animation objectives..."
            />
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full py-3 rounded-lg font-semibold tracking-wide bg-(--color-brand-plum) text-(--color-brand-cream) hover:bg-opacity-95 transition-all disabled:opacity-50 text-sm shadow-xs cursor-pointer"
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
