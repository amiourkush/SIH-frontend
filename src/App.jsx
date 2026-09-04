import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";

import Login from "./pages/Login";
import EmailLogin from "./pages/auth/EmailLogin";
import GoogleLogin from "./pages/auth/GoogleLogin";
import IrctcLogin from "./pages/auth/IrctcLogin";
import MeriPehchaanLogin from "./pages/auth/MeriPehchaanLogin";

import Dashboard from "./pages/Dashboard";
import LiveTrains from "./pages/LiveTrains";
import TrainDetails from "./pages/TrainDetails";
import ETAPredictions from "./pages/ETAPredictions";


export default function App() {

  return (
    <BrowserRouter>

      <Routes>

        {/* Public Login Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login/email" element={<EmailLogin />} />
        <Route path="/login/google" element={<GoogleLogin />} />
        <Route path="/login/irctc" element={<IrctcLogin />} />
        <Route path="/login/meripehchaan" element={<MeriPehchaanLogin />} />

        {/* Protected / Dashboard Application Area */}
        <Route element={<DashboardLayout />}>

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/live-trains" element={<LiveTrains />} />

          <Route path="/train-details" element={<TrainDetails />} />

          <Route path="/eta-predictions" element={<ETAPredictions />} />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}