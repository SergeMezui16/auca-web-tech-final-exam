export const getAbsoluteUrl = (path) => {
  return new URL(location.origin + path).href;
};



const addQueryParam = (name, value) => {
  const url = new URL(location.href);

  if (!value) {
    url.searchParams.delete(name);
    return url.toString();
  }

  url.searchParams.set(name, encodeURIComponent(value));
  return url.toString();
};
