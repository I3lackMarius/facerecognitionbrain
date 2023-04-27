import React, { Component } from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import Particles from "./components/Particles/Particles";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import "./App.css";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Particles />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
        {/* {
        <FaceRecognition />} */}
      </div>
    );
  }
}

export default App;
