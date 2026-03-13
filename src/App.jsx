import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddTeam from "./components/AddTeam";
import TeamList from "./components/TeamList";
import TeamPage from "./components/TeamPage";

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
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Dashboard />} />

        <Route path="/team/:id" element={<TeamPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
