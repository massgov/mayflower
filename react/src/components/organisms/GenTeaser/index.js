import { Paragraph, DecorativeLink, ContactGroup, IconLink, Link, Icon } from '../../../index';
import { svgOptions } from '../../atoms/icons/Icon/Icon.knob.options';
import ReactHtmlParser from 'react-html-parser';
import ButtonWithIcon from '../../atoms/buttons/ButtonWithIcon';
import React from 'react';

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
      ) : children}
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
/*GenTeaser.OnlineContact = (props) => {

}*/

export default GenTeaser;
