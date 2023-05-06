import React from "react";
import "./Register.css";
import show from "./show.png.webp";
import hide from "./hide.png.webp";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      RegEmail: "",
      RegPassword: "",
      RegName: "",
      passwordShown: false,
    };
  }
  onNameChange = (event) => {
    this.setState({ RegName: event.target.value });
  };
  onEmailChange = (event) => {
    this.setState({ RegEmail: event.target.value });
  };
  onPasswordChange = (event) => {
    this.setState({ RegPassword: event.target.value });
  };

  onRegisterSignIn = () => {
    // console.log(this.state);

    fetch(
      "https://facerecognitionbackend-87ft.onrender.com/register", //"http://localhost:3000/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.state.RegName,
          email: this.state.RegEmail,
          password: this.state.RegPassword,
        }),
      }
    )
      .then((response) => response.json())
      .then((user) => {
        // console.log(user);
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange("Home");
        }
        // if (user === "success") {
        //   this.props.onRouteChange("Home");
        // }
      });
  };

  togglePassword = () => {
    this.setState({ passwordShown: !this.state.passwordShown });
  };

  render() {
    // const { onRouteChange } = this.props;
    return (
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center blurry">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f4 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">
                  Name
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-90"
                  type="name"
                  name="name"
                  id="name"
                  onChange={this.onNameChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="h40 pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <div className="passCont">
                  <input
                    className=" h40 b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type={this.state.passwordShown ? "text" : "password"}
                    name="password"
                    id="password"
                    onChange={this.onPasswordChange}
                  />
                  {/*Element to toggle between password visibility */}
                  <img
                    className="passwordIcon"
                    id="passwordIcon"
                    alt="isPassVisible"
                    src={this.state.passwordShown ? hide : show}
                    style={{ width: "20px", height: "20px" }}
                    onClick={this.togglePassword}
                  />
                </div>
              </div>
              {/* <label className="pa0 ma0 lh-copy f6 pointer">
              <input type="checkbox" /> Remember me
            </label> */}
            </fieldset>
            <div className="">
              <input
                onClick={this.onRegisterSignIn}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
              />
            </div>
            {/* <div className="lh-copy mt3">
            <a href="#0" className="f6 link dim black db">
              Register
            </a>
            <a href="#0" className="f6 link dim black db">
              Forgot your password?
            </a>
          </div> */}
          </div>
        </main>
      </article>
    );
  }
}

export default Register;
