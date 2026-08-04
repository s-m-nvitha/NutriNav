import React, { useState } from "react";
import bodyImage from "../assets/bodyy.png";

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
      🧬 Interactive Body Explorer
    </h1>

    <div className="grid md:grid-cols-2 gap-8">

      {/* Body Image */}

      <div className="bg-white rounded-xl shadow p-5">

        <img
          src={bodyImage}
          alt="Human Body"
          className="w-full max-h-[600px] object-contain"
        />

      </div>

      {/* Organ Details */}

      <div className="bg-white rounded-xl shadow p-5">

        <div className="flex gap-2 flex-wrap mb-6">

          {Object.keys(organs).map((organ) => (

            <button
              key={organ}
              onClick={() => setSelected(organ)}
              className={`px-4 py-2 rounded-lg ${
                selected === organ
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {organ}
            </button>

          ))}

        </div>

        <h2 className="text-2xl font-bold mb-4">
          {selected}
        </h2>

        <ul className="space-y-3">

          {organs[selected].map((item) => (

            <li
              key={item}
              className="bg-red-50 border border-red-200 p-3 rounded-lg"
            >
              {item}
            </li>

          ))}

        </ul>

      </div>

    </div>

  </div>
);
};

export default BodyExplorer;