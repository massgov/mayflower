### Description
This is a Base Template with a narrow column of content.

### Pattern Contains
* Site Logo
* This template contains a [Twig Block](https://twig.symfony.com/doc/2.x/tags/extends.html) that can be used to populated the Page Content with patterns found in Mayflower

### Variant options
* Along with the yellow, you can also use a [green](./?p=templates-narrow-template-green) background.
* The background can also enter from the [left](./?p=templates-narrow-template-green)

### Variables
~~~
narrowTemplate: {
  side: 
    type: string ("right" or "left"),
  color: 
    type: string ("yellow", "green"),
  siteLogoDomain: 
	type: siteLogo / optional (added in Mayflower React)
}
~~~

