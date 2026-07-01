import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import Greeting from "./components/Greeting";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
          <h1>Halo, React Developer!</h1>
        </div>

        <button type="button" className="counter" onClick={() => setCount((count) => count + 1)}>
          Count is {count}
        </button>

        <div className="input-area">
          <label htmlFor="nameInput">Masukkan namamu:</label>
          <input
            id="nameInput"
            type="text"
            placeholder="Tulis namamu di sini..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Greeting name={name} />
        </div>
        <p>Diatas ini adalah contoh dari state, props dan event handling yang ada di react</p>
      </section>
    </>
  );
}

export default App;
