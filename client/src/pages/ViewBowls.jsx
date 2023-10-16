import React, { useState, useEffect } from "react";
import Bowl from "../components/Bowl";
import bowlsAPI from "../services/bowlsAPI";

const ViewBowls = () => {
  const [bowls, setBowls] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await bowlsAPI.getAllBowls();
        console.log("response: ", response);
        // if (!response.ok) {
        //   throw new Error("Error fetching data");
        // }
        //const data = response.json();
        setBowls(response);
        console.log("bowls: ", bowls);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  return (
    <div>
      {bowls && bowls.length > 0 ? (
        bowls.map((bowl) => <Bowl key={bowl.id} bowl={bowl} />)
      ) : (
        <h3>No bowls found 😔</h3>
      )}
    </div>
  );
};

export default ViewBowls;
