import React, { Component } from "react";

class searchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      valueName: "",
      email: "",
      good: false,
      user: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <React.Fragment>
        {!this.state.good ? (
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={this.state.value}
              placeholder="name"
              onChange={(event) =>
                this.setState({ valueName: event.target.value })
              }
            />
            <input
              type="text"
              placeholder="token"
              value={this.state.value}
              onChange={(event) => this.setState({ token: event.target.value })}
            />
            <button action="submit" value="a">
              Submit
            </button>
          </form>
        ) : (
          <div>
            <h1>{this.state.user.name}</h1>
            <p>
              Das ist dein Password: <br></br>
            </p>
            <h2>{this.state.user.password}</h2>
          </div>
        )}
        <h1>{this.state.message}</h1>
      </React.Fragment>
    );
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.password1 !== this.state.password2)
      return this.setState({ message: " Passwörter stimmen nicht über ein " });

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      name: this.state.valueName,

      token: this.state.token,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("/api/users", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.error) return this.setState({ message: result.error });

        result.user.password = result.pwd;
        this.setState({ good: true, user: result.user, message: "" });
      })
      .catch((error) =>
        this.setState({ message: "Da ist was schiefgelaufen " })
      );
  }
}

export default searchBar;
