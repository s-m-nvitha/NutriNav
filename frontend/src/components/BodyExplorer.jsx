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

  useEffect(() => {
    fetchOrganInfo("brain");
  }, []);

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">
        Interactive Body Explorer
      </h1>

      {/* Buttons */}

      <div className="flex gap-3 mb-5">

        <button
          onClick={() => {
            setSelectedOrgan("brain");
            fetchOrganInfo("brain");
          }}
        >
          Brain
        </button>

        <button
          onClick={() => {
            setSelectedOrgan("blood");
            fetchOrganInfo("blood");
          }}
        >
          Blood
        </button>

        <button
          onClick={() => {
            setSelectedOrgan("bones");
            fetchOrganInfo("bones");
          }}
        >
          Bones
        </button>

      </div>

      {/* Result Card */}

      {
        organData && (

          <div className="border rounded p-4">

            <h2 className="text-xl font-bold">
              Deficiency:
              {" "}
              {organData.deficiency}
            </h2>

            <ul className="mt-3">

              {organData.effects.map((effect) => (

                <li key={effect}>
                  • {effect}
                </li>

              ))}

            </ul>

          </div>

        )
      }

    </div>
  );
}