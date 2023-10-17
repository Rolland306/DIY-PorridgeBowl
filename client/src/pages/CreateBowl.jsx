import React, { useState } from "react";
import "../App.css";
import bowlsAPI from "../services/bowlsAPI";

const CreateBowl = () => {
  const [name, setName] = useState("");
  const [addSugar, setAddSugar] = useState(false);
  const [baseType, setBaseType] = useState("");
  const [additiveType, setAdditiveType] = useState("");
  const [showBaseOptions, setShowBaseOptions] = useState(false);
  const [showAdditiveOptions, setShowAdditiveOptions] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleBaseButtonClick = () => {
    setShowBaseOptions(!showBaseOptions);
    setShowAdditiveOptions(false);
    calculateTotalPrice(); // Update the total price when you click "BASE"
  };

  const handleAdditiveButtonClick = () => {
    setShowAdditiveOptions(!showAdditiveOptions);
    setShowBaseOptions(false);
    calculateTotalPrice(); // Update the total price when you click "ADDITIVE"
  };

  // Function to calculate the total price
  const calculateTotalPrice = () => {
    const sugarPrice = addSugar ? 5 : 0;
    const basePrice =
      baseType === "Maize/corn" ? 7 : baseType === "Sorghum" ? 9 : 0;
    const additivePrice =
      additiveType === "Margarine"
        ? 4
        : additiveType === "Peanut Butter"
        ? 2
        : 0;

    const newTotalPrice = sugarPrice + basePrice + additivePrice;
    setTotalPrice(newTotalPrice);
  };

  // Event handler for the sugar checkbox
  const handleSugarChange = () => {
    setAddSugar(!addSugar); // Toggle the checkbox
    calculateTotalPrice(); // Update the total price when you change the checkbox
  };

  // Event handler for the radio buttons for base type
  const handleBaseTypeChange = (newBaseType) => {
    setBaseType(newBaseType);
    calculateTotalPrice(); // Update the total price when you change the radio button
  };

  // Event handler for the radio buttons for additive type
  const handleAdditiveTypeChange = (newAdditiveType) => {
    setAdditiveType(newAdditiveType);
    calculateTotalPrice(); // Update the total price when you change the radio button
  };

  const handleCreateClick = async () => {
    // Create a new bowl object when "CREATE" button is clicked
    const sugarPrice = addSugar ? 5 : 0;
    const basePrice =
      baseType === "Maize/corn" ? 7 : baseType === "Sorghum" ? 9 : 0;
    const additivePrice =
      additiveType === "Margarine"
        ? 4
        : additiveType === "Peanut Butter"
        ? 2
        : 0;

    const newBowl = {
      name: name,
      sugar_price: sugarPrice,
      base_price: basePrice,
      additive_price: additivePrice,
    };

    try {
      console.log("newBowl: ", newBowl);
      const response = await bowlsAPI.createBowl(newBowl);
      window.location = "/";
      console.log("new stuff we're adding: ", response);
      if (response.id) {
        console.log("New bowl created:", response);
      } else {
        console.error("Error creating bowl:", response);
      }
    } catch (error) {
      console.error("Error creating bowl:", error);
    }
  };

  return (
    <div className="create-bowl-panel">
      <div className="horizontal-form">
        <label>
          <input
            type="checkbox"
            checked={addSugar}
            onChange={handleSugarChange}
          />
          <p>Sugar</p>
        </label>
        <div className="create-bowl-options">
          <div className="bowl-options">
            <button onClick={handleBaseButtonClick}>BASE</button>
            {showBaseOptions && (
              <div className="base-options">
                <label>
                  <input
                    type="radio"
                    name="baseType"
                    value="Maize/corn"
                    checked={baseType === "Maize/corn"}
                    onChange={() => handleBaseTypeChange("Maize/corn")}
                  />
                  Maize/corn
                </label>
                <label>
                  <input
                    type="radio"
                    name="baseType"
                    value="Sorghum"
                    checked={baseType === "Sorghum"}
                    onChange={() => handleBaseTypeChange("Sorghum")}
                  />
                  Sorghum
                </label>
              </div>
            )}
            <button onClick={handleAdditiveButtonClick}>ADDITIVE</button>
            {showAdditiveOptions && (
              <div className="additive-options">
                <label>
                  <input
                    type="radio"
                    name="additiveType"
                    value="Margarine"
                    checked={additiveType === "Margarine"}
                    onChange={() => handleAdditiveTypeChange("Margarine")}
                  />
                  Margarine
                </label>
                <label>
                  <input
                    type="radio"
                    name="additiveType"
                    value="Peanut Butter"
                    checked={additiveType === "Peanut Butter"}
                    onChange={() => handleAdditiveTypeChange("Peanut Butter")}
                  />
                  Peanut Butter
                </label>
              </div>
            )}
          </div>
        </div>
        <div className="create-bowl-name">
          <input
            type="text"
            placeholder="Bowl Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="create-bowl-button" onClick={handleCreateClick}>
            Create
          </button>
        </div>
      </div>
      <div className="total-price-button">
        <button>
          <h3>💵${totalPrice.toFixed(2)}</h3>
        </button>
      </div>
    </div>
  );
};

export default CreateBowl;
