### Description
Form component. The FormProvider component's state is sent to FormContext.

### FormContext Usage Guidelines
The following describes the various methods and properties avaiable on FormContext:
* value: an object that contains all form values, keyed by the input id. **This Should not be modified directly.** Example content of `value`: `{'my-form-id': 10, 'text-input': 'Foo'}`.
* getValues(): returns an object that contains all values currently stored on the `value` property.
* getValue(id): given `id`, returns the current value for that id from `value`.
* setValue(object, function): given an object with id and value properties, this function updates the `value` property for the id passed, if it exists. If a function is passed as the second parameter, it will be called after updating has completed for the input component. Example: `formContext.setValue({ id: 'my-form-id', value: 'newValueHere'})`.
* hasId(id): returns a boolean representing if the id passed exists as a property on the `value` object.
* updateState(value): directly call setState with the value passed to this function. **`value` should not be modified with this function.**
