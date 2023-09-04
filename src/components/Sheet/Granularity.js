import React, { useContext, useState } from "react";
import { FaTrash } from "react-icons/fa";
import "../../App.css";
import { GlobalContext } from "../../GlobalProvider";
const Granularity = (props) => {
  const [color, setColor] = useState();
  const { selectedSheet } = useContext(GlobalContext);
  return (
    <>
      <div className="Granularity-container">
        <div
          className="granularity-color"
          droppable
          onDrop={props.drop}
          onDragOver={(e) => e.preventDefault()}
          id="groupby"
        >
          GroupBy
          <p
            droppable
            onDrop={props.drop}
            onDragOver={(e) => e.preventDefault()}
            id="groupby"
          >
            {selectedSheet?.groupby?.key}
            <FaTrash
              onClick={props.deleteValues}
              id="groupby"
              style={{ cursor: "pointer", height: "14px", marginTop: "2px" }}
            />
          </p>
        </div>
        <div className="granularity-color">
          <img
            src="../images/detail.png"
            style={{
              display: "block",
              width: "25px",
              marginLeft: "50px",
              borderRadius: "20px",
              alignContent: "center",
              justifyContent: "center",
            }}
          ></img>

          <p
            droppable
            onDrop={props.drop}
            onDragOver={(e) => e.preventDefault()}
            id="text"
          >
            {selectedSheet?.text?.key}
            <FaTrash
              onClick={props.deleteValues}
              id="text"
              style={{ cursor: "pointer", height: "14px", marginTop: "2px" }}
            />
          </p>
        </div>
      </div>
    </>
  );
};
export default Granularity;
