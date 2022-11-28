// @ts-nocheck
export default {
  stateItem: {
    text: 'State Organizations',
    ariaLabel: '',
    icon: 'building',
    link: 'https://www.mass.gov/info-details/massachusetts-state-organizations-a-to-z'
  },
  loginItem: {
    text: 'Log in to...',
    ariaLabel: 'Log in to one of Mass.gov\'s most frequently accessed services',
    icon: 'login',
    closeText: 'Close',
    panel: {
      description: 'Top-requested sites to log in to services provided by the state',
      links: [{
        text: 'Virtual Gateway (SNAP)',
        href: 'https://sso.hhs.state.ma.us/oam/server/obrareq.cgi?encquery%3DA2%2Fmo5AkZreDycpyP0JZAEOYGvW2hviyNhH9Sht2xPp0V1%2BBtWfHnmRGr6zNHOqOlcjphPk7p6bpHHRyNzzk9IYQ%2FcN%2B%2FIcqL2ThnI217OsIKZepptTpGBx83SI0NWjsE7vDi72caItXWlelbGQT7ePanlrVUUy2%2Fj1UEUaXi5G7m47KO9djBnoetZRCtp9G2ZTNFf6zvCGU7Cs02AXYUj2JMH4aqol%2Bh3OK6uhJNNkFvwQ1MFRUa4gR1az4iaW9u83ExKb2a9eDv8ZIUqhlq3%2BNVGTqZHAsHX4KOONSGQRBwCtLNPWwruacjdd9CaEqeIJ2tnP45KrM93edZ6zU1yoWGbAp%2BUWWMqk4HyrtuA8%3D%20agentid%3Dwebgate1%20ver%3D1%20crmethod%3D2',
        type: 'external'
      }, {
        text: 'Unemployment Online',
        href: 'https://uionline.detma.org/Claimant/Core/Login.ASPX',
        type: 'external'
      }, {
        text: 'Child Support Enforcement',
        href: 'https://ecse.cse.state.ma.us/ECSE/Login/login.asp',
        type: 'external'
      }]
    }
  }
};
