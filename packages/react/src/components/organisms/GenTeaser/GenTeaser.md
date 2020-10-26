### GenTeaser

The GenTeaser component provide a flexible and extensible content container with multiple variants and options. This is leveraged when rendering search results or overview/teaser content for a linked page.

*Usage:*
```
<GenTeaser onClick={(e) => action(e)} onKeyDown={(e) => action(e)}>
  <GenTeaser.Details>
    <GenTeaser.Eyebrow eyebrow={dataset.eyebrow} />
    <GenTeaser.Button button={dataset.button} />
    <GenTeaser.Stat>{dataCatalog.stat}</GenTeaser.Stat>
    <GenTeaser.Title title={dataset.title} />
    <GenTeaser.Emphasis>
      <GenTeaser.Date date={dataset.date} />
      <GenTeaser.Orgs orgs={dataset.orgs} />
    </GenTeaser.Emphasis>
    <GenTeaser.Description description={dataset.description} />
    <GenTeaser.SearchBar search={dataCatalog.search} />
    <GenTeaser.SubLinks>
      {dataCatalog.subLinks.map((item) =>
        <GenTeaser.KeyAction {...item} />
      )}
    </GenTeaser.SubLinks>
    <GenTeaser.MoreInfo>
      <GenTeaser.PrimaryInfo>
        <GenTeaser.Phone {...stateOrg.phone} />
        <GenTeaser.InfoDetails {...stateOrg.locations} />
      </GenTeaser.PrimaryInfo>
      <GenTeaser.SecondaryInfo>
        <GenTeaser.Email {...stateOrg.email} />
        <GenTeaser.InfoDetails {...stateOrg.infodetails} />
      </GenTeaser.SecondaryInfo>
    </GenTeaser.MoreInfo>
    <GenTeaser.Tags tags={dataset.tags} />
  </GenTeaser.Details>
</GenTeaser>
```


----
*SubTypes:*

#### Details

A wrapper around `<GenTeaser>` content.

#### Eyebrow

Pass an Eyebrow to `<GenTeaser>` via `<GenTeaser.Eyebrow>`. This is meant to provide a way to visually categorize teaser content. should categorize the teaser Pass `<GenTeaser.Eyebrow>` inside `<GenTeaser.Details>`.

#### Button

Pass a Button to `<GenTeaser>` via `<GenTeaser.Button>`. Currently, this is used if there is a teaser expansion action can be taken. You should not use `<GenTeaser.Stat>` and `<GenTeaser.Button>` in the same Teaser as Button will cover Stat. Pass `<GenTeaser.Button>` inside `<GenTeaser.Details>`.

#### Stat

Pass a State to `<GenTeaser>` via `<GenTeaser.Stat>`. This will render a key value related to the teaser content such as the number of datasets found in a data catalog. Pass `<GenTeaser.Stat>` inside `<GenTeaser.Details>`.


#### Title

Pass a Title to `<GenTeaser>` via `<GenTeaser.Title>`. Pass `<GenTeaser.Title>` inside `<GenTeaser.Details>`.


#### Emphasis

`<GenTeaser.Emphasis>` is a wrapper around `<GenTeaser.Date>` and `<GenTeaser.Orgs>` to make sure these are appropriately styles. Pass `<GenTeaser.Emphasis>` inside `<GenTeaser.Details>`.

#### Date

Pass `<GenTeaser.Date>` inside `<GenTeaser.Emphasis>`. This should render a relevant date to the teaser content.

#### Orgs

Pass `<GenTeaser.Orgs>` inside `<GenTeaser.Emphasis>`. This should render the publishing entities/authors/organizations attached to the teaser content. If more than three organizations are passed in an array to this component will provide a collapse/show all feature.

#### Description

Pass a description to `<GenTeaser>` via `<GenTeaser.Description>`. Pass `<GenTeaser.Description>` inside `<GenTeaser.Details>`.

#### SearchBar

If you want the teaser to permit users to search the site from, Pass `<GenTeaser.SearchBar>` inside `<GenTeaser.Details>`.


#### SubLinks

Use `<GenTeaser.SubLinks>` as a wrapper around `<GenTeaser.KeyAction>`. SubLinks will render a max of 4 KeyAction children. Pass `<GenTeaser.SubLinks>` inside `<GenTeaser.Details>`

#### KeyAction

Use `<GenTeaser.KeyAction>` inside `<GenTeaser.SubLink>` to make sure these links are styled and layed out appropriately. See KeyAction in use in the 'GenTeaser as Services' story.

#### MoreInfo

Use `<GenTeaser.MoreInfo>` as a wrapper around `<GenTeaser.PrimaryInfo>` and `<GenTeaser.SecondaryInfo>`. Pass `<GenTeaser.MoreInfo>` inside `<GenTeaser.Details>`

#### PrimaryInfo, SecondaryInfo

Use `<GenTeaser.PrimaryInfo>` and `<GenTeaser.SecondaryInfo>` inside `<GenTeaser.MoreInfo>` to make sure the contact details passed inside `<GenTeaser.PrimaryInfo>` and `<GenTeaser.SecondaryInfo>` line up appropriately.

#### Address, Phone, Event, InfoDetails

Pass `<GenTeaser.Address>`, `<GenTeaser.Phone>`, `<GenTeaser.Event>`, and `<GenTeaser.InfoDetails>` inside either `<GenTeaser.PrimaryInfo>` or `<GenTeaser.SecondaryInfo>`. The render contact information related to the teaser content in a specific way.

#### Tags

Pass `<GenTeaser.Tags>` inside `<GenTeaser.Details>`. This expects an array of tags an will render these in a row of grey squares in the Teaser.
