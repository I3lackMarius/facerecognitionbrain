import React from "react";
import "./SignIn.css";
import show from "./show.png.webp";
import hide from "./hide.png.webp";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
      passwordShown: false,
    };
  }
  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value });
  };
  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
  };

  onSubmitSignIn = () => {
    // console.log(this.state);

    fetch(
      "http://localhost:3000/signin", //"https://facerecognitionbackend-87ft.onrender.com/signin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.state.signInEmail,
          password: this.state.signInPassword,
        }),
      }
    )
      .then((response) => response.json())
      .then((user) => {
        // console.log(data);
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange("Home");
        }
      });
  };

  togglePassword = () => {
    this.setState({ passwordShown: !this.state.passwordShown });
  };

  render() {
    const { onRouteChange } = this.props;
    return (
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center blurry">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f4 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  value="Tom@gmail.com"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <div className="passCont">
                  <input
                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type={this.state.passwordShown ? "text" : "password"}
                    name="password"
                    id="password"
                    value="qwer"
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
                <i>Use Tom as example, or create one</i>
              </div>
              {/* <label className="pa0 ma0 lh-copy f6 pointer">
              <input type="checkbox" /> Remember me
            </label> */}
            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3">
              <p
                onClick={() => onRouteChange("Register")}
                href="#0"
                className="f6 link dim black db"
              >
                Register
              </p>
              {/* <a href="#0" className="f6 link dim black db">
              Forgot your password?
            </a> */}
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default SignIn;
