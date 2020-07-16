### Description
This is a site wide footer.

### Status
* In Progress as of 5.0.0

### Pattern Contains
* Floating Action
* Footer Links
* Social Links
* Privacy Policy

### Variables
~~~
floatingAction: {
  type: floatingAction / optional
}

footerLinks: {
  type: footerLinks / required
}

socialLinks {
  type: socialLinks / required
}

privacyPolicy {
  type: privacyPolicy / required
}
~~~

In Patternlab footer logo and footer info are hard coded for Mass.gov use only. In react, those data are passable as props. You can fully customize the footer to fit your branding. 
See [Footer Component in React](/react/src/components/organisms/Footer/Footer.md) for the passable data structure.