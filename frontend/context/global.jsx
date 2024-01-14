import React, { useState, createContext } from "react";

const context = createContext();

/**
 * Daisy's Provider Component.
 *
 * This component serves as the provider for the global context in Daisy's Feeder application.
 * It manages the state and provides the necessary data and functions to its children components.
 * Daisy, the cat, approves of this provider and guarantees a purr-fect user experience.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components to be wrapped by the provider.
 * @returns {ReactNode} The wrapped child components.
 */
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
  // eslint-disable-next-line no-undef
  // const [domain, setDomain] = useState(process.env.EXPO_PUBLIC_API_URL);
  const [domain, setDomain] = useState("https://vovatch.pythonanywhere.com/");

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
