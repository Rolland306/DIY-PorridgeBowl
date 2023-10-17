import bowlsAPI from "../services/bowlsAPI";

const Bowl = ({ bowl }) => {
  const handleOnClick = (event) => {
    event.preventDefault();
    window.location.href = `/edit/${bowl.id}`;
  };

  // Define variables to hold the text based on the price values
  let baseText = "";
  if (parseFloat(bowl.base_price) === parseFloat(7.0)) {
    baseText = "Maize/Corn🌽";
  } else if (parseFloat(bowl.base_price) === parseFloat(8.0)) {
    baseText = "Sorghum🌿";
  }

  let additiveText = "";
  if (parseFloat(bowl.additive_price) === parseFloat(4.0)) {
    additiveText = "Margarine🧈";
  } else if (parseFloat(bowl.additive_price) === parseFloat(2.0)) {
    additiveText = "Peanut Butter🥜";
  }

  let sugarText = parseFloat(bowl.sugar_price) === parseFloat(5.0) ? "🧂" : "";

  // Calculate the total price
  const totalPrice =
    parseFloat(bowl.sugar_price) +
    parseFloat(bowl.additive_price) +
    parseFloat(bowl.base_price);

  // Function to handle delete button click
  const handleDeleteClick = async () => {
    // Show a confirmation dialog before deleting (optional)

    try {
      // Call the deleteBowl function from bowlsAPI to delete the bowl
      await bowlsAPI.deleteBowl(bowl.id);
      console.log("delete cool");
      // After successfully deleting the bowl, navigate to the /viewbowls endpoint
      window.location.href = "/viewbowls";
    } catch (error) {
      console.error("Error deleting bowl:", error);
    }
  };

  return (
    <article>
      <div className="article-body">
        <h2>
          <span className="sugar-text">{sugarText}</span> {bowl.name}
        </h2>
        <div className="property-container">
          <h5>Base: {baseText} </h5>

          <h5> Additive: {additiveText}</h5>
        </div>
      </div>

      <div className="article-footer">
        <div className="button-container">
          <button onClick={handleOnClick}>Edit 📝</button>
          <button onClick={handleDeleteClick}>Delete 🗑️</button>
        </div>
        <button>Total Price: ${totalPrice.toFixed(2)}</button>
      </div>
    </article>
  );
};

export default Bowl;
