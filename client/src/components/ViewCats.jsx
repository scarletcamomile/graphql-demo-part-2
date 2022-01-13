import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CATS } from "../gql/queries/getCats";
import { Error } from "../components/Error";
import { getRandomTag } from "../helpers/getRandomTag";
import "../styles/App.css";

const ViewCats = () => {
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { data, loading } = useQuery(GET_CATS, {
    onError: (err) => {
      setError(true);
      setErrorMessage(err.message);
    },
  });

  if (loading) return "Loading...";

  return (
    <>
      <div className="container">
        {isError && <Error message={errorMessage} />}
        {data?.cats?.edges?.map((cat) => {
          const {
            node: { id, name, description, age, vaccinated },
          } = cat;
          return (
            <div className="wrapper" key={id}>
              <img
                src={`https://cataas.com/cat/${getRandomTag()}`}
                alt="A cat"
                className="cat-image"
              />
              <div className="cat-info">
                <h2>{name}</h2>
                <p>{description}</p>
                <p>{`Age - ${age}`}</p>
                <p>{vaccinated ? "Vaccinated" : ""}</p>
              </div>
            </div>
          );
        })}
      </div>
        <button>Load more cats!</button>
    </>
  );
};

export { ViewCats };
