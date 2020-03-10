# Relationship Indicators \(Breadcrumbs\)

## Overview

This is a replacement for a traditional breadcrumb because many pages can be navigated to from multiple locations. Relationship indicators can either display the related organization\(s\) of a piece of content, or a service that a how-to belongs under.

![](../../.gitbook/assets/headertags.png)

### Accessibility & Best Practices

* Location: full width; should appear at the top of the page, directly below the header.
* Use this component when there is a “parent\(s\)” page for the piece of content.
* Do not use this component if there isn’t a “parent” to the page.
* When there are several relationship indicators, the amount that can fit on one line will display with a “show more” link until the mobile breakpoint.
* On mobile, up to three indicators would display/stack before displaying the "show more" link.

## Code

{% tabs %}
{% tab title="HTML" %}
```markup
<div class="ma__header-tags">
      <span>More about:</span>
    <div id="" class="ma__header-tags__terms js-header-tag-link">
          <a href="#">Term 1</a>
          <a href="#">Term 2</a>
          <a href="#">Term 3</a>
          <a href="#">Term 4</a>
          <a href="#">Term 5</a>
          <a href="#">Term 6</a>
        <button type="button" class="js-header-tag-button">
      <span>show more</span><span>show less</span>
    </button>
  </div>
</div>
```
{% endtab %}

{% tab title="React" %}
Not Available
{% endtab %}

{% tab title="Twig PL" %}
[Header Tags in Pattern Lab](https://mayflower.digital.mass.gov/patternlab/?p=molecules-header-tags)
{% endtab %}
{% endtabs %}

## Style

