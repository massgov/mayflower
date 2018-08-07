### Description

Help text provides instruction to users on how to fill out a form input. Adding help text to a form input is optional. Use this field only if clarification is required. Help text, unlike placeholder text, remains visible to users as they interact with the input field.

### Usage Guidelines

* The help text `inputId` value should match the id of the related input field. This provides key information for screenreaders to know what input your help text is related to.
* The help text `message` should be written in full sentences with punctuation.

### Variables

~~~
inputId:
  type: string / required
message:
  type: string / required
~~~
### Style

Help text appears below its related input field. 

|Name|scss modifier|
|--|--|
|HelperText|.ma__helper-text|
