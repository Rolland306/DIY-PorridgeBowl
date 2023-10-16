import React, { useState } from "react";
import "../App.css";

const CreateBowl = () => {
  const [name, setName] = useState("");
  const [addSugar, setAddSugar] = useState(false);

  const handleSubmit = (e) => {
    // bowlApi.createBowl();
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="create-bowl-panel">
      <form className="horizontal-form" onSubmit={handleSubmit}>
        <label>
          <input
            type="checkbox"
            checked={addSugar}
            onChange={() => setAddSugar(!addSugar)}
          />
          Add Sugar
        </label>
        <div className="create-bowl-options">
          <div className="bowl-options">
            <button>BASE</button>
            <button>ADDITIVE</button>
          </div>
        </div>
        <div className="create-bowl-name">
          <input
            type="text"
            placeholder="Bowl Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input className="create-bowl-button" type="submit" value="Create" />
        </div>
      </form>
    </div>
  );
};

export default CreateBowl;
