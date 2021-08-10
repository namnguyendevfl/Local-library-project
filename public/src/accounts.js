function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id)
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA,accountB) =>
  {
    const accountAName = accountA.name
    const accountBName = accountB.name
    return accountAName.last > accountBName.last ? 1 : -1
  })
}

function getTotalNumberOfBorrows(account, books) {
  return books.reduce((acc,book) => {
    const bookBorrowers = book.borrows
    let check = bookBorrowers.some((borrow) => borrow.id === account.id)
    return (check) ? ++acc : acc
  },0)
}

function getBooksPossessedByAccount(account, books, authors) {
const accountId = account.id
const booksCheckedOut = books.filter((book) => 
{
  const bookBorrowers = book.borrows
  const borrowers = bookBorrowers.filter((bookBorrow) => bookBorrow.returned === false)
  return borrowers.some((borrower) => borrower.id === accountId)
})
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
