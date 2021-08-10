function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id)
}

function findBookById(books, id) {
  return books.find((book) => book.id === id)
}


function partitionBooksByBorrowedStatus(books) 
{
  //return an ARR with 2 ARRs inside
  //1st ARR: loaned out and are not returned => returned === false
  //2nd ARR: loaned out and are returned => returned === true
  const returnedArr = books.filter((book) => 
  {
    const bookBorrowers = book.borrows
    const fristBorrower = bookBorrowers[0]
    return fristBorrower.returned === true
  })
  const borrowedArr = books.filter((book) => 
  {
    const bookBorrowers = book.borrows
    const fristBorrower = bookBorrowers[0]
    return fristBorrower.returned === false
  })
let result = []
result[1] = returnedArr
result[0] = borrowedArr
return result
} 

function getBorrowersForBook(book, accounts) {
  //return an Arr of Objs
  // Objs are transaction in borrows with returned key and account info
  // create an Arr of borrows
  const bookBorrowers = book.borrows
  const borrowers = bookBorrowers.reduce((acc,borrow) => 
  {
    const borrowerId= borrow.id
    const accountBorrowed = accounts.find((account) => account.id === borrowerId) // filteraccount which has the id matching borrow id
    for (let accountKey in accountBorrowed) {
      const accountValue = accountBorrowed[accountKey]
      borrow[accountKey] = accountValue
    }
    acc.push(borrow)
    return acc
  },[])
 // should limit to 10 borrowers
return borrowers.filter((borrower, index) => index < 10)
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
