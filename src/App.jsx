import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import AddTeam from "./components/AddTeam";
import TeamList from "./components/TeamList";
import TeamPage from "./components/TeamPage";
import Scanner from "./components/Scanner";
import { uploadTeams } from "./addTeams"; // ✅ FIXED IMPORT
import { useState } from "react";


// ✅ Login Screen
function LoginScreen({ pass, setPass, login }) {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow text-center">

        <h2 className="text-xl mb-4">Organizer Access</h2>

        <input
          type="password"
          placeholder="Enter passcode"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <button
          onClick={login}
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Unlock Dashboard
        </button>

      </div>
    </div>
  );
}


// ✅ Dashboard
function Dashboard() {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">

      <header className="bg-indigo-600 text-white p-4 flex justify-between items-center">

        <h1 className="text-xl font-semibold">
          Hackathon Food Dashboard
        </h1>

        <div className="flex gap-3">

          {/* 🔥 TEMP BUTTON (UPLOAD TEAMS) */}
          <button
            onClick={uploadTeams}
            className="bg-red-500 px-3 py-2 rounded"
          >
            Upload
          </button>

          {/* Scanner */}
          <button
            onClick={() => navigate("/scanner")}
            className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
          >
            Scan QR
          </button>

        </div>

      </header>

      <div className="max-w-5xl mx-auto p-6">

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-white p-6 rounded-xl shadow">
            <AddTeam />
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <TeamList />
          </div>

        </div>

      </div>

    </div>
  );
}


function App() {

  const [authorized, setAuthorized] = useState(
    localStorage.getItem("auth") === "true"
  );

  const [pass, setPass] = useState("");

  const ADMIN_PASS = "12345678";

  const login = () => {
    if (pass === ADMIN_PASS) {
      setAuthorized(true);
      localStorage.setItem("auth", "true");
    } else {
      alert("Wrong passcode");
    }
  };

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={
            authorized
              ? <Dashboard />
              : <LoginScreen pass={pass} setPass={setPass} login={login} />
          }
        />

        <Route path="/team/:id" element={<TeamPage />} />

        <Route path="/scanner" element={<Scanner />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;