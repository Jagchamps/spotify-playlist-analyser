import React, { createContext, Component } from "react";

export const TokenContext = createContext();

class TokenContextProvider extends Component {
  state = {
    token: null,
  };

  setToken = (token) => {
    this.setState({ token: token });
  };

  render() {
    return (
      <TokenContext.Provider value={{ ...this.state, setToken: this.setToken }}>
        {this.props.children}
      </TokenContext.Provider>
    );
  }
}

export default TokenContextProvider;
