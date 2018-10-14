// Examples:
// https://www.googleapis.com/books/v1/volumes?q=isbn:0747532699"
// https://www.googleapis.com/books/v1/volumes?q=inauthor:J.%20K.%20Rowling

const DOMAIN = "https://www.googleapis.com/books/v1/volumes?q=";

const endPoints = {
  querybyISBN: isbn => DOMAIN + "isbn:" + isbn,
  querybyAuthor: author => DOMAIN + "inauthor:" + author
};

export default endPoints;
