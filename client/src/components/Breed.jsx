import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_CATS_BY_BREED } from "../gql/queries/getCatsByBreed";
import { getRandomTag } from "../helpers/getRandomTag";
import "../styles/App.css";

const Breed = ({
  breed: { id, name, temperament, vocalness, colors },
  setErrorMessage,
  setError,
}) => {
  const [isCatsBlockOpen, setCatsBlockOpen] = useState(false);

  const [getCatsByBreed, { loading, data }] = useLazyQuery(GET_CATS_BY_BREED);

  const openCatsBlock = () => {
    getCatsByBreed({
      variables: { breedId: id },
      onError: (err) => {
        setError(true);
        setErrorMessage(err.message);
      }
    });
    setCatsBlockOpen(prevState => !prevState);
  }

  const colorsToDisplay = colors.join(", ");
  const temperamentToDisplay = temperament.join(", ");
  const imageUrl = `https://cataas.com/cat/${getRandomTag()}`;

  return (
    <div className="wrapper wrapper-breeds" key={id}>
      <img src={imageUrl} alt="A cat" className="cat-image" />
      <div className="breed-info">
        <div>
          <h2>{name}</h2>
          <p>{vocalness}</p>
          <p>{colorsToDisplay}</p>
          <p>{temperamentToDisplay}</p>
          <button onClick={openCatsBlock}>
            {isCatsBlockOpen ? "/\\" : "\\/"}
          </button>
        </div>
        {isCatsBlockOpen && !loading && (
          <div>
            {data?.cats?.edges?.map((cat) => {
              const {
                node: { id, name, description, age, vaccinated},
              } = cat;
              return (
                <div className="wrapper" key={id}>
                  <h2>{name}</h2>
                  <p>{`${age} years old${vaccinated ? ', vaccinated' : ''}`}</p>
                  <p>{description}</p>
                </div>
              );
            })}
          </div>
        )}
        {isCatsBlockOpen &&
          !loading &&
          (!data || data?.cats?.edges.length === 0) && <p>There are no cats</p>}
      </div>
    </div>
  );
};

export { Breed };
