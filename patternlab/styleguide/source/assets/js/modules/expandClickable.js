// export default (function (window, document) { // NEITHER OF THEM WORK WITH THIS.

// ****** Make the whole TOC link's parent container a hotspot ******

	// TEST 1 --
	// THIS WORKS WITH:
	// - http://localhost:3000/patterns/03-organisms-by-template-sticky-toc/03-organisms-by-template-sticky-toc.html#sectionLink
	// - http://localhost:3000/patterns/03-organisms-by-template-table-of-contents-hierarchy/03-organisms-by-template-table-of-contents-hierarchy.html

	// BUT DOESN'T WORK (= DOES NOTHING) WITH:
	// - http://localhost:3000/patterns/05-pages-information-details/05-pages-information-details.html
		$("[data-link]").click(function (event) {
			window.open(this.getAttribute("data-link"), "_self");

			// TEST MARKER.
			$(this).css("background-color", "orange");
		});


	// TEST 2 --
	// THIS DOES NOTHING WITH:
	// - http://localhost:3000/patterns/03-organisms-by-template-sticky-toc/03-organisms-by-template-sticky-toc.html#sectionLink
	// - http://localhost:3000/patterns/03-organisms-by-template-table-of-contents-hierarchy/03-organisms-by-template-table-of-contents-hierarchy.html

	// IT DOESN'T EVEN RENDER TOC CONTENT WITH
	// - http://localhost:3000/patterns/05-pages-information-details/05-pages-information-details.html
	// const tocLinks = document.querySelectorAll("[data-link]");
	// tocLinks.addEventListner("click", (e) => {
	// 	// TEST MARKER.
	// 	event.target.css("background-color", "purple");
	// }, false);

// })(window, document);