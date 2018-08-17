---
description: >-
  Buttons express what action will occur when the user clicks or touches it.
  Buttons are used to initialize an action, either in the background or
  foreground of an experience.
---

# Buttons

## Overview

Buttons are vital for creating a smooth conversational flow on the web, and should be used sparingly. Buttons should adhere to standard web practices, and afford for a target area of 45 pixels. They should also appear slightly raised, and not be completely flat. They have a slight shadow on them so they appear clickable. The small buttons are often used on forms and to set filters on listing pages. The large buttons should be used for primary calls to action. Font sizes reduce slightly on mobile.

### Primary Button

For the principle call to action on the page.

![](../../.gitbook/assets/primary-button-2%20%281%29.gif)

```text
<button type="button" class="ma__button" aria-label="">Button</button>
```

[Primary Button in Storybook](http://mayflower-react.digital.mass.gov/?knob-button.info=this%20will%20be%20the%20tooltip%20text%20on%20hover&knob-button.text=button&knob-button.href=&selectedKind=atoms%2Fbuttons&selectedStory=Button&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel)

[Primary Button in Pattern Lab](https://mayflower.digital.mass.gov/?p=atoms-button)

### Secondary Button

For the secondary action on a page.

![](../../.gitbook/assets/secondary-button-outline%20%286%29.gif)

```text
<button type="button" class="ma__button ma__button--small ma__button--secondary ma__button--minor" aria-label="">Button</button>
```

[Secondary Button in Storybook](http://mayflower-react.digital.mass.gov/?knob-button.theme=secondary&knob-button.info=this%20will%20be%20the%20tooltip%20text%20on%20hover&knob-button.text=button&knob-button.href=&knob-button.outline=true&selectedKind=atoms%2Fbuttons&selectedStory=Button&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybooks%2Fstorybook-addon-knobs)

[Secondary Button in Pattern Lab](https://mayflower.digital.mass.gov/?p=atoms-button-as-secondary-color)

### Quarternary Button

For the fourth action on a page.

![](../../.gitbook/assets/quarternary-button%20%285%29.gif)

[Quaternary Button in Storybook](http://mayflower-react.digital.mass.gov/?knob-button.theme=quaternary&knob-button.info=this%20will%20be%20the%20tooltip%20text%20on%20hover&knob-button.text=button&knob-button.href=&selectedKind=atoms%2Fbuttons&selectedStory=Button&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybooks%2Fstorybook-addon-knobs)

[Quaternary Button in Pattern Lab](https://mayflower.digital.mass.gov/?p=atoms-button-as-quaternary-color)

### Button with Icon

When words are not enough, icons can be used in buttons to better communicate what the button does. Icons are always paired with text.

