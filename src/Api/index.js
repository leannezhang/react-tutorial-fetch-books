import endPoints from "./endpoints";

// Option 1: Using promise.then chaining
// const parseData = url => {
//   return fetch(url)
//     .then(data => data.json())
//     .catch(e => {
//       console.log("fetching data failed");
//       throw e;
//     });
// };

// Option 2: Using async and await
const loadData = async url => {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (e) {
    throw new Error(e);
  }
};

export const queryByAuthor = author => {
  const url = endPoints.querybyAuthor(author);
  return loadData(url);
};

export const queryByISBN = isbn => {
  const url = endPoints.querybyISBN(isbn);
  return loadData(url);
};
