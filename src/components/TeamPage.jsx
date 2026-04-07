import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";

function TeamPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [team, setTeam] = useState(null);

  // 🔐 Auth with expiry
  const [authorized, setAuthorized] = useState(() => {
    const auth = localStorage.getItem("auth");
    const expiry = localStorage.getItem("authExpiry");

    if (auth === "true" && expiry && Date.now() < Number(expiry)) {
      return true;
    } else {
      localStorage.removeItem("auth");
      localStorage.removeItem("authExpiry");
      return false;
    }
  });

  const [pass, setPass] = useState("");
  const ADMIN_PASS = "12345678";

  const logout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("authExpiry");
    setAuthorized(false);
    alert("Session expired. Please login again.");
  };

  const login = () => {
    if (pass === ADMIN_PASS) {
      setAuthorized(true);

      const expiryTime = Date.now() + 15 * 60 * 1000;
      localStorage.setItem("auth", "true");
      localStorage.setItem("authExpiry", expiryTime);
    } else {
      alert("Wrong passcode");
    }
  };

  // ⏳ Auto logout
  useEffect(() => {
    const expiry = localStorage.getItem("authExpiry");

    if (expiry) {
      const remainingTime = Number(expiry) - Date.now();

      if (remainingTime <= 0) {
        logout();
      } else {
        const timer = setTimeout(logout, remainingTime);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  // 🔥 REAL-TIME TEAM FETCH (FIXED)
  useEffect(() => {
    const teamRef = doc(db, "teams", id);

    const unsubscribe = onSnapshot(teamRef, (snap) => {
      if (snap.exists()) {
        setTeam(snap.data());
      }
    });

    return () => unsubscribe();
  }, [id]);

  const redeemMeal = async (memberIndex, meal) => {
    const updatedMembers = [...team.members];
    updatedMembers[memberIndex][meal] = true;

    const teamRef = doc(db, "teams", id);

    await updateDoc(teamRef, {
      members: updatedMembers,
    });
  };

  if (!team) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* 🔐 Login */}
      {!authorized && (
        <div className="max-w-xl mx-auto mb-4 p-4 bg-yellow-100 rounded text-center">
          <p className="mb-2 font-medium">Coordinator Access Required</p>

          <input
            type="password"
            placeholder="Enter passcode"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="border p-2 rounded"
          />

          <button
            onClick={login}
            className="ml-2 bg-indigo-600 text-white px-3 py-2 rounded"
          >
            Unlock
          </button>
        </div>
      )}

      {/* Header */}
      <div className="max-w-xl mx-auto mb-6 text-center">
        <h1 className="text-3xl font-bold text-indigo-600">
          {team.teamName}
        </h1>
        <p className="text-gray-500">Team Members</p>
      </div>

      {/* Members */}
      <div className="max-w-xl mx-auto space-y-4">
        {team.members?.map((member, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-xl shadow flex flex-col gap-3"
          >
            <h3 className="text-lg font-semibold">{member.name}</h3>

            {authorized && (
              <div className="flex gap-3 flex-wrap">

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
            )}
          </div>
        ))}
      </div>

      {/* NEXT BUTTON */}
      {authorized && (
        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/scanner")}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Scan Next
          </button>
        </div>
      )}
    </div>
  );
}

export default TeamPage;