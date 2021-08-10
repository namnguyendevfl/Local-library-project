function getTotalBooksCount(books) {
  return books.reduce((acc) => ++acc , 0)
}

function getTotalAccountsCount(accounts) {
  return accounts.reduce((acc) => ++acc , 0)
}

function getBooksBorrowedCount(books) {
  return books.reduce((acc, book) => 
  {
    const borrowers = book.borrows
    const borrowedStatus = borrowers[0].returned
    return (borrowedStatus === false) ? ++acc : acc
  }, 0)
}

function getMostCommonGenres(books) {
//creating a new Arr in which each item has 2 keys name & count. The key name has a value book.genre, the count key is set to 0
const bookByGenres = books.map((book) => {
    let newAcc = {}
    newAcc.name = book.genre;
    newAcc.count = 0; /// set it to a default value
    return newAcc
  })
//creating a new Arr with input from the above Arr. The output is an Arr with the key "name" set to repeated key "name" from the above Arr, then count it up and reassign it into the key "count"   
const firstGenre = bookByGenres[0]
let accumulator = []
accumulator.push(firstGenre)
const genreList = bookByGenres.reduce((acc,bookByGenre) => 
{
  let found = null
  for (let item in acc) 
  {
    const genre = acc[item]
    const genreName = genre.name
    //Making a helper function to check what if any genreName has been repeated, then count it up
    const genreReseted = () => {
      if (genreName === bookByGenre.name)
      { 
        found = 1;
        genre.count++
      }
      }
      genreReseted()
  } 
  if (!found) 
  {
    bookByGenre.count ++
    acc.push(bookByGenre)
  }
  return acc
}, accumulator)
//Sorting the genrelist according to the alphabet order
const genreListSorted = genreList.sort((genreA,genreB) => genreB.count - genreA.count)
//limit to top 5
return genreListSorted.filter((genre,index)=> index <5)
}

function getMostPopularBooks(books) {
//Making a new Arr and assign it to a variable. Each item in the Arr has 2 keys name and count(the key name set to book title, and the count set to borrowing times)
const bookByBorrows = books.reduce((acc,book) => 
{
  const bookByBorrowers = book.borrows
  let newAcc = {}
  newAcc.name = book.title
  newAcc.count = bookByBorrowers.reduce((acc) => ++acc,0)
  acc.push(newAcc)
  return acc
},[])

const firstBookBorrow = bookByBorrows[0]
let accumulator = []
accumulator.push(firstBookBorrow)
const popularList = bookByBorrows.reduce((acc,bookByBorrow)=> 
{
  let found = null;
  for (let item in acc) {
    const book = acc[item]
    const bookName = book.name
    //A helper function to check any repeated name then count it up
    const bookByBorrowReset = () => {
      if (bookName === bookByBorrow.name){
      found = 1
      book.count += bookByBorrow.count
      }
    }
    bookByBorrowReset()
  }
  if (!found) acc.push(bookByBorrow)
  return acc
}, accumulator)
//Sorting the popularlist from the highest count to lowest count and then returning the first top 5
const popularListSorted = popularList.sort((bookA, bookB) => bookB.count - bookA.count)
return popularListSorted.filter((book,index) => index < 5)
} 


function getMostPopularAuthors(books, authors) {
//Making a new Arr and assign it to a variable. Each item in the Arr has 2 keys name and count(the key name set authorname, and the count set to borrowing times)
const booksByAuthor = books.reduce((acc,book) => 
{ 
  const bookBorrows = book.borrows
  let newAcc = {}
//Combing the "first" and "last" keys in each author item into a string and assign it into the key "name"  
  newAcc.name = authors.reduce((acc, author) => 
  { 
    const authorName = author.name
    const first = authorName.first
    const last = authorName.last
    return (author.id === book.authorId) ? `${first} ${last}` : acc
  },"")
  newAcc.count = bookBorrows.reduce((acc) => ++acc , 0)
  acc.push(newAcc)
  return acc  
},[])
//Sorting the popularlist from the highest count to lowest count and then returning the first top 5
const booksByAuthorSorted = booksByAuthor.sort((bookA,bookB) => bookB.count - bookA.count)
return booksByAuthorSorted.filter((book,index) => index < 5)
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
