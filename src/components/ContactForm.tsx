"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const inputClass =
  "w-full rounded-xl border border-ink/15 dark:border-white/15 bg-white dark:bg-[#121620] px-4 py-3 text-ink dark:text-white placeholder:text-ink/35 dark:placeholder:text-white/30 outline-none transition-all focus:border-azure focus:ring-4 focus:ring-azure/10";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage("Please complete all required fields (Name, Email, Message).");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    // Simulate enterprise form submission network roundtrip
    await new Promise((resolve) => setTimeout(resolve, 900));

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      company: "",
      budget: "",
      message: "",
    });
    setIsSuccess(false);
    setErrorMessage("");
  };

  return (
    <div className="rounded-3xl bg-paper dark:bg-[#0D1118] border border-ink/8 dark:border-white/10 shadow-card dark:shadow-2xl p-8 lg:p-10 relative overflow-hidden">
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="py-12 flex flex-col items-center text-center space-y-5"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-500/15 dark:bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <div className="space-y-2 max-w-md">
              <h3 className="font-display text-2xl md:text-3xl text-ink dark:text-white">
                Message Received
              </h3>
              <p className="text-ink/60 dark:text-white/60 text-sm leading-relaxed">
                Thank you, <strong className="text-ink dark:text-white">{formData.name}</strong>. A senior engineer will review your project specs and respond within 1 business day.
              </p>
            </div>

            <button
              onClick={handleReset}
              className="mt-4 inline-flex items-center justify-center rounded-full border border-ink/10 dark:border-white/15 px-6 py-2.5 text-xs font-semibold text-ink dark:text-white hover:bg-ink hover:text-white dark:hover:bg-white dark:hover:text-slate-950 transition-all cursor-pointer"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-6"
            noValidate
          >
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 text-rose-600 dark:text-rose-400 text-xs font-medium">
                {errorMessage}
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-ink/70 dark:text-white/70 mb-2" htmlFor="name">
                  Full name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Jane Silva"
                  value={formData.name}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink/70 dark:text-white/70 mb-2" htmlFor="email">
                  Email <span className="text-rose-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="jane@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink/70 dark:text-white/70 mb-2" htmlFor="company">
                Company
              </label>
              <input
                id="company"
                name="company"
                type="text"
                placeholder="Acme Corp"
                value={formData.company}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink/70 dark:text-white/70 mb-2" htmlFor="budget">
                Estimated budget
              </label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className={`${inputClass} bg-white dark:bg-[#121620]`}
              >
                <option value="">Select a range</option>
                <option value="under-10k">Under $10,000</option>
                <option value="10k-50k">$10,000 – $50,000</option>
                <option value="50k-150k">$50,000 – $150,000</option>
                <option value="150k-plus">$150,000+</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink/70 dark:text-white/70 mb-2" htmlFor="message">
                Tell us about your project <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder="What are you trying to build?"
                value={formData.message}
                onChange={handleChange}
                className={`${inputClass} resize-none`}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-ink text-white px-8 py-4 text-[15px] font-semibold hover:bg-ink-soft dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 active:scale-[0.98] transition-all shadow-sm disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Transmitting...
                </>
              ) : (
                "Send message"
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
