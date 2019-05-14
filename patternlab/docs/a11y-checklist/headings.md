# Headings `<h#>`

## Heading level

A heading can present its **proper level number** to represent the hierarchy of the content in the relationship of the parent and child components.

### ➤ Is the heading level number flexible?

☑️ It can receive and consume the level number value from the parent component.
 
☑️ It can have proper level number depending on where it locates in a page. If its parent component has h3, this component starts with h4.)

📋 The template can have a *default value* for the heading level. The *default value* is only used when it’s unable to get the parent’s heading level value.


### ➤ Are the heading numbers sequential from small to big?

☑️  No skipping - Some inbetween number(s) are missing.

☑️ No jumping - Putting heading level number randomely.

☑️ No backword - numbers go down from big to small.

⬇️ Next to check the heading label.

## Heading label 

### ➤ Is the label generic like “Contact” and “Downloads”?

#### Yes
<a name="context"></a>

☑️ Add context info as visually hidden text for screen reader users.

Some pages could have multiple **Contact** and **Dowloads** headings in a page. Make sure each one of them is uniquely identifiable. 

##### Examples
Contact`<span class=”ma--visually-hidden”> for the Department of Health office</span>`

Downloads`<span class=”ma--visually-hidden”> for the marine fishing license</span>`

#### No

⬇️ Move to the next question.

### ➤ Does the label have enough context to describe the section content?

Check if the label itself would tell what the following content is about.

#### Yes

You are all set with the heading. Move onto next element.

#### No

Use [above technique](#context) to provide context. ⬆️ 

