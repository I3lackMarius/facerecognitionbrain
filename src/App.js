import React, { Component } from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Particles from "./components/Particles/Particles";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import "./App.css";
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
    };
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace =
      JSON.parse(data).outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };
  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });

    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id
    fetch(
      `https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: "Key b35f7987efab4cf0ba49cd2dd140b32f",
        },
        body: JSON.stringify({
          user_app_id: {
            user_id: "clarifai",
            app_id: "main",
          },
          inputs: [
            {
              data: {
                image: {
                  url: this.state.input, //"https://images.healthshots.com/healthshots/en/uploads/2023/01/18175821/face-glow.jpg",
                },
              },
            },
          ],
        }),
      }
    )
      .then((response) => response.text())
      .then((response) => {
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      //.then((result) => console.log("result", result))
      .catch((error) => console.log("error", error));
  };
  render() {
    return (
      <div className="App">
        <Particles />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
