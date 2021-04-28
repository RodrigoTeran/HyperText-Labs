import { useEffect, useState } from "react";

export const useFetch = (url, method, setLoader, body = null) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (!url) return;
    const fetchData = async () => {
      setLoader(true);
      const response = await fetch(url, {
        method,
        body: body ? JSON.stringify(body) : null,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      setData(data);
      setLoader(false);
    };

    fetchData();
  }, [url, method, body]);

  return data;
};

export const useFetchCB = (
  url,
  method,
  conditional,
  callback,
  setLoader,
  body = null
) => {
  useEffect(() => {
    if (!url) return;
    if (!conditional) return;

    const fetchData = async () => {
      setLoader(true);
      const response = await fetch(url, {
        method,
        body: body ? JSON.stringify(body) : null,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      setLoader(false);
      callback(data);
    };

    fetchData();
  }, [url, method, body, conditional]);
};

export const useFetchImageCB = (
  url,
  method,
  conditional,
  callback,
  setLoader,
  body
) => {
  useEffect(() => {
    if (!url) return;
    if (!conditional) return;

    const fetchData = async () => {
      setLoader(true);
      const response = await fetch(url, {
        method,
        body: body,
        headers: {
          Accept: "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      setLoader(false);
      callback(data);
    };

    fetchData();
  }, [url, method, body, conditional]);
};
