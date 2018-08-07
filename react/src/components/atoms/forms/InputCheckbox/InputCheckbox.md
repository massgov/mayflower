### Description

The input checkbox allows users to select one or more values from a set list. It is best to use checkboxes when the user needs to be able to see all available options at a single time.

### Usage Guidelines & Accessibility

* Related checkboxes should be grouped in a `<fieldset>` with a `legend` to provide context about the checkbox grouping. If you are using a single checkbox, you do not need to wrap it in a `<fieldset>`
* Each `<input>` needs a unique `id` value. The label for this `<input>` should indicate, via the `for` attribute the id of the input the label is associated with.

### Variables

~~~
inputId:
  name: 
    string / required
  id: 
    string / required
  value: 
    string or number / required 
  label: 
    string / required
  checked: 
    boolean / default false
  required: 
    boolean / default false
  outline: 
    boolean / default false
  onChange: 
    function
  disabled: 
    boolean / default false
~~~
### Style

Input Checkboxes can be styles as a outlined button or a simple checkbox.

|Name|scss modifier|
|--|--|
|Base|.ma__input-checkbox|
|Outline|.ma__input-checkbox--outline|
