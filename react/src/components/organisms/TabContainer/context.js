import React from 'react';

// Used by @Organisms/TabContainer and Tab to share data.
export const TabContext = React.createContext({
  activeTab: null,
  activeContent: null,
  setActiveTab: () => {},
  updateActiveTab: () => {}
});
