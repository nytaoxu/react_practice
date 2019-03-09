export function paginate(array, currentPage, pageSize) {
  const result = [];
  let i = (currentPage - 1) * pageSize;
  while (result.length < pageSize && i < array.length) {
    result.push(array[i]);
    i++;
  }
  return result;
}
