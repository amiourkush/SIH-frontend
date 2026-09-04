import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import LiveTrains from "./pages/LiveTrains";
import TrainDetails from "./pages/TrainDetails";
import ETAPredictions from "./pages/ETAPredictions";


export default function App() {

  return (
    <BrowserRouter>

      <Routes>

        {/* Public Login Route (Landing page) */}
        <Route path="/" element={<Login />} />

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