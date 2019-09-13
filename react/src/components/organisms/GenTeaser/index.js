import { Paragraph, DecorativeLink, ContactGroup, IconLink, Link, Icon } from '../../../index';
import { svgOptions } from '../../atoms/icons/Icon/Icon.knob.options';
import ReactHtmlParser from 'react-html-parser';
import ButtonWithIcon from '../../atoms/buttons/ButtonWithIcon';
import Address from '../../atoms/contact/Address';
import PhoneNumber from '../../atoms/contact/PhoneNumber';
import Email from '../../atoms/contact/Email';
import EventTime from '../../atoms/contact/EventTime';
import LinkDropdown from '../../molecules/LinkDropdown';
import HeaderSearch from '../../molecules/HeaderSearch';
import React from 'react';
import helpersClass from "./utils";
import './style.css';

const helpers = new helpersClass();

class TeaserOrg extends React.Component {
  constructor(props) {
    super(props);
    const allOrgs = props.orgs.split(',');
    this.state = {
      shouldTruncate: (allOrgs.length > 3),
      truncateOrgs: (allOrgs.length > 3),
      showAll: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const allOrgs = nextProps.orgs.split(',');
    this.setState({ shouldTruncate: (allOrgs.length > 3), truncateOrgs: (allOrgs.length > 3), showAll: false });
  }
  handleClick() {
    this.setState((prevState) => ({ showAll: !prevState.showAll, truncateOrgs: !prevState.truncateOrgs }));
  }
  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.setState((prevState) => ({ showAll: !prevState.showAll, truncateOrgs: !prevState.truncateOrgs }));
    }
  }
  render() {
    const { orgs } = this.props;
    const teaserOrgs = orgs.split(',');
    if (!this.state.shouldTruncate) {
      return<span className="ma__gen-teaser__org">{teaserOrgs.join(', ')}</span>;
    }
    const shownOrgs = teaserOrgs.slice(0, 3);
    const hiddenOrgs = teaserOrgs.slice(3);
    const toggleProps = {
      classes: ['ma__gen-teaser__org__show-more', `${!this.state.truncateOrgs ? "show-fewer" : ""}`],
      onClick: (e) => this.handleClick(e),
      onKeyPress: (e) => this.handleKeyPress(e),
      text: (this.state.truncateOrgs) ? ` & ${hiddenOrgs.length} more` : ' Show fewer',
      theme: 'c-primary',
      usage: 'quaternary-simple',
      capitalized: true,
      expanded: this.state.showAll,
      icon: <Icon name="chevron" svgWidth={16} svgHeight="16" />
    };
    const toggle = <ButtonWithIcon {...toggleProps} />;
    const displayedOrgs = (this.state.showAll) ? teaserOrgs.join(', ') : shownOrgs.join(', ');
    return(
      <span className="ma__gen-teaser__org">
        { displayedOrgs }{toggle}
      </span>);
  }
}

const GenTeaser = (props) => {
  const { children, ...rest } = props;
  return(
    <div className="ma__gen-teaser__details" {...rest}>
      {children}
    </div>
  )
}

GenTeaser.Title = (props) => {
  const { level, title, children, ...rest } = props;
  const Element = `h${level || 2}`;
  return(
    <Element className="ma__gen-teaser__title" {...rest} >
      {title && <DecorativeLink {...title} />}
      {children}
    </Element>
  )
}

GenTeaser.Eyebrow = (props) => {
  const { eyebrow, children, ...rest } = props;
  return(
    <div className="ma__gen-teaser__eyebrow" {...rest} >
      {eyebrow && <span>{eyebrow}</span>}
      {children}
    </div>
  )
}

GenTeaser.Emphasis = (props) => {
  const { children, ...rest } = props;
  return(
    <div className="ma__gen-teaser__emphasis" {...rest}>
      {children}
    </div>
  )
}

GenTeaser.Date = (props) => {
  const { date, children, ...rest } = props;
  return(
    <span className="ma__gen-teaser__date" {...rest}>
      {date && date}
      {children}
    </span>
  )
}

GenTeaser.Org = (props) => {
  const { orgs, ...rest } = props;
  return(
    <TeaserOrg orgs={orgs} {...rest}/>
  )
}

GenTeaser.Description = (props) => {
  const { children, description, ...rest } = props;
  return(
    <div className="ma__gen-teaser__description" {...rest}>
      {description && <p>{ReactHtmlParser(description)}</p>}
      {children}
    </div>
  );
}

GenTeaser.KeyAction = (props) => {
  const { description, href, text, info, children, ...rest } = props;
  return(
    <div className="ma__gen-teaser__key-action-item" {...rest} >
      {text && href && <DecorativeLink href={href} text={text} info={info} />}
      {description && <p>{ReactHtmlParser(description)}</p>}
      {children}
    </div>
 );
}

GenTeaser.SubLinks= (props) => {
  const { children, ...rest } = props;
  return(
    <div className="ma__gen-teaser__key-action" {...rest}>
      {children.length > 2 ? (
        <React.Fragment>
          <div className="ma__gen-teaser__key-action-col">
            {children.slice(0,2)}
          </div>
          <div className="ma__gen-teaser__key-action-col">
            {children.slice(2,4)}
          </div>
        </React.Fragment>
      ) : <div className="ma__gen-teaser__key-action-col">{children}</div>}
    </div>
  )
}

GenTeaser.MoreInfo = (props) => {
  const { children, ...rest } = props;
  return(
    <div className="ma__gen-teaser__moreinfo" {...rest}>
      {children}
    </div>
  )
}

GenTeaser.PrimaryInfo = (props) => {
  const { children, ...rest } = props;
  return(
    <div className="ma__gen-teaser__pimary" {...rest}>
      {children}
    </div>
  )
}

GenTeaser.SecondaryInfo = (props) => {
  const { children, ...rest } = props;
  return(
    <div className="ma__gen-teaser__secondary" {...rest}>
      {children}
    </div>
  )
}

GenTeaser.Address = (props) => {
  const { address, ...rest } = props;
  return(
    <div className="ma__gen-teaser__infoitem" {...rest}>
      <span className="ma__gen-teaser__infoitem-icon">
        <Icon name="marker" svgWidth={15} svgHeight={15} />
      </span>
      <Address {...address} />
    </div>
  )
}

GenTeaser.Phone = (props) => {
  const { phone, ...rest } = props;
  return(
    <div className="ma__gen-teaser__infoitem" {...rest}>
      <span className="ma__gen-teaser__infoitem-icon">
        <Icon name="phone" svgWidth={15} svgHeight={15} />
      </span>
      <PhoneNumber {...phone} />
    </div>
  )
}

GenTeaser.Email = (props) => {
  const { email, ...rest } = props;
  return(
    <div className="ma__gen-teaser__infoitem" {...rest}>
      <span className="ma__gen-teaser__infoitem-icon">
        <Icon name="mail" svgWidth={15} svgHeight={15} />
      </span>
      <Email {...email} />
    </div>
  )
}

GenTeaser.Event = (props) => {
  const { event, ...rest } = props;
  const dropdownProps = {
    dropdownButton: {
      text: 'Add to calendar',
      theme: 'c-primary',
      usage: 'quaternary-simple',
      id: 'dropdownbutton-simple',
      'aria-haspopup': true,
      capitalized: true
    }
  }
  dropdownProps.dropdownItems = event.calendars.map((item) => {
    const { type, text } = item;
    let itemVals = "";
    switch (type) {
      case 'yahoo':
      case 'google':
      case 'outlookcom':
        itemVals = {
          text,
          href: helpers.buildUrl(event,type)
        }
        break;
      default:
        itemVals = {
          text,
          href: helpers.buildUrl(event,type,window||''),
          target: '_blank',
          download: 'download.ics'
        }
        break;
    }
    return itemVals;
  })
  return(
    <React.Fragment>
      <div className="ma__gen-teaser__infoitem" {...rest}>
        <span className="ma__gen-teaser__infoitem-icon">
          <Icon name="calendar" svgWidth={15} svgHeight={15} />
        </span>
        <EventTime {...event} />
      </div>
      <LinkDropdown {...dropdownProps} />
    </React.Fragment>
  )
}

GenTeaser.InfoDetails = (props) => {
  const { icon, href, text, ...rest } = props;
  return(
    <div className="ma__gen-teaser__infoitem" {...rest}>
      <span className="ma__gen-teaser__infoitem-icon">
        <Icon name={icon} svgWidth={15} svgHeight={15} />
      </span>
      {text && !href && <span>{text}</span>}
      {href && text && <DecorativeLink text={text} href={href} />}
    </div>
  )
}

GenTeaser.Tags = (props) => {
  const { tags, ...rest } = props;
  return(
    <div className="ma__gen-teaser__tags" {...rest}>
      {tags.map(tag => <span className="ma__gen-teaser__tag">{tag}</span>)}
    </div>
  )
}

class TeaserSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };
  }

  onChange = (term) => {
    console.log(window.parent)
      console.log(window.location)
    this.setState({
      query: term
    });
  }

  redirect = (searchURL) => {
    if (window.location !== window.parent.location) {
      window.parent.location.assign(searchURL);
    } else {
      window.location.assign(searchURL);
    }
  }

  onClick = (e) => {
    e.preventDefault();
    const { target, queryInput } = this.props;
    const { query } = this.state;
    if(query.length > 0){
      const searchURL = queryInput ? target.replace(`{${queryInput}}`,this.state.query) : target;
      this.redirect(searchURL)
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { target, queryInput } = this.props;
    const { query } = this.state;
    if(query.length > 0){
      const searchURL = queryInput ? target.replace(`{${queryInput}}`,this.state.query) : target;
      this.redirect(searchURL)
    }
  }

  render() {
    const { placeholder, id, ...rest } = this.props;
    return(
      <HeaderSearch
        buttonSearch={{
          ariaLabel: '',
          onClick: (e) => this.onClick(e),
          text: 'Search',
          usage: ''
        }}
        defaultText=""
        id={id}
        label="Search terms"
        onChange={(term) => this.onChange(term)}
        onSubmit={(e) => this.onSubmit(e)}
        placeholder={placeholder}
        {...rest}
      />
    )
  }
}

GenTeaser.SearchBar = (props) => {
  const { search, ...rest } = props;
  return(
    <div className="ma__gen-teaser__search" {...rest}>
      <TeaserSearch
        {...search}
      />
    </div>
  )
}

export default GenTeaser;
