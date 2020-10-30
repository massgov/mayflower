import React from 'react';
import classNames from 'classnames';
import IconArrowbent from 'MayflowerReactBase/Icon/IconArrowbent';
import { useSpring, animated, config } from 'react-spring';
import ResizeObserver from 'resize-observer-polyfill';
import AnimateHeight from 'react-animate-height';

function useMeasure() {
  const ref = React.useRef();
  const [bounds, setBounds] = React.useState({
    left: 0, top: 0, width: 0, height: 0
  });
  const [ro] = React.useState(() => new ResizeObserver(([entry]) => setBounds(entry.contentRect)));
  React.useEffect(() => {
    ro.observe(ref.current);
    return(() => ro.disconnect());
  }, []);
  return[{ ref }, bounds];
}

const NavItem = ({
  nav,
  navIndex,
  buttonId = null,
  menuId = null,
}) => {
  const mainNavState = React.useContext(MainNavContext);
  const { navItems } = mainNavState;
  const open = navItems[navIndex];
  // const [state, setState] = React.useState({
  //   expanded: false,
  //   open: false,
  //   auto: false,
  //   finished: false
  // });
  //const { expanded, open, auto, finished } = state;
  //const [auto, setAuto] = React.useState(false);
  // const [subItemsRef, stuff] = useMeasure();
  // const { height } = stuff;
  // const getHeight = () => {
  //   if (subItemsRef.ref.current) {
  //     if (auto) {
  //       return 'auto';
  //     } else {
  //       return subItemsRef.ref.current.clientHeight + 'px';
  //     }
  //   }
  //   return '0';
  // };
  // const style = useSpring({ height });
  //const [height, setHeight] = React.useState('0');
  //const subItemsRef = React.useRef();
  // const style = useSpring({
  //   to: {height: closed ? '0px' : height},
  //   //from: {height: '0px'},
  //   //to: {height: 'auto'},
  //   //to: {height: '400px'},
  //   // to: async (next, cancel) => {
  //   //   if (subItemsRef.current) {
  //   //     if (!closed) {
  //   //       // const foo = await next({display: 'block', height: 'auto'});
  //   //       // console.log(foo);
  //   //       //await next({height: 'auto'});
  //   //       //const clientHeight  = String(subItemsRef.current.clientHeight);
  //   //       //console.log(clientHeight)
  //   //       if (!height) {
  //   //         await next({height: 'auto'});
  //   //       }
  //   //       if (height) {
  //   //         await next({ height: '0' });
  //   //         await next({ height: height + 'px'})
  //   //       }
  //   //     }
  //   //   }
  //   //   // if (closed && subItemsRef.current) {
  //   //   //   await next({ height: '0' });
  //   //   // }
  //   // },
  //   //from: {display: 'none'},
  //   //display: closed ? 'none' : 'block',
  //   //config: {duration: 4000},
  //   reverse: closed,
  //   //reset: true,
  //   //to: [{height: 'auto'}, {height: subItemsRef?.current?.clientHeight}]
  //   //from: {height: '0px'}
  //   //from: {height: closed && subItemsRef.current ? '0' : ''}
  // });
  //const containerStyle = useSpring({duration: '0.2s', to: {opacity: open ? 1 : 0}});
  const onClick = () => {
    const { setNavItems } = mainNavState;
    setNavItems((prevNavItems) => {
      const newNavItems = prevNavItems.map((item, itemIndex) => itemIndex === navIndex ? !prevNavItems[navIndex] : false);
      //newNavItems[navIndex] = !prevNavItems[navIndex];
      return newNavItems;
    });
    //onNavItemClick(buttonId, setState);
    //setState((prevState) => ({ ...prevState, open: !prevState.open, finished: false }));
    //setAuto((prevAuto) => !prevAuto);
    //setOpen((prevOpen) => !prevOpen);
  };
  // const onClick = () => {
  //   const subItem = subItemsRef.current;
  //   if (closed) {
  //       //setHeight('auto');
  //       setStyle((prevStyle) => ({
  //         ...prevStyle,
  //         height: 'auto',
  //       }));
        
  //       setTimeout(function timeoutFunction() {
  //         //setHeight(subItem.clientHeight + "px");
  //         setStyle((prevStyle) => ({
  //           ...prevStyle,
  //           height: subItem.clientHeight + "px",
  //         }));
  //         // setContainerStyle({
  //         //   opacity: '1'
  //         // });
  //         subItem.scrollIntoView({ behavior: "smooth", block: "start", inline: "start" });
  //         setClosed(false);
  //         //subItem.style.opacity = "1";
  //       }, 500);
        
  //   } else {
  //     setStyle((prevStyle) => ({
  //       ...prevStyle,
  //       height: '0',
  //     }));
  //     // setContainerStyle({
  //     //   opacity: '0'
  //     // });
  //     setTimeout(function timeoutFunction() {
  //       setClosed(true);
  //     }, 500);
  //   }
  //   setClosed((prevClosed) => !prevClosed);
  // }
  const navItemClasses = classNames(
    'ma__main__hamburger-nav__item',
    {
      'is-active': nav.active,
      'has-subnav js-main-nav-hamburger-toggle': nav.subNav,
      'js-main-nav-hamburger-top-link': !nav.subNav,
      'submenu-open': open
    }
  );
  const altClass = nav.text.toLowerCase().includes('covid') ? 'cv-alternate-style' : '';
  const subItemsClasses = classNames(
    'ma__main__hamburger-nav__subitems js-main-nav-hamburger-content',
    {
      //'is-closed': !open
    }
  );
  // React.useEffect(() => {
  //   if (subItemsRef.ref.current) {
  //     if (open) {
  //       if (!auto && !finished) {
  //         console.log('setting auto');
  //         subItemsRef.ref.current.style.height = 'auto';
  //         setState((prevState) => ({ ...prevState, auto: true }));
  //       }
  //       if (auto && !finished) {
  //         console.log('setting real height: ', height);
  //         subItemsRef.ref.current.style.height = height;
  //         setState((prevState) => ({ ...prevState, auto: false, finished: true }));
  //       }
  //     } else {
  //         //subItemsRef.ref.current.style.height = '0';
  //         setState((prevState) => ({ ...prevState, finished: true }));
        
  //     }
  //   }
  // }, [open, auto, finished]);
  // React.useEffect(() => {
  //   if (!closed) {
  //     if (subItemsRef.current && height === 'auto') {
  //       setHeight(subItemsRef.current.clientHeight + 'px');
  //     } else if (!height || height === '0px') {
  //       setHeight('auto');
  //     }
  //   }
  // }, [closed, height]);
  const navItemRef = React.useRef();
  const onAnimationEnd = () => {
    //setTimeout(() => {
      navItemRef.current.scrollIntoView({ behavior: "smooth", block: "start", inline: "start" });
    //}, 500);
  };
  return(
    <li role="none" ref={navItemRef} className={navItemClasses}>
      {nav.subNav ? (
        <React.Fragment>
          <button onClick={onClick} type="button" role="menuitem" id={buttonId} className="ma__main__hamburger-nav__top-link js-main-nav-hamburger__top-link" aria-expanded={open} aria-haspopup="true">
          <span className="visually-hidden show-label">Show the sub topics of </span>
              {nav.text}
          <span className="toggle-indicator" aria-hidden="true"></span>
          </button>
          <AnimateHeight onAnimationEnd={onAnimationEnd} animateOpacity duration={500} height={open ? 'auto' : 0} contentClassName={subItemsClasses}>
            <ul
              id={menuId}
              role="menu"
              aria-labelledby={buttonId}
              className="ma__main__hamburger-nav__container js-main-nav-hamburger__container"
            >
              {nav.subNav.map((subNav, subNavIndex) => (
                <li key={`${menuId}.${buttonId}.${subNavIndex}`} role="none" className="ma__main__hamburger-nav__subitem js-main-nav-hamburger__subitem">
                  <a role="menuitem" href={subNav.href} className="ma__main__hamburger-nav__link js-main-nav-hamburger__link">{subNav.text}</a>
                </li>
              ))}
              <li role="none" className="ma__main__hamburger-nav__subitem js-main-nav-hamburger__subitem">
                <a role="menuitem" href={nav.href} className="js-main-nav-hamburger__link ma__main__hamburger-nav__link">
                  <IconArrowbent aria-hidden />
                  <span>
                    <span className="visually-hidden">See all topics under </span>
                    {nav.text}
                  </span>
                </a>
              </li>
            </ul>
          </AnimateHeight>
        </React.Fragment>
      ) : nav.href ? (
          <a role="menuitem" href={nav.href} className={`ma__main__hamburger-nav__top-link ${altClass}`}>
            {nav.text}
          </a>
      ) : (
        <button type="button" role="menuitem" id={buttonId} className="ma__main__hamburger-nav__top-link">
          {nav.text}
        </button>
      )}
    </li>
  );
}
const MainNavContext = React.createContext(null);

const MainNavHamburger = ({
  mainNav = []
}) => {
  const initItems = [];
  for (let i = 0; i < mainNav.length; i += 1) {
    initItems.push(false);
  }
  const [navItems, setNavItems] = React.useState(initItems);

  return(
      <div className="ma__main__hamburger-nav">
        <ul role="menubar" className="ma__main__hamburger-nav__items js-main-nav-hamburger">
          <MainNavContext.Provider value={{ navItems, setNavItems }}>
            {mainNav.map((nav, navIndex) => {
              const buttonId = `button${navIndex}`;
              const menuId = `menu${navIndex}`;
              return(
                <NavItem key={`${menuId}.${buttonId}`} nav={nav} navIndex={navIndex} menuId={menuId} buttonId={buttonId} />
              );
            })}
          </MainNavContext.Provider>
        </ul>
      </div>
  );
};

export default MainNavHamburger;