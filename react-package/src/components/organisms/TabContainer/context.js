import React from 'react';

// Used by @Organisms/TabContainer and Tab to share data.
const TabContext = React.createContext({
  activeTab: null,
  activeContent: null,
  setActiveTab: () => {}
});

export default TabContext;
