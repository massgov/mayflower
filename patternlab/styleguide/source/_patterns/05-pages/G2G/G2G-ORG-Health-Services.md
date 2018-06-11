---
title: Org Landing Page
---
Description: a page pattern representing those patterns which could be used on an org landing page content type

## State: alpha

## Can Contain
- [@organisms/by-template/page-banner](/?p=organisms-page-banner)
- [@organisms/by-template/action-header](/?p=organisms-action-header)
- [@organisms/by-author/stack-row-section](/?p=organisms-stack-row-section)
    - Stack Row:
         - Page Content: 
           - [@organisms/by-author/rich-text](/?p=organisms-rich-text)
         - Sidebar Content:
           - [@atoms/headings/sidebar-heading](/?p=atoms-sidebar-heading)
           - [@molecules/icon-links](/?p=molecules-icon-links)
    - Stack Row:
         - Page Content: 
            - [@organisms/by-author/action-finder](/?p=organisms-action-finder)
           - [@organisms/by-author/mapped-locations](/?p=organisms-mapped-locations)
           - [@organisms/by-author/sections-three-up](/?p=organisms-sections-three-up)
           - [@organisms/by-author/link-list](/?p=organisms-link-list)
- [@meta/schema/government-organization](/?p=meta-government-organization)
 
## Structured Data

### Schema.org property / Mayflower Schema variables map
~~~
{
 "@context": "http://schema.org/",
 "@id": "{{ governmentOrganization.url }}/#governmentOrganization",
 "@type": "governmentOrganization",
 "name": "{{ governmentOrganization.name }}",
 "memberOf": {
   "@id": "{{ governmentOrganization.memberOf.id }}"
 },
 "alternateName": "{{ governmentOrganization.alternateName }}",
 "disambiguatingDescription": "{{ governmentOrganization.disambiguatingDescription }}",
 "description": "{{ governmentOrganization.description }}",
 "logo": "{{ governmentOrganization.logo }}",
 "url": "{{ governmentOrganization.url }}",
 "address": "{{ governmentOrganization.contactInfo.address }}",
 "telephone": "{{ governmentOrganization.contactInfo.telephone }}",
 "faxNumber": "{{ governmentOrganization.contactInfo.faxNumber }}",
 "email": "{{ governmentOrganization.contactInfo.email }}",
 "sameAs": [
     "governmentOrganization.sameAs[INDEX]"
 ]
}
~~~
 
### Schema.org property / Mayflower organisms variable map
~~~
Schema.org property name = Mayflower (.json) variable

schema.governmentOrganization.name = pageBanner.title
schema.governmentOrganization.memberOf.id = {{urlDomain}} + "/#organization"
schema.governmentOrganization.alternateName = pageBanner.titleSubText
schema.governmentOrganization.disambiguatingDescription = actionHeader.pageHeader.subTitle
schema.governmentOrganization.description = stackedRowSections[0].pageContent[0].data.rteElements[1].data.paragraph.text
schema.governmentOrganization.logo = actionHeader.widgets[0].data.image.src
schema.governmentOrganization.url = {{ urlDomain }}{{ urlPath }}
schema.governmentOrganization.contactInfo.address = actionHeader.contactUs.groups[FIRST_INDEX]items[FIRST_INDEX].value where .type = "address"
schema.governmentOrganization.contactInfo.telephone = "+" + actionHeader.contactUs.groups[FIRST_INDEX]items[FIRST_INDEX].link WHERE .type = "phone"
schema.governmentOrganization.contactInfo.faxNumber = "+" + actionHeader.contactUs.groups[FIRST_INDEX]items[FIRST_INDEX].link WHERE .type = "fax"
schema.governmentOrganization.contactInfo.email = "+" + actionHeader.contactUs.groups[FIRST_INDEX]items[FIRST_INDEX].link WHERE .type = "online" && is email address?
schema.governmentOrganization.sameAs = [
 stackedRowSections[0].sideBar[1].data.iconLinks.items[INDEX].link.href
]     
~~~

### Rendered json+ld data object
~~~
<script type="application/ld+json">
{
 "@context": "http://schema.org/",
 "@id": "https://mayflower.digital.mass.gov/?p=templates-org-landing-page/#governmentOrganization",
 "@type": "governmentOrganization",
 "name": "Executive Office of Health and Human Services",
 "memberOf": {
   "@id": "http://mayflower.digital.mass.gov/#organization"
 },
 "alternateName": "EOHHS",
 "disambiguatingDescription": "EOHHS oversees health and general support services to help people in Massacheusetts - from young children to seniors - meet basic needs.",
 "description": "The Executive Office of Health and Human Services is responsible through its member agencies for the delivery of a wide range of services to people with financial, health, social, protective, rehabilitation, and correctional needs. Online information is available for consumers, providers, researchers, and social workers to find out what types of assistance are offered.",
 "logo": "https://mayflower.digital.mass.gov/assets/images/images/placeholder/230x130.png",
 "url": "https://mayflower.digital.mass.gov/?p=templates-org-landing-page",
 "address": "One Ashburton Place, 11th Floor, Boston, MA 02108",
 "telephone": "+14134994262",
 "faxNumber": "+14134994266",
 "email": "email@email.com",
 "sameAs": [
   "https://twitter.com/MassHHS",
   "https://www.flickr.com/photos/mass_hhs/",
   "https://blog.mass.gov/hhs"
 ]
}
</script>
~~~

## Resources
- [schema.org](https://schema.org/)
    - [schema: Government Organization](https://schema.org/GovernmentOrganization)  
    - [schema: Government Office](https://schema.org/GovernmentOffice)  
    - [schema: Government Service](https://schema.org/GovernmentService)  
    - [schema: Service Channel](https://schema.org/ServiceChannel)
    - [schema: Offer Catalog](https://schema.org/OfferCatalog)
- [(google) structured data testing tool](https://search.google.com/structured-data/testing-tool)
- [structured data linting tool](http://linter.structured-data.org/)
- [structured data playground](http://json-ld.org/playground/index.html)
- [org page schema.org playground](http://tinyurl.com/gn72pa4)
- [Some context for civic service vocabulary being added to schema.org](https://www.w3.org/wiki/images/0/03/Services_for_schema.org_%28DRAFT_2013-06-27%29.pdf)

## Future iterations
Once we've added contacts, locations to the Org Page then we can add address and contact point information.

Once we've got a better idea of how to represent topics, subtopics, services and have created content types for these as well as how-tos and guides, then we can add offer catalogs to represent those.

Once we've determined if / how to show a relationship between organizations then we can add information about that here as well.
 