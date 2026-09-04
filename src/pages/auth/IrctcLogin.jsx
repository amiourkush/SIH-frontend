import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  Lock,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  TrainFront,
  Clock,
  CheckCircle2,
  Ticket
} from "lucide-react";

export default function IrctcLogin() {
  const navigate = useNavigate();

  const [corpId, setCorpId] = useState("IRCTC-CORP-9921");
  const [agentCode, setAgentCode] = useState("IR-OPS-NORTHERN-01");
  const [captcha, setCaptcha] = useState("CRIS78");
  const [isVerifying, setIsVerifying] = useState(false);

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

  const handleVerify = (e) => {
    if (e) e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      navigate("/dashboard");
    }, 600);
  };

  return (
    <div className="min-h-screen w-full bg-[#ebedf2] text-slate-800 font-sans flex flex-col justify-between p-3 sm:p-6 select-none">
      {/* Top Telemetry Grid V4.19 Bar */}
      <div className="w-full max-w-7xl mx-auto mb-4 bg-[#e2e5ec] border border-slate-300 rounded-lg px-4 py-2 flex flex-wrap items-center justify-between text-xs font-mono text-slate-600 gap-2 shadow-sm">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
            <span className="font-bold text-slate-700 uppercase tracking-wide">
              IRCTC ENTERPRISE GATEWAY
            </span>
          </div>
          <span className="text-slate-300 hidden sm:inline">|</span>
          <div className="flex items-center gap-1.5">
            <TrainFront className="h-3.5 w-3.5 text-slate-500" />
            <span>
              Network Status: <strong className="text-slate-800">1,420 Active Trains</strong>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 ml-auto">
          <div className="flex items-center gap-1.5 bg-slate-200/70 px-2 py-0.5 rounded text-[11px] font-semibold text-slate-700">
            <Lock className="h-3 w-3 text-slate-600" />
            <span>ENTERPRISE AUTHENTICATED</span>
          </div>
          <div className="flex items-center gap-1 font-bold text-slate-800">
            <Clock className="h-3.5 w-3.5 text-slate-500" />
            <span>{timeStr || "08:22:05 IST"}</span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-7xl mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Navy Card */}
        <div className="lg:col-span-5 bg-[#061630] text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl border border-slate-800 min-h-[500px]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <div>
            <div className="inline-flex items-center gap-1.5 bg-blue-950/80 border border-blue-800/50 text-blue-300 px-3 py-1 rounded-full text-[11px] font-mono tracking-wider font-semibold uppercase mb-6">
              <Ticket className="h-3.5 w-3.5 text-blue-400" />
              <span>IRCTC ENTERPRISE PARTNER PORTAL</span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="h-11 w-11 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                <TrainFront className="h-6 w-6" strokeWidth={2.2} />
              </div>
              <div>
                <h3 className="text-lg font-bold tracking-tight text-white">IRCTC Enterprise</h3>
                <p className="text-[11px] font-mono text-slate-400 tracking-widest uppercase">CRIS INTEGRATED CONTROL</p>
              </div>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-white mb-3">
              IRCTC Partner Login
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
              Corporate partner portal for IRCTC ticketing ops, passenger manifest sync, and section velocity modeling.
            </p>

            <div className="bg-[#0b2042]/90 border border-blue-900/60 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
                <CheckCircle2 className="h-4 w-4" />
                <span>ENTERPRISE AGENT PRE-VERIFIED</span>
              </div>
              <div className="text-xs font-mono text-slate-300 space-y-1">
                <div>Corporate ID: <strong className="text-white">IRCTC-CORP-9921</strong></div>
                <div>Agent Code: <strong className="text-blue-300">IR-OPS-NORTHERN-01</strong></div>
                <div>Security Captcha: <strong className="text-emerald-400">CRIS78 (Valid)</strong></div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-blue-950 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex items-center gap-1.5 text-blue-300 hover:text-white transition"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Main Login</span>
            </button>
            <span>CRIS Node: DL-SEC-09</span>
          </div>
        </div>

        {/* Right White Card */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-10 shadow-xl border border-slate-200/80 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  IRCTC Enterprise Sign in
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Enter your Corporate IRCTC credentials to authenticate with RailETA AI.
                </p>
              </div>
              <span className="shrink-0 bg-blue-100 text-blue-800 text-[11px] font-mono font-bold px-2.5 py-1 rounded-md border border-blue-200">
                IRCTC SSO
              </span>
            </div>

            <form onSubmit={handleVerify} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-600 mb-1">
                  CORPORATE PARTNER ID
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={corpId}
                    onChange={(e) => setCorpId(e.target.value)}
                    className="w-full bg-slate-100/90 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs font-mono font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-600 mb-1">
                  AUTHORIZED AGENT CODE
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={agentCode}
                    onChange={(e) => setAgentCode(e.target.value)}
                    className="w-full bg-slate-100/90 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs font-mono font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-600 mb-1">
                  SECURITY CAPTCHA CODE
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={captcha}
                    onChange={(e) => setCaptcha(e.target.value)}
                    className="w-full bg-slate-100/90 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-mono font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                  />
                  <div className="shrink-0 bg-blue-950 text-blue-300 font-mono font-extrabold px-4 py-2.5 rounded-xl border border-blue-800 flex items-center justify-center tracking-widest text-sm select-none">
                    CRIS78
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-center gap-2 text-xs text-blue-900 font-medium">
                <ShieldCheck className="h-4 w-4 text-blue-600 shrink-0" />
                <span>Enterprise tokens pre-verified. Click submit to proceed.</span>
              </div>

              <button
                type="submit"
                disabled={isVerifying}
                className="w-full bg-[#061630] hover:bg-[#0b2247] text-white rounded-xl py-3.5 px-4 font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition cursor-pointer mt-4"
              >
                {isVerifying ? (
                  <span>Authenticating IRCTC Credentials...</span>
                ) : (
                  <>
                    <span>Verify & Access Console</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full max-w-7xl mx-auto mt-4 pt-3 border-t border-slate-300 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-2">
        <div>Official Portal of Centre for Railway Information Systems (CRIS) & Indian Railways.</div>
        <div>Section 145 & 147 of The Railways Act, 1989.</div>
      </div>
    </div>
  );
}
