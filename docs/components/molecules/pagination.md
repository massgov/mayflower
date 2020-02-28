# Pagination

## Overview

Pagination is used to aid users when navigating between a large number of items and should be leverage when there are too many items to show at once. This will be most useful in things like table listings, search results, and directories. What constitutes 'too many' can be influenced by factors like:

* Load time
* Amount of data in each entry
* Screen space

![](../../.gitbook/assets/pagination.png)

The pagination molecule includes:

* **Previous & Next Buttons**: Allow users to move forwards and backwards through a set of items/pages.
* **Pages**: Allow users to navigate to a specific page.
* **Spacers**: Spacer are used to truncate between pages, if numerous.

### Accessibility & Best Practices

## Code

### Pagination

{% tabs %}
{% tab title="HTML" %}
```markup
<div class="ma__pagination js-pagination">
  <div class="ma__pagination__container">
    <button class="ma__pagination__prev js-pagination-prev" type="button">
      Previous
    </button>
    <button class="ma__pagination__page js-pagination-page" type="button" data-page="1">1</button>
    <span class="ma__pagination__spacer">&hellip;</span>
    <button class="ma__pagination__page js-pagination-page" type="button" data-page="3">3</button>
    <button class="ma__pagination__page js-pagination-page is-active" type="button" data-page="4">4</button>
    <button class="ma__pagination__page js-pagination-page" type="button" data-page="5">5</button>
    <span class="ma__pagination__spacer">&hellip;</span>
    <button class="ma__pagination__page js-pagination-page" type="button" data-page="10">10</button>
    <button class="ma__pagination__next js-pagination-next" type="button">
      Next
    </button>
  </div>
</div>
```
{% endtab %}

{% tab title="React" %}
[Pagination in React](https://mayflower.digital.mass.gov/react/?knob-pagination.next.text=Next&knob-pagination.next.ariaLabel=Go%20to%20Next%20Search%20Results%20Page&knob-pagination.prev.text=Previous&knob-pagination.prev.ariaLabel=Go%20to%20Previous%20Search%20Results%20Page&knob-pagination.pages=[{"active"%3Afalse%2C"text"%3A"1"%2C"ariaLabel"%3A"Go%20to%20Search%20Results%20Page%201"}%2C{"active"%3Atrue%2C"text"%3A"spacer"}%2C{"active"%3Afalse%2C"text"%3A"3"%2C"ariaLabel"%3A"Go%20to%20Search%20Results%20Page%203"}%2C{"active"%3Atrue%2C"text"%3A"4"%2C"ariaLabel"%3A"Go%20to%20Search%20Results%20Page%204"}%2C{"active"%3Afalse%2C"text"%3A"5"%2C"ariaLabel"%3A"Go%20to%20Search%20Results%20Page%205"}%2C{"active"%3Afalse%2C"text"%3A"spacer"}%2C{"active"%3Afalse%2C"text"%3A"10"%2C"ariaLabel"%3A"Go%20to%20Search%20Results%20Page%2010"}]&selectedKind=molecules&selectedStory=Pagination&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel)
{% endtab %}

{% tab title="Twig PL" %}
[Pagination in Pattern Lab](https://mayflower.digital.mass.gov/?p=molecules-pagination)
{% endtab %}
{% endtabs %}

## Style

### Classnames

| **Name** | **Class Modifiers** |
| :--- | :--- |
| Container | `.ma__pagination .ma__pagination__container` |
| Next | `.ma__pagination__next` |
| Spacer | `.ma__pagination__spacer` |
| Page | `.ma__pagination__page` |
| Previous | `.ma__pagination__prev` |

