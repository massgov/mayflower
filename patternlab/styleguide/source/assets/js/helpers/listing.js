import getTemplate from "../helpers/getHandlebarTemplate.js";
import sticky from "../helpers/sticky.js";
import getOuterHtml from "../helpers/getElementOuterHtml.js";

export default  function(window, document, undefined, $, moment){
  "use strict";

  /**
   * Common Helpers between event + location listings
   */


  /**
   * Renders the new page of location listing image promos and broadcasts the rendered master data instance.
   *
   * @param args
   *   Arguments object with the following structure:
   *   {
   *      page: (optional) the page to be rendered, defaults to 1
   *      data: the instance of master data to render
   *   }
   */
  function renderListingPage(args) {
    if (args.data.hasOwnProperty('selectors')) {
      clearListingPage(args.data.selectors.container, args.data.selectors.parent);
      let $el = $(args.data.selectors.container).find(args.data.selectors.parent),
          page = args.page ? args.page : 1;

      args.data.items.forEach(function (item) {
        if (item.isActive && item.page === page) {
          $el.append(item.markup);
        }
      });

      // Focus on the first focusable element in the first listing
      let $firstListing = $el.find(args.data.selectors.row).first();
      // :focusable is possible with helpers/jQueryExtend.js
      $firstListing.find(':focusable').eq(0).focus();

      if (args.data.selectors.hasOwnProperty('map') && args.data.selectors.map) {
        sticky.init($(args.data.selectors.map));
      }
    }
    else {
      console.warn("masterData.selectors must be set for this listing.");
      return false;
    }
  }


  /**
   * Returns the data structure necessary to render pagination component, reflecting current state.
   *
   * @param args
   *   An object with the following structure:
   *   {
   *     data: [instance of filtered, sorted master data],
   *     targetPage: (optional) the page which should be active
   *   }
   *
   * @returns {*}
   *   Data structure necessary to render pagination component
   */
  function transformPaginationData(args) {
    let data = args.data;
    let targetPage = args.targetPage ? args.targetPage : 1; // default to first page if none passed
    let totalPages = data.totalPages;
    let pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push({
        text: i.toString(),
        active: i === targetPage
      });
    }

    data.pagination.prev = {
      text: "Previous",
      disabled: targetPage === 1
    };

    data.pagination.next = {
      text: "Next",
      disabled: targetPage === totalPages
    };

    data.pagination.pages = pages;
    data.pagination.currentPage = targetPage;

    return data.pagination;
  }

  /**
   * Updates the resultsHeading data structure to reflect the current component state.
   *
   * @param args
   *    Arguments object with the following structure:
   *    args: {
   *      data: the current instance of master data,
   *      page: (optional) the current page, defaults to 1
   *    }
   *
   * @returns {resultsHeading|{numResults, totalResults}|*}
   */
  function transformResultsHeading(args) {
    let pageTotal = 0,
        totalActive = 0,
        page = args.page ? args.page : 1,
        data = args.data,
        resultsHeading = data.resultsHeading; // preserve active resultsHeading.tags

    // Tally the total active and page length.
    data.items.map(function(item){
      if (item.isActive) {
        totalActive += 1;
        if (item.page === page) {
          pageTotal += 1;
        }
      }
    });

    // Get the index (from 1) of the first and last items on this page.
    let firstItem = (Number(data.maxItems) * Number(page)) - (Number(data.maxItems) - 1),
        lastItem = firstItem + (Number(pageTotal) - 1);

    resultsHeading.totalResults = totalActive;
    resultsHeading.numResults = firstItem + " - " + lastItem; // @todo add accessibility consideration here

    return resultsHeading;
  }

  /**
   * Creates an array with generated markup for location listing items, preserving original index.
   *
   * @param listing
   *  The array of items
   * @param template
   *  The string name of the template
   *
   * @returns {Array}
   *  An array of compiled markup
   */
  function transformListing(listing, template) {
    // Get template for location listing (organisms > imagePromo)
    let compiledTemplate = getTemplate(template);
    let listingMarkup = [];
    listing.forEach(function (data, index) {
      let itemData = itemTransform(data);
      listingMarkup[index] = compiledTemplate(itemData);
    });
    return listingMarkup;
  }


  /**
   * Returns transformed item data object.
   *
   * @param item
   *   The item.item[]{} being transformed.
   *
   * @returns {*}
   *   The original item object with a formatted tag property.
   */
  function itemTransform(item) {
    // Ensure tags are an array.
    let tags = [];

    $.map(item.tags, function(val, index) {
      tags[index] = val;
    });

    item.tags = tags;

    let tagsData = {
      tagsFormatted: item.tags.map(transformTag)
    };
    return Object.assign({}, item, tagsData);
  }

  /**
   * Returns a formatted item.tag object with a label and svg icon markup.
   *
   * @param tag
   *   The tag being transformed.
   *
   * @returns {{label, svg: boolean}}
   */
  function transformTag(tag) {
    return {
      label: tag.label,
      svg: getSvgFromTag(tag.id)
    };
  }

  /**
   * Returns the svg element markup from the corresponding tag filter checkbox label icon
   *
   * @param tag
   *  The imagePromo tag.id whose icon we need
   *
   * @return string
   *  The svg element for the matching filter form tag input.
   */
  function getSvgFromTag(tag) {
    // Get the existing corresponding icon markup so we don't have to worry about outdated markup.
    // return $('.js-filter-by-tags').find("#" + tag).parent().siblings('svg').prop('outerHTML');
    // Get outerHtml of svgElement shim for IE
    // See: https://stackoverflow.com/questions/12592417/outerhtml-of-an-svg-element
    return getOuterHtml($('.js-filter-by-tags').find("#" + tag).siblings('svg')[0]);
  }

  /**
   * Returns true if the passed filters array includes an item with the passed type.
   *
   * @param filters
   *   Array of filters.
   * @param type
   *   The type of filter to search for.
   *
   * @returns {*|boolean}
   */
  function hasFilter(filters, type) {
    return filters.some(function (filter) {
      return filter.hasOwnProperty('type') && filter['type'] === type;
    });
  }

  /**
   * Returns the value(s) of the passed filters of the passed type.
   *
   * @param filters
   *   Array of filters from which to abstract values.
   * @param type
   *   The type of filter to search for.
   *
   * @return array
   *   An array of filter values of type.
   */
  function getFilterValues(filters, type) {
    return filters.filter(function(data) {
      return data.type === type;
    }).map(function(data) {
      return data.value;
    })
  }

  /**
   * Creates the active filter object based on either cleared or submitted filter data.
   *
   * @param args
   *   An object with the following structure:
   *   data {
   *    [masterData current instance]
   *   },
   *   filterData: {
   *     clearedFilter: (optional cleared filter data)
   *     {
   *       type: '[filter type]: location || tag',
   *       text: '[filter text or label]',
   *       value: '[filter value]'
   *     }, || 'all' (if clear all button was pressed)
   *     {
   *       formData: (optional submitted form filter data)
   *       [
   *         {
   *           type: '[filter type] location || tag',
   *           text: '[filter label]',
   *           value: '[filter value]'
   *         }, ...
   *       ]
   *     }
   *   }
   *
   * @returns {*}
   */
  function transformActiveTagsData(args) {
    if (args.filterData.hasOwnProperty('clearedFilter')) {
      return getActiveFilters(args.data, args.filterData); // This was an active tag interaction, get remaining filters.
    }
    else {
      return args.filterData.formData; // This was a form submission, so just return the applied form data.
    }
  }

  /**
   * Returns an array of the currently active filters, based on passed filterData.
   *
   * @param data
   *   The current instance of master data structure.
   *
   * @param filterData
   *  An object representing the cleared filter:
   *  {
   *    clearedFilter: {
   *       type: '[filter type]: location || tag',
   *       text: '[filter text or label]',
   *       value: '[filter value]'
   *     } || 'all' (if clear all button was pressed)
   *  }
   *
   * @returns {Array}
   *   An array of the currently active filters:
   *   [  {
   *        type:
   *        text:
   *        value:
   *      }, ... ]
   */
  function getActiveFilters(data, filterData) {
    // Single filter button clicked, so remove that filter from the list.
    if (filterData.clearedFilter !== "all") {
      let filters = data.resultsHeading.tags;
      // Remove the clicked tag from the tags array.
      return filters.filter(function (tag) {
        return tag.value !== filterData.clearedFilter.value;
      });
    }
    else {
      // Clear all button was clicked so remove all filters.
      return [];
    }
  }


  /**
   * Assigns page values to masterData items, based on the provided max number.
   *
   * @param items
   *   The master data items.
   *
   * @param max
   *   The max number of items to show per page.
   *
   * @returns
   *   The updated master data items.
   */
  function paginateItems(items, max) {
    let page = 1,
        pageTotal = 0;
    let paginatedItems = items.map(function(item){
      if (item.isActive) {
        if (pageTotal < max){
          item.page = page;
        }
        else {
          page += 1;
          pageTotal = 0;
          item.page = page;
        }
        pageTotal += 1;
      }
      return item;
    });

    return {
      items: paginatedItems,
      totalPages: page
    }
  }

  // Remove the listing content children on the current listing page.
  function clearListingPage(listing, parent) {
    $(listing).find(parent).html('');
  }

  /**
   * Filters the listing data based on component filter state.
   *
   * @param data
   *  An instance of masterData to start from.
   * @param filterData
   *  Data structure representing either the newly applied or cleared filters.
   * @returns {*}
   */
  function filterListingData(data, filterData) {
    // Get the currently active filters.
    let filters = transformActiveTagsData({data: data, filterData: filterData});
    // Update the results heading tags with the new active filters.
    data.resultsHeading.tags = filters;

    // If tag (checkbox) filter is present, filter based on current tag values.
    if (hasFilter(filters, 'tag')) {
      // Get just the tag values from the filters array.
      let tags = getFilterValues(filters, 'tag');
      // Identify active data based on filter.
      return filterDataByTags(tags, data);
    }

    // If a date filter is present, filter based on the date filter values.
    if (hasFilter(filters, 'dateRange')) {
      return filterDataByDateTags(filters, data);
    }


    // Either there are no filters or the only active filter is location, make all items active
    return makeAllActive(data);
  }

  /**
   * Returns an instance of master data which is sorted alphabetically by item data.title.text
   *
   * @param data
   *    The instance of master data being sorted.
   *
   * @returns {*}
   *    Sorted instance of master data.
   */
  function sortDataAlphabetically(data) {
    let items = data.items.sort(function(a, b) {
      let nameA = a.data.title.text.toUpperCase();
      let nameB = b.data.title.text.toUpperCase();

      // Sort the items alphabetically
      return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
    });

    let paginated = paginateItems(items, data.maxItems);
    data.items = paginated.items;
    data.totalPages = paginated.totalPages;
    return data;
  }

  /**
   * Geocodes an address string arg and executes callback upon successful return.
   *
   * @param address
   *   Address string to be geocoded.
   * @param callback
   *   Callback function to call upon successful geocode return.
   *
   * @returns {*}
   *   Upon success, the return value of the passed callback function.
   */
  function geocodeAddressString(address, callback) {
    // Only attempt to execute if google's geocode library is loaded.
    if (typeof ma.geocoder === "undefined") {
      return;
    }

    // Geocode address string, then execute callback with argument upon success.
    ma.geocoder.geocode({address: address}, function (results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        let place =  results[0];
        return callback(place);
      }
      else {
        console.warn('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  /**
   * Geocodes an address string arg and executes callback upon successful return.
   *
   * @param address
   *   Address string to be geocoded.
   * @param callback
   *   Callback function to call upon successful geocode return.
   *
   * @returns {*}
   *   Upon success, the return value of the passed callback function.
   */
  function geocodePlaceId(place_id, callback) {
    // Only attempt to execute if google's geocode library is loaded.
    if (typeof ma.geocoder === "undefined") {
      return;
    }

    // Geocode address string, then execute callback with argument upon success.
    ma.geocoder.geocode({ 'placeId': place_id}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        let place =  results[0];
        return callback(place);
      }
      else {
        console.warn('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  /**
   * Resets all items in a master data instance to active (i.e. not filtered out).
   *
   * @param data
   *    The instance of master data whose items are being made active.
   *
   * @returns {*}
   *    The master data instance with all active items.
   */
  function makeAllActive(data) {
    data.items = data.items.map(function(item){
      item.isActive = true;
      return item;
    });
    return data;
  }

  /**
   * Returns masterData with necessary filtered items flagged inactive.
   *
   * @param tags
   *  The array of filters by which to filter.
   *
   * @param data
   *   The current instance of master data being filtered.
   *
   * @returns {*}
   *   The 'filtered' (flagged) instance of master data.
   */
  function filterDataByTags(tags, data){
    // @todo use map similar to sortDataAlphabetically
    data.items = data.items.map(function(item) {
      item.isActive = doesItemContainTags(item.data.tags, tags);
      return item;
    });

    return data;
  }

  /**
   * Location Listing Specific
   */

  /**
   * Determines if an masterData item contains the necessary tag(s).
   *
   * @param haystack
   *  The data object in question.
   *
   * @param needle
   *   The tag(s) being searched for.
   *
   * @returns {boolean|*}
   */
  function doesItemContainTags(haystack, needle) {
    return needle.every(function(v) {
      return Boolean(haystack.filter(function(item){
        // return Object.values(item).indexOf(v) !== -1;
        // return Object.values(item).indexOf(v) !== -1;
        // Object.values shim for IE11
        return Object.keys(item).map(function(i) { return item[i]; }).indexOf(v) !== -1;
      }).length);
    });
  }

  /**
   * Event Listing specific helpers
   */

  /**
   * Calculate distance from lat/lng.
   *
   * @param lat1
   *    Latitude 1 input.
   * @param lon1
   *    Longitude 1 input.
   * @param lat2
   *    Latitude 2 input.
   * @param lon2
   *    Longitude 2 input.
   * @param unit
   *
   * @returns {*}
   *    Return the distance from points.
   */
  function calculateDistance(lat1, lon1, lat2, lon2, unit) {
    let radlat1 = Math.PI * lat1/180;
    let radlat2 = Math.PI * lat2/180;
    let radlon1 = Math.PI * lon1/180;
    let radlon2 = Math.PI * lon2/180;
    let theta = lon1-lon2;
    let radtheta = Math.PI * theta/180;
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;

    if (unit === "K") {
      dist = dist * 1.609344
    }
    if (unit === "N") {
      dist = dist * 0.8684
    }
    return dist
  }

  /**
   * Create a moment.js object for a passed eventTeaser date data
   *
   * @param args
   *   Data structure for eventTeaser.date and a type ("start" || "end") property
   * @returns
   *   A moment.js object for the event start/end date in MM/D format.
   *   See: https://momentjs.com/docs/#/parsing/string-format/
   */
  function makeMoment(args) {
    /**
     * args: {
     *   data: {
     *     summary: "March 2, 2017 - April 25, 2017",
     *     startMonth: "Mar",
     *     startDay: "2",
     *     startTimestamp: "3/2/2017 - 14:00",
     *     endMonth: "Apr",
     *     endDay: "25",
     *     endTimestamp: "4/25/2017 - 15:00"
     *   },
     *   type: 'start' || 'end'
     * }
     */
    // Create moment.js object for start timestamp
    if (args.hasOwnProperty('type') && args.type === 'start') {
      return moment(args.data.startTimestamp, 'M/DD/YYYY')
    }
    // Create a moment.js object for end timestamp
    if (args.hasOwnProperty('type') && args.type === 'end') {
      return args.data.endTimestamp ? moment(args.data.endTimestamp, 'M/DD/YYYY') : "";
    }
    return false;
  }

  /**
   * Returns an instance of master data which is sorted by start timestamp then alphabetically by item data.title.text
   *
   * @param data
   *    The instance of master data being sorted.
   * @param dateType
   *    The type of date by which to sort: start || end
   *
   * @returns {*}
   *    Sorted instance of master data.
   */
  function sortDataByDate(data, dateType) {
    let type = dateType ? dateType : 'start';
    let dateA = '';
    let dateB = '';
    let items = data.items.sort(function(a, b) {
      if (type !== "end") {
        dateA = a.start;
        dateB = b.start;
      }
      else {
        dateA = a.end;
        dateB = b.end;
      }

      let nameA = a.data.title.text.toUpperCase();
      let nameB = b.data.title.text.toUpperCase();

      // Sort the items by start date timestamp, then alphabetically.
      // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
      return (dateA.isBefore(dateB, 'minute')) ? -1 : (dateA.isAfter(dateB, 'minute')) ? 1 : (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
    });

    let paginated = paginateItems(items, data.maxItems);
    data.items = paginated.items;
    data.totalPages = paginated.totalPages;
    return data;
  }

  /**
   * Returns data with necessary items flagged inactive according to date/date range.
   *
   * @param tags
   *  The array of filters by which to filter.
   *
   * @param data
   *   The current instance of master data being filtered.
   *
   * @returns {*}
   *   The 'filtered' instance of data after checking date(s).
   */
  function filterDataByDateTags(tags, data) {
    data.items = data.items.map(function(item) {
      item.isActive = isEventInDateRange(item, tags);
      return item;
    });
    let paginated = paginateItems(data.items, data.maxItems);
    data.items = paginated.items;
    data.totalPages = paginated.totalPages;
    return data;
  }

  /**
   * Returns an item's isActive value depending on the date range from date filters.
   *
   * @param item
   *   The item.item[]{} being transformed.
   *
   * @param tags
   *  The array of filters by which to filter.
   *
   * @returns
   *   The updated item.
   */
  function isEventInDateRange(item, tags) {
    let filterStart = '';
    let filterEnd = '';

    tags.map(function(tag) {
      if (tag.type == 'dateRange') { filterStart = moment(tag.start, 'M/DD/YYYY'); }
      if (tag.type == 'dateRange') { filterEnd = moment(tag.end, 'M/DD/YYYY'); }
    });

    if (filterEnd && filterStart) {
      return item.start.isSameOrAfter(filterStart, 'day') && item.start.isSameOrBefore(filterEnd, 'day') ? true : false;
    }
    else {
      return item.start.isSame(filterStart, 'day') ? true : false;
    }
  }

  return {
    renderListingPage,
    transformPaginationData,
    transformResultsHeading,
    filterListingData,
    hasFilter,
    getFilterValues,
    filterDataByTags,
    filterDataByDateTags,
    transformActiveTagsData,
    paginateItems,
    clearListingPage,
    sortDataAlphabetically,
    sortDataByDate,
    geocodeAddressString,
    geocodePlaceId,
    makeAllActive,
    calculateDistance,
    transformListing,
    makeMoment
  };

}(window, document, undefined, jQuery, moment);
