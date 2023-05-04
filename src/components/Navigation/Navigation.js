import React from "react";

const Navigation = ({ onRouteChange, route }) => {
  return route === "Home" ? (
    <div>
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          onClick={() => onRouteChange("SignOut")}
          className="f3 link dim black underline pa3 pointer"
        >
          Sign Out
        </p>
      </nav>
    </div>
  ) : route === "SignIn" ? (
    <div>
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          onClick={() => onRouteChange("Register")}
          className="f3 link dim black underline pa3 pointer"
        >
          Register
        </p>
      </nav>
    </div>
  ) : (
    <div>
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          onClick={() => onRouteChange("SignIn")}
          className="f3 link dim black underline pa3 pointer"
        >
          Sign In
        </p>
      </nav>
    </div>
  );
};

export default Navigation;
