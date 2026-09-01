import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import LiveTrains from "./pages/LiveTrains";
import TrainDetails from "./pages/TrainDetails";
import ETAPredictions from "./pages/ETAPredictions";


export default function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route
          element={
            <DashboardLayout />
          }
        >

          {/* Dashboard */}

          <Route
            path="/"
            element={
              <Dashboard />
            }
          />


          {/* Live trains */}

          <Route
            path="/live-trains"
            element={
              <LiveTrains />
            }
          />


          {/* Train details */}

          <Route
            path="/train-details"
            element={
              <TrainDetails />
            }
          />

          <Route
            path="/eta-predictions"
            element={<ETAPredictions />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}