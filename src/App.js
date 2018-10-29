import React, { Component } from "react";
import "./App.css";
import { queryByAuthor } from "./Api";

class App extends Component {
  state = {
    books: [],
    searchTerm: "",
    loadingStatus: "loading" // loading, loaded, failed
  };

  componentDidMount() {
    this._fetchData(this.state.searchTerm);
  }

  async _fetchData(searchTerm) {
    try {
      const response = await queryByAuthor(searchTerm);
      if (response.items) {
        this.setState({ books: response.items, loadingStatus: "loaded" });
      }
    } catch (e) {
      console.error("failed to fetch");
      this.setState({ books: [], loadingStatus: "failed" });
    }
  }

  render() {
    return (
      <div className="App">
        {this._renderSearchBar()}
        {this.state.loadingStatus === "loading"
          ? this.state.loadingStatus
          : null}
        {this._renderBooks()}
        {this.state.loadingStatus === "failed" && this._renderErrorMessage()}
      </div>
    );
  }

  _handleSearchOnChange = event => {
    const searchTerm = event.target.value.toLowerCase();
    this.setState({ searchTerm });
  };

  // class methods are not bound by default
  _handleSearchOnClick = () => {
    // console.log(this); // bind method name to this class
    this._fetchData(this.state.searchTerm);
  };

  _handleSearchOnKeyPress = event => {
    if (event.key === "Enter") {
      this._fetchData(this.state.searchTerm);
    }
  };

  _renderSearchBar() {
    return (
      <div>
        Enter Author Name:{" "}
        <input
          type="text"
          value={this.state.searchTerm}
          onChange={this._handleSearchOnChange}
          onKeyPress={this._handleSearchOnKeyPress}
        />
        <button onClick={this._handleSearchOnClick}>Search</button>
      </div>
    );
  }

  _renderBooks() {
    const { books } = this.state;

    const booksWithTitles = books.map(book => {
      if (book) {
        return book.volumeInfo.title.toLowerCase();
      }
      return null;
    });

    return (
      <ul>
        {booksWithTitles.map((title, index) => {
          return <li key={index}>{title}</li>;
        })}
      </ul>
    );
  }

  _renderErrorMessage() {
    return <div>Error in loading data</div>;
  }
}

export default App;
