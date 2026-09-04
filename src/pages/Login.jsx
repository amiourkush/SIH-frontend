import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TrainFront,
  ShieldCheck,
  Lock,
  Building2,
  Eye,
  EyeOff,
  ArrowRight,
  Zap,
  PhoneCall,
  CheckSquare,
  Square,
  ChevronDown,
  Sparkles,
  Cpu,
  Clock,
  Mail
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  // Form states
  const [division, setDivision] = useState("NR-DELHI");
  const [employeeId, setEmployeeId] = useState("IR-NR-884920");
  const [password, setPassword] = useState("RailOps#2024Secure");
  const [showPassword, setShowPassword] = useState(false);
  const [requireOtp, setRequireOtp] = useState(true);
  const [rememberTerminal, setRememberTerminal] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Live IST Time
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTimeStr(new Intl.DateTimeFormat("en-GB", options).format(now) + " IST");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAuthenticate = (e) => {
    if (e) e.preventDefault();
    setIsAuthenticating(true);
    setTimeout(() => {
      navigate("/dashboard");
    }, 600);
  };

  return (
    <div className="min-h-screen w-full bg-[#ebedf2] text-slate-800 font-sans flex flex-col justify-between p-3 sm:p-6 select-none">
      {/* ================= TOP TELEMETRY STATUS BAR ================= */}
      <div className="w-full max-w-7xl mx-auto mb-4 bg-[#e2e5ec] border border-slate-300 rounded-lg px-4 py-2 flex flex-wrap items-center justify-between text-xs font-mono text-slate-600 gap-2 shadow-sm">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
            <span className="font-bold text-slate-700 uppercase tracking-wide">
              CRIS TELEMETRY GRID V4.19
            </span>
          </div>
          <span className="text-slate-300 hidden sm:inline">|</span>
          <div className="flex items-center gap-1.5">
            <TrainFront className="h-3.5 w-3.5 text-slate-500" />
            <span>
              Network Status:{" "}
              <strong className="text-slate-800">1,420 Active Trains</strong> Monitored
            </span>
          </div>
          <span className="text-slate-300 hidden sm:inline">|</span>
          <div className="flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-amber-500" />
            <span>
              AI ETA Model Uptime: <strong className="text-emerald-700">99.98%</strong>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 ml-auto">
          <div className="flex items-center gap-1.5 bg-slate-200/70 px-2 py-0.5 rounded text-[11px] font-semibold text-slate-700">
            <Lock className="h-3 w-3 text-slate-600" />
            <span>AES-256 ENCRYPTED</span>
          </div>
          <div className="flex items-center gap-1 font-bold text-slate-800">
            <Clock className="h-3.5 w-3.5 text-slate-500" />
            <span>{timeStr || "08:22:05 IST"}</span>
          </div>
        </div>
      </div>

      {/* ================= MAIN CONTAINER ================= */}
      <div className="w-full max-w-7xl mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* ================= LEFT CARD (DARK NAVY BRAND & ANALYTICS) ================= */}
        <div className="lg:col-span-5 bg-[#061630] text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl border border-slate-800 min-h-[580px]">
          {/* Subtle Background Radial Accent */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <div>
            {/* Authorized Personnel Badge */}
            <div className="inline-flex items-center gap-1.5 bg-blue-950/80 border border-blue-800/50 text-blue-300 px-3 py-1 rounded-full text-[11px] font-mono tracking-wider font-semibold uppercase mb-6">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
              <span>AUTHORIZED RAILWAY PERSONNEL ONLY</span>
            </div>

            {/* Indian Railways & CRIS Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-11 w-11 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 shadow-inner">
                <TrainFront className="h-6 w-6" strokeWidth={2.2} />
              </div>
              <div>
                <h3 className="text-lg font-bold tracking-tight leading-tight text-white">
                  Indian Railways
                </h3>
                <p className="text-[11px] font-mono text-slate-400 tracking-widest uppercase">
                  CRIS • NTES CONTROL ARCHITECTURE
                </p>
              </div>
            </div>

            {/* Title & Description */}
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
              RailETA AI
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-8">
              Dynamic ETA Prediction & Section Velocity Modeling for High-Density Corridors, Vande Bharat Transit, and Freight Operations.
            </p>

            {/* Live Corridor Analytics Widget */}
            <div className="bg-[#0b2042]/90 border border-blue-900/60 rounded-xl p-4 sm:p-5 shadow-lg backdrop-blur-sm">
              <div className="flex items-center justify-between text-xs font-mono mb-3">
                <div className="flex items-center gap-2 text-blue-300 font-semibold">
                  <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
                  <span>LIVE CORRIDOR ANALYTICS</span>
                </div>
                <span className="text-slate-400">Zone: <strong className="text-white">NR-NDLS</strong></span>
              </div>

              {/* Sine Wave / Section Corridor Graph Visualizer */}
              <div className="relative h-16 w-full flex items-center justify-center my-2">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 300 50">
                  {/* Dashed Base Line */}
                  <line x1="0" y1="35" x2="300" y2="35" stroke="#1e3a8a" strokeWidth="1.5" strokeDasharray="4 4" />
                  
                  {/* Smooth Velocity Curve */}
                  <path
                    d="M 0 30 C 50 10, 100 45, 150 25 C 200 5, 250 40, 300 20"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2.5"
                  />

                  {/* Waypoint Nodes */}
                  <circle cx="50" cy="22" r="3.5" fill="#ffffff" stroke="#38bdf8" strokeWidth="2" />
                  <circle cx="150" cy="25" r="5" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="250" cy="24" r="3.5" fill="#ffffff" stroke="#38bdf8" strokeWidth="2" />
                </svg>
                
                {/* Train Label Badge */}
                <div className="absolute bottom-0 text-[10px] font-mono bg-blue-950/90 text-blue-200 border border-blue-700/50 px-2 py-0.5 rounded shadow">
                  12423 RAJDHANI
                </div>
              </div>

              {/* 3 Metrics Cards */}
              <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="bg-[#06152d] border border-blue-950 p-2.5 rounded-lg text-center">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-tighter">
                    SECTION VARIANCE
                  </div>
                  <div className="text-sm font-extrabold text-emerald-400 font-mono mt-0.5">
                    -1.2 min
                  </div>
                </div>

                <div className="bg-[#06152d] border border-blue-950 p-2.5 rounded-lg text-center">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-tighter">
                    CONFIDENCE INDEX
                  </div>
                  <div className="text-sm font-extrabold text-blue-300 font-mono mt-0.5">
                    98.4%
                  </div>
                </div>

                <div className="bg-[#06152d] border border-blue-950 p-2.5 rounded-lg text-center">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-tighter">
                    SIGNAL SYNCED
                  </div>
                  <div className="text-sm font-extrabold text-cyan-300 font-mono mt-0.5">
                    100% S&T
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Security Badges */}
          <div className="mt-6 pt-4 border-t border-blue-950 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400 gap-2">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
              <span>Protected via Rail-Firewall Tier IV</span>
            </div>
            <div className="text-slate-400">
              CRIS Node: <span className="text-slate-200">DL-SEC-09</span>
            </div>
          </div>
        </div>

        {/* ================= RIGHT CARD (WHITE LOGIN FORM) ================= */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-10 shadow-xl border border-slate-200/80 flex flex-col justify-between">
          <div>
            {/* Header Title & Badge */}
            <div className="flex items-start justify-between gap-4 mb-1">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Sign in to Console
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Enter your Railway Staff Employee ID or access via IRCTC/CRIS SSO credentials.
                </p>
              </div>
              <span className="shrink-0 bg-blue-100/80 text-blue-800 text-[11px] font-mono font-bold px-2.5 py-1 rounded-md tracking-wider border border-blue-200">
                IR-OPS PORTAL
              </span>
            </div>

            {/* SSO LOGIN OPTIONS */}
            <div className="mt-6 space-y-2.5">
              {/* Primary Email Login Button */}
              <button
                type="button"
                onClick={() => navigate("/login/email")}
                className="w-full bg-[#061630] hover:bg-[#0b2247] text-white rounded-xl p-3 flex items-center justify-between transition-all duration-200 shadow-md group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-blue-600/30 p-1.5 rounded-lg text-blue-300">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-bold tracking-wide">
                    Login with Email
                  </span>
                </div>
                <span className="bg-slate-800 text-slate-300 text-[10px] font-mono px-2 py-0.5 rounded border border-slate-700">
                  Email & OTP
                </span>
              </button>

              {/* 3 Secondary SSO Buttons Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {/* Google Login */}
                <button
                  type="button"
                  onClick={() => navigate("/login/google")}
                  className="bg-slate-100/90 hover:bg-slate-200/80 text-slate-700 font-semibold text-xs py-2.5 px-3 rounded-lg border border-slate-200 flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Google Login</span>
                </button>

                {/* IRCTC Enterprise */}
                <button
                  type="button"
                  onClick={() => navigate("/login/irctc")}
                  className="bg-slate-100/90 hover:bg-slate-200/80 text-slate-700 font-semibold text-xs py-2.5 px-3 rounded-lg border border-slate-200 flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <div className="h-4 w-4 rounded bg-blue-900 text-white font-mono text-[9px] font-bold flex items-center justify-center">
                    IR
                  </div>
                  <span>IRCTC Enterprise</span>
                </button>

                {/* MeriPehchaan */}
                <button
                  type="button"
                  onClick={() => navigate("/login/meripehchaan")}
                  className="bg-slate-100/90 hover:bg-slate-200/80 text-slate-700 font-semibold text-xs py-2.5 px-3 rounded-lg border border-slate-200 flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <Cpu className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>MeriPehchaan</span>
                </button>
              </div>
            </div>

            {/* SEPARATOR */}
            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <span className="relative bg-white px-3 text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold">
                OR AUTHENTICATE WITH RAILWAY CREDENTIALS
              </span>
            </div>

            {/* FORM FIELDS */}
            <form onSubmit={handleAuthenticate} className="space-y-4">
              {/* OPERATIONAL DIVISION / ZONE */}
              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-600 mb-1">
                  OPERATIONAL DIVISION / ZONE
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <select
                    value={division}
                    onChange={(e) => setDivision(e.target.value)}
                    className="w-full bg-slate-100/90 border border-slate-200 rounded-xl pl-9 pr-8 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition appearance-none cursor-pointer"
                  >
                    <option value="NR-DELHI">Northern Railway (NR - Delhi Division)</option>
                    <option value="WR-MUMBAI">Western Railway (WR - Mumbai Division)</option>
                    <option value="SR-CHENNAI">Southern Railway (SR - Chennai Division)</option>
                    <option value="ER-KOLKATA">Eastern Railway (ER - Sealdah/Howrah)</option>
                    <option value="NCR-PRAYAGRAJ">North Central Railway (NCR - Prayagraj)</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
              </div>

              {/* EMPLOYEE ID / STAFF NUMBER */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-600">
                    EMPLOYEE ID / STAFF NUMBER
                  </label>
                  <span className="text-[10px] font-mono text-slate-400">
                    Format: IR-ZN-XXXXXX
                  </span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    placeholder="IR-NR-884920"
                    className="w-full bg-slate-100/90 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs font-mono font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-600">
                    PASSWORD
                  </label>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="text-[11px] font-mono font-semibold text-blue-600 hover:underline"
                  >
                    Forgot Token?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 font-mono text-xs">
                    •••
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••••••"
                    className="w-full bg-slate-100/90 border border-slate-200 rounded-xl pl-9 pr-10 py-2.5 text-xs font-mono font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* DESIGNATED STATION CLEARANCE BOX */}
              <div className="bg-slate-100/90 border border-slate-200/90 rounded-xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="h-4 w-4 text-blue-600 shrink-0" />
                  <div>
                    <div className="text-[10px] font-mono uppercase text-slate-400 font-bold leading-none">
                      DESIGNATED STATION CLEARANCE
                    </div>
                    <div className="text-xs font-bold text-slate-800 mt-0.5">
                      Station Controller / Traffic Inspector
                    </div>
                  </div>
                </div>
                <span className="bg-blue-900 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded">
                  LEVEL 4-OPS
                </span>
              </div>

              {/* CHECKBOXES & HELPLINE */}
              <div className="space-y-2 pt-1 text-xs text-slate-600">
                <div
                  className="flex items-center gap-2 cursor-pointer select-none"
                  onClick={() => setRequireOtp(!requireOtp)}
                >
                  {requireOtp ? (
                    <CheckSquare className="h-4 w-4 text-blue-900 shrink-0" />
                  ) : (
                    <Square className="h-4 w-4 text-slate-400 shrink-0" />
                  )}
                  <span className="text-[11px] font-medium">
                    Require OTP verification on registered CRIS mobile (<strong>+91 ••••• ••902</strong>)
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div
                    className="flex items-center gap-2 cursor-pointer select-none"
                    onClick={() => setRememberTerminal(!rememberTerminal)}
                  >
                    {rememberTerminal ? (
                      <CheckSquare className="h-4 w-4 text-blue-900 shrink-0" />
                    ) : (
                      <Square className="h-4 w-4 text-slate-400 shrink-0" />
                    )}
                    <span className="text-[11px] font-medium">
                      Remember workstation terminal
                    </span>
                  </div>

                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="text-[11px] font-semibold text-blue-700 hover:underline flex items-center gap-1 ml-auto"
                  >
                    <PhoneCall className="h-3 w-3" />
                    <span>Direct Helpline (139 / CRIS Ops)</span>
                  </a>
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={isAuthenticating}
                className="w-full bg-[#061630] hover:bg-[#0b2247] active:bg-[#040f21] text-white rounded-xl py-3.5 px-4 font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all duration-200 mt-4 group cursor-pointer"
              >
                {isAuthenticating ? (
                  <span>Authenticating Credentials...</span>
                ) : (
                  <>
                    <span>Authenticate & Access Console</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ================= PAGE BOTTOM FOOTER ================= */}
      <div className="w-full max-w-7xl mx-auto mt-4 pt-3 border-t border-slate-300/80 flex flex-wrap items-center justify-between text-[11px] font-sans text-slate-500 gap-2">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600"></span>
          <span>
            Official Portal of Centre for Railway Information Systems (CRIS) & Indian Railways.
          </span>
        </div>
        <div>
          Unauthorized access is strictly prohibited and punishable under Section 145 & 147 of The Railways Act, 1989.
        </div>
      </div>
    </div>
  );
}
