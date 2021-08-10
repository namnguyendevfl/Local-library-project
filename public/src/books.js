function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id)
}

function findBookById(books, id) {
  return books.find((book) => book.id === id)
}


function partitionBooksByBorrowedStatus(books) 
{
//Creating returned Arr 
  const returnedArr = books.filter((book) => 
  {
    const bookBorrowers = book.borrows
    const fristBorrower = bookBorrowers[0]
    return fristBorrower.returned === true
  })
//Creating a borrowed Arr
  const borrowedArr = books.filter((book) => 
  {
    const bookBorrowers = book.borrows
    const fristBorrower = bookBorrowers[0]
    return fristBorrower.returned === false
  })
//combining the 2 above Arrs and return the result
let result = []
result[1] = returnedArr
result[0] = borrowedArr
return result
} 

function getBorrowersForBook(book, accounts) {
  const bookBorrowers = book.borrows
//Making an Arr from the key "borrows" of the given book and adding info of account which has the id matching the id of the borrowers of given book
  const borrowers = bookBorrowers.reduce((acc,borrow) => 
  {
    const borrowerId= borrow.id
     //find the account which has the id matching the id of borrowers
    const accountBorrowed = accounts.find((account) => account.id === borrowerId)
    for (let accountKey in accountBorrowed) {
      const accountValue = accountBorrowed[accountKey]
      borrow[accountKey] = accountValue
    }
    acc.push(borrow)
    return acc
  },[])

// return first 10 borrowers
return borrowers.filter((borrower, index) => index < 10)
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
