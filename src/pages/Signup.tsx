import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [success, setSuccess] = useState("");

  // ✅ if already logged in, redirect away
  useEffect(() => {
    const check = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();

      if (profile?.role === "admin") {
        navigate("/admin"); // admin shouldn't be on signup
      } else {
        navigate("/"); // already logged in regular user
      }
    };

    check();
  }, []);

  const validateEmail = (v: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");
    setGeneralError("");
    setSuccess("");

    if (!email.trim()) { setEmailError("Email required"); return; }
    if (!validateEmail(email)) { setEmailError("Invalid email"); return; }
    if (!password.trim()) { setPasswordError("Password required"); return; }
    if (password.length < 6) { setPasswordError("Minimum 6 characters"); return; }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
  email: email.trim(),
  password: password.trim(),
});

console.log("SIGNUP RESPONSE:", data, error);

if (error) {
  setGeneralError(error.message);
  return;
}

// ⚠️ IMPORTANT: Supabase may return null user if already exists
if (!data.user) {
  navigate(`/login?email=${encodeURIComponent(email.trim())}`);
  return;
}

setSuccess("Account created successfully!");

setTimeout(() => {
  navigate(`/login?email=${encodeURIComponent(email.trim())}`);
}, 1200);
      }
    } catch (err) {
      setGeneralError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#eef4ff] to-[#dbeafe] px-4 py-10">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-sm sm:max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8 space-y-5"
      >
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0b1b3a]">Create Account</h1>
          <p className="text-sm text-gray-500 mt-1">Join us today</p>
        </div>

        {generalError && <p className="text-red-500 text-sm text-center">{generalError}</p>}
        {success && <p className="text-green-600 text-sm text-center">{success}</p>}

        {/* EMAIL */}
        <div>
          <div className="relative">
            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
              placeholder="Email address"
              className={`w-full h-12 pl-11 pr-4 rounded-xl border text-sm outline-none focus:ring-1 focus:ring-[#0b1b3a] ${emailError ? "border-red-400" : "border-gray-200"}`}
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
              className={`w-full h-12 pl-11 pr-12 rounded-xl border text-sm outline-none focus:ring-1 focus:ring-[#0b1b3a] ${passwordError ? "border-red-400" : "border-gray-200"}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
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
          className="w-full h-12 rounded-xl bg-[#0b1b3a] text-white font-semibold transition disabled:opacity-60 flex items-center justify-center"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Creating account...
            </span>
          ) : "Create Account"}
        </button>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-[#0b1b3a] font-semibold hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
