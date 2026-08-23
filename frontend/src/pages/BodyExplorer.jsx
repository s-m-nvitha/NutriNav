import { useState, useEffect } from "react";
import Card from "../components/Card";
import bodyImage from "../assets/bodyy.png";
import { deficiencyReportService } from "../services/deficiencyReportService";

const BodyExplorer = () => {
  const [selectedOrgan, setSelectedOrgan] = useState("Brain");
  const [deficiencies, setDeficiencies] = useState([]);
  const [recommendations, setRecommendations] = useState({});
  const [organInfo, setOrganInfo] = useState(null);

  // Check whether the user has a particular deficiency
  const hasDeficiency = (nutrient) => {
    return deficiencies.some(
      (d) =>
        d.nutrient_name?.trim().toLowerCase() ===
        nutrient.trim().toLowerCase()
    );
  };

  // Load deficiencies
  const loadDeficiencies = async () => {
    try {
      const data = await deficiencyReportService.getAll();
      setDeficiencies(data);
    } catch (err) {
      console.log("Error loading deficiencies:", err);
    }
  };

  // Load food recommendations
  const loadRecommendations = async () => {
    try {
      const data = await deficiencyReportService.getRecommendations();

      console.log("RECOMMENDATIONS API:", data);

      setRecommendations(data.food_recommendations || {});
    } catch (err) {
      console.log("Error loading recommendations:", err);
    }
  };

  // Load selected organ information
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

  // Change selected organ
  const selectOrgan = (name, apiName) => {
    setSelectedOrgan(name);
    fetchOrganInfo(apiName);
  };

  return (
    <div className="w-full px-3 sm:px-4 lg:px-5 py-4">

      {/* =========================================================
          TOP INTRODUCTION SECTION
      ========================================================= */}
      <Card className="!p-0 overflow-hidden rounded-[22px] border border-green-100 shadow-sm">

        {/* ONLY GREEN COLOR CHANGED */}
        <div className="bg-[#004530] text-white px-6 py-5">

          <div className="flex flex-col xl:flex-row items-center gap-8">

            {/* LEFT */}
            <div className="flex items-center gap-5 flex-1 min-w-0">

              <div className="w-16 h-16 rounded-full border border-green-300/60 bg-green-900/20 flex items-center justify-center text-3xl shrink-0">
                🧬
              </div>

              <div>
                <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
                  Interactive Body Explorer
                </h1>

                <p className="text-sm lg:text-base text-green-50 mt-2 max-w-xl leading-relaxed">
                  Click on different organs to understand how nutrient
                  deficiencies affect your body.
                </p>
              </div>

            </div>

            {/* RIGHT INFORMATION */}
            <div className="hidden lg:flex items-center shrink-0">

              <div className="text-center px-6 xl:px-8">
                <div className="text-2xl mb-1">🌿</div>

                <h3 className="font-semibold text-sm">
                  Explore Your Body
                </h3>

                <p className="text-xs text-green-100 mt-1">
                  Click on any organ
                </p>
              </div>

              <div className="h-16 w-px bg-green-200/30" />

              <div className="text-center px-6 xl:px-8">
                <div className="text-2xl mb-1">🛡️</div>

                <h3 className="font-semibold text-sm">
                  Understand Impact
                </h3>

                <p className="text-xs text-green-100 mt-1">
                  See how deficiencies affect you
                </p>
              </div>

              <div className="h-16 w-px bg-green-200/30" />

              <div className="text-center px-6 xl:px-8">
                <div className="text-2xl mb-1">🍎</div>

                <h3 className="font-semibold text-sm">
                  Get Recommendations
                </h3>

                <p className="text-xs text-green-100 mt-1">
                  Discover foods for your health
                </p>
              </div>

            </div>

          </div>

        </div>
      </Card>


      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mt-5 items-start">

        {/* =======================================================
            LEFT - BODY IMAGE
        ======================================================= */}
        <Card className="!p-0 overflow-hidden rounded-[22px] border border-gray-200 shadow-sm">

          <div className="h-[700px] flex items-center justify-center bg-[#FCFDFC]">

            <div className="relative h-full flex items-center justify-center">

              <img
                src={bodyImage}
                alt="Human Body"
                className="h-[700px] w-auto object-contain"
              />

              {/* ================= BRAIN ================= */}
              {(hasDeficiency("Iron") ||
                hasDeficiency("Vitamin B12")) && (

                <button
                  onClick={() => selectOrgan("Brain", "brain")}
                  aria-label="Brain"
                  className="
                    absolute
                    top-[3%]
                    left-[46%]
                    w-6
                    h-6
                    rounded-full
                    bg-yellow-400
                    border-2
                    border-yellow-200
                    shadow-md
                    hover:scale-125
                    transition-transform
                    z-20
                  "
                />
              )}

              {/* ================= NERVOUS SYSTEM ================= */}
              {hasDeficiency("Vitamin B12") && (

                <button
                  onClick={() =>
                    selectOrgan("Nervous System", "nervous-system")
                  }
                  aria-label="Nervous System"
                  className="
                    absolute
                    top-[21%]
                    left-[49%]
                    w-5
                    h-5
                    rounded-full
                    bg-yellow-400
                    border-2
                    border-yellow-200
                    shadow-md
                    hover:scale-125
                    transition-transform
                    z-20
                  "
                />
              )}

              {/* ================= BLOOD ================= */}
              {hasDeficiency("Iron") && (

                <button
                  onClick={() => selectOrgan("Blood", "blood")}
                  aria-label="Blood"
                  className="
                    absolute
                    top-[39%]
                    left-[17%]
                    w-6
                    h-6
                    rounded-full
                    bg-yellow-400
                    border-2
                    border-yellow-200
                    shadow-md
                    hover:scale-125
                    transition-transform
                    z-20
                  "
                />
              )}

              {/* ================= DIGESTIVE SYSTEM ================= */}
              {hasDeficiency("Iron") && (

                <button
                  onClick={() =>
                    selectOrgan(
                      "Digestive System",
                      "digestive-system"
                    )
                  }
                  aria-label="Digestive System"
                  className="
                    absolute
                    top-[42%]
                    left-[47%]
                    w-6
                    h-6
                    rounded-full
                    bg-yellow-400
                    border-2
                    border-yellow-200
                    shadow-md
                    hover:scale-125
                    transition-transform
                    z-20
                  "
                />
              )}

              {/* ================= BONES ================= */}
              {hasDeficiency("Vitamin D") && (

                <button
                  onClick={() => selectOrgan("Bones", "bones")}
                  aria-label="Bones"
                  className="
                    absolute
                    top-[69%]
                    left-[55%]
                    w-6
                    h-6
                    rounded-full
                    bg-yellow-400
                    border-2
                    border-yellow-200
                    shadow-md
                    hover:scale-125
                    transition-transform
                    z-20
                  "
                />
              )}

              {/* ================= MUSCLES ================= */}
              {hasDeficiency("Vitamin D") && (

                <button
                  onClick={() => selectOrgan("Muscles", "muscles")}
                  aria-label="Muscles"
                  className="
                    absolute
                    top-[30%]
                    left-[68%]
                    w-6
                    h-6
                    rounded-full
                    bg-yellow-400
                    border-2
                    border-yellow-200
                    shadow-md
                    hover:scale-125
                    transition-transform
                    z-20
                  "
                />
              )}

            </div>

          </div>
        </Card>


        {/* =======================================================
            RIGHT - ORGAN INFORMATION
        ======================================================= */}
        <Card className="!p-0 overflow-hidden rounded-[22px] border border-gray-200 shadow-sm">

          {/* GREEN HEADER */}
          {/* ONLY GREEN COLOR CHANGED — NO GRADIENT */}
          <div className="bg-[#005B43] text-white px-6 py-5">

            <div className="flex items-center gap-4">

              <div className="
                w-14
                h-14
                rounded-full
                border
                border-green-300/60
                bg-green-900/20
                flex
                items-center
                justify-center
                text-3xl
              ">
                🧠
              </div>

              <h2 className="text-3xl font-bold">
                {selectedOrgan}
              </h2>

            </div>

          </div>


          {/* CONTENT */}
          <div className="px-6 py-6">

            {organInfo ? (

              <div className="space-y-6">

                {/* ================= AFFECTED NUTRIENT ================= */}
                <section>

                  <div className="flex items-center gap-3 mb-3">

                    <span className="w-3 h-3 rounded-full bg-green-600" />

                    <h3 className="text-lg font-semibold text-gray-900">
                      Affected Nutrient
                    </h3>

                  </div>

                  <span className="
                    inline-block
                    px-4
                    py-2
                    rounded-full
                    bg-green-50
                    text-green-700
                    font-medium
                    border
                    border-green-100
                  ">
                    {organInfo.deficiency}
                  </span>

                </section>


                {/* DIVIDER */}
                <div className="border-t border-gray-200" />


                {/* ================= SYMPTOMS ================= */}
                <section>

                  <div className="flex items-center gap-3 mb-3">

                    <span className="w-3 h-3 rounded-full bg-green-600" />

                    <h3 className="text-lg font-semibold text-gray-900">
                      Possible Symptoms
                    </h3>

                  </div>

                  <div className="
                    bg-[#F4FAF7]
                    border
                    border-green-100
                    rounded-xl
                    p-5
                  ">

                    <ul className="space-y-3">

                      {organInfo.effects?.map((effect) => (

                        <li
                          key={effect}
                          className="flex items-center gap-3 text-gray-800"
                        >

                          <span className="
                            w-3
                            h-3
                            rounded-full
                            bg-green-600
                            shrink-0
                          " />

                          <span>{effect}</span>

                        </li>

                      ))}

                    </ul>

                  </div>

                </section>


                {/* DIVIDER */}
                <div className="border-t border-gray-200" />


                {/* ================= RECOMMENDED FOODS ================= */}
                <section>

                  <div className="flex items-center gap-3 mb-3">

                    <span className="w-3 h-3 rounded-full bg-green-600" />

                    <h3 className="text-lg font-semibold text-gray-900">
                      Recommended Foods
                    </h3>

                  </div>

                  <div className="
                    bg-green-50/70
                    border
                    border-green-100
                    rounded-2xl
                    p-4
                  ">

                    {recommendations[organInfo.deficiency]?.length ? (

                      <div className="flex flex-wrap gap-2">

                        {recommendations[organInfo.deficiency].map(
                          (food) => (

                            <span
                              key={food}
                              className="
                                px-3
                                py-2
                                bg-white
                                border
                                border-green-200
                                text-green-700
                                rounded-full
                                text-sm
                                font-medium
                              "
                            >
                              🌿 {food}
                            </span>

                          )
                        )}

                      </div>

                    ) : (

                      <div className="flex items-center gap-3 text-gray-600">

                        <span className="text-xl">
                          🌿
                        </span>

                        <p className="text-sm">
                          No recommendations available for this nutrient.
                        </p>

                      </div>

                    )}

                  </div>

                </section>

              </div>

            ) : (

              <div className="flex items-center justify-center py-20">

                <p className="text-gray-500">
                  Loading...
                </p>

              </div>

            )}

          </div>

        </Card>

      </div>

    </div>
  );
};

export default BodyExplorer;