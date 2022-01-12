import { Route } from "react-router-dom";
import { AddBreedForm } from "./components/AddBreedForm";
import { ViewCats } from "./components/ViewCats";
import { ViewBreeds } from "./components/ViewBreeds";
import { Chat } from "./components/Chat";

const Routes = () => (
  <>
    <Route path="/" exact>
      <ViewCats />
    </Route>
    <Route path="/create_breed" exact>
      <AddBreedForm />
    </Route>
    <Route path="/chat" exact>
      <Chat />
    </Route>
    <Route path="/breeds" exact>
      <ViewBreeds />
    </Route>
  </>
);

export { Routes };
