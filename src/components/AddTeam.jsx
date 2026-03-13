import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

function AddTeam() {

  const [teamName, setTeamName] = useState("");
  const [member1, setMember1] = useState("");
  const [member2, setMember2] = useState("");
  const [member3, setMember3] = useState("");
  const [member4, setMember4] = useState("");

  const addTeam = async () => {

    await addDoc(collection(db, "teams"), {
  teamName: teamName,
  members: [
    { name: member1, breakfast:false, lunch:false, dinner:false },
    { name: member2, breakfast:false, lunch:false, dinner:false },
    { name: member3, breakfast:false, lunch:false, dinner:false },
    { name: member4, breakfast:false, lunch:false, dinner:false }
  ]
});

    alert("Team Added");

    setTeamName("");
    setMember1("");
    setMember2("");
    setMember3("");
    setMember4("");
  };

  return (
    <div style={{padding:"30px"}}>

      <h2>Hackathon Team Registration</h2>

      <input
        placeholder="Team Name"
        value={teamName}
        onChange={(e)=>setTeamName(e.target.value)}
      />

      <br/><br/>

      <input
        placeholder="Member 1"
        value={member1}
        onChange={(e)=>setMember1(e.target.value)}
      />

      <br/><br/>

      <input
        placeholder="Member 2"
        value={member2}
        onChange={(e)=>setMember2(e.target.value)}
      />

      <br/><br/>

      <input
        placeholder="Member 3"
        value={member3}
        onChange={(e)=>setMember3(e.target.value)}
      />

      <br/><br/>

      <input
        placeholder="Member 4"
        value={member4}
        onChange={(e)=>setMember4(e.target.value)}
      />

      <br/><br/>

      <button onClick={addTeam}>
        Add Team
      </button>

    </div>
  );
}

export default AddTeam;