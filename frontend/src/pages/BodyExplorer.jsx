import { useState, useEffect } from "react";
import Card from "../components/Card";
import bodyImage from "../assets/bodyy.png";
import { deficiencyReportService } from "../services/deficiencyReportService";

const BodyExplorer = () => {

  const [selectedOrgan, setSelectedOrgan] = useState("Brain");

  const [deficiencies, setDeficiencies] = useState([]);

  const [recommendations, setRecommendations] = useState({});

  const [organInfo, setOrganInfo] = useState(null);

  const hasDeficiency = (nutrient) => {
  return deficiencies.some(
    d =>
      d.nutrient_name?.trim().toLowerCase() ===
      nutrient.trim().toLowerCase()
  );
};

  const loadDeficiencies = async () => {
    try {
      const data = await deficiencyReportService.getAll();
      setDeficiencies(data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadRecommendations = async () => {
  try {
    const data =
      await deficiencyReportService.getRecommendations();

    console.log("RECOMMENDATIONS API:", data);
    console.log("FOOD RECOMMENDATIONS:", data.food_recommendations);

    setRecommendations(
      data.food_recommendations || {}
    );
  } catch (err) {
    console.log(err);
  }
};

  const fetchOrganInfo = async (organ) => {
  try {
    setOrganInfo(null);

    const response = await fetch(
      `http://127.0.0.1:8000/body-explorer/${organ}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    console.log("Organ data:", data);

    setOrganInfo(data);

  } catch (err) {
    console.error("Error fetching organ info:", err);
    setOrganInfo(null);
  }
};

  useEffect(() => {

    loadDeficiencies();

    loadRecommendations();

    fetchOrganInfo("brain");

  }, []);

  return (

    <div className="space-y-6">

      <Card>

        <h1 className="text-3xl font-bold">
          🧬 Interactive Body Explorer
        </h1>

        <p className="text-gray-600 mt-2">
          Click on different organs to understand how
          nutrient deficiencies affect your body.
        </p>

      </Card>

      <div className="grid lg:grid-cols-2 gap-6">

        <Card>

<div className="flex justify-center">
  <div className="relative inline-block">

    <img
      src={bodyImage}
      alt="Human Body"
      className="max-h-[700px] max-w-full object-contain block"
    />

{/* Brain */}
{(hasDeficiency("Iron") || hasDeficiency("Vitamin B12")) && (
<button
onClick={()=>{
setSelectedOrgan("Brain");
fetchOrganInfo("brain");
}}
className="
absolute top-[2%] left-[46%]
w-5 h-5
rounded-full
bg-yellow-400
ring-4 ring-yellow-200
animate-pulse
transition
hover:scale-125
"
/>
)}

{/* Nervous System */}
{hasDeficiency("Vitamin B12") && (
<button
onClick={()=>{
setSelectedOrgan("Nervous System");
fetchOrganInfo("nervous-system");
}}
className="
absolute top-[20%] left-[50%]
w-5 h-5
rounded-full
bg-yellow-400
ring-4 ring-yellow-200
animate-pulse
transition
hover:scale-125
z-20
"
/>
)}

{/* Blood */}
{hasDeficiency("Iron") && (
<button
onClick={()=>{
setSelectedOrgan("Blood");
fetchOrganInfo("blood");
}}
className="
absolute top-[38%] left-[18%]
w-5 h-5
rounded-full
bg-yellow-400
ring-4 ring-yellow-200
animate-pulse
transition
hover:scale-125
"
/>
)}

{/* Digestive */}
{hasDeficiency("Iron") && (
<button
onClick={()=>{
setSelectedOrgan("Digestive System");
fetchOrganInfo("digestive-system");
}}
className="
absolute top-[41%] left-[47%]
w-5 h-5
rounded-full
bg-yellow-400
ring-4 ring-yellow-200
animate-pulse
transition
hover:scale-125
"
/>
)}

{/* Bones */}
{hasDeficiency("Vitamin D") && (
<button
onClick={()=>{
setSelectedOrgan("Bones");
fetchOrganInfo("bones");
}}
className="
absolute top-[70%] left-[56%]
w-5 h-5
rounded-full
bg-yellow-400
ring-4 ring-yellow-200
animate-pulse
transition
hover:scale-125
"
/>
)}

{/* Muscles */}
{hasDeficiency("Vitamin D") && (
<button
onClick={()=>{
setSelectedOrgan("Muscles");
fetchOrganInfo("muscles");
}}
className="
absolute top-[30%] left-[69%]
w-5 h-5
rounded-full
bg-yellow-400
ring-4 ring-yellow-200
animate-pulse
transition
hover:scale-125
"
/>
)}

</div>

 
</div>

</Card>

        <Card>

          <h2 className="text-2xl font-bold mb-4">
            {selectedOrgan}
          </h2>

          {organInfo ? (

            <>
              <h3 className="font-semibold mb-2">
                Affected Nutrient
              </h3>

              <p className="mb-5">
                {organInfo.deficiency}
              </p>

              <h3 className="font-semibold mb-2">
  Possible Symptoms
</h3>

<ul className="list-disc ml-5 space-y-2 mb-6">
  {organInfo.effects.map((effect) => (
    <li key={effect}>
      {effect}
    </li>
  ))}
</ul>

<h3 className="font-semibold mb-2">
  Recommended Foods
</h3>

<div className="flex flex-wrap gap-2">
  {recommendations[organInfo.deficiency]?.length ? (
    recommendations[organInfo.deficiency].map((food) => (
      <span
        key={food}
        className="px-3 py-1 bg-green-100 text-green-700 rounded-full"
      >
        {food}
      </span>
    ))
  ) : (
    <p>No recommendations available for this nutrient.</p>
  )}
</div>

            </>

          ) : (

            <p>Loading...</p>

          )}

        </Card>

      </div>

    </div>

  );

};

export default BodyExplorer;