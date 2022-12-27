/**
 * GenTeaser module.
 * @module @massds/mayflower-react/GenTeaser
 * @requires module:@massds/mayflower-assets/scss/03-organisms/gen-teaser
 * @requires module:@massds/mayflower-assets/scss/01-atoms/button-with-icon
 * @requires module:@massds/mayflower-assets/scss/01-atoms/button-search
 * @requires module:@massds/mayflower-assets/scss/01-atoms/decorative-link
 * @requires module:@massds/mayflower-assets/scss/01-atoms/email
 * @requires module:@massds/mayflower-assets/scss/01-atoms/image
 * @requires module:@massds/mayflower-assets/scss/01-atoms/event-time
 * @requires module:@massds/mayflower-assets/scss/01-atoms/phone-number
 * @requires module:@massds/mayflower-assets/scss/01-atoms/address
 * @requires module:@massds/mayflower-assets/scss/01-atoms/input-typeahead
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-icons
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-loc-icons
 */
import React from 'react';
import Container from 'MayflowerReactGenTeaser/GenTeaserContainer';
import Details from 'MayflowerReactGenTeaser/GenTeaserDetails';
import Image from 'MayflowerReactGenTeaser/GenTeaserImage';
import Eyebrow from 'MayflowerReactGenTeaser/GenTeaserEyebrow';
import Button from 'MayflowerReactGenTeaser/GenTeaserButton';
import Stat from 'MayflowerReactGenTeaser/GenTeaserStat';
import Title from 'MayflowerReactGenTeaser/GenTeaserTitle';
import Emphasis from 'MayflowerReactGenTeaser/GenTeaserEmphasis';
import Date from 'MayflowerReactGenTeaser/GenTeaserDate';
import Orgs from 'MayflowerReactGenTeaser/GenTeaserOrgs';
import Description from 'MayflowerReactGenTeaser/GenTeaserDescription';
import SearchBar from 'MayflowerReactGenTeaser/GenTeaserSearchBar';
import SubLinks from 'MayflowerReactGenTeaser/GenTeaserSubLinks';
import KeyAction from 'MayflowerReactGenTeaser/GenTeaserKeyAction';
import MoreInfo from 'MayflowerReactGenTeaser/GenTeaserMoreInfo';
import PrimaryInfo from 'MayflowerReactGenTeaser/GenTeaserPrimaryInfo';
import SecondaryInfo from 'MayflowerReactGenTeaser/GenTeaserSecondaryInfo';
import Address from 'MayflowerReactGenTeaser/GenTeaserAddress';
import Phone from 'MayflowerReactGenTeaser/GenTeaserPhone';
import Email from 'MayflowerReactGenTeaser/GenTeaserEmail';
import Event from 'MayflowerReactGenTeaser/GenTeaserEvent';
import InfoDetails from 'MayflowerReactGenTeaser/GenTeaserInfoDetails';
import Tags from 'MayflowerReactGenTeaser/GenTeaserTags';

const GenTeaser = (props) => (
  <Container {...props} />
);

GenTeaser.propTypes = Container.propTypes;

GenTeaser.Details = Details;
GenTeaser.Image = Image;
GenTeaser.Eyebrow = Eyebrow;
GenTeaser.Button = Button;
GenTeaser.Stat = Stat;
GenTeaser.Title = Title;
GenTeaser.Emphasis = Emphasis;
GenTeaser.Date = Date;
GenTeaser.Orgs = Orgs;
GenTeaser.Description = Description;
GenTeaser.SearchBar = SearchBar;
GenTeaser.SubLinks = SubLinks;
GenTeaser.KeyAction = KeyAction;
GenTeaser.MoreInfo = MoreInfo;
GenTeaser.PrimaryInfo = PrimaryInfo;
GenTeaser.SecondaryInfo = SecondaryInfo;
GenTeaser.Address = Address;
GenTeaser.Phone = Phone;
GenTeaser.Email = Email;
GenTeaser.Event = Event;
GenTeaser.InfoDetails = InfoDetails;
GenTeaser.Tags = Tags;

export default GenTeaser;
