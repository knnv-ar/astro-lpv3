export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', { timeZone: "UTC", })
}

export function formatExhibWorks(works, {
  filterOutDrafts = true,
  filterOutFutureWorks = true,
  sortByDate = true,
  limit = undefined,
} = {}) {
  //console.log(works);
  /*
  const filteredWorks = works.reduce((acc, work) => {
    const { date, draft } = work.frontmatter;
    //fiteredOutDrafts if true
    if (filterOutDrafts && draft) return acc;

    //fiteredOutFutureWorks if true
    if (filterOutFutureWorks && new Date(date) > new Date()) return acc;

    //ad work to acc
    acc.push(work);

    return acc;
  }, [])

  // sort by date or randomize
  if (sortByDate) {
    filteredWorks.sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));
  } else {
    filteredWorks.sort(() => Math.random() - 0.5);
  }

  //limit if number is passed
  if (typeof limit === 'number') {
    return filteredWorks.slice(0, limit);
  }
  return filteredWorks;
  */
}