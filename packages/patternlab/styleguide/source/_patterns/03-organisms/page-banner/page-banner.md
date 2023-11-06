### Description
Page Banner component that is composed of an H1 page title, featured image and description.

### Status
* New after v12.7.0

### Variant options
* Themes:
  - c-primary (Used on mass.gov for navigational pages)
  - c-primary-alt (Used on mass.gov for organizational pages)
  - c-white (Used on mass.gov for information pages)
* Image
  - renderImageOnMobile - whether to wrap the image under the 1000px breakpoint
  - image - image path for wide screens/ 2:1 aspect ratio / max rendering size @ 660 x 330px
  - imageMedium - image path for medium screens/ 4:3 aspect ratio / max rendering size @ 460 x 345px
  - imageMobile - image path for mobile screens/ 2:1 aspect ratio / max rendering size @ 480 x 240px

### Variables
~~~
pageBanner: {
  image:
    type: string / optional (required as the default image)
  imageMedium:
    type: string / optional
  imageMedium:
    type: string / optional
  renderImageOnMobile:
    type: boolean / optional - default to false
  theme:
    type: string ('', 'c-primary', 'c-primary-alt', 'c-white') / optional - default as c-primary
  pageHeader: 
    type: pageHeader / required
  {
    category: 
        type: string / optional,
    title:
        type: string / required
    subTitle:
        type: string / optional
    description:
        type: string / optional
    ...
   }

}
~~~

Refer to [page-header.md](packages/patternlab/styleguide/source/_patterns/03-organisms/page-header/page-header.md)