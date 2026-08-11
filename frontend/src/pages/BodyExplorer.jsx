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
      d => d.nutrient_name?.toLowerCase() === nutrient.toLowerCase()
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

<div className="relative flex justify-center">

<img
  src={bodyImage}
  alt="Human Body"
  className="w-full max-h-[700px] object-contain"
/>

{/* Brain */}
{(hasDeficiency("Iron") || hasDeficiency("Vitamin B12")) && (
<button
onClick={()=>{
setSelectedOrgan("Brain");
fetchOrganInfo("brain");
}}
className={`
absolute top-[8%] left-[49%]
rounded-full
animate-pulse
transition
hover:scale-125

${
selectedOrgan==="Brain"
?
"w-7 h-7 bg-yellow-300 ring-8 ring-yellow-100"
:
"w-5 h-5 bg-yellow-400 ring-4 ring-yellow-200"
}
`}
/>
)}

{/* Nervous System */}
{hasDeficiency("Vitamin B12") && (
<button
onClick={()=>{
setSelectedOrgan("Nervous System");
fetchOrganInfo("nervous-system");
}}
className={`
absolute top-[24%] left-[50%]
rounded-full
animate-pulse
transition
hover:scale-125

${
selectedOrgan==="Nervous System"
?
"w-7 h-7 bg-yellow-300 ring-8 ring-yellow-100"
:
"w-5 h-5 bg-yellow-400 ring-4 ring-yellow-200"
}
`}
/>
)}

{/* Blood */}
{hasDeficiency("Iron") && (
<button
onClick={()=>{
setSelectedOrgan("Blood");
fetchOrganInfo("blood");
}}
className={`
absolute top-[35%] left-[46%]
rounded-full
animate-pulse
transition
hover:scale-125

${
selectedOrgan==="Blood"
?
"w-7 h-7 bg-yellow-300 ring-8 ring-yellow-100"
:
"w-5 h-5 bg-yellow-400 ring-4 ring-yellow-200"
}
`}
/>
)}

{/* Digestive */}
{hasDeficiency("Iron") && (
<button
onClick={()=>{
setSelectedOrgan("Digestive System");
fetchOrganInfo("digestive-system");
}}
className={`
absolute top-[48%] left-[50%]
rounded-full
animate-pulse
transition
hover:scale-125

${
selectedOrgan==="Digestive System"
?
"w-7 h-7 bg-yellow-300 ring-8 ring-yellow-100"
:
"w-5 h-5 bg-yellow-400 ring-4 ring-yellow-200"
}
`}
/>
)}

{/* Bones */}
{hasDeficiency("Vitamin D") && (
<button
onClick={()=>{
setSelectedOrgan("Bones");
fetchOrganInfo("bones");
}}
className={`
absolute top-[70%] left-[49%]
rounded-full
animate-pulse
transition
hover:scale-125

${
selectedOrgan==="Bones"
?
"w-7 h-7 bg-yellow-300 ring-8 ring-yellow-100"
:
"w-5 h-5 bg-yellow-400 ring-4 ring-yellow-200"
}
`}
/>
)}

{/* Muscles */}
{hasDeficiency("Vitamin D") && (
<button
onClick={()=>{
setSelectedOrgan("Muscles");
fetchOrganInfo("muscles");
}}
className={`
absolute top-[62%] left-[58%]
rounded-full
animate-pulse
transition
hover:scale-125

${
selectedOrgan==="Muscles"
?
"w-7 h-7 bg-yellow-300 ring-8 ring-yellow-100"
:
"w-5 h-5 bg-yellow-400 ring-4 ring-yellow-200"
}
`}
/>
)}

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

              <h3 className="font-semibold mt-6 mb-2">
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

              <ul className="list-disc ml-5 space-y-2">

                {organInfo.effects.map(effect => (

                  <li key={effect}>
                    {effect}
                  </li>

                ))}

              </ul>

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