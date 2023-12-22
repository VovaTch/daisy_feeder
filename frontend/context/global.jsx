import React, { useState, createContext } from "react";

const context = createContext();

const Provider = ({ children }) => {
  // TODO: to be filled

  // User state
  const [token, setToken] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [activeUser, setActiveUser] = useState();
  const [minUsers, setMinUsers] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);

  // Set domain
  const [domain, setDomain] = useState("http://192.168.1.79:8000/");

  // Data # TODO: to be updated
  const [feedItems, setFeedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const globalContext = {
    domain,
    feedItems,
    isLoading,
    token,
    errorMsg,
    activeUser,
    minUsers,
    friendRequests,
    setFeedItems,
    setIsLoading,
    setToken,
    setDomain,
    setActiveUser,
    setErrorMsg,
    setMinUsers,
    setFriendRequests,
  };

  return <context.Provider value={globalContext}>{children}</context.Provider>;
};

export { context, Provider };
