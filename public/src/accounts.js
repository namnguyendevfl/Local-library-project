function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id)
}

function sortAccountsByLastName(accounts) {
//sorting and returning the account Arr with the last name according to the alphabet order
  return accounts.sort((accountA,accountB) =>
  {
    const accountAName = accountA.name
    const accountBName = accountB.name
    return accountAName.last > accountBName.last ? 1 : -1
  })
}

function getTotalNumberOfBorrows(account, books) {
//Using reduce to add up any book which has been borrowed by the given account
  return books.reduce((acc,book) => {
    const bookBorrowers = book.borrows
//Checking any book having been borrowed by the given account
    let check = bookBorrowers.some((borrow) => borrow.id === account.id)
    return (check) ? ++acc : acc
  },0)
}

function getBooksPossessedByAccount(account, books, authors) {
const accountId = account.id
//Making a new Arr from the "books" Arr in which each book has been checked out by the given account
const booksCheckedOut = books.filter((book) => 
{
  const bookBorrowers = book.borrows
//Checking if the book is currently checked out by the given account
  const borrowers = bookBorrowers.filter((bookBorrow) => bookBorrow.returned === false)
  return borrowers.some((borrower) => borrower.id === accountId)
})
//Creating a new Arr from the "books" Arr and adding author who has id matching "authorId" of the "books" Arr
return booksCheckedOut.map((book) => 
{ const bookAuthorId= book.authorId
  const authorMatches = authors.find((author) => bookAuthorId === author.id)
  book.author = authorMatches
  return book
})
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
