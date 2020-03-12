# Tooltip

## Overview

Tooltip is often used to specify extra information about something when the user moves the mouse pointer over an element.

#### Disclaimer

Tooltip should not be used if possible. Since its content is hidden by default, how to access the content might not be obvious to some users. Use help text instead if possible.

### Accessibility & Best Practices

The label for the tool tip should be obvious to be an interactive element to the user.

Tooltip should be recognized by assisitive technologies. The user should be able to access its content either with keyboard, mouse or touch interaction.

## Code

{% tabs %}
{% tab title="HTML" %}
```markup
<div class="ma__tooltip">
  <div class="ma__tooltip__inner">
    <input
      id="{{ tooltip.controlId }}"
      type="checkbox"
      class="ma__tooltip__control"
      aria-label="{{ tooltip.info }}"
      aria-hidden="true" />
    <label
      for="{{ tooltip.controlId }}"
      class="ma__tooltip__open"
      aria-labelledby="{{ tooltip.controlId }}"
      aria-hidden="true">
      {{ tooltip.openText }}
      {% if tooltip.openIcon %}
        {{ icon(tooltip.openIcon) }}
      {% endif %}
    </label>
    <section class="ma__tooltip__modal {{ tooltip.location == 'above'? ma__tooltip__modal--above : 'ma__tooltip__modal--below' }}">
      <div class="ma__tooltip__container">
        <label
          for="{{ tooltip.controlId }}"
          class="ma__tooltip__close"
          tabindex="-1"
          aria-labelledby="{{ tooltip.controlId }}"
          aria-hidden="true">{{ tooltip.closeText }}</label>
        {% if tooltip.title %}
          {% set headingLevel = tooltip.level ? : 2 %}
          <h{{ headingLevel }} class="ma__tooltip__title">{{ tooltip.title }}</h{{ headingLevel }}>
        {% endif %}
        <div class="ma__tooltip__message">
          {{ tooltip.message }}
        </div>
      </div>
    </section>
  </div>
</div>
```
{% endtab %}

{% tab title="React" %}
Current Not Available
{% endtab %}

{% tab title="Twig PL" %}
[Tooltip in Pattern Lab](https://mayflower.digital.mass.gov/patternlab/?p=molecules-tooltip)
{% endtab %}
{% endtabs %}

## Style

