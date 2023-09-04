import React, { useState, useContext, useRef } from "react";
import { GlobalContext } from "../../GlobalProvider";
import { pickBy, keys, max, isEmpty } from "lodash";

const Source = () => {
  const [activeButton, setActiveButton] = useState(null);
  const [com, setCom] = useState(null);

  const [ismtmDropdownOpen, setIsmtmDropdownOpen] = useState(false);
  const dragItem = useRef();
  const {
    selectedWBSheet,
    selectedWB,
    setSelectedWB,
    setSelectedWBSheet,
  } = useContext(GlobalContext);
  const [sheet1, setSheet1] = useState();
  const [sheet2, setSheet2] = useState();
  const [interSection, setInterSection] = useState();
  const handleDrop = (e) => {
    e.preventDefault();
    const dragValue = dragItem.current;
    if (!sheet1) setSheet1(dragValue);
    else {
      setSheet2(dragValue);
      getJoinedData(selectedWB, sheet1, dragValue);
    }
  };

  const getInter = () => {
    var x = document.getElementById("interSection");
    if (x.style.display === "none") {
      getIntersection(selectedWB, sheet1, dragValue);
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  };
  const getIntersection = (wb, sh1, sh2) => {
    if (wb && sh1 && sh2) {
      const commonCol = wb[sh1][0].filter((value) =>
        wb[sh2][0].includes(value)
      );
      const sh1ColIndex = wb[sh1][0].findIndex((col) => col === commonCol);

      const sh2ColIndex = wb[sh2][0].findIndex((col) => col === commonCol);
      let joinedSheets = [];
      commonCol.forEach((sh1Row, index) => {
        if (sh1ColIndex === sh2ColIndex);
        joinedSheets.push([...new Set([commonCol])]);
      });
      setInterSection(joinedSheets);
      // setWorkbook(joinedSheets);
    }
  };
  const dragValue = dragItem.current;
  const getJoinedData = (wb, sh1, sh2) => {
    if (wb && sh1 && sh2) {
      const commonCol = wb[sh1][0].filter((value) =>
        wb[sh2][0].includes(value)
      )[0];
      const sh1ColIndex = wb[sh1][0].findIndex((col) => col === commonCol);
      const sh2ColIndex = wb[sh2][0].findIndex((col) => col === commonCol);
      const joinedSheet = [];
      wb[sh1].forEach((sh1Row, index) =>
        wb[sh2].forEach((sh2Row) => {
          if (sh2Row[sh2ColIndex] === wb[sh1][index][sh1ColIndex])
            joinedSheet.push([...new Set([...sh1Row, ...sh2Row])]);
        })
      );
      const updatedWorkbook = { ...wb };
      updatedWorkbook[`${sh1}_${sh2}`] = joinedSheet;
      setSelectedWB(updatedWorkbook);
    }
  };
  const handleSheetChange = (e) => {
    setSelectedWBSheet(e.target.value);
  };
  const handleUnion = (e) => {
    var x = document.getElementById("Union");
    if (x.style.display === "none") {
      getJoinedData(selectedWB, sheet1, dragValue);
      x.style.display = "flex";
    } else {
      x.style.display = "none";
    }
  };
  return (
    <>
      <h1>Source page</h1>
      {!isEmpty(selectedWB) && (
        <div className="fileName" style={{ display: "block" }}>
          {Object.keys(selectedWB).map((sheet, idx) => (
            <div key={idx}>
              <input
                type="checkBox"
                checked={sheet === selectedWBSheet}
                name="sheetName"
                value={sheet}
                onChange={handleSheetChange}
              ></input>
              <span draggable onDragStart={() => (dragItem.current = sheet)}>
                {sheet}
              </span>
            </div>
          ))}
        </div>
      )}
      <button
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "70px",
          cursor: "pointer",
          fontSize: "15px",
          borderRadius: "10px",
        }}
        onClick={handleUnion}
      >
        <img
          src="./images/union.png"
          style={{ width: "30px", height: "30px" }}
        />
        New Union
      </button>
      <button
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "70px",
          cursor: "pointer",
          fontSize: "15px",
          borderRadius: "10px",
          marginTop: "5px",
        }}
        onClick={getInter}
      >
        <img
          src="./images/union.png"
          style={{ width: "30px", height: "30px" }}
        />
        InterSection
      </button>
      <div className="dropFile">
        {/* <div
            droppable
            className="dropBlock"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            File Drop box
          </div> */}
        <div className="UnionFiles" id="Union">
          <div
            className="UnionFile1"
            droppable
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            {/* <span>UnionFiles</span> */}
            <span>{sheet1}</span>
          </div>
          <div className="interSection" id="interSection">
            {interSection}
          </div>
          <div
            className="UnionFile2"
            droppable
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            {/* <span>Sheet2:</span> */}
            <span style={{ height: "300px" }}>{sheet2}</span>
          </div>
        </div>
      </div>
    </>
  );
};
export default Source;
