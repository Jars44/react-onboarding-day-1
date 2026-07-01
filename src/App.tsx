import { useState } from "react";
import Header from "./components/Header";
import ProfileCard from "./components/ProfileCard";
import LearningCard from "./components/LearningCard";
import "./App.css";

const students = [
  { name: "Bisma Purbawasesa", role: "Frontend Intern", avatar: "BP" },
  { name: "Malik Fajar Al Amri", role: "Backend Intern", avatar: "MF" },
  { name: "Zidan Rhaditya Ramadhan", role: "Backend Intern", avatar: "ZR" },
];

const topics = [
  "Apa itu React & SPA",
  "JSX & Component",
  "Props & State",
  "Event Handling",
  "Conditional Rendering",
  "List Rendering & Key",
];

function App() {
  const [showMateri, setShowMateri] = useState(false);

  return (
    <>
      <Header title="Intern Profile Dashboard" />

      <section className="dashboard-section">
        <h2>Daftar Siswa</h2>
        <div className="profile-list">
          {students.map((student, index) => (
            <ProfileCard
              key={index}
              name={student.name}
              role={student.role}
              avatar={student.avatar}
            />
          ))}
        </div>
      </section>

      <section className="dashboard-section">
        <div className="section-header">
          <h2>Materi yang Dipelajari</h2>
          <button className="toggle-btn" onClick={() => setShowMateri(!showMateri)}>
            {showMateri ? "Sembunyikan" : "Tampilkan"}
          </button>
        </div>
        {showMateri && (
          topics.length > 0 ? (
            <ul className="learning-list">
              {topics.map((topic, index) => (
                <LearningCard key={index} topic={topic} />
              ))}
            </ul>
          ) : (
            <p className="empty-state">Data belum tersedia</p>
          )
        )}
      </section>
    </>
  );
}

export default App;
