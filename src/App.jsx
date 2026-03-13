import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddTeam from "./components/AddTeam";
import TeamList from "./components/TeamList";
import TeamPage from "./components/TeamPage";
import { useState } from "react";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">

      <header className="bg-indigo-600 text-white p-4 text-xl font-semibold">
        Hackathon Food Dashboard
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

  const [authorized, setAuthorized] = useState(false);
  const [pass, setPass] = useState("");

  const ADMIN_PASS = "12345678";

  const login = () => {
    if (pass === ADMIN_PASS) {
      setAuthorized(true);
    } else {
      alert("Wrong passcode");
    }
  };

  const LoginScreen = () => (
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

  return (
    <BrowserRouter>

      <Routes>

        {/* Protected Dashboard */}
        <Route
          path="/"
          element={authorized ? <Dashboard /> : <LoginScreen />}
        />

        {/* Public Team Page */}
        <Route path="/team/:id" element={<TeamPage />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;