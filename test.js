

function sortedCats() {

  const arr = ['v', 'a', 'i']

  const comments = [
    {name: 'Vasia'},
    {name: 'Davshai'},
    {name: 'Dima'},
    {name: 'Petia'},
    {name: 'Larisa'},
  ]

  const currentSort = 'name'

  let currentSortDir = 'asc'

  return comments.sort((a,b) => {
    let modifier = 1;
    if(currentSortDir === 'desc') modifier = -1;
    if(a[currentSort] < b[currentSort]) return -1 * modifier;
    if(a[currentSort] > b[currentSort]) return 1 * modifier;
    return 0;
  }).filter(com => com)
}

// console.log(sortedCats());

const usersComment = {
  id: {
    filter: '',
    sortDir: 'asc',
  },
  name: {
    filter: '',
    sortDir: 'asc',
  },
  email: {
    filter: '',
    sortDir: 'asc',
  },
}

console.log(Object.values(usersComment).map(column => column.sortDir));