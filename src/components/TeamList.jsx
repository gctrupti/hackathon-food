import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { QRCodeCanvas } from "qrcode.react";

function TeamList() {

  const [teams, setTeams] = useState([]);

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

  return (

    <div style={{ padding: "30px" }}>

      <h2>Registered Teams</h2>

      {teams.map((team) => (

        <div
 key={team.id}
 className="bg-gray-50 border rounded-lg p-4 shadow-sm mb-4"
>

        

          <h3>{team.teamName}</h3>

          <p>
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

export default TeamList;