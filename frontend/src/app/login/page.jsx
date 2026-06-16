"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
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

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });

      if (authError) {
        setError(authError.message || "Invalid email or password.");
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
          fontSize: 15px;
          border: 1px solid #E2E8F0;
          borderRadius: 8px;
          background: #fff;
          color: #0F172A;
          fontFamily: inherit;
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
          maxWidth: "440px",
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
              Welcome back
            </h1>
            <p style={{ fontSize: "14px", color: "#64748B", marginBottom: "32px" }}>
              Log in to continue discovering schemes.
            </p>

            <form onSubmit={handleSubmit}>
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

              {/* Password */}
              <div style={{ marginBottom: "24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                  <label style={{ fontSize: "13px", fontWeight: "500", color: "#0F172A" }}>
                    Password
                  </label>
                  <a href="/forgot-password" style={{ fontSize: "13px", color: "#2563EB", textDecoration: "none" }}
                    onMouseEnter={e => e.currentTarget.style.textDecoration = "underline"}
                    onMouseLeave={e => e.currentTarget.style.textDecoration = "none"}
                  >
                    Forgot password?
                  </a>
                </div>
                <div style={{ position: "relative" }}>
                  <input
                    className="auth-input"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    autoComplete="current-password"
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
                {loading ? "Logging in..." : "Log in"}
              </button>
            </form>

            <p style={{ textAlign: "center", fontSize: "14px", color: "#64748B", marginTop: "24px" }}>
              Don't have an account?{" "}
              <a href="/signup" style={{ color: "#2563EB", fontWeight: "500", textDecoration: "none" }}
                onMouseEnter={e => e.currentTarget.style.textDecoration = "underline"}
                onMouseLeave={e => e.currentTarget.style.textDecoration = "none"}
              >
                Sign up
              </a>
            </p>
          </div>

          {/* Footer note */}
          <p style={{ textAlign: "center", fontSize: "12px", color: "#94A3B8", marginTop: "24px" }}>
            Applications are completed through official government portals.
          </p>
        </div>
      </div>
    </>
  );
}