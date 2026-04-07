import { db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

const teams = [
  { teamName: "Vision X", members: ["Sharvesh GS","Darshan S","Tharika B","Shakthi karan V"] },
  { teamName: "Teamcursor101", members: ["Himpana PradeepKumar","Dhanushree M S","Likitha Sri B","Razan Fathima"] },
  { teamName: "team Blenders", members: ["Rakshith Raj","Pushan Mylar","Sujan M V","Sujay M"] },
  { teamName: "Event Horizon", members: ["Sahil Alam Siddik","Ruchitha Parashuram","Sambhav Sharma"] },
  { teamName: "Incredia", members: ["Thanvitha","Poojitha R"] },
  { teamName: "TEAM CRUSADERS", members: ["Nikhil Patil","Raunak Raj","Crrish Singh","Prithis Dey"] },
  { teamName: "Rhythm", members: ["Sanjana B K","Niveditha V","Chaitra H G","Anushree S G"] },
  { teamName: "IoT Legion's", members: ["Yashwant","K Vinay Raj","Darshan R","Nithin Meda"] },

  { teamName: "BinaryBrains", members: ["Hamsa B M","Harshith Raj","Murali Mithun","Mahima"] },
  { teamName: "Algorithmics", members: ["Fathima Saarrah","Ashly Pereira","Divya Krishan","Daanya Tazmeen"] },
  { teamName: "Vervain", members: ["Riya Pandey","Naziya Hasan","Anisha Tasnim","Syeda Zara"] },
  { teamName: "Crib exchanges", members: ["Shashank Ural","Chetan BN","Kesara B S","Sreenivas SB"] },
  { teamName: "Team Dhurandhar", members: ["Ishika Singh","Krishnan Prashant","Debjit Paul","Ansh Saini"] },
  { teamName: "4code", members: ["Punith P","Pranav Shastri","Pranav CM","MD Sufiyaan"] },
  { teamName: "Firewall", members: ["Moksha KS","Magham Prathibha","Pooja","Nanditha M"] },
  { teamName: "Devrush", members: ["Jayaram Hr","Kartik","Tejas","Tanisk"] },
  { teamName: "InnoX", members: ["Divya Kumari","Divya","Divya Gowda"] },
  { teamName: "Space syntax", members: ["Sijith Sabu","Jai Nithesh","Ujwal G","Yajnapriya"] },
  { teamName: "CodeX", members: ["Manish O","Rajana Naik","Poorvik","Prem Raj"] },
  { teamName: "Hack-It-Up", members: ["Aradhya Saraf","Chinmay"] },

  { teamName: "Tokenizers", members: ["N Harika","Pranav K","Meghana D","Md Basheer Khan"] },
  { teamName: "Neural Knights", members: ["Riya Meher","Hadi Parvez","Lakshana","Saranya"] },
  { teamName: "Team SPY", members: ["Yadava","Pavan","Sreevidya","Srusti"] },
  { teamName: "BYTE_FORCE", members: ["Shashank","Roshan","Shayan","Srihari"] },
  { teamName: "Hackzemon", members: ["Priyadharshini","Namratha","Nishanth","Nikhil"] },
  { teamName: "Spiddy", members: ["Nikhil Sharma","Sarthak Fulzele","Mohaiminul Aziz"] },
  { teamName: "Team Prajna", members: ["Chandana","Hemanth","Vamshika","Sanjay"] },
  { teamName: "BrainStack", members: ["Sourish","Priyanka","Sakshi"] },
  { teamName: "CodeShinobis", members: ["Prathibha","Rakshith","Tejaswini","Swathi"] },
  { teamName: "VitalSync", members: ["Anirudh","Shashank","Chaitanya","Manu"] },
  { teamName: "INNOVISION", members: ["Shivanshu","Shreya","Shruti"] },
  { teamName: "VISIONAUTS", members: ["A Ashmitha Stephen"] },


  { teamName: "VulnixAI", members: ["Dinesh","Sabari","Prakash","Robert"] },
  { teamName: "CodeVortex", members: ["Amogh","Suhana","Abdul","Thejas"] },
  { teamName: "CODEBLASTERS", members: ["Yasvanth","Umar","Imran","Sugumaran"] },
  { teamName: "Hexel Studio", members: ["Khushwant","Ayush","Harshil"] },
  { teamName: "Team DSA", members: ["Steepan","Dharaneesh","Aagnesh","Aakash"] },
  { teamName: "Mossaic", members: ["Aditya","Apu","Abhinav","Chauhan"] },
  { teamName: "Code Ninjas", members: ["Nisha","Navami","Sadiya","Abhishek"] },
  { teamName: "SheSquad", members: ["Vaishnavi","Sakshi","Saraswati","Ramya"] },
  { teamName: "Hackoholics", members: ["Anup","Anushka","Apeksha","Manjunath"] },
  { teamName: "Triveni", members: ["Aryan","Vijay","Sufiya"] },
  { teamName: "VibeCoders", members: ["Adithya"] },
  { teamName: "Code Blazers", members: ["Zeeshan","Udhayapriyan","Sivaprakash","Rhuthudev"] }
];

const formatTeam = (team) => ({
  teamName: team.teamName,
  members: team.members.map(name => ({
    name,
    breakfast: false,
    lunch: false,
    dinner: false
  }))
});

export const uploadTeams = async () => {
  for (let team of teams) {
    const id = team.teamName.toLowerCase().replace(/\s+/g, "_");

    await setDoc(doc(db, "teams", id), formatTeam(team));
    console.log("Added:", team.teamName);
  }
};