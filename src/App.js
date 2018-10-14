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
    this._fetchData(searchTerm);
  };

  _renderSearchBar() {
    return (
      <div>
        Search Author:{" "}
        <input
          type="text"
          value={this.state.searchTerm}
          onChange={this._handleSearchOnChange}
        />
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
