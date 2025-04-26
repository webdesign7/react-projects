import {useRef, useState} from "react";

export default function Player() {
  const playerName = useRef();
    const [name, setName] = useState("");

    function handleNameChange(event) {
        setName(playerName.current.value)
    }

    return (
    <section id="player">
      <h2>Welcome { name ?? 'Unknown name' }</h2>
      <p>
        <input ref={playerName} type="text" />
        <button onClick={handleNameChange}>Set Name</button>
      </p>
    </section>
  );
}
