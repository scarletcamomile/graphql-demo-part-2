import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_BREEDS } from "../gql/queries/getBreeds";
import { Error } from "../components/Error";
import { Breed } from '../components/Breed';
import "../styles/App.css";

const ViewBreeds = () => {
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { data, loading } = useQuery(GET_BREEDS, {
    onError: (err) => {
      setError(true);
      setErrorMessage(err.message);
    },
  });

  if (loading) return "Loading...";

  return (
    <div className="container container-breeds">
      {isError && <Error message={errorMessage} />}
      {data?.breeds?.map((breed) => (
        <Breed breed={breed} setError={setError} setErrorMessage={setErrorMessage} key={breed.name} />
      ))}
    </div>
  );
};

export { ViewBreeds };
