import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_BREED } from "../gql/mutations/addBreed";
import "../styles/App.css";

//const MOCKED_ID = "8977675e-0ec1-46c8-9ef7-854fff84e3d3";

const AddBreedForm = () => {
  const [name, setName] = useState("");
  const [vocalness, setVocalness] = useState("");
  const [temperament, setTemperament] = useState([]);
  const [colors, setColors] = useState([]);

  const [createBreed, { loading, error }] = useMutation(ADD_BREED, {
    onCompleted: () => {
      window.location = "/breeds";
    },
  });

  if (loading) return "Loading...";
  if (error) return "Error";

  const addBreed = () => {
    createBreed({
      variables: {
        name,
        vocalness,
        temperament,
        colors,
      },
    });
  };

  return (
    <div className="form-container">
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Vocalness"
        onChange={(e) => {
          setVocalness(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Temperament"
        onChange={(e) => {
          setTemperament([e.target.value]);
        }}
      />
      <input
        type="text"
        placeholder="Colors"
        onChange={(e) => {
          setColors([e.target.value]);
        }}
      />
      <button onClick={addBreed}>Add new breed!</button>
    </div>
  );
};

export { AddBreedForm };
