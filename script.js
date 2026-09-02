/* KFC Breakfast Menu USA — site scripts
   Mobile nav, FAQ accordion, menu search/filter, back-to-top, location finder UI */
(function () {
  "use strict";

  /* ---------- Mobile navigation ---------- */
  var header = document.querySelector(".site-header");
  var navToggle = document.querySelector(".nav-toggle");
  if (navToggle && header) {
    navToggle.addEventListener("click", function () {
      var expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      header.classList.toggle("nav-open", !expanded);
    });
    document.querySelectorAll(".main-nav a").forEach(function (link) {
      link.addEventListener("click", function () {
        navToggle.setAttribute("aria-expanded", "false");
        header.classList.remove("nav-open");
      });
    });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq-question").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var expanded = btn.getAttribute("aria-expanded") === "true";
      var answer = document.getElementById(btn.getAttribute("aria-controls"));
      btn.setAttribute("aria-expanded", String(!expanded));
      if (answer) {
        answer.style.maxHeight = expanded ? null : answer.scrollHeight + "px";
      }
    });
  });

  /* ---------- Menu search + category filter ---------- */
  var searchInput = document.getElementById("menu-search");
  var chips = document.querySelectorAll(".chip[data-category]");
  var cards = document.querySelectorAll("[data-menu-card]");
  var noResults = document.getElementById("no-results");
  var activeCategory = "all";

  function applyFilters() {
    if (!cards.length) return;
    var term = (searchInput && searchInput.value ? searchInput.value : "").trim().toLowerCase();
    var visibleCount = 0;

    cards.forEach(function (card) {
      var category = card.getAttribute("data-category") || "";
      var name = (card.getAttribute("data-name") || "").toLowerCase();
      var matchesCategory = activeCategory === "all" || category === activeCategory;
      var matchesTerm = term === "" || name.indexOf(term) !== -1;
      var visible = matchesCategory && matchesTerm;
      card.style.display = visible ? "" : "none";
      if (visible) visibleCount++;
    });

    if (noResults) {
      noResults.classList.toggle("show", visibleCount === 0);
    }
  }

  if (searchInput) {
    searchInput.addEventListener("input", applyFilters);
  }

  if (chips.length) {
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chips.forEach(function (c) { c.setAttribute("aria-pressed", "false"); });
        chip.setAttribute("aria-pressed", "true");
        activeCategory = chip.getAttribute("data-category");
        applyFilters();
      });
    });
    applyFilters();
  }

  /* ---------- Back to top ---------- */
  var backToTop = document.getElementById("back-to-top");
  if (backToTop) {
    window.addEventListener("scroll", function () {
      backToTop.classList.toggle("show", window.scrollY > 600);
    });
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Location finder (informational UI) ----------
     This site does not have a live KFC restaurant database.
     The form points users to KFC's official locator with their
     input pre-filled, and explains that clearly. */
  var finderForm = document.getElementById("finder-form");
  var finderResult = document.getElementById("finder-result");
  if (finderForm) {
    finderForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var city = document.getElementById("finder-city");
      var state = document.getElementById("finder-state");
      var zip = document.getElementById("finder-zip");
      var query = [zip && zip.value, city && city.value, state && state.value]
        .filter(Boolean)
        .join(" ")
        .trim();

      if (finderResult) {
        finderResult.classList.add("show");
        finderResult.innerHTML = query
          ? "Search on file: <strong>" + query.replace(/</g, "&lt;") + "</strong>. " +
            "We don't run a live restaurant database, so use the official KFC locator " +
            "linked below to see real-time addresses, hours, and breakfast availability for that area."
          : "Enter a ZIP code, city, or state, then use the official KFC locator below to see real-time results.";
      }
    });
  }

  /* ---------- Contact form (static site — no backend) ---------- */
  var contactForm = document.getElementById("contact-form");
  var contactSuccess = document.getElementById("contact-success");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (contactSuccess) {
        contactSuccess.classList.add("show");
        contactSuccess.setAttribute("tabindex", "-1");
        contactSuccess.focus();
      }
      contactForm.reset();
    });
  }
})();
