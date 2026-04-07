import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { QRCodeCanvas } from "qrcode.react";

function TeamList() {

  const [teams, setTeams] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "teams"), (snapshot) => {

      const teamArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      // ✅ remove duplicates (safety)
      const unique = Array.from(
        new Map(teamArray.map(t => [t.teamName, t])).values()
      );

      setTeams(unique);
    });

    return () => unsubscribe();
  }, []);

  const downloadQR = (teamId, teamName) => {
    const canvas = document.getElementById(`qr-${teamId}`);
    if (!canvas) return;

    const url = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = url;
    link.download = `${teamName}.png`;
    link.click();
  };

  // ✅ ONLY SEARCH FILTER
  const filteredTeams = teams.filter(team =>
    team.teamName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">

      <h2 className="text-lg font-semibold mb-3">Registered Teams</h2>

      <input
        type="text"
        placeholder="Search team name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 w-full mb-4 rounded"
      />

      {filteredTeams.length === 0 && (
        <p className="text-gray-500">No teams found</p>
      )}

      {filteredTeams.map((team) => (
        <div
          key={team.id}
          className="bg-gray-50 border rounded-lg p-4 shadow-sm mb-4"
        >
          <h3 className="font-semibold">{team.teamName}</h3>

          <p className="text-sm text-gray-600 mb-2">
            {team.members?.map(m => m.name).join(", ")}
          </p>

          <QRCodeCanvas
            id={`qr-${team.id}`}
            value={`https://hackathon-food.vercel.app/team/${team.id}`}
            size={150}
          />

          <br /><br />

          <button
            onClick={() => downloadQR(team.id, team.teamName)}
            className="bg-green-500 text-white px-3 py-1 rounded"
          >
            Download QR
          </button>
        </div>
      ))}

    </div>
  );
}

export default TeamList;