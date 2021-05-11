import React, { PureComponent } from "react";
import style from "./Auth.module.scss";

// import PropTypes from "prop-types";

class Auth extends PureComponent {
  render() {
    return (
      <div className={style.Auth}>
        <div className={style.authCard}>
          <h1 className={style.authTitle}>Words learning</h1>
          <form>
            <div className={style.inputField}>
              <input id="username" type="text" />
            </div>
            <div className={style.inputField}>
              <input id="password" type="password" />
            </div>
            <div>
              <button type="submit">Login</button>
            </div>
          </form>
          <p> Do you have no an account?</p>
        </div>
      </div>
    );
  }
}

Auth.propTypes = {};

export default Auth;
