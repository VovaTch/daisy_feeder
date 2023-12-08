import React, { useState, useEffect, useRef, createContext } from "react";
import { fetchFeedItem } from "../api/fetch/fetchFeedItem";

const context = createContext();

const Provider = ({ children }) => {
  // TODO: to be filled

  // User state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Set domain
  // eslint-disable-next-line no-unused-vars
  const [domain, setDomain] = useState("http://192.168.1.79:8000/");

  // Data # TODO: to be updated
  const [feedItems, setFeedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const globalContext = {
    domain,
    isLoggedIn,
    feedItems,
    isLoading,
    setIsLoggedIn,
    setFeedItems,
    setIsLoading,
  };

  return <context.Provider value={globalContext}>{children}</context.Provider>;
};

export { context, Provider };
