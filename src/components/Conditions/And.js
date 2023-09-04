import React, { useState, useContext } from "react";
import { GlobalContext } from "../../GlobalProvider";
const And = (props) => {
  const {
    sheets,
    sheetParam,
    setSheets,
    selectedWB,
    selectedWBSheet,
    setIsOpen,
    newfield,
    setNewField,
    dropValue,
    setFilterOperator,
    setOperator1,
    value,
    setValue,
    ifText,
    setIftext,
    elseText,
    setElsetext,
  } = useContext(GlobalContext);
  const [values, setValues] = useState();
  let newFieldArray = [];
  const processCsv = (jsonData) => {
    const head = jsonData[0];
    const rows = jsonData.slice(1);
    const newArray = rows.map((row) => {
      const values = row;
      const eachObject = head.reduce((obj, header, i) => {
        obj[header] = values[i];
        return obj;
      }, {});
      return eachObject;
    });

    return newArray;
  };
  const getOperator = (plotValue, value, operator, operators) => {
    switch ((operator, operators)) {
      case ("=", ">"):
        for (var i = 0; i < plotValue.length; i++) {
          if ((plotValue[i] = value && plotValue[i] > values)) {
            newFieldArray.push(ifText);
          } else {
            newFieldArray.push(elseText);
          }
        }
        break;
      case ("=", "<"):
        for (var i = 0; i < plotValue.length; i++) {
          if ((plotValue[i] = value && plotValue[i] > values)) {
            newFieldArray.push(ifText);
          } else {
            newFieldArray.push(elseText);
          }
        }
        break;
      case ("=", ">="):
        for (var i = 0; i < plotValue.length; i++) {
          if ((plotValue[i] = value && plotValue[i] > values)) {
            newFieldArray.push(ifText);
          } else {
            newFieldArray.push(elseText);
          }
        }
        break;
      case ("=", "<="):
        for (var i = 0; i < plotValue.length; i++) {
          if ((plotValue[i] = value && plotValue[i] > values)) {
            newFieldArray.push(ifText);
          } else {
            newFieldArray.push(elseText);
          }
        }
        break;
      case ("=", "="):
        for (var i = 0; i < plotValue.length; i++) {
          if ((plotValue[i] = value && plotValue[i] > values)) {
            newFieldArray.push(ifText);
          } else {
            newFieldArray.push(elseText);
          }
        }
        break;

      default:
        break;
    }
  };
  const applyAND = (event) => {
    const addingField = selectedWB[selectedWBSheet][0].push(newfield);
    const field = event.currentTarget.id;
    const plotValue = processCsv(selectedWB[selectedWBSheet]).map(
      (record) => record[dropValue]
    );
    getOperator(plotValue, value, "=", ">");
    const fileData = selectedWB[selectedWBSheet].slice(1);
    for (var i = 0; i < fileData.length; i++) {
      fileData[i].push(newFieldArray[i]);
    }
    const tempSheets = sheets.map((s) =>
      s.name === sheetParam
        ? { ...s, [field]: { key: addingField, values: newFieldArray } }
        : s
    );
    setSheets(tempSheets);
    setIsOpen(false);
  };
  return (
    <>
      <input
        className="modalInput"
        placeholder="Field name..."
        required
        type={newfield}
        onChange={(e) => setNewField(e.target.value)}
      />
      <p id="AND">
        IF
        {selectedWB && selectedWB[selectedWBSheet] && (
          <select id="conditionValue" onClick={props.selectValue}>
            {selectedWB[selectedWBSheet][0].map((d) => (
              <option className="filterOptions" value={d}>
                {d}
              </option>
            ))}
          </select>
        )}
        <select id="filter" onClick={(e) => setFilterOperator(e.target.value)}>
          <option value="">operator</option>
          <option value="select">Null</option>
          <option value="=">=</option>
          <option value="<">{"<"}</option>
          <option value="<=">{"<="}</option>
          <option value=">=">{">="}</option>
          <option value=">">{">"}</option>
        </select>
        <input
          text={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Value.."
          className="modalInput"
        />
        AND
        {selectedWB && selectedWB[selectedWBSheet] && (
          <select id="conditionValue" onClick={props.selectValue}>
            {selectedWB[selectedWBSheet][0].map((d) => (
              <option className="filterOptions" value={d}>
                {d}
              </option>
            ))}
          </select>
        )}
        <select id="filter" onClick={(e) => setOperator1(e.target.value)}>
          <option value="">operator</option>
          <option value="select">Null</option>
          <option value="=">=</option>
          <option value="<">{"<"}</option>
          <option value="<=">{"<="}</option>
          <option value=">=">{">="}</option>
          <option value=">">{">"}</option>
        </select>
        <input
          text={values}
          onChange={(e) => setValues(e.target.value)}
          placeholder="Value.."
          className="modalInput"
        />
        THEN
        <input
          className="modalInput"
          text={ifText}
          onChange={(e) => setIftext(e.target.value)}
          placeholder="True"
        />
        ELSE
        <input
          className="modalInput"
          placeholder="False"
          text={elseText}
          onChange={(e) => setElsetext(e.target.value)}
        />
      </p>
      <button id="applyAND" className="modalApplyBtn" onClick={applyAND}>
        Apply AND
      </button>
    </>
  );
};
export default And;
