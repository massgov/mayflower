---
description: >-
  Guidelines around adding structured metadata to your website for search engine
  optimization and seamless consumption in the Commonwealth's search application
  (search.mass.gov).
---

# Search and Structured Data

| **Metatag** | **Description** | **Syntax** | **Example** | **Search.Mass.Gov** |
| --- | --- | --- | --- |
| mg\_organization | One or more entities responsible for making the resource available such as a publishing house, a government agency or department, or a corporate entity. | lowercase, comma separated list, slug with no special characters or spaces | `department-of-public-health,department-of-mental-health` | mg\_organization controls the ability to filter content by organization on search.mass.gov. mg\_organization is also rendered in the search result teaser for content in the category news and laws-regulations.  |
| category | A classification scheme that categorizes website pages into context and content specific groupings. The available options for this field are from a controlled vocabulary managed by the digital services team.  | lowercase, controlled vocabulary, one value only, slug with no special characters | `Controlled Vocabulary: news, laws-regulations, state-organizations, services` | The category metatags controls if content is rendered within a specific tab in the search application. For example, a press release with the metatag category  "news" will be included in the result set returned on the "News" tab in search. |
| mg\_date | A point in time  associated with the resource. | YYYYMMDD | `20180529` | mg\_date is used to sort content by date on everything but the  "All" tab in the search application. mg\_date is rendered in the search result teaser for content categorized as "laws-regulations"  and "news". mg\_date powers the advance search filter that allows users to restrict their search results to a specific date range. |

