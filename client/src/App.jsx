import React from "react";
import { useRoutes } from "react-router-dom";
import Navigation from "./components/Navigation";
import ViewBowls from "./pages/ViewBowls";
import EditBowls from "./pages/EditBowls";
import CreateBowl from "./pages/CreateBowl";
import BowlDetails from "./pages/BowlDetails";
import "./App.css";

const App = () => {
  let element = useRoutes([
    {
      path: "/",
      element: <CreateBowl title="Porridge Bowls | Customize" />,
    },
    {
      path: "/viewbowls",
      element: <ViewBowls title="Porridge Bowls | View" />,
    },
    {
      path: "/bowls/:id",
      element: <BowlDetails title="Porridge Bowls | Details" />,
    },
    {
      path: "/edit/:id",
      element: <EditBowls title="Porridge Bowls | Edit" />,
    },
  ]);

  return (
    <div className="app">
      <Navigation />

      {element}
    </div>
  );
};

export default App;
