import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

function TeamPage() {
  const { id } = useParams();
  const [team, setTeam] = useState(null);

  useEffect(() => {
    const fetchTeam = async () => {
      const teamRef = doc(db, "teams", id);
      const snap = await getDoc(teamRef);

      if (snap.exists()) {
        setTeam(snap.data());
      }
    };

    fetchTeam();
  }, [id]);

  const redeemMeal = async (memberIndex, meal) => {
    const updatedMembers = [...team.members];
    updatedMembers[memberIndex][meal] = true;

    const teamRef = doc(db, "teams", id);

    await updateDoc(teamRef, {
      members: updatedMembers
    });

    setTeam({
      ...team,
      members: updatedMembers
    });
  };

  if (!team) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Team Header */}
      <div className="max-w-xl mx-auto mb-6 text-center">
        <h1 className="text-3xl font-bold text-indigo-600">
          {team.teamName}
        </h1>
        <p className="text-gray-500">Team Members</p>
      </div>

      {/* Member Cards */}
      <div className="max-w-xl mx-auto space-y-4">

        {team.members.map((member, index) => (

          <div
            key={index}
            className="bg-white p-5 rounded-xl shadow flex flex-col gap-3"
          >

            <h3 className="text-lg font-semibold">
              {member.name}
            </h3>

            <div className="flex gap-3 flex-wrap">

              {/* Breakfast */}
              <button
                disabled={member.breakfast}
                onClick={() => redeemMeal(index, "breakfast")}
                className={`px-3 py-1 rounded 
                ${member.breakfast
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"}`}
              >
                Breakfast {member.breakfast && "✓"}
              </button>

              {/* Lunch */}
              <button
                disabled={member.lunch}
                onClick={() => redeemMeal(index, "lunch")}
                className={`px-3 py-1 rounded 
                ${member.lunch
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"}`}
              >
                Lunch {member.lunch && "✓"}
              </button>

              {/* Dinner */}
              <button
                disabled={member.dinner}
                onClick={() => redeemMeal(index, "dinner")}
                className={`px-3 py-1 rounded 
                ${member.dinner
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"}`}
              >
                Dinner {member.dinner && "✓"}
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default TeamPage;