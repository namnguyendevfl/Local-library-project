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
  // return an array of <=5 objs, or top 5 if >5
  // each Obj 2 keys obj.name & obj.count
  // sort bookgenre according to alphabet
const bookByGenres = books.map((book) => {
    let newAcc = {}
    newAcc.name = book.genre;
    newAcc.count = 0; /// set it to a default value
    return newAcc
  })

const firstGenre = bookByGenres[0]
let accumulator = []
accumulator.push(firstGenre)

const genreList = bookByGenres.reduce((acc,bookByGenre) => 
{
  let found = null
  for (let item in acc) {
    const genre = acc[item]
    const genreName = genre.name
    if (genreName === bookByGenre.name)
    { 
      found = 1;
      genre.count++
    }
  }
  if (!found) 
  {
    bookByGenre.count ++
    acc.push(bookByGenre)
  }
  return acc
}, accumulator)
const genreListSorted = genreList.sort((genreA,genreB) => genreB.count - genreA.count)
//limit to top 5
return genreListSorted.filter((genre,index)=> index <5)
}


function getMostPopularBooks(books) {
// obj{ name: title, count: borrowed times}
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
    if (bookName === bookByBorrow.name){
      found = 1
      book.count += bookByBorrow.count
    }
  }
  if (found) return acc
  else {
    acc.push(bookByBorrow)
    return acc
  }
}, accumulator)
const popularListSorted = popularList.sort((bookA, bookB) => bookB.count - bookA.count)
return popularListSorted.reduce((acc,book,index) => 
{
  if (index < 5)
  { acc.push(book)
    return acc
  } 
  return acc
},[])
} 


function getMostPopularAuthors(books, authors) {
const booksByAuthor = books.reduce((acc,book) => 
{ 
  const bookBorrows = book.borrows
  let newAcc = {}
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
const booksByAuthorSorted = booksByAuthor.sort((bookA,bookB) => bookB.count - bookA.count)
return booksByAuthorSorted.reduce((acc,book,index) => 
{
  if (index < 5){
    acc.push(book)
    return acc
  }
  return acc
},[])
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
