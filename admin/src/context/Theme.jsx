import React, { createContext,  useEffect, useState } from 'react'

// Create context
export const ShopContext = createContext({
    isDarkMode: false,
    setIsDarkMode: () => {},
  });



const Theme = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
  
    // Save to localStorage when `isDarkMode` changes
    useEffect(() => {
      localStorage.setItem('dark', isDarkMode);
    }, [isDarkMode]);
  
    // Retrieve `isDarkMode` from localS33torage on load
    useEffect(() => {
      const dark = localStorage.getItem('dark');
      setIsDarkMode(dark);
    }, []);
  
    const value = { isDarkMode, setIsDarkMode };
  
    return (
      <ShopContext.Provider value={value}>
        {children}
      </ShopContext.Provider>
    );
  };
  
  export default Theme;