import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { QRCodeCanvas } from "qrcode.react";

function TeamList() {

  const [teams, setTeams] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {

    const fetchTeams = async () => {

      const querySnapshot = await getDocs(collection(db, "teams"));

      const teamArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      setTeams(teamArray);
    };

    fetchTeams();

  }, []);

  const downloadQR = (teamId, teamName) => {

    const canvas = document.getElementById(`qr-${teamId}`);

    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    const downloadLink = document.createElement("a");

    downloadLink.href = pngUrl;
    downloadLink.download = `${teamName}-qr.png`;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

  };

  // Filter teams based on search
  const filteredTeams = teams.filter((team) =>
    team.teamName.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div style={{ padding: "30px" }}>

      <h2 className="text-lg font-semibold mb-3">Registered Teams</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search team name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 w-full mb-4 rounded"
      />

      {filteredTeams.map((team) => (

        <div
          key={team.id}
          className="bg-gray-50 border rounded-lg p-4 shadow-sm mb-4"
        >

          <h3 className="font-semibold">{team.teamName}</h3>

          <p className="text-sm text-gray-600 mb-2">
            {team.members.map(member => member.name).join(", ")}
          </p>

          <QRCodeCanvas
            id={`qr-${team.id}`}
            value={`https://hackathon-food.vercel.app/team/${team.id}`}
            size={150}
          />

          <br /><br />

          <button
            onClick={() => downloadQR(team.id, team.teamName)}
            className="mt-3 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          >
            Download QR
          </button>

        </div>

      ))}

    </div>

  );
}

export default TeamList;git add .