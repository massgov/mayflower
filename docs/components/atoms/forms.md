# Forms

There are many types of form elements, including inputs, text areas, checkboxes, and radio buttons. Visit the individual component pages for in-depth details of specific states and visuals.

## Text input as optional

{% tabs %}
{% tab title="Design" %}


![This is a variant of the Input Text pattern showing an example of an optional input.](../../.gitbook/assets/form_text_input_optional%20%281%29.png)
{% endtab %}

{% tab title="HTML" %}


```text
 <label 
  for="optional-input"
  class="ma__label ma__label--optional ">Text Input</label>
<input 
  class="ma__input " 
  name="optional-input" 
  id="optional-input" 
  type="text" 
  placeholder="Optional input" 
  data-type="text"
         />

```
{% endtab %}

{% tab title="Twig" %}


```text
<label 
  for="{{ helperText.inputId }}"
  aria-labelledby="{{ helperText.inputId }}"
  class="ma__helper-text">{{ helperText.message }}</label>
```
{% endtab %}
{% endtabs %}

```text

```

