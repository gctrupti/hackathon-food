import AddTeam from "./components/AddTeam";
import TeamList from "./components/TeamList";
import TeamPage from "./components/TeamPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={
          <>
            <AddTeam />
            <TeamList />
          </>
        } />

        <Route path="/team/:id" element={<TeamPage />} />

      </Routes>

    </BrowserRouter>

  );

}

export default App;