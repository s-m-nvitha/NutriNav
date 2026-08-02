import React, { useState } from "react";

const organs = {
  Brain: [
    "Iron deficiency → Poor concentration",
    "Vitamin B12 deficiency → Memory issues",
  ],

  Eyes: [
    "Vitamin A deficiency → Night blindness",
  ],

  Heart: [
    "Iron deficiency → Reduced oxygen transport",
  ],

  Bones: [
    "Vitamin D deficiency → Weak bones",
    "Calcium deficiency → Bone loss",
  ],

  Muscles: [
    "Magnesium deficiency → Muscle cramps",
  ],
};

const BodyExplorer = () => {
  const [selected, setSelected] = useState("Brain");

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Body Explorer
      </h1>

      <div className="flex gap-3 flex-wrap mb-6">
        {Object.keys(organs).map((organ) => (
          <button
            key={organ}
            onClick={() => setSelected(organ)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            {organ}
          </button>
        ))}
      </div>

      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-3">
          {selected}
        </h2>

        <ul className="list-disc pl-5">
          {organs[selected].map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BodyExplorer;