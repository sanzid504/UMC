import React, { useState, useEffect } from "react";
import Spinner from "./spinner";

export default function Button({ init, load, fn, color, type }) {
  const [loading, setLoading] = useState(false);
  return (
    <button
      className={`inline-flex  justify-center items-center rounded-full px-4 py-2 text-gray-100 text-sm font-semibold ${
        color ? color : "bg-blue-800"
      } hover:${color ? color : "bg-blue-900"}`}
      type={type ? type : "button"}
      onClick={async (e) => {
        setLoading(true);
        await fn(e);
        setLoading(false);
      }}
    >
      {!loading ? (
        <span>{init || "Submit"}</span>
      ) : (
        <>
          {" "}
          <Spinner /> <span>{load || "Processing"}</span>{" "}
        </>
      )}
    </button>
  );
}
