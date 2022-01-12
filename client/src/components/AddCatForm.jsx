import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ADD_CAT } from "../gql/addCat";
import { GET_BREED_NAMES } from "../gql/getBreedNames";
import "../styles/App.css";

const AddCatForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [age, setAge] = useState();
  const [breedId, setBreed] = useState();
  const [isVaccinated, setIsVaccinated] = useState();

  const { data, loading: breedsLoading } = useQuery(GET_BREED_NAMES);

  const [createCat, { loading: catLoading, error }] = useMutation(ADD_CAT, {
    onCompleted: () => {
      window.location = "/";
    },
  });

  if (breedsLoading || catLoading) return "Loading...";
  if (error) return "Error";

  const addCat = () => {
    createCat({
      variables: {
        name,
        description,
        age: +age,
        breedId,
        vaccinated: isVaccinated,
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
        placeholder="Description"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <input
        type="number"
        placeholder="Age"
        onChange={(e) => {
          setAge(e.target.value);
        }}
      />
      <select
        name="breed"
        id="breed-select"
        value={breedId}
        onChange={(event) => setBreed(event.target.value)}
      >
        <option value="" disabled selected hidden>
          Choose a breed
        </option>
        {data.breeds.map((breed) => (
          <option value={breed.id}>{breed.name}</option>
        ))}
      </select>
      <div className="radio-buttons-container">
        <p>Vaccinated?</p>
        <label htmlFor="yes">
          <input
            type="radio"
            id="yes"
            name="vaccinated"
            value={isVaccinated}
            onChange={(event) => setIsVaccinated(event.target.checked)}
          />
          Yes
        </label>
        <label htmlFor="no">
          <input
            type="radio"
            id="no"
            name="vaccinated"
            value={isVaccinated}
            onChange={(event) => setIsVaccinated(!event.target.checked)}
          />
          No
        </label>
      </div>
      <button onClick={addCat}>Add my cat!</button>
    </div>
  );
};

export { AddCatForm };
