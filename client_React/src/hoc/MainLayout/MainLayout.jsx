import React from "react";
import style from "./MainLayout.module.scss";

export default class MainLayout extends React.Component {
  render() {
    return (
      <div className={style.Layout}>
        <main>{this.props.children}</main>
      </div>
    );
  }
}
