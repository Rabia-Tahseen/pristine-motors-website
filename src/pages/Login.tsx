import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [success, setSuccess] = useState("");

  const messages = [
    "Signing in...",
    "Checking credentials...",
    "Almost there...",
  ];

  const validateEmail = (v: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");
    setGeneralError("");
    setSuccess("");

    if (!email.trim()) {
      setEmailError("Email required");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Invalid email");
      return;
    }

    if (!password.trim()) {
      setPasswordError("Password required");
      return;
    }

    setLoading(true);

    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % messages.length;
      setStep(index);
    }, 1200);

    try {
      // ✅ directly call Supabase, no AdminAuthContext
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });

      clearInterval(interval);

      if (error) {
        setGeneralError(error.message);
        setLoading(false);
        return;
      }

      if (!data.user) {
        setGeneralError("Login failed. Please try again.");
        setLoading(false);
        return;
      }

      setSuccess("Login successful!");

      setTimeout(() => {
        navigate("/");
      }, 700);

    } catch (err) {
      clearInterval(interval);
      setGeneralError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#eef4ff] to-[#dbeafe] px-4 py-10">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm sm:max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8 space-y-5"
      >
        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0b1b3a]">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-500 mt-1">Login to continue</p>
        </div>

        {generalError && (
          <p className="text-red-500 text-sm text-center">{generalError}</p>
        )}

        {success && (
          <p className="text-green-600 text-sm text-center">{success}</p>
        )}

        {/* EMAIL */}
        <div>
          <div className="relative">
            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={email}
              onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
              placeholder="Email address"
              className={`w-full h-12 pl-11 pr-4 rounded-xl border text-sm outline-none transition focus:ring-1 focus:ring-[#0b1b3a] focus:border-[#0b1b3a] ${emailError ? "border-red-400" : "border-gray-200"}`}
            />
          </div>
          {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
        </div>

        {/* PASSWORD */}
        <div>
          <div className="relative">
            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setPasswordError(""); }}
              placeholder="Password"
              className={`w-full h-12 pl-11 pr-12 rounded-xl border text-sm outline-none transition focus:ring-1 focus:ring-[#0b1b3a] focus:border-[#0b1b3a] ${passwordError ? "border-red-400" : "border-gray-200"}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#0b1b3a]"
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
          {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 rounded-xl bg-[#0b1b3a] text-white font-semibold text-base transition hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>{messages[step]}</span>
            </span>
          ) : (
            "Login"
          )}
        </button>

        <p className="text-center text-[15px] text-gray-500">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-[#0b1b3a] font-semibold hover:underline underline-offset-4">
            Create account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
