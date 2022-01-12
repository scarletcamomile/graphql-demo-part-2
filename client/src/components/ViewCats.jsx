import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CATS } from "../gql/queries/getCats";
//import { GET_BREEDS } from "../gql/queries/getBreeds";
//import { client, cache } from "../index";
import { Error } from "../components/Error";
import { getRandomTag } from "../helpers/getRandomTag";
import "../styles/App.css";

const ViewCats = () => {
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { data, loading, fetchMore } = useQuery(GET_CATS, {
    variables: {
      limit: 3,
    },
    onError: (err) => {
      setError(true);
      setErrorMessage(err.message);
    },
  });

  const hasNextPage = data?.cats?.pageInfo?.hasNextPage;

/*   const breeds = client.readQuery({
    query: GET_BREEDS
  });

  client.writeQuery({
    query: GET_BREEDS,
    data: {
      breeds: [ {
        __typename: "Breed",
        id: "b42047d2-492f-47b9-94c9-b5b18b99d5fb",
        name: "Nebelung",
        vocalness: "infrequent",
        temperament: ["affectionate"],
        colors: ["blue", "gray"]
      }]
    }
  }); */

  const updateQuery = (previousResult, { fetchMoreResult }) => {
    if (!fetchMoreResult) {
      return previousResult;
    }
    const previousEdges = previousResult.cats.edges;
    const fetchMoreEdges = fetchMoreResult.cats.edges;
    fetchMoreResult.cats.edges = [...previousEdges, ...fetchMoreEdges];
    return { ...fetchMoreResult };
  };

  const handleLoadMoreCats = () => {
    const startCursor = data?.cats?.pageInfo?.startCursor;
    fetchMore({
      updateQuery,
      variables: {
        cursor: startCursor,
      },
    });
  };

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
      {hasNextPage && (
        <button onClick={handleLoadMoreCats}>Load more cats!</button>
      )}
    </>
  );
};

export { ViewCats };
