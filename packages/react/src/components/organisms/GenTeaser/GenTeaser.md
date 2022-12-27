### GenTeaser

The GenTeaser component provide a flexible and extensible content container with multiple variants and options. This is leveraged when rendering search results or overview/teaser content for a linked page.

*Usage:*
```
<GenTeaserContainer onClick={(e) => action(e)} onKeyDown={(e) => action(e)}>
  <GenTeaserDetails>
    <GenTeaserEyebrow eyebrow={dataset.eyebrow} />
    <GenTeaserButton button={dataset.button} />
    <GenTeaserStat>{dataCatalog.stat}</GenTeaserStat>
    <GenTeaserTitle title={dataset.title} />
    <GenTeaserEmphasis>
      <GenTeaserDate date={dataset.date} />
      <GenTeaserOrgs orgs={dataset.orgs} />
    </GenTeaserEmphasis>
    <GenTeaserDescription description={dataset.description} />
    <GenTeaserSearchBar search={dataCatalog.search} />
    <GenTeaserSubLinks>
      {dataCatalog.subLinks.map((item) =>
        <GenTeaserKeyAction {...item} />
      )}
    </GenTeaserSubLinks>
    <GenTeaserMoreInfo>
      <GenTeaserPrimaryInfo>
        <GenTeaserPhone {...stateOrg.phone} />
        <GenTeaserInfoDetails {...stateOrg.locations} />
      </GenTeaserPrimaryInfo>
      <GenTeaserSecondaryInfo>
        <GenTeaserEmail {...stateOrg.email} />
        <GenTeaserInfoDetails {...stateOrg.infodetails} />
      </GenTeaserSecondaryInfo>
    </GenTeaserMoreInfo>
    <GenTeaserTags tags={dataset.tags} />
  </GenTeaserDetails>
</GenTeaserContainer>
```


----
*SubTypes:*

#### Details

A wrapper around `<GenTeaserContainer>` content.

#### Eyebrow

Pass an Eyebrow to `<GenTeaserContainer>` via `<GenTeaserEyebrow>`. This is meant to provide a way to visually categorize teaser content. should categorize the teaser Pass `<GenTeaserEyebrow>` inside `<GenTeaserDetails>`.

#### Button

Pass a Button to `<GenTeaserContainer>` via `<GenTeaserButton>`. Currently, this is used if there is a teaser expansion action can be taken. You should not use `<GenTeaserStat>` and `<GenTeaserButton>` in the same Teaser as Button will cover Stat. Pass `<GenTeaserButton>` inside `<GenTeaserDetails>`.

#### Stat

Pass a State to `<GenTeaserContainer>` via `<GenTeaserStat>`. This will render a key value related to the teaser content such as the number of datasets found in a data catalog. Pass `<GenTeaserStat>` inside `<GenTeaserDetails>`.


#### Title

Pass a Title to `<GenTeaserContainer>` via `<GenTeaserTitle>`. Pass `<GenTeaserTitle>` inside `<GenTeaserDetails>`.


#### Emphasis

`<GenTeaserEmphasis>` is a wrapper around `<GenTeaserDate>` and `<GenTeaserOrgs>` to make sure these are appropriately styles. Pass `<GenTeaserEmphasis>` inside `<GenTeaserDetails>`.

#### Date

Pass `<GenTeaserDate>` inside `<GenTeaserEmphasis>`. This should render a relevant date to the teaser content.

#### Orgs

Pass `<GenTeaserOrgs>` inside `<GenTeaserEmphasis>`. This should render the publishing entities/authors/organizations attached to the teaser content. If more than three organizations are passed in an array to this component will provide a collapse/show all feature.

#### Description

Pass a description to `<GenTeaserContainer>` via `<GenTeaserDescription>`. Pass `<GenTeaserDescription>` inside `<GenTeaserDetails>`.

#### SearchBar

If you want the teaser to permit users to search the site from, Pass `<GenTeaserSearchBar>` inside `<GenTeaserDetails>`.


#### SubLinks

Use `<GenTeaserSubLinks>` as a wrapper around `<GenTeaserKeyAction>`. SubLinks will render a max of 4 KeyAction children. Pass `<GenTeaserSubLinks>` inside `<GenTeaserDetails>`

#### KeyAction

Use `<GenTeaserKeyAction>` inside `<GenTeaserSubLink>` to make sure these links are styled and layed out appropriately. See KeyAction in use in the 'GenTeaser as Services' story.

#### MoreInfo

Use `<GenTeaserMoreInfo>` as a wrapper around `<GenTeaserPrimaryInfo>` and `<GenTeaserSecondaryInfo>`. Pass `<GenTeaserMoreInfo>` inside `<GenTeaserDetails>`

#### PrimaryInfo, SecondaryInfo

Use `<GenTeaserPrimaryInfo>` and `<GenTeaserSecondaryInfo>` inside `<GenTeaserMoreInfo>` to make sure the contact details passed inside `<GenTeaserPrimaryInfo>` and `<GenTeaserSecondaryInfo>` line up appropriately.

#### Address, Phone, Event, InfoDetails

Pass `<GenTeaserAddress>`, `<GenTeaserPhone>`, `<GenTeaserEvent>`, and `<GenTeaserInfoDetails>` inside either `<GenTeaserPrimaryInfo>` or `<GenTeaserSecondaryInfo>`. The render contact information related to the teaser content in a specific way.

#### Tags

Pass `<GenTeaserTags>` inside `<GenTeaserDetails>`. This expects an array of tags and will render these in a row of grey squares in the Teaser.
