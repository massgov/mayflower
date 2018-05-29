---
description: >-
  Guidelines around adding structured metadata to your website for search engine
  optimization and seamless consumption in the Commonwealth's search application
  (search.mass.gov).
---

# Search and Structured Data

## Metatag Dictionary

| **Metatag** | **Description** | **Syntax** | **Example** | **Search.Mass.Gov** |
| --- | --- | --- | --- | --- |
| mg\_organization | One or more entities responsible for making the resource available such as a publishing house, a government agency or department, or a corporate entity. | lowercase, comma separated list, slug with no special characters or spaces | `department-of-public-health,department-of-mental-health` | mg\_organization controls the ability to filter content by organization on search.mass.gov. mg\_organization is also rendered in the search result teaser for content in the category news and laws-regulations.  |
| category | A classification scheme that categorizes content into context specific groupings. The available options for this field are from a controlled vocabulary managed by the digital services team.  | lowercase, controlled vocabulary, one value only, slug with no special characters | `Controlled Vocabulary: news, laws-regulations, state-organizations, services, data` | The category metatags controls if content is rendered within a specific tab in the search application. For example, a press release with the metatag category  "news" will be included in the result set returned on the "News" tab in search. |
| mg\_date | A point in time  associated with the resource. | YYYYMMDD | `20180529` | mg\_date is used to sort content by date on everything but the  "All" tab in the search application. mg\_date is rendered in the search result teaser for content categorized as "laws-regulations"  and "news". mg\_date powers the advance search filter that allows users to restrict their search results to a specific date range. |
| mg\_type | A very specific classification scheme that categorizes content into context specific types. The available options for this field are from a controlled vocabulary managed by the digital services team.   | lowercase, controlled vocabulary, one value only, slug with no special characters | `executive-order`\[full controlled vocabulary for mg\_type\]\(\#mg\_type\)  |  |

### Controlled Vocabularies

{% page-ref page="search-and-structured-data.md" %}

#### mg\_type

| **category** | **vocabulary** |
| --- | --- | --- |
| news | press-release, press-statement, news, blog-post, speech |
| laws-regulations | general-law, session-law, executive-order, regulation, advisory, policy-advisory, policy-statement, administrative-bulletin, technical-information-release, directive, letter-ruling, memorandum, industry-letter, circular-letter, regulatory-bulletin, administrative-procedure, advisory-ruling, decision, ruling, opinion, settlement, consent-order, cease-directive, cease-order, consent-agreement, temporary-order-to-cease-and-desist, order, temporary-order, rules-of-civil-procedure, rules-of-criminal-procedure, rules-of-appellate-procedure, districtmunicipal-courts-supplemental-rules-of-civil-procedure, rules-of-domestic-relations-procedure, districtmunicipal-courts-supplemental-rules-of-criminal-procedure, trial-court-rules, superior-court-rules, supreme-judicial-court-rules, appeals-court-rules, districtmunicipal-court-rules, probate-and-family-court-rules, housing-court-rules, juvenile-court-rules, land-court-rules, guide-to-evidence, electronic-filing-rules, professional-conduct-rules, districtmunicipal-courts-rules-for-probation-violation-proceedings, special-rules-of-the-district-court, probate-and-family-court-uniform-practices, supplemental-rules-of-the-probate-and-family-court, rules-governing-persons-authorized-to-admit-to-bail-out-of-court, districtmunicipal-courts-rules-of-criminal-procedure, office-of-jury-commissioner-regulations, districtmunicipal-courts-rules-for-appellate-division-appeals, law-library |



