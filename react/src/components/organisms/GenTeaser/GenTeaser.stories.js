import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import { action } from '@storybook/addon-actions';
import buttonOptions from 'MayflowerReactButtons/Button/Button.knobs.options';
import GenTeaser from './index';
import GenTeaserDocs from './GenTeaser.md';
import IconCatalog from 'MayflowerReactBase/Icon/IconCatalog';
import IconData from 'MayflowerReactBase/Icon/IconData';

export const GenTeaserExample = (args) => (
  <GenTeaser>
    <GenTeaser.Details>
      <GenTeaser.Title title={args.title} />
      <GenTeaser.Description description={args.description} />
    </GenTeaser.Details>
  </GenTeaser>
);
GenTeaserExample.storyName = 'Default';
GenTeaserExample.args = {
  title: {
    info: 'Title info here',
    text: 'Basic Search Result',
    href: '#',
    showFileIcon: false
  },
  description: 'A paragraph (from the Greek paragraphos, "to write beside" or "written beside") is a self-contained unit of a discourse in <b>writing dealing with a particular</b> point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose.'
};
export const GenTeaserDataCatalog = (args) => (
  <GenTeaser>
    <GenTeaser.Details>
      <GenTeaser.Stat>{args.stat}</GenTeaser.Stat>
      <GenTeaser.Eyebrow eyebrow={args.eyebrow} />
      <GenTeaser.Title title={args.title} />
      <GenTeaser.Emphasis>
        <GenTeaser.Date date={args.date} />
        <GenTeaser.Orgs orgs={args.orgs} />
      </GenTeaser.Emphasis>
      <GenTeaser.Description description={args.description} />
      <GenTeaser.SearchBar search={args.search} />
      <GenTeaser.SubLinks>
        {args.subLinks.map((item) => <GenTeaser.KeyAction {...item} />)}
      </GenTeaser.SubLinks>
    </GenTeaser.Details>
  </GenTeaser>
);
GenTeaserDataCatalog.storyName = 'GenTeaser as DataCatalog';
GenTeaserDataCatalog.args = {
  title: {
    info: 'Title info here',
    text: 'School and District Profiles',
    href: 'http://profiles.doe.mass.edu/',
    showFileIcon: false
  },
  description: 'The Massachusetts Department of Early and Seconday Education\'s school and district profile exploration tool.',
  subLinks: [{
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
  }],
  date: '01/01/2019',
  orgs: 'Massachusetts Department of Early and Seconday Education',
  search: {
    placeholder: 'search profiles.doe.mass.edu...',
    target: 'http://profiles.doe.mass.edu/search/search_new.aspx?leftNavId=11241',
    queryInput: '',
    id: 'jahdfjadh'
  },
  stat: (
    <span>
      Total Items:&nbsp;
      <strong>143</strong>
    </span>
  ),
  eyebrow: (
    <span>
      <IconCatalog width={16} height={16} />
      &nbsp;
      Data Catalog
    </span>
  )
};
export const GenTeaserDataSet = (args) => (
  <GenTeaser onClick={(e) => action(e)} onKeyDown={(e) => action(e)}>
    <GenTeaser.Details>
      <GenTeaser.Eyebrow eyebrow={args.eyebrow} />
      <GenTeaser.Button button={args.button} />
      <GenTeaser.Title title={args.title} />
      <GenTeaser.Emphasis>
        <GenTeaser.Date date={args.date} />
        <GenTeaser.Orgs orgs={args.orgs} />
      </GenTeaser.Emphasis>
      <GenTeaser.Description description={args.description} />
      <GenTeaser.Tags tags={args.tags} />
    </GenTeaser.Details>
  </GenTeaser>
);
GenTeaserDataSet.storyName = 'GenTeaser as Dataset';
GenTeaserDataSet.args = {
  title: {
    info: 'This is the info',
    text: 'Deer harvest data',
    href: 'https://www.mass.gov/service-details/deer-harvest-data',
    showFileIcon: false
  },
  description: 'Review the recent white-tailed deer harvest data before heading out to hunt. Though Massachusetts is the 3rd most densely populated state in the country, it is a state where quality deer can be found anywhere. MassWildlife biologists estimate that there are over 100,000 deer statewide. Estimated densities range from about 12-18 per square mile in western and central Massachusetts to over 50 deer per square mile on Martha\'s Vineyard and Nantucket Islands, and certain areas of eastern MA where hunting access is restricted.',
  eyebrow: (
    <span>
      <IconData width={16} height={16} />
      &nbsp;
      Dataset
    </span>
  ),
  date: '01/01/2019',
  orgs: 'Division of Fisheries and Wildlife, Executive Office of Energy and Environmental Affairs',
  tags: ['kml', 'xls', 'json', 'csv'],
  button: {
    text: 'Show Details',
    usage: 'secondary',
    theme: 'c-primary'
  }
};
GenTeaserDataSet.argTypes = {
  usage: {
    control: {
      type: 'select',
      options: buttonOptions.usage
    }
  },
  theme: {
    control: {
      type: 'select',
      options: buttonOptions.theme
    }
  }
};
export const GenTeaserDataDownload = (args) => (
  <GenTeaser>
    <GenTeaser.Details>
      <GenTeaser.Title title={args.title} />
      <GenTeaser.Emphasis>
        <GenTeaser.Date date={args.date} />
        <GenTeaser.Orgs orgs={args.orgs} />
      </GenTeaser.Emphasis>
      <GenTeaser.Description description={args.description} />
    </GenTeaser.Details>
  </GenTeaser>
);
GenTeaserDataDownload.storyName = 'GenTeaser as Data Download';
GenTeaserDataDownload.args = {
  title: {
    info: 'This is the info',
    text: '2015 Monthly Electric Customer Migration Data',
    href: 'https://www.mass.gov/files/documents/2018/06/15/2015%20Annual%20Electric%20Monthly%20Migration-Complete.xlxs',
    icon: 'IconDownload',
    showFileIcon: true,
    details: '(30 MB)'
  },
  description: 'Jun 15, 2018 <b>...</b> <b>Annual Electric</b>. <b>Migration</b>. 2,015,302. 18,322,632,032. 758,696 .... <b>Monthly</b>  Competitive Supply Load Served (2015). State. Lg C &amp; I. Med C &amp; I.',
  date: 'Updated on 9/06/2019',
  orgs: 'Department of Public Health, Executive Office of Health and Human Services'
};
export const GenTeaserNews = (args) => (
  <GenTeaser>
    <GenTeaser.Details>
      <GenTeaser.Eyebrow eyebrow={args.eyebrow} />
      <GenTeaser.Title title={args.title} />
      <GenTeaser.Emphasis>
        <GenTeaser.Date date={args.date} />
        <GenTeaser.Orgs orgs={args.orgs} />
      </GenTeaser.Emphasis>
      <GenTeaser.Description description={args.description} />
    </GenTeaser.Details>
  </GenTeaser>
);
GenTeaserNews.storyName = 'GenTeaser as News';
GenTeaserNews.args = {
  title: {
    info: 'This is the info',
    text: 'State public health officials announce two new confirmed human cases of EEE',
    href: 'https://www.mass.gov/news/state-public-health-officials-announce-two-new-confirmed-human-cases-of-eee',
    showFileIcon: false
  },
  eyebrow: 'Press Release',
  description: 'The Massachusetts Department of Public Health (DPH) today announced that laboratory testing has confirmed two new cases of Eastern ...',
  date: '9/06/2019',
  orgs: 'Bureau of Substance Addiction Services, Department of Mental Health, Department of Public Health, Executive Office of Health and Human Services'
};
export const GenTeaserLawsRegs = ({regulation, law}) => (
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
          <GenTeaser.KeyAction
            text="Search Sections within this Chapter"
            href="http://malegislature.gov/Laws/GeneralLaws/PartI/TitleXV/Chapter93"
          />
          <GenTeaser.KeyAction
            text="Search for General Laws"
            href="http://malegislature.gov/Laws/GeneralLaws"
          />
        </GenTeaser.SubLinks>
      </GenTeaser.Details>
    </GenTeaser>
  </React.Fragment>
);
GenTeaserLawsRegs.storyName = 'GenTeaser  as Laws and Regs';
GenTeaserLawsRegs.args = {
  regulation: {
    title: {
      info: 'This is the info',
      text: '101 CMR 350.00: Home Health Services',
      href: 'https://www.mass.gov/regulations/101-CMR-35000-home-health-services',
      showFileIcon: false
    },
    eyebrow: 'Regulation',
    description: 'This is an unofficial version of Commonwealth regulations and is posted here for the convenience of the public. It is not an official statement of the regulations.',
    date: '7/12/2019',
    orgs: 'Executive Office of Health and Human Services'
  },
  law: {
    title: {
      info: 'This is the info',
      text: 'General Law - Part I, Title XV, Chapter 93, Section 78',
      href: 'https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXV/Chapter93/Section78',
      showFileIcon: false
    },
    eyebrow: 'General Law',
    description: "''Contract for health club services'', a contract which has the primary purpose of providing a person with the right to use the facilities of a health club or with ..",
    date: '7/13/2019',
    orgs: 'Massachusetts Legislature'
  }
};
export const GenTeaserServices = (args) => (
  <GenTeaser>
    <GenTeaser.Details>
      <GenTeaser.Title title={service.title} />
      <GenTeaser.Description description={service.description} />
      <GenTeaser.SubLinks>
        <GenTeaser.KeyAction
          text="Apply for SNAP benefits (food stamps)"
          href="https://www.mass.gov/how-to/apply-for-snap-benefits-food-stamps"
        />
        <GenTeaser.KeyAction
          text="Snap Outreach For Partners"
          href="https://www.mass.gov/service-details/snap-outreach-for-partners"
        />
        {service.subLinks.map((link) => <GenTeaser.KeyAction {...link} />)}
      </GenTeaser.SubLinks>
    </GenTeaser.Details>
  </GenTeaser>
);
GenTeaserServices.storyName = 'GenTeaser as Services';
GenTeaserServices.args = {
  title: {
    info: 'This is the info',
    text: 'SNAP outreach',
    href: 'https://www.mass.gov/snap-outreach',
    showFileIcon: false
  },
  eyebrow: 'General Law',
  description: 'If you are a client, you can get help with you SNAP case and benefits through a SNAP outreach partner. You can find SNAP outreach ... Contact Information ...'
};
export const GenTeaserStateOrg = ({ stateOrg }) => (
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
GenTeaserStateOrg.storyName = 'GenTeaser (State Org)';
GenTeaserStateOrg.args = {
  stateOrg: {
    title: {
      info: 'This is the info',
      text: 'MassHire Department of Career Services',
      href: 'https://www.mass.gov/orgs/masshire-department-of-career-services',
      showFileIcon: false
    },
    description: 'The MassHire Department of Career Services provides job seekers with a variety of job assistance services, ... How to Access State Jobs - Information Session.',
    phone: {
      number: '6176265300',
      details: '8:30 a.m. - 4:30 p.m. weekdays'
    },
    email: {
      email: 'DCSFeedback@MassMail.State.MA.US'
    },
    locations: {
      icon: 'IconMarker',
      href: 'https://www.mass.gov/orgs/masshire-department-of-career-services/locations',
      text: 'MassHire Department of Career Services Locations'
    },
    infodetails: {
      icon: 'IconLaptop',
      text: 'Find a job with MassHire JobQuest',
      href: 'https://jobquest.detma.org/jobquest/Default.aspx'
    }
  }
};
export const GenTeaserLocation = ({ location }) => (
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
GenTeaserLocation.storyName = 'GenTeaser as Location';
GenTeaserLocation.args = {
  location: {
    title: {
      info: 'This is the info',
      text: 'Haverhill RMV Service Center',
      href: 'https://www.mass.gov/locations/haverhill-rmv-service-center',
      showFileIcon: false
    },
    description: 'Aug 29, 2019 ... 229c Lincoln Avenue, Haverhill, MA 01830. directions · Start your application online See and compare wait times at RMV Service Centers in ...',
    address: {
      address: '229c Lincoln Avenue<br>Haverhill, MA 01830<br>United States',
      directionLink: 'https://maps.google.com/?q=229c+Lincoln+Avenue%2C+Haverhill%2C+MA+01830',
      details: 'details'
    }
  }
};
export const GenTeaserEvent = ({event}) => (
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
GenTeaserEvent.storyName = 'GenTeaser as Event';
GenTeaserEvent.args = {
  event: {
    title: {
      info: 'This is the info',
      text: 'Job Fair 2019',
      href: 'https://www.mass.gov/locations/haverhill-rmv-service-center',
      showFileIcon: false
    },
    orgs: 'MassHire Department of Career Services',
    description: 'Jul 17, 2019 ... offered by. MassHire Department of Career Services. show 0 more. related to. MassHire Plymouth Career Center · MassHire ... Job Fair 2019.',
    address: {
      address: 'Kingston Collection 101 Kingston Collection Way<br>Kingston MA 02364',
      directionLink: 'https://maps.google.com/?q=Kingston+Collection+101+Kingston+Collection+Way+Kingston+MA+02364',
      details: 'details'
    },
    event: {
      startDate: new Date(2019, 7, 12, 13, 0, 0),
      endDate: new Date(2019, 7, 17, 16, 0, 0),
      details: 'First come first serve.',
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
  }
};
export const GenTeaserImage = ({ teaser }) => (
  <GenTeaser stacked={teaser.stacked} align={teaser.align}>
    <GenTeaser.Image img={teaser.img} />
    <GenTeaser.Details>
      <GenTeaser.Title title={teaser.title} />
      <GenTeaser.Description description={teaser.description} />
    </GenTeaser.Details>
  </GenTeaser>
);
GenTeaserImage.storyName = 'GenTeaser with Image';
GenTeaserImage.args = {
  teaser: {
    stacked: false,
    align: 'top',
    title: {
      info: 'This is the info',
      text: 'Job Fair 2019',
      href: 'https://www.mass.gov/locations/haverhill-rmv-service-center',
      showFileIcon: false
    },
    description: 'Jul 17, 2019 ... offered by. MassHire Department of Career Services. show 0 more. related to. MassHire Plymouth Career Center · MassHire ... Job Fair 2019.',
    img: {
      src: 'https://via.placeholder.com/150',
      alt: '',
      shape: 'circular'
    }
  }
};
GenTeaserImage.argTypes = {
  align: {
    control: {
      type: 'select',
      options: ['top', 'center']
    }
  }
};

export default {
  title: 'organisms/GenTeaser',
  component: GenTeaser,
  parameters: {
    docs: {
      page: () => <StoryPage Description={GenTeaserDocs} />
    }
  }
};