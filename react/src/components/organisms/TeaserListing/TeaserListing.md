# TeaserListing

TeaserListing is a flexible and extensible layout component that lets you compose your own variant of a list of Teasers.

## Usage:
```
<TeaserListing>
  <CompHeading />
  <Paragraph />
  <TeaserListing.Features {...featuresProps}>
    <GenTeaser>
      <GenTeaser.Image img={item.image} />
      <GenTeaser.Details>
        <GenTeaser.Eyebrow eyebrow={item.eyebrow} />
        <GenTeaser.Title title={item.title} />
        <GenTeaser.Emphasis>
          <GenTeaser.Date date={item.date} />
          <GenTeaser.Orgs orgs={item.org} />
        </GenTeaser.Emphasis>
        <GenTeaser.Description description={item.description} />
      </GenTeaser.Details>
    </GenTeaser>
  </TeaserListing.Features>

  <TeaserListing.Items {...itemsProps}>
    <TeaserListing.Item >
      <GenTeaser>
        <GenTeaser.Details>
          <GenTeaser.Title title={item.title} />
          <GenTeaser.Description description={item.description} />
        </GenTeaser.Details>
      </GenTeaser>
    </TeaserListing.Item>
    <TeaserListing.Item >
      <GenTeaser>
        <GenTeaser.Details>
          <GenTeaser.Title title={item.title} />
          <GenTeaser.Description description={item.description} />
        </GenTeaser.Details>
      </GenTeaser>
    </TeaserListing.Item>
  </TeaserListing.Items>
</TeaserListing>
```


----
## SubTypes:

### Features

A wrapper around featured teasers.
Pass in one or more compositions of GenTeaser as `children`, and use the `stacked` prop to configure the stack layout option of the featured items.

### Items

A wrapper around the list of teaser items.
Pass `<TeaserListing.Item>` inside `<TeaserListing.Items>`, and use the `columns` prop to configure the column layout option of the teaser items.

### Item

A wrapper around the list item teaser.
Pass in a composition of GenTeaser as `children`.
