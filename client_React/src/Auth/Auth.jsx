import React, { Component } from "react";
import style from "./Auth.module.scss";

export default class Auth extends Component {
  state = {
    name: null,
    password: null,
  };

  userName(event) {
    this.setState({
      name: event.target.value,
    });
  }
  userPassword(event) {
    this.setState({
      password: event.target.value,
    });
  }

  login() {
    console.log(
      `Username: ${this.state.name} \nPassword: ${this.state.password}`
    );
  }

  render() {
    return (
      <div className={style.Auth}>
        <div className={style.AuthCard}>
          <h1 className={style.AuthTitle}>Words learning</h1>
          <form>
            <div className={style.InputField}>
              <input
                id="username"
                type="text"
                placeholder={"Username"}
                onInput={this.userName.bind(this)}
              />
            </div>
            <div className={style.InputField}>
              <input
                id="password"
                type="password"
                placeholder={"Password"}
                onInput={this.userPassword.bind(this)}
              />
            </div>
            <div className={style.Btn}>
              <button onClick={this.login.bind(this)} type="button">
                Login
              </button>
            </div>
          </form>
          <span> Do you have no an account?</span> <a href="/">Registration</a>
        </div>
      </div>
    );
  }
}
