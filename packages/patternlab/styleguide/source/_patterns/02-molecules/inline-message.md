### Description
A contextual message box used to surface important information within a step or page section. Supports `info` and `warning` variants, each with a distinct icon.

### Status
* Stable

### Pattern Contains
* Rich Text

### Variants
* `info` (default) — blue info icon, light blue background
* `warning` — yellow warning icon, light blue background

### Variables
~~~
inlineMessage: {
  type: "info" | "warning",  // optional, defaults to info
  richText: {
    type: object  // standard richText object with rteElements array
  }
}
~~~
