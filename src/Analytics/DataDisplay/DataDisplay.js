import React, { useContext, useState } from "react";
import { GlobalContext } from "../../GlobalProvider";
import Describe from "./Describe";
import CleanData from "./CleanData";
import AnalyzeData from "./AnalyzeData";

const DataDisplay = () => {
  const {
    categoricalData,
    categoryDataType,
    numericalData,
    numericalDataType,
  } = useContext(GlobalContext);
  const [display, setDisplay] = useState();
  return (
    <>
      <div className="DataDisplay">
      <div className="display">
        <button
          className="display_btn"
          onClick={(e) => setDisplay(e.target.value)}
          value="describe_data"
        >
          Describe Data
        </button>
        <button
          className="display_btn"
          value="clean_data"
          onClick={(e) => setDisplay(e.target.value)}
        >
          Clean Data
        </button>
        <button
          className="display_btn"
          value="analyze_data"
          onClick={(e) => setDisplay(e.target.value)}
        >
          Analyze Data
        </button>
        </div>
        {display === "describe_data" ? (
          <Describe />
        ) : display === "clean_data" ? (
          <CleanData />
        ) : display === "analyze_data" ? (
          <AnalyzeData />
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};
export default DataDisplay;
