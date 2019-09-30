import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, date, select, boolean, number, object, array } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import ReactHtmlParser from 'react-html-parser';
import { svgOptions } from '../../atoms/icons/Icon/Icon.knob.options';
import ButtonWithIcon from '../../atoms/buttons/ButtonWithIcon';
import GenTeaser from './index';
import { Icon } from '../../../index';

// The default rendered date needs to be constant for visual regression tests.
const defaultDate = new Date('2018-02-02');

storiesOf('organisms/GenTeaser/', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('GenTeaser (All)', () => {
    const subLinks = [{
      text: 'this is a link',
      href: 'this is information',
      description: 'this is description'
    }, {
      text: 'this is a link',
      href: 'this is information',
      description: 'this is description'
    }, {
      text: 'this is a link',
      href: 'this is information',
      description: 'this is description'
    }];
    const title = {
      info: 'Title info here',
      text: 'Lorem ipsum dolor sit amet',
      href: '#',
      showFileIcon: false
    };
    const description = 'A paragraph (from the Greek paragraphos, "to write beside" or "written beside") is a self-contained unit of a discourse in <b>writing dealing with a particular</b> point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose.';
    const eyebrow = 'press-release';
    const date = '01/01/2019';
    const orgs = 'Massachusetts Department Of Environmental Protection,Massachusetts Department Of Environmental Protection,Massachusetts Department Of Environmental Protection,Massachusetts Department Of Environmental Protection';
    const address = {
      address: {
        address: {
          streetAddress: text('streetAddress', '324-R Clark Street'),
          muni: text('muni', 'Worcester'),
          state: text('state', 'MA'),
          zip: text('zip', '01606')
        },
        directionLink: text('directionLink', 'https://maps.google.com/?q=324-R+Clark+Street%2C+Worcester%2C+MA+01606'),
        details: text('details', 'Open Monday through Friday from 9:00 a.m. to 5:00 p.m.')
      }
    };
    const phone = {
      phone: {
        number: text('number', '5087985180'),
        details: text('details', 'Open Monday through Friday from 9:00 a.m. to 5:00 p.m.')
      }
    };
    const email = {
      email: {
        email: text('email', 'ago@state.ma.us'),
        details: text('details', 'Open Monday through Friday from 9:00 a.m. to 5:00 p.m.')
      }
    };
    const startTime = new Date('March 15, 2002 03:00:00');
    const endTime = new Date('March 15, 2002 18:00:00');
    const event = {
      event: {
        startDate: startTime,
        endDate: endTime,
        details: text('details', 'First come first serve.'),
        location: '324-R Clark Street, Worcester MA 01606',
        description: 'Go to this link https://www.mass.gov/',
        title: 'Title here',
        calendars: [{
          text: 'iCal or Outlook',
          type: 'outlook'
        }, {
          text: 'Yahoo Calendar',
          type: 'yahoo'
        }, {
          text: 'Google Calendar',
          type: 'google'
        }]
      }
    };
    const infodetails = {
      icon: 'wheelchair',
      text: 'Wheelchair accessible'
    };
    const infolink = {
      icon: 'laptop',
      href: '#',
      text: 'This is a form'
    };
    const tags = ['kml', 'xls', 'json', 'csv'];
    const search = {
      placeholder: 'search chiamass.gov...',
      target: 'http://www.chiamass.gov/home/search?keyword={search_term_string}',
      queryInput: 'search_term_string'
    };
    return(
      <GenTeaser>
        <GenTeaser.Details>
          <GenTeaser.Eyebrow eyebrow={eyebrow} />
          <GenTeaser.Title title={title} />
          <GenTeaser.Emphasis>
            <GenTeaser.Date date={date} />
            <GenTeaser.Orgs orgs={orgs} />
          </GenTeaser.Emphasis>
          <GenTeaser.Description description={description} />
          <GenTeaser.SearchBar search={search} />
          <GenTeaser.SubLinks>
            {subLinks.map((item) => <GenTeaser.KeyAction {...item} />)}
          </GenTeaser.SubLinks>
          <GenTeaser.MoreInfo>
            <GenTeaser.PrimaryInfo>
              <GenTeaser.Address {...address} />
              <GenTeaser.Phone {...phone} />
              <GenTeaser.InfoDetails {...infolink} />
            </GenTeaser.PrimaryInfo>
            <GenTeaser.SecondaryInfo>
              <GenTeaser.Event {...event} />
              <GenTeaser.Email {...email} />
              <GenTeaser.InfoDetails {...infodetails} />
            </GenTeaser.SecondaryInfo>
          </GenTeaser.MoreInfo>
          <GenTeaser.Tags tags={tags} />
        </GenTeaser.Details>
      </GenTeaser>
    );
  })
  .add('GenTeaser (DataCatalog)', () => {
    const subLinks = [{
      text: 'Teacher Salaries Report',
      href: 'http://profiles.doe.mass.edu/statereport/teachersalaries.aspx',
      description: 'Total teaching salaries, divided by the number of full-time equivalent teachers, equals the average teacher salary.'
    }, {
      text: 'MCAS Achievement Results',
      href: 'http://profiles.doe.mass.edu/statereport/mcas.aspx',
      description: 'This report contains results for legacy MCAS only.'
    }, {
      text: 'Next Generation MCAS Achievement Results',
      href: 'http://profiles.doe.mass.edu/statereport/nextgenmcas.aspx',
      description: 'This report contains results for Next Generation MCAS only.'
    }, {
      text: 'Per Pupil Expenditures',
      href: 'http://profiles.doe.mass.edu/statereport/ppx.aspx',
      description: "Per pupil expenditures are calculated by dividing a district's operating costs by its average pupil membership (FTEs), including in-district expenditures per pupil and total expenditures per pupil, which includes in-district and out-of-district spending and enrollment."
    }];
    const title = {
      info: '',
      text: 'School and District Profiles',
      href: 'http://profiles.doe.mass.edu/',
      showFileIcon: false
    };
    const description = "The Massachusetts Department of Early and Seconday Education's school and district profile exploration tool.";
    const eyebrow = <span><Icon name="catalog" svgWidth={16} svgHeight="16" /> Data Catalog</span>;
    const date = '01/01/2019';
    const orgs = 'Massachusetts Department of Early and Seconday Education';
    const tags = ['kml', 'xls', 'json', 'csv'];
    const search = {
      placeholder: 'search profiles.doe.mass.edu...',
      target: 'http://profiles.doe.mass.edu/search/search_new.aspx?leftNavId=11241',
      queryInput: ''
    };
    const stat = <span>Total Items: <b>143</b></span>;
    return(
      <GenTeaser>
        <GenTeaser.Details>
          <GenTeaser.Stat>{stat}</GenTeaser.Stat>
          <GenTeaser.Eyebrow eyebrow={eyebrow} />
          <GenTeaser.Title title={title} />
          <GenTeaser.Emphasis>
            <GenTeaser.Date date={date} />
            <GenTeaser.Orgs orgs={orgs} />
          </GenTeaser.Emphasis>
          <GenTeaser.Description description={description} />
          <GenTeaser.SearchBar search={search} />
          <GenTeaser.SubLinks>
            {subLinks.map((item) => <GenTeaser.KeyAction {...item} />)}
          </GenTeaser.SubLinks>
        </GenTeaser.Details>
      </GenTeaser>
    );
  })
  .add('GenTeaser (Dataset)', () => {
    const title = {
      info: '',
      text: 'Deer harvest data',
      href: 'https://www.mass.gov/service-details/deer-harvest-data',
      showFileIcon: false
    };
    const eyebrow = <span><Icon name="data" svgWidth={16} svgHeight="16" /> Dataset</span>;
    const date = '01/01/2019';
    const orgs = 'Division of Fisheries and Wildlife, Executive Office of Energy and Environmental Affairs';
    const description = "Review the recent white-tailed deer harvest data before heading out to hunt. Though Massachusetts is the 3rd most densely populated state in the country, it is a state where quality deer can be found anywhere. MassWildlife biologists estimate that there are over 100,000 deer statewide. Estimated densities range from about 12-18 per square mile in western and central Massachusetts to over 50 deer per square mile on Martha's Vineyard and Nantucket Islands, and certain areas of eastern MA where hunting access is restricted.";
    const tags = ['kml', 'xls', 'json', 'csv'];
    const button = {
      text: 'Show Details',
      theme: 'c-primary',
      usage: 'secondary'
    };
    return(
      <GenTeaser onClick={(e) => action(e)} onKeyDown={(e) => action(e)}>
        <GenTeaser.Details>
          <GenTeaser.Eyebrow eyebrow={eyebrow} />
          <GenTeaser.Button button={button} />
          <GenTeaser.Title title={title} />
          <GenTeaser.Emphasis>
            <GenTeaser.Date date={date} />
            <GenTeaser.Orgs orgs={orgs} />
          </GenTeaser.Emphasis>
          <GenTeaser.Description description={description} />
          <GenTeaser.Tags tags={tags} />
        </GenTeaser.Details>
      </GenTeaser>
    );
  })
  .add('GenTeaser (Data Download)', () => {
    const title = {
      info: '',
      text: '2015 Monthly Electric Customer Migration Data',
      details: '(30 MB)',
      href: 'https://www.mass.gov/files/documents/2018/06/15/2015%20Annual%20Electric%20Monthly%20Migration-Complete.xlxs',
      icon: 'download',
      showFileIcon: true
    };
    const date = 'Updated on 9/06/2019';
    const orgs = 'Department of Public Health, Executive Office of Health and Human Services';
    const description = 'Jun 15, 2018 <b>...</b> <b>Annual Electric</b>. <b>Migration</b>. 2,015,302. 18,322,632,032. 758,696 .... <b>Monthly</b>  Competitive Supply Load Served (2015). State. Lg C &amp; I. Med C &amp; I.';
    return(
      <GenTeaser>
        <GenTeaser.Details>
          <GenTeaser.Title title={title} />
          <GenTeaser.Emphasis>
            <GenTeaser.Date date={date} />
            <GenTeaser.Orgs orgs={orgs} />
          </GenTeaser.Emphasis>
          <GenTeaser.Description description={description} />
        </GenTeaser.Details>
      </GenTeaser>
    );
  })
  .add('GenTeaser (News)', () => {
    const title = {
      info: '',
      text: 'State public health officials announce two new confirmed human cases of EEE',
      href: 'https://www.mass.gov/news/state-public-health-officials-announce-two-new-confirmed-human-cases-of-eee',
      showFileIcon: false
    };
    const eyebrow = 'Press Release';
    const date = '9/06/2019';
    const orgs = 'Department of Public Health, Executive Office of Health and Human Services';
    const description = 'The Massachusetts Department of Public Health (DPH) today announced that laboratory testing has confirmed two new cases of Eastern ...';
    return(
      <GenTeaser>
        <GenTeaser.Details>
          <GenTeaser.Eyebrow eyebrow={eyebrow} />
          <GenTeaser.Title title={title} />
          <GenTeaser.Emphasis>
            <GenTeaser.Date date={date} />
            <GenTeaser.Orgs orgs={orgs} />
          </GenTeaser.Emphasis>
          <GenTeaser.Description description={description} />
        </GenTeaser.Details>
      </GenTeaser>
    );
  })
  .add('GenTeaser (Laws & Regs)', () => {
    const title = {
      info: '',
      text: '101 CMR 350.00: Home Health Services',
      href: 'https://www.mass.gov/regulations/101-CMR-35000-home-health-services',
      showFileIcon: false
    };
    const eyebrow = 'Regulation';
    const date = '7/12/2019';
    const orgs = 'Executive Office of Health and Human Services';
    const description = 'This is an unofficial version of Commonwealth regulations and is posted here for the convenience of the public. It is not an official statement of the regulations.';
    const titlelaw = {
      info: '',
      text: 'General Law - Part I, Title XV, Chapter 93, Section 78',
      href: 'https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXV/Chapter93/Section78',
      showFileIcon: false
    };
    const eyebrowlaw = 'General Law';
    const orgslaw = 'Massachusetts Legislature';
    const descriptionlaw = "''Contract for health club services'', a contract which has the primary purpose of providing a person with the right to use the facilities of a health club or with ..";
    const subLinkslaw = [{
      text: 'Search Sections within this Chapter',
      href: 'http://malegislature.gov/Laws/GeneralLaws/PartI/TitleXV/Chapter93'
    }, {
      text: 'Search for General Laws',
      href: 'http://malegislature.gov/Laws/GeneralLaws'
    }];
    return(
      <React.Fragment>
        <GenTeaser>
          <GenTeaser.Details>
            <GenTeaser.Eyebrow eyebrow={eyebrow} />
            <GenTeaser.Title title={title} />
            <GenTeaser.Emphasis>
              <GenTeaser.Date date={date} />
              <GenTeaser.Orgs orgs={orgs} />
            </GenTeaser.Emphasis>
            <GenTeaser.Description description={description} />
          </GenTeaser.Details>
        </GenTeaser>
        <GenTeaser>
          <GenTeaser.Details>
            <GenTeaser.Eyebrow eyebrow={eyebrowlaw} />
            <GenTeaser.Title title={titlelaw} />
            <GenTeaser.Emphasis>
              <GenTeaser.Orgs orgs={orgslaw} />
            </GenTeaser.Emphasis>
            <GenTeaser.Description description={descriptionlaw} />
            <GenTeaser.SubLinks>
              {subLinkslaw.map((action) => <GenTeaser.KeyAction {...action} />)}
            </GenTeaser.SubLinks>
          </GenTeaser.Details>
        </GenTeaser>
      </React.Fragment>
    );
  })
  .add('GenTeaser (Services)', () => {
    const title = {
      info: '',
      text: 'SNAP outreach',
      href: 'https://www.mass.gov/snap-outreach',
      showFileIcon: false
    };
    const description = 'If you are a client, you can get help with you SNAP case and benefits through a SNAP outreach partner. You can find SNAP outreach ... Contact Information ...';
    const subLinks = [{
      text: 'Apply for SNAP benefits (food stamps)',
      href: 'https://www.mass.gov/how-to/apply-for-snap-benefits-food-stamps'
    }, {
      text: 'Snap Outreach For Partners',
      href: 'https://www.mass.gov/service-details/snap-outreach-for-partners'
    }];
    return(
      <GenTeaser>
        <GenTeaser.Details>
          <GenTeaser.Title title={title} />
          <GenTeaser.Description description={description} />
          <GenTeaser.SubLinks>
            {subLinks.map((action) => <GenTeaser.KeyAction {...action} />)}
          </GenTeaser.SubLinks>
        </GenTeaser.Details>
      </GenTeaser>
    );
  })
  .add('GenTeaser (State Org)', () => {
    const title = {
      info: '',
      text: 'MassHire Department of Career Services',
      href: 'https://www.mass.gov/orgs/masshire-department-of-career-services',
      showFileIcon: false
    };
    const description = 'The MassHire Department of Career Services provides job seekers with a variety of job assistance services, ... How to Access State Jobs - Information Session.';
    const phone = {
      phone: {
        number: text('number', '6176265300'),
        details: text('details', '8:30 a.m. - 4:30 p.m. weekdays')
      }
    };
    const email = {
      email: {
        email: text('email', 'DCSFeedback@MassMail.State.MA.US')
      }
    };
    const infodetails = {
      icon: 'laptop',
      text: 'Find a job with MassHire JobQuest',
      href: 'https://jobquest.detma.org/jobquest/Default.aspx'
    };
    const locations = {
      icon: 'marker',
      href: 'https://www.mass.gov/orgs/masshire-department-of-career-services/locations',
      text: 'MassHire Department of Career Services Locations '
    };
    return(
      <GenTeaser>
        <GenTeaser.Details>
          <GenTeaser.Title title={title} />
          <GenTeaser.Description description={description} />
          <GenTeaser.MoreInfo>
            <GenTeaser.PrimaryInfo>
              <GenTeaser.Phone {...phone} />
              <GenTeaser.InfoDetails {...locations} />
            </GenTeaser.PrimaryInfo>
            <GenTeaser.SecondaryInfo>
              <GenTeaser.Email {...email} />
              <GenTeaser.InfoDetails {...infodetails} />
            </GenTeaser.SecondaryInfo>
          </GenTeaser.MoreInfo>
        </GenTeaser.Details>
      </GenTeaser>
    );
  })
  .add('GenTeaser (Location)', () => {
    const title = {
      info: '',
      text: 'Haverhill RMV Service Center',
      href: 'https://www.mass.gov/locations/haverhill-rmv-service-center',
      showFileIcon: false
    };
    const description = 'Aug 29, 2019 ... 229c Lincoln Avenue, Haverhill, MA 01830. directions · Start your application online See and compare wait times at RMV Service Centers in ...';
    const address = {
      address: {
        address: '229c Lincoln Avenue<br>Haverhill, MA 01830<br>United States',
        directionLink: text('directionLink', 'https://maps.google.com/?q=229c+Lincoln+Avenue%2C+Haverhill%2C+MA+01830'),
        details: text('details', 'Monday - Friday: 9:00 am-5:00 pm')
      }
    };

    return(
      <GenTeaser>
        <GenTeaser.Details>
          <GenTeaser.Title title={title} />
          <GenTeaser.Description description={description} />
          <GenTeaser.MoreInfo>
            <GenTeaser.PrimaryInfo>
              <GenTeaser.Address {...address} />
            </GenTeaser.PrimaryInfo>
          </GenTeaser.MoreInfo>
        </GenTeaser.Details>
      </GenTeaser>
    );
  })
  .add('GenTeaser (Event)', () => {
    const title = {
      info: '',
      text: 'Job Fair 2019',
      href: 'https://www.mass.gov/locations/haverhill-rmv-service-center',
      showFileIcon: false
    };
    const description = 'Jul 17, 2019 ... offered by. MassHire Department of Career Services. show 0 more. related to. MassHire Plymouth Career Center · MassHire ... Job Fair 2019.';
    const address = {
      address: {
        address: 'Kingston Collection 101 Kingston Collection Way<br>Kingston MA 02364',
        directionLink: text('directionLink', 'https://maps.google.com/?q=Kingston+Collection+101+Kingston+Collection+Way+Kingston+MA+02364')
      }
    };
    const startTime = new Date(2019, 7, 12, 13, 0, 0);
    const endTime = new Date(2019, 7, 17, 16, 0, 0);
    const event = {
      event: {
        startDate: startTime,
        endDate: endTime,
        details: text('details', 'First come first serve.'),
        location: '324-R Clark Street, Worcester MA 01606',
        description: 'Go to this link https://www.mass.gov/',
        title: 'Title here',
        calendars: [{
          text: 'iCal or Outlook',
          type: 'outlook'
        }, {
          text: 'Yahoo Calendar',
          type: 'yahoo'
        }, {
          text: 'Google Calendar',
          type: 'google'
        }]
      }
    };
    const orgs = 'MassHire Department of Career Services';
    return(
      <GenTeaser>
        <GenTeaser.Details>
          <GenTeaser.Title title={title} />
          <GenTeaser.Emphasis>
            <GenTeaser.Orgs orgs={orgs} />
          </GenTeaser.Emphasis>
          <GenTeaser.Description description={description} />
          <GenTeaser.MoreInfo>
            <GenTeaser.PrimaryInfo>
              <GenTeaser.Event {...event} />
            </GenTeaser.PrimaryInfo>
            <GenTeaser.SecondaryInfo>
              <GenTeaser.Address {...address} />
            </GenTeaser.SecondaryInfo>
          </GenTeaser.MoreInfo>
        </GenTeaser.Details>
      </GenTeaser>
    );
  });
