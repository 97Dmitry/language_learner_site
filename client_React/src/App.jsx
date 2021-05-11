import React, { Component } from "react";
import style from "./App.module.scss";
import Auth from "./Auth/Auth";

class App extends Component {
  render() {
    return (
      <div className={style.App}>
        <Auth />
      </div>
    );
  }
}

export default App;
