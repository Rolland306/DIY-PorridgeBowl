import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../App.css";
import bowlsAPI from "../services/bowlsAPI";

const EditBowl = () => {
  const [name, setName] = useState("");
  const [addSugar, setAddSugar] = useState(false);
  const [baseType, setBaseType] = useState("");
  const [additiveType, setAdditiveType] = useState("");
  const [showBaseOptions, setShowBaseOptions] = useState(false);
  const [showAdditiveOptions, setShowAdditiveOptions] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const { bowlId } = useParams(); // Access the id parameter using useParams

  useEffect(() => {
    // Fetch the bowl data using the ID and populate the form
    const fetchBowlData = async () => {
      try {
        const bowl = await bowlsAPI.getBowlsById(bowlId);
        console.log("bowl: ", bowl);
        setName(bowl.name);
        setAddSugar(bowl.sugar_price === 5);
        setBaseType(bowl.base_price === 7 ? "Maize/corn" : "Sorghum");
        setAdditiveType(
          bowl.additive_price === 4 ? "Margarine" : "Peanut Butter"
        );

        // Calculate the total price based on the fetched data
        const newTotalPrice =
          bowl.sugar_price + bowl.base_price + bowl.additive_price;
        setTotalPrice(newTotalPrice);
      } catch (error) {
        console.error("Error fetching bowl data:", error);
      }
    };

    fetchBowlData();
  }, []);

  const handleBaseButtonClick = () => {
    setShowBaseOptions(!showBaseOptions);
    setShowAdditiveOptions(false);
  };

  const handleAdditiveButtonClick = () => {
    setShowAdditiveOptions(!showAdditiveOptions);
    setShowBaseOptions(false);
  };

  const handleUpdateClick = async () => {
    // Create a new bowl object with updated data
    const sugarPrice = addSugar ? 5 : 0;
    const basePrice = baseType === "Maize/corn" ? 7 : 8;
    const additivePrice = additiveType === "Margarine" ? 4 : 2;

    const updatedBowl = {
      id: bowlId,
      name: name,
      sugar_price: sugarPrice,
      base_price: basePrice,
      additive_price: additivePrice,
    };

    try {
      // Use the updateBowl function from bowlsAPI to update the bowl
      const response = await bowlsAPI.updateBowl(updatedBowl);
      // Redirect to the viewbowls page or show a success message
      window.location.href = "/viewbowls";
      console.log("Bowl updated:", response);
    } catch (error) {
      console.error("Error updating bowl:", error);
    }
  };

  const handleDeleteClick = async () => {
    try {
      // Call the deleteBowl function from bowlsAPI to delete the bowl
      await bowlsAPI.deleteBowl(bowlId);
      // After successfully deleting the bowl, navigate to the /viewbowls endpoint
      window.location.href = "/viewbowls";
      console.log("Bowl deleted");
    } catch (error) {
      console.error("Error deleting bowl:", error);
    }
  };

  return (
    <div className="create-bowl-panel">
      <div className="horizontal-form">
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
            <button onClick={handleBaseButtonClick}>BASE</button>
            {showBaseOptions && (
              <div className="base-options">
                <label>
                  <input
                    type="radio"
                    name="baseType"
                    value="Maize/corn"
                    checked={baseType === "Maize/corn"}
                    onChange={() => setBaseType("Maize/corn")}
                  />
                  Maize/corn
                </label>
                <label>
                  <input
                    type="radio"
                    name="baseType"
                    value="Sorghum"
                    checked={baseType === "Sorghum"}
                    onChange={() => setBaseType("Sorghum")}
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
                    onChange={() => setAdditiveType("Margarine")}
                  />
                  Margarine
                </label>
                <label>
                  <input
                    type="radio"
                    name="additiveType"
                    value="Peanut Butter"
                    checked={additiveType === "Peanut Butter"}
                    onChange={() => setAdditiveType("Peanut Butter")}
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
          <button className="create-bowl-button" onClick={handleUpdateClick}>
            Update
          </button>
          <button className="delete-bowl-button" onClick={handleDeleteClick}>
            Delete
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

export default EditBowl;
