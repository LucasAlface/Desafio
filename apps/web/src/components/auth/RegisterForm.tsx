"use client";

import { useState, type FormEvent } from "react";

export default function RegisterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: String(formData.get("name") ?? ""),
            email: String(formData.get("email") ?? ""),
            password: String(formData.get("password") ?? ""),
          }),
        },
      );

      if (!response.ok) {
        const payload: unknown = await response.json().catch(() => null);
        const message =
          payload && typeof payload === "object" && "message" in payload
            ? payload.message
            : undefined;
        setError(
          typeof message === "string"
            ? message
            : Array.isArray(message)
              ? message
                  .filter(
                    (item: unknown): item is string => typeof item === "string",
                  )
                  .join(" ") ||
                "We couldn't create your account. Please try again."
              : "We couldn't create your account. Please try again.",
        );
        return;
      }

      window.location.assign("/Home");
    } catch {
      setError("Unable to reach OnTime. Check that the API is running.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="auth-page">
      <header className="auth-header">
        <a aria-label="OnTime" className="ontime-brand" href="/">
          <span aria-hidden="true" className="ontime-brand-mark">
            <span />
            <span />
          </span>
          <span className="ontime-brand-copy">
            <strong>OnTime</strong>
            <small>SMARTER CITY TRAVEL</small>
          </span>
        </a>
        <span className="auth-header-note">
          <i /> Porto · Portugal
        </span>
      </header>

      <div className="auth-content">
        <section className="auth-story">
          <p className="auth-eyebrow">
            <span /> MOVE WITH ONTIME
          </p>
          <h1>
            Make every
            <br />
            journey count.
          </h1>
          <p className="auth-story-copy">
            A simpler way to stay connected to the city. Create an account and
            keep your public transport journeys in one place.
          </p>
          <div aria-hidden="true" className="route-card">
            <div className="route-card-header">
              <span>CITY CONNECTIONS</span>
              <span className="route-live">
                <i /> LIVE NETWORK
              </span>
            </div>
            <div className="route-visual">
              <i />
              <i />
              <i />
            </div>
            <div className="route-stop-copy">
              <span>Aliados</span>
              <span>Casa da Música</span>
              <span>Boavista</span>
            </div>
            <div className="route-card-footer">
              <b>204</b>
              <span>One city. More ways to move.</span>
              <span>↗</span>
            </div>
          </div>
          <p className="auth-story-footnote">
            YOUR EVERYDAY JOURNEY, BETTER CONNECTED
          </p>
        </section>

        <section aria-labelledby="register-title" className="auth-card">
          <div className="auth-card-topline" />
          <p className="auth-card-eyebrow">GET STARTED</p>
          <h2 id="register-title">Create your account</h2>
          <p className="auth-card-description">
            A few details, then you're ready to go.
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <label htmlFor="register-name">Name</label>
              <input
                autoComplete="name"
                className="auth-input"
                id="register-name"
                name="name"
                placeholder="Your name"
                required
                type="text"
              />
            </div>
            <div className="auth-field">
              <label htmlFor="register-email">Email address</label>
              <input
                autoComplete="email"
                className="auth-input"
                id="register-email"
                name="email"
                placeholder="you@example.com"
                required
                type="email"
              />
            </div>
            <div className="auth-field">
              <label htmlFor="register-password">Password</label>
              <input
                autoComplete="new-password"
                className="auth-input"
                id="register-password"
                name="password"
                placeholder="Create a password"
                required
                type="password"
              />
            </div>
            {error ? (
              <p className="auth-error" role="alert">
                {error}
              </p>
            ) : null}
            <button
              className="auth-submit"
              disabled={isSubmitting}
              type="submit"
            >
              <span>
                {isSubmitting ? "Creating account…" : "Create account"}
              </span>
              <span aria-hidden="true">→</span>
            </button>
          </form>

          <div className="auth-switch">
            <span>Already have an account?</span>
            <a className="auth-switch-link" href="/Login">
              Sign in <span>→</span>
            </a>
          </div>
          <p className="auth-card-legal">ON TIME, EVERY TIME.</p>
        </section>
      </div>

      <footer className="auth-footer">
        <span>© OnTime</span>
        <span>Public transport, in sync with you.</span>
      </footer>
    </main>
  );
}
