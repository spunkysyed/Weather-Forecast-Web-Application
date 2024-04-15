import React from "react";
import { useParams } from "react-router-dom";

export const Error = () => {
    const { code, errMessage } = useParams<{ code: string; errMessage: string }>();
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
    <div className="text-center">
      <h1 className="text-2xl md:text-6xl font-semibold"><span className="text-red-500">{code}</span> {errMessage}</h1>
      <div className="container">
        <p className="text-lg md:text-2xl px-2 font-thin mt-6">Well gosh! It just so happens the server threw a tantrum. Sorry.</p>
      </div>
    </div>
    </div>
  );
};
