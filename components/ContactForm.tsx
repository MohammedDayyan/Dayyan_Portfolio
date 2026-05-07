"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

type FormValues = {
  name: string;
  email: string;
  message: string;
};

export function ContactForm() {
  const { register, handleSubmit, formState, reset } = useForm<FormValues>({
    defaultValues: { name: "", email: "", message: "" },
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (values) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "7f091ce6-ca46-4b39-a8cc-00d92f015ff9", // Replace with your actual access key
          name: values.name,
          email: values.email,
          message: values.message,
          from_name: "Portfolio Contact Form",
          subject: `Portfolio contact from ${values.name}`,
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        setIsSubmitted(true);
        reset();
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  });

  if (isSubmitted) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center dark:border-green-800 dark:bg-green-950">
        <div className="mb-4 text-2xl">✅</div>
        <h3 className="mb-2 text-lg font-medium text-green-900 dark:text-green-100">
          Message sent successfully!
        </h3>
        <p className="text-sm text-green-700 dark:text-green-300">
          Thank you for reaching out. I'll get back to you soon.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="mt-4 rounded-xl border border-green-300 bg-green-100 px-4 py-2 text-sm font-medium text-green-800 transition hover:bg-green-200 dark:border-green-700 dark:bg-green-900 dark:text-green-200 dark:hover:bg-green-800"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2.5 text-sm">
          <span className="font-medium text-zinc-700 dark:text-zinc-300">
            Name
          </span>
          <input
            {...register("name", { required: true })}
            placeholder="Your name"
            className="h-11 w-full rounded-2xl border border-black/10 bg-white px-4 outline-none transition focus:border-black/25 focus:ring-2 focus:ring-cyan-200 dark:border-white/10 dark:bg-zinc-950 dark:focus:border-white/25 dark:focus:ring-cyan-900"
          />
        </label>
        <label className="grid gap-2.5 text-sm">
          <span className="font-medium text-zinc-700 dark:text-zinc-300">
            Email
          </span>
          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="you@example.com"
            className="h-11 w-full rounded-2xl border border-black/10 bg-white px-4 outline-none transition focus:border-black/25 focus:ring-2 focus:ring-cyan-200 dark:border-white/10 dark:bg-zinc-950 dark:focus:border-white/25 dark:focus:ring-cyan-900"
          />
        </label>
      </div>

      <label className="grid gap-2.5 text-sm">
        <span className="font-medium text-zinc-700 dark:text-zinc-300">
          Message
        </span>
        <textarea
          {...register("message", { required: true })}
          rows={6}
          placeholder="Tell me about your project, role, or idea..."
          className="min-h-[160px] rounded-2xl border border-black/10 bg-white p-4 outline-none transition focus:border-black/25 focus:ring-2 focus:ring-cyan-200 dark:border-white/10 dark:bg-zinc-950 dark:focus:border-white/25 dark:focus:ring-cyan-900"
        />
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="h-11 w-full rounded-2xl bg-black px-5 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
      >
        {isSubmitting ? "Sending..." : "Send"}
      </button>
    </form>
  );
}

