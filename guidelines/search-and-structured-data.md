---
description: >-
  Guidelines around adding structured metadata to your website for search engine
  optimization and seamless consumption in the Commonwealth's search application
  (search.mass.gov).
---

# Search and Structured Data

## Metatag Dictionary

### Descriptions

| **Metatag** | **Description** | **Syntax** | **Example** |
| --- | --- | --- | --- | --- |
| mg\_organization | One or more entities responsible for making the resource available such as a publishing house, a government agency or department, or a corporate entity. | lowercase, comma separated list, slug with no special characters or spaces | `department-of-public-health,department-of-mental-health` |
| category | A classification scheme that categorizes content into context specific groupings. The available options for this field are from a controlled vocabulary managed by the digital services team.  | lowercase, controlled vocabulary, one value only, slug with no special characters | `news` [\( refer to the controlled vocabulary for category \)](search-and-structured-data.md#category-vocabulary) |
| mg\_date | A point in time  associated with the resource. | YYYYMMDD | `20180529` |
| mg\_type | A very specific classification scheme that categorizes content into context specific types. The available options for this field are from a controlled vocabulary managed by the digital services team.   | lowercase, controlled vocabulary, one value only, slug with no special characters | `executive-order` [`(`refer to the controlled vocabulary for mg\_type \)](search-and-structured-data.md#mg_type) |

### Controlled Vocabularies

#### category vocabulary

| **vocabulary** |
| --- | --- |
| news, laws-regulations, services, state-organizations, data |

#### mg\_type vocabulary

| **category** | **vocabulary** |
| --- | --- | --- |
| news | press-release, press-statement, news, blog-post, speech |
| laws-regulations | general-law, session-law, executive-order, regulation, advisory, policy-advisory, policy-statement, administrative-bulletin, technical-information-release, directive, letter-ruling, memorandum, industry-letter, circular-letter, regulatory-bulletin, administrative-procedure, advisory-ruling, decision, ruling, opinion, settlement, consent-order, cease-directive, cease-order, consent-agreement, temporary-order-to-cease-and-desist, order, temporary-order, rules-of-civil-procedure, rules-of-criminal-procedure, rules-of-appellate-procedure, districtmunicipal-courts-supplemental-rules-of-civil-procedure, rules-of-domestic-relations-procedure, districtmunicipal-courts-supplemental-rules-of-criminal-procedure, trial-court-rules, superior-court-rules, supreme-judicial-court-rules, appeals-court-rules, districtmunicipal-court-rules, probate-and-family-court-rules, housing-court-rules, juvenile-court-rules, land-court-rules, guide-to-evidence, electronic-filing-rules, professional-conduct-rules, districtmunicipal-courts-rules-for-probation-violation-proceedings, special-rules-of-the-district-court, probate-and-family-court-uniform-practices, supplemental-rules-of-the-probate-and-family-court, rules-governing-persons-authorized-to-admit-to-bail-out-of-court, districtmunicipal-courts-rules-of-criminal-procedure, office-of-jury-commissioner-regulations, districtmunicipal-courts-rules-for-appellate-division-appeals, law-library |

### Search.Mass.Gov

| **metatag** | **filters** | **sort** | **search result teaser** |
| --- | --- | --- | --- | --- |
| mg\_organization | Controls the ability to filter content by organization on search.mass.gov.  | Not Used | Rendered for content in the category news and laws-regulations.  |
| category | Controls if content is rendered within a specific tab in the search application. | Not Used | Not Used |
| mg\_date | Powers the advanced search filter that allows users to restrict their search results to a specific date range. | Used when sorting by date on everything but the  "All" tab in the search application | Rendered for content categorized as "laws-regulations"  and "news". |
| mg\_type | Powers the advanced search filter that allows users to restrict their search results to a specific type of content. | Not User | Rendered for content categorized as "laws-regulations"  and "news". |

