import React from "react";
import ReactDOM from "react-dom";
import person from "./imgs/刺客伍六七.jpeg";
import "./search.less";

class Search extends React.Component {
  render() {
    return (
      <div className="search-text">
        Search Text <img src={person} />
      </div>
    );
  }
}

ReactDOM.render(<Search />, document.getElementById("root"));
