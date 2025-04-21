import {useState} from "react";

export function Player({initialName, symbol, isActive, onChangeName}) {

    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(initialName);

    function handleEdit() {
        setIsEditing(editing => !editing);

        if (isEditing) {
            onChangeName(symbol, name);
        }
    }

    function handleChange(event) {
        setName(event.target.value);
    }

    return (
        <li className={`player ${isActive ? "active" : ""}`}>
            <span className='player'>
                {isEditing ? (
                    <input type="text" value={name} onChange={handleChange}/>
                ) : (
                    <span className="player-name">{name}</span>
                )}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEdit}>
                {isEditing ? "Save" : "Edit"}
            </button>
        </li>
    )
}