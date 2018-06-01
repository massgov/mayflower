---
description: >-
  Guidelines around adding structured metadata to your website for search engine
  optimization and seamless consumption in the Commonwealth's search application
  (search.mass.gov).
---

# Search and Structured Data

## Metatag Dictionary

### Descriptions

| **Metatag** | **Description** |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| mg\_organization | One or more entities responsible for making the resource available such as a publishing house, a government agency or department, or a corporate entity. |
| category | A classification scheme that categorizes content into context specific groupings. The available options for this field are from a controlled vocabulary managed by the digital services team. Refer to the [controlled vocabulary for category](search-and-structured-data.md#category-vocabulary). |
| mg\_date | A point in time  associated with the resource. |
| mg\_type | A very specific classification scheme that categorizes content into context specific types. The available options for this field are from a controlled vocabulary managed by the digital services team.  Refer to the [mg\_type controlled vocabulary](search-and-structured-data.md#mg_type-vocabulary). |
| mg\_phone\_number | The main phone number for contacting a specific entity. |
| mg\_contact\_details | Contact details related to the main phone number such as hours of operation. |
| mg\_location\_listing\_url | An object containing the name and url to access a list of locations for an entity. |
| mg\_online\_contact\_url | An object containing the name and email/url  for contacting the entity. |
| mg\_key\_actions | An object indicating the key actions related to a government service page. |

### Syntax and Examples

| **Metatag** | **Syntax** | **Example** |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| mg\_organization | lowercase, comma separated list, slug with no special characters or spaces | `department-of-public-health,department-of-mental-health` |
| category | lowercase, controlled vocabulary, one value only, slug with no special characters | `news` |
| mg\_date | YYYYMMDD | `20180528` |
| mg\_type | lowercase, controlled vocabulary, one value only, slug with no special characters | `executive-order` |
| mg\_phone\_number | XXX-XXX-XXXX | `617-557-1000` |
| mg\_contact\_details | string | `Hours: Mon. - Fri., 8:30 a.m. - 4:30 p.m.` |
| mg\_location\_listing\_url | structure object with schema:  \[{ "name": "Example",  "url": "[https://example.gov](https://example.gov)" }\] | `[{ "name": "Massachusetts Supreme Judicial Court Locations", "url": "https:\/\/www.mass.gov\/orgs\/massachusetts-supreme-judicial-court\/locations" }]` |
| mg\_online\_contact\_url | structured object with schema: \[{ "name": "email@mass.gov", "url": email@mass.gov" }\] | `[{ "name": "engineerboard@state.ma.us", "url": "engineerboard@state.ma.us" }]` |
| mg\_key\_actions | structured object with schema: \[{ "name": "key action 1", "url": "[https://mass.gov/keyaction1](https://mass.gov/keyaction1)" }\] | `[{ "name": "Compare plans at MassHealthChoices.com", "url": "https:\/\/masshealthchoices.com\/"},{"name": "Enroll in a health plan", "url": "https:\/\/www.mass.gov\/how-to\/enroll-in-a-masshealth-health-plan-individuals-and-families-younger-than-65" }]` |

### Controlled Vocabularies

#### category vocabulary

| **Vocabulary** |
| --- | --- |
| news, laws-regulations, services, state-organizations, data |

#### mg\_type vocabulary

| **Category** | **Vocabulary** |
| --- | --- | --- |
| news | press-release, press-statement, news, blog-post, speech |
| laws-regulations | general-law, session-law, executive-order, regulation, advisory, policy-advisory, policy-statement, administrative-bulletin, technical-information-release, directive, letter-ruling, memorandum, industry-letter, circular-letter, regulatory-bulletin, administrative-procedure, advisory-ruling, decision, ruling, opinion, settlement, consent-order, cease-directive, cease-order, consent-agreement, temporary-order-to-cease-and-desist, order, temporary-order, rules-of-civil-procedure, rules-of-criminal-procedure, rules-of-appellate-procedure, districtmunicipal-courts-supplemental-rules-of-civil-procedure, rules-of-domestic-relations-procedure, districtmunicipal-courts-supplemental-rules-of-criminal-procedure, trial-court-rules, superior-court-rules, supreme-judicial-court-rules, appeals-court-rules, districtmunicipal-court-rules, probate-and-family-court-rules, housing-court-rules, juvenile-court-rules, land-court-rules, guide-to-evidence, electronic-filing-rules, professional-conduct-rules, districtmunicipal-courts-rules-for-probation-violation-proceedings, special-rules-of-the-district-court, probate-and-family-court-uniform-practices, supplemental-rules-of-the-probate-and-family-court, rules-governing-persons-authorized-to-admit-to-bail-out-of-court, districtmunicipal-courts-rules-of-criminal-procedure, office-of-jury-commissioner-regulations, districtmunicipal-courts-rules-for-appellate-division-appeals, law-library |

### Integration with Search.Mass.Gov

#### Advanced Search Filters

| **Metatag** | **Filter Functionality** | **Example** |
| --- | --- |
| mg\_organization | Controls the ability to filter content by organization on search.mass.gov. | ![Example Screenshot of the Organization Filter](../.gitbook/assets/screen-shot-2018-05-29-at-12.23.57-pm.png) |
| category | Controls if content is rendered within a specific tab in the search application. | ![Example Screenshot of the Search Tabs](../.gitbook/assets/screen-shot-2018-05-29-at-12.23.57-pm.png) |
| mg\_date | Powers the advanced search filter that allows users to restrict their search results to a specific date range. | ![Example Screenshot of the Advanced Filters include the Date Range Filter](../.gitbook/assets/screen-shot-2018-05-29-at-12.23.49-pm.png) |
| mg\_type | Powers the advanced search filter that allows users to restrict their search results to a specific type of content. | ![Example Screenshot of the Advanced Filters including the Type Filter](../.gitbook/assets/screen-shot-2018-05-29-at-12.23.49-pm.png) |

#### Sort

| **Metatag** | **Sort Functionality** | **Example** |
| --- | --- |
| mg\_date | Used when sorting by date on the "news" and "laws-regulations" tabs. | ![Example Screenshot of Sort by Date Functionality](../.gitbook/assets/screen-shot-2018-05-30-at-10.10.32-am.png) |

#### Search Result Teasers

| **Metatag** | **Teaser Functionality** | **Example** |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| mg\_organization | Rendered for content in the category news and laws-regulations. | ![Example Results Teaser with Organization Details Rendered in Emphasized Text](../.gitbook/assets/screen-shot-2018-05-29-at-4.36.48-pm.png) |
| mg\_date | Rendered for content categorized as "laws-regulations"  and "news". | ![Example Results Teaser with Date Rendered in Emphasized Text](../.gitbook/assets/screen-shot-2018-05-29-at-4.36.48-pm.png) |
| mg\_type | Rendered for content categorized as "laws-regulations"  and "news". | ![Example Results Teaser with Type Rendered in the Eyebrow](../.gitbook/assets/screen-shot-2018-05-29-at-4.36.48-pm.png) |
| mg\_phone\_number | Rendered in teaser for content categorized as "state-organizations" | ![Example Results Teaser with Phone Number Rendered in the Contact Section](../.gitbook/assets/screen-shot-2018-05-30-at-10.39.21-am.png) |
| mg\_contact\_details | Rendered in teaser for content categorized as "state-organizations" | ![Example Results Teaser with Contact Details Rendered in the Contact Section](../.gitbook/assets/screen-shot-2018-05-30-at-10.39.21-am.png) |
| mg\_location\_listing\_url | Rendered in teaser for content categorized as "state-organizations" | ![Example Results Teaser with the Location Listing Rendered](../.gitbook/assets/screen-shot-2018-05-30-at-10.39.21-am.png) |
| mg\_online\_contact\_url | Rendered in teaser for content categorized as "state-organizations" | ![Example Results Teaser with the Online Contacts Rendered](../.gitbook/assets/screen-shot-2018-05-30-at-10.39.21-am.png) |
| mg\_key\_actions | Rendered in teaser for content categorized as "state-organizations" or "services" | ![Example Results Teaser with Key Actions Rendered](../.gitbook/assets/screen-shot-2018-05-30-at-10.38.50-am.png) |

## Adding Structured Metatags to your Website

There are two options for including structured markup in your website for consumption in the [search.mass.gov](https://search.mass.gov) application \(1\) adding page level metatags into the header of each page and \(2\) adding structured xml markup to your sitemap.

### Page Level Metatags

```text

```

### Sitemap Level Metatags

If you don't want to include PageMap data in the HTML of your pages, you can add PageMap data to a Sitemap. In order for these to be discoverable by search.mass.gov,  submit your sitemap via the Google Search Console Sitemaps tool. One benefit of leveraging the sitemap option, is that you can include metatags for not html content such as pdfs or documents. Below, you can view an example sitemap including pagemap metatags.

```text
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
   <url>
      <loc>https:///mass.gov/page/example-one</loc>
      <lastmod>2018-06-16T01:38Z</lastmod>
      <changefreq>weekly</changefreq>
      <PageMap xmlns="http://www.google.com/schemas/sitemap-pagemap/1.0">
         <DataObject type="metatags">
            <Attribute name="mg_organization">department-of-environmental-protection,department-of-conservation-and-recreation</Attribute>
            <Attribute name="mg_date">20180530</Attribute>
            <Attribute name="category">laws-regulations</Attribute>
            <Attribute name="mg_type">regulation</Attribute>
         </DataObject>
      </PageMap>
   </url>
   <url> 
      <loc>https://mass.gov/page/example-two.pdf</loc> 
      <lastmod>2018-06-16T01:38Z</lastmod> 
      <changefreq>daily</changefreq> 
      <PageMap xmlns="http://www.google.com/schemas/sitemap-pagemap/1.0"> 
         <DataObject type="metatags"> 
            <Attribute name="mg_organization">department-of-public-health,department-of-mental-health</Attribute>
            <Attribute name="mg_date">20180430</Attribute>
            <Attribute name="category">news</Attribute>
            <Attribute name="mg_type">press-release</Attribute>
         </DataObject> 
      </PageMap>
   </url> 
</urlset>
```

