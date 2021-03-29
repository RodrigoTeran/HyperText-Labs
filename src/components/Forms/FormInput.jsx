import React, { useState } from "react";

const FormInput = ({ text, inputValue, setInputValue, id, type }) => {
  const [isLabelOpened, setIsLabelOpened] = useState(false);
  const [isInputCompleted, setIsInputCompleted] = useState(false);
  return (
    <div className="formInput">
      <label className={`${isLabelOpened ? "open" : ""}`} htmlFor={id}>
        {text}
      </label>
      <input
        value={inputValue}
        className={`${isInputCompleted ? "completed" : ""}`}
        onFocus={() => {
          setIsLabelOpened(true);
        }}
        onBlur={() => {
          if (inputValue === "") {
            setIsLabelOpened(false);
            setIsInputCompleted(false);
          } else {
            setIsInputCompleted(true);
          }
        }}
        onChange={(e) => {
          setInputValue(e.target.value);
          if (e.target.value !== "") {
            setIsLabelOpened(true);
          }
        }}
        id={id}
        type={type}
      />
    </div>
  );
};
export default FormInput;
