"use client";

import { useState, useId, useEffect, useRef } from "react";
import { Mail } from "lucide-react";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import { cn } from "@/lib/utils";
import { socialLinks } from "@/data/social";

type FormStatus = "idle" | "submitting" | "success" | "error";

const ICON_MAP = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  email: Mail,
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const COOLDOWN_MS = 5000;

export function Contact() {
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const cooldownRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (cooldownRef.current !== null) clearTimeout(cooldownRef.current);
    };
  }, []);

  function validate(): boolean {
    const errors: Record<string, string> = {};
    if (!name.trim()) errors.name = "Name is required.";
    if (!email.trim()) {
      errors.email = "Email is required.";
    } else if (!EMAIL_RE.test(email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!message.trim()) errors.message = "Message is required.";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "",
          name,
          email,
          message,
          botcheck: false,
        }),
      });

      const data = (await res.json()) as { success: boolean };

      if (data.success) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
        setFieldErrors({});
        cooldownRef.current = setTimeout(() => setStatus("idle"), COOLDOWN_MS);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const isDisabled = status === "submitting" || status === "success";

  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Contact"
          subtitle="Have a project in mind or want to chat about research? Reach out."
        />

        <div className="grid gap-12 md:grid-cols-2">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            aria-label="Contact form"
          >
            {/* Honeypot — hidden from real users, traps bots */}
            <input
              type="checkbox"
              name="botcheck"
              className="hidden"
              aria-hidden="true"
              tabIndex={-1}
            />

            <div className="space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor={nameId}
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Name
                </label>
                <Input
                  id={nameId}
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  aria-describedby={fieldErrors.name ? `${nameId}-error` : undefined}
                  aria-invalid={!!fieldErrors.name}
                  disabled={isDisabled}
                />
                {fieldErrors.name && (
                  <p
                    id={`${nameId}-error`}
                    role="alert"
                    className="mt-1.5 text-xs text-red-400"
                  >
                    {fieldErrors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor={emailId}
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Email
                </label>
                <Input
                  id={emailId}
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-describedby={fieldErrors.email ? `${emailId}-error` : undefined}
                  aria-invalid={!!fieldErrors.email}
                  disabled={isDisabled}
                />
                {fieldErrors.email && (
                  <p
                    id={`${emailId}-error`}
                    role="alert"
                    className="mt-1.5 text-xs text-red-400"
                  >
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor={messageId}
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Message
                </label>
                <Textarea
                  id={messageId}
                  name="message"
                  rows={5}
                  placeholder="What's on your mind?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  aria-describedby={fieldErrors.message ? `${messageId}-error` : undefined}
                  aria-invalid={!!fieldErrors.message}
                  disabled={isDisabled}
                />
                {fieldErrors.message && (
                  <p
                    id={`${messageId}-error`}
                    role="alert"
                    className="mt-1.5 text-xs text-red-400"
                  >
                    {fieldErrors.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isDisabled}
                aria-busy={status === "submitting"}
                className={cn(
                  "inline-flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold",
                  "bg-lavender-500 text-white",
                  "transition-all duration-200",
                  "hover:bg-lavender-400 hover:shadow-[0_0_20px_rgba(124,90,224,0.4)]",
                  "focus-visible:outline-2 focus-visible:outline-lavender-400 focus-visible:outline-offset-2",
                  "disabled:cursor-not-allowed disabled:opacity-50"
                )}
              >
                {status === "submitting" && (
                  <svg
                    className="h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                )}
                {status === "submitting" ? "Sending…" : "Send Message"}
              </button>

              {/* Status messages */}
              {status === "success" && (
                <p
                  role="status"
                  className="rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400"
                >
                  Message sent! I&apos;ll get back to you soon.
                </p>
              )}
              {status === "error" && (
                <p
                  role="alert"
                  className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
                >
                  Something went wrong. Please try again or email me directly.
                </p>
              )}
            </div>
          </form>

          {/* Right column — connect info */}
          <div className="flex flex-col justify-center gap-8">
            <div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">
                Let&apos;s connect
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                Whether it&apos;s a research collaboration, a hackathon idea,
                or just a conversation about language models — my inbox is
                open.
              </p>
            </div>

            <ul className="space-y-4" role="list">
              {socialLinks.map(({ id, label, href, icon }) => {
                const IconComponent = ICON_MAP[icon as keyof typeof ICON_MAP];
                return (
                  <li key={id}>
                    <a
                      href={href}
                      target={href.startsWith("mailto:") ? undefined : "_blank"}
                      rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                      className={cn(
                        "inline-flex items-center gap-3 text-sm text-muted",
                        "transition-colors duration-200 hover:text-lavender-400",
                        "focus-visible:outline-2 focus-visible:outline-lavender-400 focus-visible:outline-offset-2 rounded-sm"
                      )}
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card">
                        <IconComponent className="h-4 w-4" />
                      </span>
                      <span>{label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
