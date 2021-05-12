import React from "react";
import style from "./AuthLayout.module.scss";

export default class AuthLayout extends React.Component {
  render() {
    return (
      <div className={style.AuthLayout}>
        <main>{this.props.children}</main>
      </div>
    );
  }
}
