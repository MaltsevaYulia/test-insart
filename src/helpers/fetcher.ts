export const fetcher = (url: string, init?: RequestInit) =>
  fetch(url, init)
    .then((res) => res.json())
    .catch((error) => {
      console.log(error);

});




