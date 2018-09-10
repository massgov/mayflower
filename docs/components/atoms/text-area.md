# Text Area

## Overview

Text input fields enable users to enter long and free form content. TextArea should be used when it is required or expected that the user enters one or more sentences. Text area fields have resizing controls that let the user reduce or expand the size of the input.

### Text Area States

| Visual | Name | Description |
| :--- | :--- | :--- |
| ![](../../.gitbook/assets/textarea.png) | Standard | The standard state of the text area atom. |
| ![](../../.gitbook/assets/textarea-as-disabled.png) | Disabled | In a disabled state, a user cannot input anything into text area. Use a disabled state if an action needs to be taken before a user can use the input. |
| ![](../../.gitbook/assets/textarea-as-error.png) | Error | The error state indicates a form validation issue on this input, with red color adding emphasis. In this state, provide clear instructions on how to resolve the error. |
| ![](../../.gitbook/assets/textarea-as-focus.png) | Focus | The appearance of text area when a user is focused on the atom. |

### Accessibility & Best Practices

* **Label** \(_labelText_\): The label should appropriately indicate to the user what they should enter in the text area. Use sentence style capitalization.
* **Placeholder** \(_placeholder_\): The placeholder text should provide hints to users on what to enter in the input. Use placeholder only when further clarification is needed. When a user enters text in the field, placeholder text disappears so use it sparingly when clarification is needed.
* **Error Message** \(_errorMsg_\): Error messages should indicate to users what the field issue is and how they can resolve it. Inform the user what is wrong and how to fix it. Error messages should only be shown to a user after they have interacted with the field

## Code

## Style

