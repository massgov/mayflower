[⬅️ a11y Checklist](a11y-checklist.md)

# Buttons `<button>`

## 📖 Definition

**Buttons** (that have type="button") are not submit buttons. **Buttons** are used to *create features that rely on Javascript*. Behaviors such as revealing a menu or showing a date picker.

**🛑 Set type attribute**

If your buttons are not to submit form data to a server, be sure to set their type attribute to button. Otherwise they will try to submit form data and to load the (nonexistent) response, possibly destroying the current state of the document.

**🛑 Be careful for a use of a *link* vs. a *button*.**

**Link** has a *hand cursor*.  **[Button](buttons.md)** has a pointer.
  
Their roles are different. Browsers recognize and implement them *differently* with their unique characters.





---
[⬅️ a11y Checklist](a11y-checklist.md)