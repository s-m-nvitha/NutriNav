import { useState, useEffect } from "react";

export default function BodyExplorer() {

  const [selectedOrgan, setSelectedOrgan] =
    useState("brain");

  const [organData, setOrganData] =
    useState(null);

  const fetchOrganInfo = async (organ) => {

    try {

      const response = await fetch(
        `http://localhost:8000/body-explorer/${organ}`
      );

      const data = await response.json();

      setOrganData(data);

    } catch (error) {
      console.error(error);
    }
  };


 
}