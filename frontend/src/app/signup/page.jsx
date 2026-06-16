"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";

const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "hi", label: "हिन्दी (Hindi)" },
  { value: "mr", label: "मराठी (Marathi)" },
  { value: "ta", label: "தமிழ் (Tamil)" },
  { value: "te", label: "తెలుగు (Telugu)" },
  { value: "bn", label: "বাংলা (Bengali)" },
  { value: "gu", label: "ગુજરાતી (Gujarati)" },
  { value: "kn", label: "ಕನ್ನಡ (Kannada)" },
  { value: "pa", label: "ਪੰਜਾਬੀ (Punjabi)" },
];

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    password: "",
    preferred_language: "en",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      setLoading(false);
      return;
    }

    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            full_name: form.full_name,
            phone_number: form.phone_number,
            preferred_language: form.preferred_language,
          },
        },
      });

      if (authError) {
        setError(authError.message || "Something went wrong. Please try again.");
        return;
      }

      // Redirect to dashboard on success
      router.push("/dashboard");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .auth-input {
          width: 100%;
          padding: 12px 16px;
          font-size: 15px;
          border: 1px solid #E2E8F0;
          border-radius: 8px;
          background: #fff;
          color: #0F172A;
          font-family: inherit;
          outline: none;
          transition: border-color 150ms ease, box-shadow 150ms ease;
          box-sizing: border-box;
        }
        .auth-input:focus {
          border-color: #2563EB;
          box-shadow: 0 0 0 3px rgba(37,99,235,0.08);
        }
        .auth-btn {
          width: 100%;
          padding: 13px;
          background: #2563EB;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          transition: background 150ms ease;
        }
        .auth-btn:hover { background: #3B82F6; }
        .auth-btn:disabled { background: #93C5FD; cursor: not-allowed; }
      `}</style>

      <div style={{
        minHeight: "100vh",
        background: "#F8FAFC",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
      }}>
        <div style={{
          width: "100%",
          maxWidth: "480px",
          animation: "fadeUp 500ms ease forwards",
        }}>

          {/* Logo */}
          <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: "2px", marginBottom: "40px" }}>
            <span style={{ fontSize: "20px", fontWeight: "700", color: "#0F172A", letterSpacing: "-0.02em" }}>OneTap</span>
            <span style={{ fontSize: "20px", fontWeight: "700", color: "#2563EB", letterSpacing: "-0.02em" }}>GOV</span>
          </a>

          {/* Card */}
          <div style={{
            background: "#fff",
            border: "1px solid #E2E8F0",
            borderRadius: "16px",
            padding: "40px",
          }}>
            <h1 style={{ fontSize: "22px", fontWeight: "700", color: "#0F172A", marginBottom: "6px", letterSpacing: "-0.02em" }}>
              Create your account
            </h1>
            <p style={{ fontSize: "14px", color: "#64748B", marginBottom: "32px" }}>
              Start discovering government schemes you qualify for.
            </p>

            <form onSubmit={handleSubmit}>

              {/* Full Name */}
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "500", color: "#0F172A", marginBottom: "6px" }}>
                  Full name
                </label>
                <input
                  className="auth-input"
                  type="text"
                  name="full_name"
                  placeholder="Priya Sharma"
                  value={form.full_name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                />
              </div>

              {/* Email */}
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "500", color: "#0F172A", marginBottom: "6px" }}>
                  Email address
                </label>
                <input
                  className="auth-input"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />
              </div>

              {/* Phone */}
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "500", color: "#0F172A", marginBottom: "6px" }}>
                  Phone number
                </label>
                <div style={{ display: "flex", gap: "8px" }}>
                  <div style={{
                    padding: "12px 14px",
                    border: "1px solid #E2E8F0",
                    borderRadius: "8px",
                    fontSize: "15px",
                    color: "#64748B",
                    background: "#F8FAFC",
                    whiteSpace: "nowrap",
                  }}>
                    🇮🇳 +91
                  </div>
                  <input
                    className="auth-input"
                    type="tel"
                    name="phone_number"
                    placeholder="98765 43210"
                    value={form.phone_number}
                    onChange={handleChange}
                    required
                    autoComplete="tel"
                    maxLength={10}
                    style={{ flex: 1 }}
                  />
                </div>
              </div>

              {/* Preferred Language */}
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "500", color: "#0F172A", marginBottom: "6px" }}>
                  Preferred language
                </label>
                <select
                  className="auth-input"
                  name="preferred_language"
                  value={form.preferred_language}
                  onChange={handleChange}
                  style={{ cursor: "pointer" }}
                >
                  {LANGUAGES.map(lang => (
                    <option key={lang.value} value={lang.value}>{lang.label}</option>
                  ))}
                </select>
              </div>

              {/* Password */}
              <div style={{ marginBottom: "24px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "500", color: "#0F172A", marginBottom: "6px" }}>
                  Password
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    className="auth-input"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="At least 8 characters"
                    value={form.password}
                    onChange={handleChange}
                    required
                    autoComplete="new-password"
                    style={{ paddingRight: "48px" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: "14px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "13px",
                      color: "#64748B",
                      fontFamily: "inherit",
                      padding: "0",
                    }}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {/* Password strength indicator */}
                {form.password.length > 0 && (
                  <div style={{ marginTop: "8px" }}>
                    <div style={{ height: "3px", background: "#E2E8F0", borderRadius: "2px", overflow: "hidden" }}>
                      <div style={{
                        height: "100%",
                        borderRadius: "2px",
                        width: form.password.length < 6 ? "30%" : form.password.length < 10 ? "65%" : "100%",
                        background: form.password.length < 6 ? "#EF4444" : form.password.length < 10 ? "#F59E0B" : "#22C55E",
                        transition: "all 200ms ease",
                      }} />
                    </div>
                    <p style={{ fontSize: "11px", color: "#64748B", marginTop: "4px" }}>
                      {form.password.length < 6 ? "Weak" : form.password.length < 10 ? "Good" : "Strong"}
                    </p>
                  </div>
                )}
              </div>

              {/* Error */}
              {error && (
                <div style={{
                  marginBottom: "16px",
                  padding: "12px 16px",
                  background: "#FEF2F2",
                  border: "1px solid #FECACA",
                  borderRadius: "8px",
                  fontSize: "13px",
                  color: "#DC2626",
                }}>
                  {error}
                </div>
              )}

              <button className="auth-btn" type="submit" disabled={loading}>
                {loading ? "Creating account..." : "Create account"}
              </button>
            </form>

            <p style={{ textAlign: "center", fontSize: "14px", color: "#64748B", marginTop: "24px" }}>
              Already have an account?{" "}
              <a href="/login" style={{ color: "#2563EB", fontWeight: "500", textDecoration: "none" }}
                onMouseEnter={e => e.currentTarget.style.textDecoration = "underline"}
                onMouseLeave={e => e.currentTarget.style.textDecoration = "none"}
              >
                Log in
              </a>
            </p>
          </div>

          {/* Legal */}
          <p style={{ textAlign: "center", fontSize: "12px", color: "#94A3B8", marginTop: "24px", lineHeight: "1.6" }}>
            By creating an account you agree to our{" "}
            <a href="/terms" style={{ color: "#64748B", textDecoration: "underline" }}>Terms</a>
            {" "}and{" "}
            <a href="/privacy" style={{ color: "#64748B", textDecoration: "underline" }}>Privacy Policy</a>.
          </p>
        </div>
      </div>
    </>
  );
}