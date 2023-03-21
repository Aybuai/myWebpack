import React from "react";
import ReactDOM from "react-dom";
import logo from "./imgs/logo.jpeg";
import "./search.less";

class Search extends React.Component {
  render() {
    return (
      <div className="search-text">
        Search Text 刺客伍六七<img src={logo} />
      </div>
    );
  }
}

ReactDOM.render(<Search />, document.getElementById("root"));
