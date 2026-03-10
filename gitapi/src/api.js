export const fetchPosts = async () =>{
  const res = await fetch (`http://jsonplaceholder.typicode.com/posts`)
  const data = await res. json();

  return data;
}