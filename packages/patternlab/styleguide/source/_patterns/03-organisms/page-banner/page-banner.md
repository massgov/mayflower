### Description
Page Banner component is a higher-order component of Page Header componet. Like Page Header, it's meant to be used above the main content of the page,it adds an `<h1>` page title and other helpful bit of content that helps define the page's purpose. On top of that, Page Banner allows an background color (theme) and a decorative image to add more visual interests and emphasis to Page Header.

Note: If the Page Banner doesn't have a background color other white, or an image, use Page Header instead.

### Status
* New after v12.7.0
* This pattern will replace both Illustrated Header and Legacy Page Banner. 

### Variant options
* Themes:
  - c-primary (Used on mass.gov for navigational pages)
  - c-primary-alt (Used on mass.gov for organizational pages)
  - c-white (Used on mass.gov for information pages)
* Image
  - renderImageOnMobile - whether to wrap the image under the 1000px breakpoint
  - image - image path for wide screens/ 2:1 aspect ratio / max rendering size @ 800 x 400px
  - imageMedium - image path for medium screens/ 4:3 aspect ratio / max rendering size @ 600 x 450px
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
  bgPositionX:
    type: string with % / optional - Sets background position horizontall on desktop, e.g. 100% 
  bgPositionY:
    type: string with % / optional - Sets background position vertically on desktop e.g. 100%
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

Refer to [page-header.md](../page-header/page-header.md)