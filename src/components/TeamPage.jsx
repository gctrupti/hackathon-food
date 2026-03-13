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
      const teamSnap = await getDoc(teamRef);

      if (teamSnap.exists()) {
        setTeam(teamSnap.data());
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


  if (!team) return <h3>Loading...</h3>;

  return (

    <div style={{ padding: "40px" }}>

      <h1>{team.teamName}</h1>

      <h3>Team Members</h3>

      {team.members.map((member, index) => (

        <div
          key={index}
          style={{
            border: "1px solid black",
            padding: "20px",
            marginBottom: "20px"
          }}
        >

          <h3>{member.name}</h3>

          <button
            disabled={member.breakfast}
            onClick={() => redeemMeal(index, "breakfast")}
          >
            {member.breakfast ? "Breakfast ✓" : "Breakfast"}
          </button>

          <button
            disabled={member.lunch}
            onClick={() => redeemMeal(index, "lunch")}
            style={{ marginLeft: "10px" }}
          >
            {member.lunch ? "Lunch ✓" : "Lunch"}
          </button>

          <button
            disabled={member.dinner}
            onClick={() => redeemMeal(index, "dinner")}
            style={{ marginLeft: "10px" }}
          >
            {member.dinner ? "Dinner ✓" : "Dinner"}
          </button>

        </div>

      ))}

    </div>

  );

}

export default TeamPage;