### Description
This Pattern shows an expandable table of contents which can contain simple links, download links, or expandable sections.

### Usage Guidelines
* This is meant to be used to contain a mix of links, download links, or section titles with child links/download links within accordion items.
* Each item to be rendered within the table of contents should go within the the component. For example: 
```
<TableofContents>
  <DecoratedLink />
  <Link />
  <AccordionItem />
</TableofContents>
```

### Variables
~~~
heading: ColoredHeading or SidebarHeading. Displays the title.
~~~
