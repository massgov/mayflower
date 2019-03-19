import React from 'react';

// Used by @organisms/TabContainer and Tab to share data.
const TabContext = React.createContext({
  activeTab: null,
  activeContent: null,
  setActiveTab: () => {}
});

export { TabContext };
