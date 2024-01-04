import React, { useState, createContext } from "react";
import Config from "react-native-config";

const context = createContext();

const Provider = ({ children }) => {
  // TODO: to be filled

  // Background images
  const landingBackgroundImage = require("../assets/Landing-Background.jpg");
  const screenBackgroundImage = require("../assets/Screen-Background.jpg");
  const drawerBackgroundImage = require("../assets/Drawer.jpg");

  // User state
  const [token, setToken] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [activeUser, setActiveUser] = useState();
  const [minUsers, setMinUsers] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);

  // Set domain
  // const [domain, setDomain] = useState("http://192.168.1.79:8000/");
  const [domain, setDomain] = useState(Config.DOMAIN_URL);

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
    landingBackgroundImage,
    screenBackgroundImage,
    drawerBackgroundImage,
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
