[⬅️ a11y Checklist](a11y-checklist.md)

# Links `<a>`

## 📖 Definition

**Links** let us navigate to *pages* or *locations within a page*. Either way, they’re typically underlined to stand out amongst prose content. Or they might reside in a special place like a header to help cognition.

**Call to action buttons** are considered LINKS.

**🛑 Be careful for a use of a *link* vs. a *button*.**

**Link** has a *hand cursor*.  **[Button](buttons.md)** has a pointer.
  
Their roles are different. Browsers recognize and implement them *differently* with their unique characters.

## ➤ Does your link’s functionality fit this definition?

**➣ Yes:** [Move onto the link label.⬇️](#link-label) 

**➢ No:** Use `<button>` instead. Check your markup at the [Button section](buttons.md). ➡️


<a name="link-label"></a>
## Link label

### ➤ Is the link label text?

**➣ Yes:** [Go to the following question.⬇️](#user-input)

**➢ No:** Image [Go to the next question.⬇️]()

**Yes/No:** Text + Image [Go to the next question.⬇️]()

 
<a name="user-input"></a>
### ➤ Is the label passed from field data such as node title or user input label?

Not sure? Check the spec.

<!-- 
sample link label in the comp if the link takes you to a content page created by authors, or programmatically generated page. If it meets the first one, "Yes".
-->

**➣ Yes:**  You are all set. [Move on to next element](ally-checklist.md). ➡️

**➢ No:**  It's defined in the template. [Go to the following question.⬇️](#link-context)

<a name="link-context"></a> 
### ➤ Is the label text descriptive enough to see where it takes you without the *visual presentation* around the link? Is it clear enough to screen reader users?

📋 A visual presentation such as a layout can provide non-verbal context to sighted users, which screen reader users cannot take advantage of. We fill the gap by providing such context info as text.

**➣ Yes:** [Move on to next element. ➡️](a11y-checklist.md)

**➢ No:**  It’s not descriptive enough. 



##### Case 1

- More 
- See all
- List all
- Show more
- Show less

[Option 1] 

- Use visually hidden text to add contextual info.

##### Case 2

- Log into...

📋 Screen readers announce "...", ":", ";". Users hear "log into dot dot dot".

[Option 2]

- Use `aria-label` to override the existing link label. (When `aria-label` is used, screen readers ignores the content between `<a>` and `</a> `and announce `aria-label` value.)

- Add any necessary context info as well. With above sample, the label could be "log in to *your account*" 



