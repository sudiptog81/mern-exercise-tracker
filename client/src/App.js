import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar";
import ExercisesList from "./components/ExercisesList";
import EditExercise from "./components/EditExercise";
import CreateUser from "./components/CreateUser";
import CreateExercise from "./components/CreateExercise";
import Documentation from "./components/Documentation";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <br />
        <Route exact path="/" component={ExercisesList} />
        <Route path="/edit/:id" component={EditExercise} />
        <Route path="/create" component={CreateExercise} />
        <Route path="/user" component={CreateUser} />
        <Route path="/docs" component={Documentation} />
        <small>&copy; Sudipto Ghosh</small>
      </div>
    </Router>
  );
};

export default App;
