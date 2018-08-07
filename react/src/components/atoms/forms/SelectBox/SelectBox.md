### Description

Select box is a common form component used a single option should be selected from a list of possibilities. The select box should be used if you are constrained by space or if you have more than 3 and less than 12 selectable options. A group of radio buttons is preferred if you are able to show all available options to users. If you have a large number of selectable options, users should be able provided with typeahead functionality - included in the input text typeahead component.

### Usage Guidelines & Accessibility

* The list of options should be sorted in a logical manner.
* Create simple, clear and used options.
* Provide a clear label.

### Variables

~~~
inputId:
  label: string / required
  stackLabel: boolean
  required: boolean / default false=
  id: string / required
  options: json / required
     value: string,
     text: string
  onChangeCallback: function
  className: string
  selected: string
  disabled: boolean
  errorMsg: string 
  errorDisplay: boolean
~~~

### Style

|Name|scss modifier|
|--|--|
|Base|.ma__select-box__field|
|Disabled|.ma__select-box__field--disabled|
|Inline|.ma__select-box__field--inline|
|Error|.has-error|
