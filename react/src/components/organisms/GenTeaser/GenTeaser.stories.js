import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import { withKnobs, array, text, select, boolean, object } from '@storybook/addon-knobs';
import buttonOptions from 'MayflowerReactButtons/Button/Button.knobs.options';
import GenTeaser from './index';
import GenTeaserDocs from './GenTeaser.md';
import IconCatalog from 'MayflowerReactBase/Icon/IconCatalog';
import IconData from 'MayflowerReactBase/Icon/IconData';

storiesOf('organisms/GenTeaser', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('GenTeaser as Basic', () => {
    const basic = {
      title: {
        info: text('title: info', 'Title info here', 'GenTeaser.Title'),
        text: text('title: text', 'Basic Search Result', 'GenTeaser.Title'),
        href: text('title: href', '#', 'GenTeaser.Title'),
        showFileIcon: boolean('title: showFileIcon', false, 'GenTeaser.Title')
      },
      description: text('description', 'A paragraph (from the Greek paragraphos, "to write beside" or "written beside") is a self-contained unit of a discourse in <b>writing dealing with a particular</b> point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose.', 'GenTeaser.Description')
    };
    return(
      <GenTeaser>
        <GenTeaser.Details>
          <GenTeaser.Title title={basic.title} />
          <GenTeaser.Description description={basic.description} />
        </GenTeaser.Details>
      </GenTeaser>
    );
  }, { info: GenTeaserDocs })
  .add('GenTeaser as DataCatalog', () => {
    const dataCatalog = {
      title: {
        info: text('title: info', 'Title info here', 'GenTeaser.Title'),
        text: text('title: text', 'School and District Profiles', 'GenTeaser.Title'),
        href: text('title: href', 'http://profiles.doe.mass.edu/', 'GenTeaser.Title'),
        showFileIcon: boolean('title: showFileIcon', false, 'GenTeaser.Title')
      },
      description: text('description', 'The Massachusetts Department of Early and Seconday Education\'s school and district profile exploration tool.', 'GenTeaser.Description'),
      subLinks: object('subLinks', [{
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
      }], 'GenTeaser.SubLinks'),
      date: text('date', '01/01/2019', 'GenTeaser.Date'),
      orgs: text('orgs', 'Massachusetts Department of Early and Seconday Education', 'GenTeaser.Orgs'),
      search: {
        placeholder: text('search: placeholder', 'search profiles.doe.mass.edu...', 'GenTeaser.Search'),
        target: text('search: target', 'http://profiles.doe.mass.edu/search/search_new.aspx?leftNavId=11241', 'GenTeaser.Search'),
        queryInput: text('search: queryInput', '', 'GenTeaser.Search'),
        id: text('search: id', 'jahdfjadh', 'GenTeaser.Search')
      },
      stat: text('stat', <span>Total Items: <b>143</b></span>, 'GenTeaser.Stat'),
      eyebrow: text('eyebrow', <span><IconCatalog width={16} height={16} /> Data Catalog</span>, 'GenTeaser.Eyebrow')
    };
    return(
      <GenTeaser>
        <GenTeaser.Details>
          <GenTeaser.Stat>{dataCatalog.stat}</GenTeaser.Stat>
          <GenTeaser.Eyebrow eyebrow={dataCatalog.eyebrow} />
          <GenTeaser.Title title={dataCatalog.title} />
          <GenTeaser.Emphasis>
            <GenTeaser.Date date={dataCatalog.date} />
            <GenTeaser.Orgs orgs={dataCatalog.orgs} />
          </GenTeaser.Emphasis>
          <GenTeaser.Description description={dataCatalog.description} />
          <GenTeaser.SearchBar search={dataCatalog.search} />
          <GenTeaser.SubLinks>
            {dataCatalog.subLinks.map((item) => <GenTeaser.KeyAction {...item} />)}
          </GenTeaser.SubLinks>
        </GenTeaser.Details>
      </GenTeaser>
    );
  }, { info: GenTeaserDocs })
  .add('GenTeaser as Dataset', () => {
    const dataset = {
      title: {
        info: text('title: info', 'This is the info', 'GenTeaser.Title'),
        text: text('title: text', 'Deer harvest data', 'GenTeaser.Title'),
        href: text('title: href', 'https://www.mass.gov/service-details/deer-harvest-data', 'GenTeaser.Title'),
        showFileIcon: boolean('title: showFileIcon', false, 'GenTeaser.Title')
      },
      description: text('description', 'Review the recent white-tailed deer harvest data before heading out to hunt. Though Massachusetts is the 3rd most densely populated state in the country, it is a state where quality deer can be found anywhere. MassWildlife biologists estimate that there are over 100,000 deer statewide. Estimated densities range from about 12-18 per square mile in western and central Massachusetts to over 50 deer per square mile on Martha\'s Vineyard and Nantucket Islands, and certain areas of eastern MA where hunting access is restricted.', 'GenTeaser.Description'),
      eyebrow: text('eyebrow', <span><IconData width={16} height={16} /> Dataset</span>, 'GenTeaser.Eyebrow'),
      date: text('date', '01/01/2019', 'GenTeaser.Date'),
      orgs: text('orgs', 'Division of Fisheries and Wildlife, Executive Office of Energy and Environmental Affairs', 'GenTeaser.Orgs'),
      tags: array('tags', ['kml', 'xls', 'json', 'csv'], ',', 'GenTeaser.Tags'),
      button: {
        text: text('button: text', 'Show Details', 'GenTeaser.Button'),
        usage: select('button: usage', buttonOptions.usage, 'secondary', 'GenTeaser.Button'),
        theme: select('button: theme', buttonOptions.theme, 'c-primary', 'GenTeaser.Button')
      }
    };
    return(
      <GenTeaser onClick={(e) => action(e)} onKeyDown={(e) => action(e)}>
        <GenTeaser.Details>
          <GenTeaser.Eyebrow eyebrow={dataset.eyebrow} />
          <GenTeaser.Button button={dataset.button} />
          <GenTeaser.Title title={dataset.title} />
          <GenTeaser.Emphasis>
            <GenTeaser.Date date={dataset.date} />
            <GenTeaser.Orgs orgs={dataset.orgs} />
          </GenTeaser.Emphasis>
          <GenTeaser.Description description={dataset.description} />
          <GenTeaser.Tags tags={dataset.tags} />
        </GenTeaser.Details>
      </GenTeaser>
    );
  }, { info: GenTeaserDocs })
  .add('GenTeaser as Data Download', () => {
    const dataDownload = {
      title: {
        info: text('title: info', 'This is the info', 'GenTeaser.Title'),
        text: text('title: text', '2015 Monthly Electric Customer Migration Data', 'GenTeaser.Title'),
        href: text('title: href', 'https://www.mass.gov/files/documents/2018/06/15/2015%20Annual%20Electric%20Monthly%20Migration-Complete.xlxs', 'GenTeaser.Title'),
        icon: 'IconDownload',
        showFileIcon: boolean('title: showFileIcon', true, 'GenTeaser.Title'),
        details: '(30 MB)'
      },
      description: text('description', 'Jun 15, 2018 <b>...</b> <b>Annual Electric</b>. <b>Migration</b>. 2,015,302. 18,322,632,032. 758,696 .... <b>Monthly</b>  Competitive Supply Load Served (2015). State. Lg C &amp; I. Med C &amp; I.', 'GenTeaser.Description'),
      date: text('date', 'Updated on 9/06/2019', 'GenTeaser.Date'),
      orgs: text('orgs', 'Department of Public Health, Executive Office of Health and Human Services', 'GenTeaser.Orgs')
    };
    return(
      <GenTeaser>
        <GenTeaser.Details>
          <GenTeaser.Title title={dataDownload.title} />
          <GenTeaser.Emphasis>
            <GenTeaser.Date date={dataDownload.date} />
            <GenTeaser.Orgs orgs={dataDownload.orgs} />
          </GenTeaser.Emphasis>
          <GenTeaser.Description description={dataDownload.description} />
        </GenTeaser.Details>
      </GenTeaser>
    );
  }, { info: GenTeaserDocs })
  .add('GenTeaser as News', () => {
    const news = {
      title: {
        info: text('title: info', 'This is the info', 'GenTeaser.Title'),
        text: text('title: text', 'State public health officials announce two new confirmed human cases of EEE', 'GenTeaser.Title'),
        href: text('title: href', 'https://www.mass.gov/news/state-public-health-officials-announce-two-new-confirmed-human-cases-of-eee', 'GenTeaser.Title'),
        showFileIcon: boolean('title: showFileIcon', false, 'GenTeaser.Title')
      },
      eyebrow: text('eyebrow', 'Press Release', 'GenTeaser.Eyebrow'),
      description: text('description', 'The Massachusetts Department of Public Health (DPH) today announced that laboratory testing has confirmed two new cases of Eastern ...', 'GenTeaser.Description'),
      date: text('date', '9/06/2019', 'GenTeaser.Date'),
      orgs: text('orgs', 'Bureau of Substance Addiction Services, Department of Mental Health, Department of Public Health, Executive Office of Health and Human Services', 'GenTeaser.Orgs')
    };
    return(
      <GenTeaser>
        <GenTeaser.Details>
          <GenTeaser.Eyebrow eyebrow={news.eyebrow} />
          <GenTeaser.Title title={news.title} />
          <GenTeaser.Emphasis>
            <GenTeaser.Date date={news.date} />
            <GenTeaser.Orgs orgs={news.orgs} />
          </GenTeaser.Emphasis>
          <GenTeaser.Description description={news.description} />
        </GenTeaser.Details>
      </GenTeaser>
    );
  }, { info: GenTeaserDocs })
  .add('GenTeaser  as Laws and Regs', () => {
    const regulation = {
      title: {
        info: text('title: info', 'This is the info', 'GenTeaser.Title'),
        text: text('title: text', '101 CMR 350.00: Home Health Services', 'GenTeaser.Title'),
        href: text('title: href', 'https://www.mass.gov/regulations/101-CMR-35000-home-health-services', 'GenTeaser.Title'),
        showFileIcon: boolean('title: showFileIcon', false, 'GenTeaser.Title')
      },
      eyebrow: text('eyebrow', 'Regulation', 'GenTeaser.Eyebrow'),
      description: text('description', 'This is an unofficial version of Commonwealth regulations and is posted here for the convenience of the public. It is not an official statement of the regulations.', 'GenTeaser.Description'),
      date: text('date', '7/12/2019', 'GenTeaser.Date'),
      orgs: text('orgs', 'Executive Office of Health and Human Services', 'GenTeaser.Orgs')
    };
    const law = {
      title: {
        info: 'This is the info',
        text: 'General Law - Part I, Title XV, Chapter 93, Section 78',
        href: 'https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXV/Chapter93/Section78',
        showFileIcon: false
      },
      eyebrow: 'General Law',
      description: "''Contract for health club services'', a contract which has the primary purpose of providing a person with the right to use the facilities of a health club or with ..",
      date: '7/13/2019',
      orgs: 'Massachusetts Legislature',
      subLinks: [{
        text: 'Search Sections within this Chapter',
        href: 'http://malegislature.gov/Laws/GeneralLaws/PartI/TitleXV/Chapter93'
      }, {
        text: 'Search for General Laws',
        href: 'http://malegislature.gov/Laws/GeneralLaws'
      }]
    };
    return(
      <React.Fragment>
        <GenTeaser>
          <GenTeaser.Details>
            <GenTeaser.Eyebrow eyebrow={regulation.eyebrow} />
            <GenTeaser.Title title={regulation.title} />
            <GenTeaser.Emphasis>
              <GenTeaser.Date date={regulation.date} />
              <GenTeaser.Orgs orgs={regulation.orgs} />
            </GenTeaser.Emphasis>
            <GenTeaser.Description description={regulation.description} />
          </GenTeaser.Details>
        </GenTeaser>
        <GenTeaser>
          <GenTeaser.Details>
            <GenTeaser.Eyebrow eyebrow={law.eyebrow} />
            <GenTeaser.Title title={law.title} />
            <GenTeaser.Emphasis>
              <GenTeaser.Date date={law.date} />
              <GenTeaser.Orgs orgs={law.orgs} />
            </GenTeaser.Emphasis>
            <GenTeaser.Description description={law.description} />
            <GenTeaser.SubLinks>
              {law.subLinks.map((item) => <GenTeaser.KeyAction {...item} />)}
            </GenTeaser.SubLinks>
          </GenTeaser.Details>
        </GenTeaser>
      </React.Fragment>
    );
  }, { info: GenTeaserDocs })
  .add('GenTeaser as Services', () => {
    const service = {
      title: {
        info: text('title: info', 'This is the info', 'GenTeaser.Title'),
        text: text('title: text', 'SNAP outreach', 'GenTeaser.Title'),
        href: text('title: href', 'https://www.mass.gov/snap-outreach', 'GenTeaser.Title'),
        showFileIcon: boolean('title: showFileIcon', false, 'GenTeaser.Title')
      },
      eyebrow: text('eyebrow', 'General Law', 'GenTeaser.Eyebrow'),
      description: text('description', 'If you are a client, you can get help with you SNAP case and benefits through a SNAP outreach partner. You can find SNAP outreach ... Contact Information ...', 'GenTeaser.Description'),
      subLinks: object('subLinks', [{
        text: 'Apply for SNAP benefits (food stamps)',
        href: 'https://www.mass.gov/how-to/apply-for-snap-benefits-food-stamps'
      }, {
        text: 'Snap Outreach For Partners',
        href: 'https://www.mass.gov/service-details/snap-outreach-for-partners'
      }], 'GenTeaser.SubLinks')
    };
    return(
      <GenTeaser>
        <GenTeaser.Details>
          <GenTeaser.Title title={service.title} />
          <GenTeaser.Description description={service.description} />
          <GenTeaser.SubLinks>
            {service.subLinks.map((link) => <GenTeaser.KeyAction {...link} />)}
          </GenTeaser.SubLinks>
        </GenTeaser.Details>
      </GenTeaser>
    );
  }, { info: GenTeaserDocs })
  .add('GenTeaser (State Org)', () => {
    const stateOrg = {
      title: {
        info: text('title: info', 'This is the info', 'GenTeaser.Title'),
        text: text('title: text', 'MassHire Department of Career Services', 'GenTeaser.Title'),
        href: text('title: href', 'https://www.mass.gov/orgs/masshire-department-of-career-services', 'GenTeaser.Title'),
        showFileIcon: boolean('title: showFileIcon', false, 'GenTeaser.Title')
      },
      description: text('description', 'The MassHire Department of Career Services provides job seekers with a variety of job assistance services, ... How to Access State Jobs - Information Session.', 'GenTeaser.Description'),
      phone: {
        number: text('phone: number', '6176265300', 'GenTeaser.PrimaryInfo'),
        details: text('phone: details', '8:30 a.m. - 4:30 p.m. weekdays', 'GenTeaser.PrimaryInfo')
      },
      email: {
        email: text('email', 'DCSFeedback@MassMail.State.MA.US', 'GenTeaser.SecondaryInfo')
      },
      locations: {
        icon: text('locations: icon', 'IconMarker', 'GenTeaser.PrimaryInfo'),
        href: text('locations: href', 'https://www.mass.gov/orgs/masshire-department-of-career-services/locations', 'GenTeaser.PrimaryInfo'),
        text: text('locations: text', 'MassHire Department of Career Services Locations', 'GenTeaser.PrimaryInfo')
      },
      infodetails: {
        icon: text('infodetails: icon', 'IconLaptop', 'GenTeaser.SecondaryInfo'),
        text: text('infodetails: text', 'Find a job with MassHire JobQuest', 'GenTeaser.SecondaryInfo'),
        href: text('infodetails: href', 'https://jobquest.detma.org/jobquest/Default.aspx', 'GenTeaser.SecondaryInfo')
      }
    };
    return(
      <GenTeaser>
        <GenTeaser.Details>
          <GenTeaser.Title title={stateOrg.title} />
          <GenTeaser.Description description={stateOrg.description} />
          <GenTeaser.MoreInfo>
            <GenTeaser.PrimaryInfo>
              <GenTeaser.Phone {...stateOrg.phone} />
              <GenTeaser.InfoDetails {...stateOrg.locations} />
            </GenTeaser.PrimaryInfo>
            <GenTeaser.SecondaryInfo>
              <GenTeaser.Email {...stateOrg.email} />
              <GenTeaser.InfoDetails {...stateOrg.infodetails} />
            </GenTeaser.SecondaryInfo>
          </GenTeaser.MoreInfo>
        </GenTeaser.Details>
      </GenTeaser>
    );
  }, { info: GenTeaserDocs })
  .add('GenTeaser as Location', () => {
    const location = {
      title: {
        info: text('title: info', 'This is the info', 'GenTeaser.Title'),
        text: text('title: text', 'Haverhill RMV Service Center', 'GenTeaser.Title'),
        href: text('title: href', 'https://www.mass.gov/locations/haverhill-rmv-service-center', 'GenTeaser.Title'),
        showFileIcon: boolean('title: showFileIcon', false, 'GenTeaser.Title')
      },
      description: text('description', 'Aug 29, 2019 ... 229c Lincoln Avenue, Haverhill, MA 01830. directions · Start your application online See and compare wait times at RMV Service Centers in ...', 'GenTeaser.Description'),
      address: {
        address: text('address: address', '229c Lincoln Avenue<br>Haverhill, MA 01830<br>United States', 'GenTeaser.PrimaryInfo'),
        directionLink: text('address: directionLink', 'https://maps.google.com/?q=229c+Lincoln+Avenue%2C+Haverhill%2C+MA+01830', 'GenTeaser.PrimaryInfo'),
        details: text('address: details', 'details', 'Monday - Friday: 9:00 am-5:00 pm', 'GenTeaser.PrimaryInfo')
      }
    };

    return(
      <GenTeaser>
        <GenTeaser.Details>
          <GenTeaser.Title title={location.title} />
          <GenTeaser.Description description={location.description} />
          <GenTeaser.MoreInfo>
            <GenTeaser.PrimaryInfo>
              <GenTeaser.Address {...location.address} />
            </GenTeaser.PrimaryInfo>
          </GenTeaser.MoreInfo>
        </GenTeaser.Details>
      </GenTeaser>
    );
  }, { info: GenTeaserDocs })
  .add('GenTeaser as Event', () => {
    const startTime = new Date(2019, 7, 12, 13, 0, 0);
    const endTime = new Date(2019, 7, 17, 16, 0, 0);
    const event = {
      title: {
        info: text('title: info', 'This is the info', 'GenTeaser.Title'),
        text: text('title: text', 'Job Fair 2019', 'GenTeaser.Title'),
        href: text('title: href', 'https://www.mass.gov/locations/haverhill-rmv-service-center', 'GenTeaser.Title'),
        showFileIcon: boolean('title: showFileIcon', false, 'GenTeaser.Title')
      },
      orgs: text('orgs', 'MassHire Department of Career Services', 'GenTeaser.Orgs'),
      description: text('description', 'Jul 17, 2019 ... offered by. MassHire Department of Career Services. show 0 more. related to. MassHire Plymouth Career Center · MassHire ... Job Fair 2019.', 'GenTeaser.Description'),
      address: {
        address: text('address: address', 'Kingston Collection 101 Kingston Collection Way<br>Kingston MA 02364', 'GenTeaser.PrimaryInfo'),
        directionLink: text('address: directionLink', 'https://maps.google.com/?q=Kingston+Collection+101+Kingston+Collection+Way+Kingston+MA+02364', 'GenTeaser.PrimaryInfo'),
        details: text('address: details', 'details', '', 'GenTeaser.PrimaryInfo')
      },
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
    return(
      <GenTeaser>
        <GenTeaser.Details>
          <GenTeaser.Title title={event.title} />
          <GenTeaser.Emphasis>
            <GenTeaser.Orgs orgs={event.orgs} />
          </GenTeaser.Emphasis>
          <GenTeaser.Description description={event.description} />
          <GenTeaser.MoreInfo>
            <GenTeaser.PrimaryInfo>
              <GenTeaser.Event {...event.event} />
            </GenTeaser.PrimaryInfo>
            <GenTeaser.SecondaryInfo>
              <GenTeaser.Address {...event.address} />
            </GenTeaser.SecondaryInfo>
          </GenTeaser.MoreInfo>
        </GenTeaser.Details>
      </GenTeaser>
    );
  }, { info: GenTeaserDocs })
  .add('GenTeaser with Image', () => {
    const teaser = {
      stacked: boolean('image: stacked', false),
      align: select('image: align', ['top', 'center'], 'top'),
      title: {
        info: text('title: info', 'This is the info', 'GenTeaser.Title'),
        text: text('title: text', 'Job Fair 2019', 'GenTeaser.Title'),
        href: text('title: href', 'https://www.mass.gov/locations/haverhill-rmv-service-center', 'GenTeaser.Title'),
        showFileIcon: boolean('title: showFileIcon', false, 'GenTeaser.Title')
      },
      description: text('description', 'Jul 17, 2019 ... offered by. MassHire Department of Career Services. show 0 more. related to. MassHire Plymouth Career Center · MassHire ... Job Fair 2019.', 'GenTeaser.Description'),
      img: {
        src: 'https://via.placeholder.com/150',
        alt: '',
        shape: 'circular'
      }
    };
    return(
      <GenTeaser stacked={teaser.stacked} align={teaser.align}>
        <GenTeaser.Image img={teaser.img} />
        <GenTeaser.Details>
          <GenTeaser.Title title={teaser.title} />
          <GenTeaser.Description description={teaser.description} />
        </GenTeaser.Details>
      </GenTeaser>
    );
  }, { info: GenTeaserDocs });
