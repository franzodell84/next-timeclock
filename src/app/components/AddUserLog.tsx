"use client";
import React from "react";

const AddUserLog = () => {
  return (
    <div>
      <button className="btn btn-primary" onClick={() => console.log("Click")}>
        Submit
      </button>
    </div>
  );
};

export default AddUserLog;
