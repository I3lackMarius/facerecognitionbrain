import React, { Component } from "react";
import Navigation from "../components/Navigation/Navigation";
import Logo from "../components/Logo/Logo";
import SignIn from "../components/SignIn/SignIn";
import Register from "../components/Register/Register";
import Rank from "../components/Rank/Rank";
import FaceRecognition from "../components/FaceRecognition/FaceRecognition";
import Particles from "../components/Particles/Particles";
import ImageLinkForm from "../components/ImageLinkForm/ImageLinkForm";
import "./App.css";

const initialState = {
  input: "",
  imageUrl: "",
  box: {},
  route: "SignIn",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      route: "SignIn",
      isSignedIn: false,
      user: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: "",
      },
    };
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  componentDidMount() {
    fetch(
      "https://facerecognitionbackend-87ft.onrender.com" //"http://localhost:3000"
    ).then((response) => response.json());
    // .then((data) => console.log(data));
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    // console.log("calculateFaceLocation", data);
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
      "https://facerecognitionbackend-87ft.onrender.com/imageUrl", //"http://localhost:3000/imageUrl",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: this.state.input,
        }),
      }
    )
      .then((response) => response.json())
      .then((response) => {
        // console.log(response);
        if (response) {
          fetch(
            "https://facerecognitionbackend-87ft.onrender.com/image", //"http://localhost:3000/image",
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: this.state.user.id,
              }),
            }
          )
            .then((response) => response.json())
            .then((count) => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch(console.log);
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      //.then((result) => console.log("result", result))
      .catch((error) => console.log("error", error));
  };

  onRouteChange = (route) => {
    route === "SignOut"
      ? this.setState({ initialState })
      : this.setState({ isSignedIn: true });
    this.setState({ route: route });
  };

  render() {
    return (
      <div className="App">
        <Particles type="circle" bg={true} />
        <Navigation
          isSignedIn={this.state.isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {this.state.route === "Home" ? (
          <div>
            <Logo />
            <Rank
              userName={this.state.user.name}
              userEntries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition
              box={this.state.box}
              imageUrl={this.state.imageUrl}
            />
          </div>
        ) : this.state.route === "SignOut" ? (
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
