/* ==========================================================================
   United States Universities For Ukraine — main.js

   One script for every page. Each feature checks whether its markup
   exists before wiring itself up, so pages only activate what they use.

   Contents
   1. Navigation dropdowns (click to open, outside click / Esc to close)
   2. Mobile menu toggle
   3. FAQ accordion                      (index, resources, faq)
   4. Contact form template              (contact)
   5. News category filters              (news)
   6. Reliable deep links                (all pages)
   7. Site search                        (all pages)
   8. Intro animation                    (index)
   9. Language switch + splash           (all pages)
   10. Perpetual countdown               (timelines)
   11. Scroll-in reveal animation        (all pages)

   Depends on js/i18n.js (translations) — keep it loaded first.
   ========================================================================== */

(function () {
  "use strict";

  // Translation helper for text this script builds at runtime
  const T = window.USUFU_I18N ? window.USUFU_I18N.t : function (s) { return s; };
  const LANG_SPLASH_KEY = "usufu-lang-splash";

  /* ------------------------------------------------------------------
     1. Navigation dropdowns
     ------------------------------------------------------------------ */
  const dropdownItems = document.querySelectorAll(".nav-item.has-dropdown");

  function closeAllDropdowns(except) {
    dropdownItems.forEach(function (item) {
      if (item !== except) {
        item.classList.remove("open");
        item.querySelector(".nav-link").setAttribute("aria-expanded", "false");
      }
    });
  }

  dropdownItems.forEach(function (item) {
    const trigger = item.querySelector(".nav-link");

    trigger.addEventListener("click", function (event) {
      event.stopPropagation();
      const willOpen = !item.classList.contains("open");
      closeAllDropdowns(item);
      item.classList.toggle("open", willOpen);
      trigger.setAttribute("aria-expanded", String(willOpen));
    });
  });

  document.addEventListener("click", function () {
    closeAllDropdowns(null);
  });

  /* ------------------------------------------------------------------
     2. Mobile menu toggle
     ------------------------------------------------------------------ */
  const header = document.getElementById("site-header");
  const navToggle = document.querySelector(".nav-toggle");

  function closeMobileMenu() {
    header.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  navToggle.addEventListener("click", function (event) {
    event.stopPropagation();
    const willOpen = !header.classList.contains("nav-open");
    header.classList.toggle("nav-open", willOpen);
    navToggle.setAttribute("aria-expanded", String(willOpen));
    if (!willOpen) closeAllDropdowns(null);
  });

  // The pill bar hides its Get Involved button on phones, so rebuild it
  // as the last row of the hamburger menu — the CTA must exist everywhere.
  // Visibility is driven inline from matchMedia so a stale cached
  // stylesheet can never leave a second button in the desktop bar.
  const navMenu = document.getElementById("nav-menu");
  if (navMenu && !navMenu.querySelector(".nav-item-cta")) {
    const ctaItem = document.createElement("div");
    ctaItem.className = "nav-item nav-item-cta";
    const ctaLink = document.createElement("a");
    ctaLink.className = "btn btn-cta";
    ctaLink.href = "get-involved.html";
    ctaLink.textContent = T("Get Involved");
    ctaItem.appendChild(ctaLink);
    navMenu.appendChild(ctaItem);

    const phoneNav = window.matchMedia("(max-width: 860px)");
    const syncMenuCta = function () {
      ctaItem.style.display = phoneNav.matches ? "block" : "none";
    };
    if (phoneNav.addEventListener) phoneNav.addEventListener("change", syncMenuCta);
    else phoneNav.addListener(syncMenuCta);
    syncMenuCta();
  }

  // Tapping outside the bar closes the mobile panel as well
  document.addEventListener("click", function (event) {
    if (!header.contains(event.target)) closeMobileMenu();
  });

  // While the window is resizing or the browser zoom changes, suspend
  // every CSS transition — otherwise elements whose styles differ
  // across breakpoints (dropdowns, menus) flash mid-reflow.
  let resizeCalm = null;
  window.addEventListener("resize", function () {
    document.documentElement.classList.add("no-transitions");
    clearTimeout(resizeCalm);
    resizeCalm = setTimeout(function () {
      document.documentElement.classList.remove("no-transitions");
    }, 180);
  });

  /* ------------------------------------------------------------------
     3. FAQ accordion
     ------------------------------------------------------------------ */
  document.querySelectorAll(".faq-item").forEach(function (item, i) {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    // Wire the pair up for assistive tech. aria-expanded alone says that
    // something opened; aria-controls says what, and hiding the collapsed
    // panel keeps 30 closed answers out of the screen-reader reading order.
    if (!answer.id) answer.id = "faq-answer-" + (i + 1);
    question.setAttribute("aria-controls", answer.id);
    answer.setAttribute("role", "region");
    answer.setAttribute("aria-labelledby", question.id || (question.id = "faq-question-" + (i + 1)));
    answer.hidden = !item.classList.contains("open");

    question.addEventListener("click", function () {
      const willOpen = !item.classList.contains("open");
      item.classList.toggle("open", willOpen);
      question.setAttribute("aria-expanded", String(willOpen));
      // Unhide before measuring, or scrollHeight reads 0 and nothing opens.
      if (willOpen) answer.hidden = false;
      answer.style.maxHeight = willOpen ? answer.scrollHeight + "px" : "";
      if (!willOpen) {
        // Wait for the collapse transition before removing it from the tree.
        setTimeout(function () {
          if (!item.classList.contains("open")) answer.hidden = true;
        }, 320);
      }
    });
  });

  /* ------------------------------------------------------------------
     4. Contact form template
        - ?topic=<slug> pre-selects the matching subject.
        - Honeypot: bots that fill the hidden "website" field get a
          fake success and the message is dropped.
        - Human check: a tiny addition question generated below.
        - Delivery: POSTs as JSON to Web3Forms. The destination select
          (#cf-dest) picks the right access key, routing the message to
          info@, contact@, or support@usufu.org accordingly.
     ------------------------------------------------------------------ */
  const CONTACT_ENDPOINT = "https://api.web3forms.com/submit";
  const CONTACT_EMAIL = "";

  const WEB3_KEYS = {
    info:    "a175b4d9-653b-424d-9c22-bc4aa048101f",
    contact: "f7fe5f2f-4787-4816-95d1-7da75fd5e3b8",
    support: "519f3512-aaf9-47ed-950e-8e49166ed75b"
  };

  const TOPIC_GROUPS = {
    info: [
      ["general",      "General question"],
      ["middle-school","Middle School (Grades 6–8)"],
      ["high-school",  "High School (Grades 9–12)"],
      ["university",   "University & Beyond"],
      ["admissions",   "Admissions Support"],
      ["scholarships", "Scholarships"],
      ["visas",        "Visas & Documents"],
      ["campus-life",  "Campus Life"],
      ["other",        "Other"]
    ],
    contact: [
      ["university-partnership", "University partnership"],
      ["ngo-partnership",        "NGO / nonprofit partnership"],
      ["government-inquiry",     "Government or embassy inquiry"],
      ["media-press",            "Media & press"],
      ["educator-collaboration", "Educator collaboration"],
      ["sponsorship",            "Corporate sponsorship"],
      ["other",                  "Other"]
    ],
    support: [
      ["bug-report",        "Report a bug"],
      ["incorrect-content", "Report incorrect content"],
      ["complaint",         "Complaint"],
      ["suggestion",        "Suggestion or feature request"],
      ["accessibility",     "Accessibility issue"],
      ["other",             "Other"]
    ]
  };

  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    const destSelect        = document.getElementById("cf-dest");
    const topicSelect       = document.getElementById("cf-topic");
    const customSubjectWrap  = document.getElementById("cf-subject-wrap");
    const customSubjectInput = document.getElementById("cf-subject");
    const formNote = document.getElementById("contact-form-note");
    const humanLabel = document.getElementById("cf-human-label");
    const humanInput = document.getElementById("cf-human");
    const honeypot = document.getElementById("cf-website");
    const isConfigured = Boolean(CONTACT_ENDPOINT || CONTACT_EMAIL);

    // The markup carries the not-connected wording, because that is the
    // honest default. Filling in either setting above swaps in the wording
    // that describes what actually happens — no HTML edit needed.
    const doneText = isConfigured
      ? (CONTACT_ENDPOINT
          ? T("Thank you — your message is on its way to us.")
          : T("Your email app should be open with the message ready. Press send there and it reaches us."))
      : formNote.textContent;

    const formHint = document.querySelector(".form-hint");
    if (isConfigured && formHint) {
      formHint.textContent = CONTACT_ENDPOINT
        ? T("Your message goes straight to us — no email app needed.")
        : T("Sending opens your own email app with the message already written, so you can send it from there.");
    }

    function repopulateTopics(dest) {
      var groups = TOPIC_GROUPS[dest] || TOPIC_GROUPS.info;
      while (topicSelect.firstChild) topicSelect.removeChild(topicSelect.firstChild);
      groups.forEach(function (pair) {
        var opt = document.createElement("option");
        opt.value = pair[0];
        opt.textContent = T(pair[1]);
        topicSelect.appendChild(opt);
      });
      toggleCustomSubject();
    }

    function toggleCustomSubject() {
      var isOther = topicSelect.value === "other";
      if (customSubjectWrap)  customSubjectWrap.hidden = !isOther;
      if (customSubjectInput) {
        customSubjectInput.disabled = !isOther;
        customSubjectInput.required = isOther;
        // Drop anything typed while "Other" was selected, so a stale subject
        // is never left on screen or carried into the submitted message.
        if (!isOther) customSubjectInput.value = "";
      }
    }

    repopulateTopics(destSelect ? destSelect.value : "info");
    if (destSelect) {
      destSelect.addEventListener("change", function () {
        repopulateTopics(destSelect.value);
      });
    }
    topicSelect.addEventListener("change", toggleCustomSubject);

    let humanAnswer = 0;

    // Match the requested topic against the real option values — never
    // build a selector from the URL, or a crafted ?topic= could throw a
    // selector SyntaxError and break the form.
    const requestedTopic = new URLSearchParams(window.location.search).get("topic");
    if (requestedTopic && Array.prototype.some.call(topicSelect.options, function (opt) {
      return opt.value === requestedTopic;
    })) {
      topicSelect.value = requestedTopic;
    }

    function newHumanCheck() {
      const a = 2 + Math.floor(Math.random() * 8);
      const b = 2 + Math.floor(Math.random() * 8);
      humanAnswer = a + b;
      // Translate the sentence, then fill the numbers in — the other order
      // would send "Spam check — what is 5 + 3?" to the dictionary as a key
      // that changes on every render and could never match.
      humanLabel.textContent = T("Spam check — what is {a} + {b}?")
        .replace("{a}", a).replace("{b}", b);
      humanInput.value = "";
    }
    newHumanCheck();

    function showNote(text, isError) {
      formNote.textContent = text;
      formNote.classList.toggle("is-error", Boolean(isError));
      formNote.classList.add("is-visible");
    }

    // Returns true when the message was handed off, false when there is
    // nowhere to send it — the caller words the confirmation accordingly.
    function deliver(formData) {
      const payload = Object.fromEntries(formData);
      delete payload.website;
      delete payload.human_check;
      delete payload.dest;

      const topicLabel = topicSelect ? topicSelect.options[topicSelect.selectedIndex].text : "General";
      const customSub  = customSubjectInput ? customSubjectInput.value.trim() : "";
      payload.subject  = "USUFU — " + (topicSelect && topicSelect.value === "other" && customSub ? customSub : topicLabel);
      payload.from_name = [payload.first_name, payload.last_name].filter(Boolean).join(" ");

      if (CONTACT_ENDPOINT) {
        const dest = destSelect ? destSelect.value : "info";
        payload.access_key = WEB3_KEYS[dest] || WEB3_KEYS.info;
        fetch(CONTACT_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        }).catch(function (err) {
          console.error("Contact form delivery failed:", err);
        });
        return true;
      }

      // Nowhere to deliver: say so rather than implying it was sent.
      if (!CONTACT_EMAIL) return false;

      // No backend: compose the message and hand it to the mail client.
      const body =
        (payload.message || "") + "\n\n" +
        "—\n" +
        "From: " + payload.from_name + "\n" +
        "Email: " + (payload.email || "") + "\n" +
        "Topic: " + topicLabel + "\n" +
        "Sent from " + window.location.href;
      window.location.href =
        "mailto:" + CONTACT_EMAIL +
        "?subject=" + encodeURIComponent(payload.subject) +
        "&body=" + encodeURIComponent(body);
      return true;
    }

    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // Honeypot tripped: pretend everything worked, deliver nothing.
      if (honeypot.value.trim() !== "") {
        showNote(doneText, false);
        contactForm.reset();
        newHumanCheck();
        return;
      }

      if (parseInt(humanInput.value, 10) !== humanAnswer) {
        showNote("That answer didn't match — try the math once more.", true);
        newHumanCheck();
        return;
      }

      const sent = deliver(new FormData(contactForm));
      showNote(doneText, !sent);
      // Only clear the form when the message actually went somewhere; if it
      // did not, the visitor keeps what they wrote.
      if (sent) contactForm.reset();
      newHumanCheck();
    });
  }

  /* ------------------------------------------------------------------
     5. Listing controller: category filters + pagination
        Used by the news page (filters + pagination) and the materials
        page (filters only). With a filter active, all matches show at
        once; with "all", the grid pages in threes.
     ------------------------------------------------------------------ */
  const listingFilters = document.getElementById("news-filters") || document.getElementById("dl-filters");

  if (listingFilters) {
    const chips = listingFilters.querySelectorAll(".chip");
    const posts = document.querySelectorAll("[data-category]");
    const grid = document.getElementById("post-grid");
    const pagination = document.querySelector(".pagination");
    const gridCards = grid ? Array.prototype.slice.call(grid.children) : [];
    const PAGE_SIZE = 3;

    let filter = "all";
    let page = 0;

    function drawPagination() {
      const total = Math.max(1, Math.ceil(gridCards.length / PAGE_SIZE));
      pagination.innerHTML = "";

      function addBtn(label, target, options) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "page-btn" + (options.active ? " is-active" : "");
        btn.textContent = label;
        if (options.disabled) {
          btn.disabled = true;
        } else {
          btn.addEventListener("click", function () {
            page = target;
            draw();
            grid.scrollIntoView({ behavior: "smooth", block: "start" });
          });
        }
        pagination.appendChild(btn);
      }

      addBtn(T("Prev"), page - 1, { disabled: page === 0 });
      for (let i = 0; i < total; i++) {
        addBtn(String(i + 1), i, { active: i === page });
      }
      addBtn(T("Next"), page + 1, { disabled: page === total - 1 });
    }

    function draw() {
      // filter everything tagged with a category (featured post included)
      posts.forEach(function (post) {
        const match = filter === "all" || post.dataset.category === filter;
        post.style.display = match ? "" : "none";
      });

      if (!grid || !pagination) return;

      if (filter !== "all") {
        // a filter is a search: show every match, no paging
        pagination.style.display = "none";
        return;
      }

      const total = Math.max(1, Math.ceil(gridCards.length / PAGE_SIZE));
      page = Math.min(page, total - 1);
      gridCards.forEach(function (card, i) {
        card.style.display = Math.floor(i / PAGE_SIZE) === page ? "" : "none";
      });
      pagination.style.display = "";
      drawPagination();
    }

    // Same reasoning as the GPA mode tabs: the highlight was the only signal
    // that a category was selected.
    chips.forEach(function (c) {
      c.setAttribute("aria-pressed", String(c.classList.contains("is-active")));
    });

    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chips.forEach(function (c) {
          c.classList.toggle("is-active", c === chip);
          c.setAttribute("aria-pressed", String(c === chip));
        });
        filter = chip.dataset.filter;
        page = 0;
        draw();
      });
    });

    draw();
  }

  /* ------------------------------------------------------------------
     6. Reliable deep links
        Cross-page anchors (e.g. about.html#leadership) can be cut short
        by smooth scrolling and fonts shifting the layout while the page
        loads. Re-run the jump once everything has settled.
     ------------------------------------------------------------------ */
  if (window.location.hash) {
    window.addEventListener("load", function () {
      const target = document.getElementById(window.location.hash.slice(1));
      if (target) target.scrollIntoView({ behavior: "instant", block: "start" });
    });
  }

  /* ------------------------------------------------------------------
     7. Site search
        The trigger button (.search-open) lives in every header; the
        overlay itself is built here so the markup isn't duplicated
        across pages. The index comes from js/search-data.js.
     ------------------------------------------------------------------ */
  const searchIndex = window.USUFU_SEARCH_INDEX || [];
  const searchTriggers = document.querySelectorAll(".search-open");
  let searchOverlay = null;
  let searchInput = null;
  let searchResults = null;
  let activeResult = -1;

  function buildSearchOverlay() {
    searchOverlay = document.createElement("div");
    searchOverlay.className = "search-overlay";
    searchOverlay.setAttribute("role", "dialog");
    searchOverlay.setAttribute("aria-label", "Site search");
    searchOverlay.innerHTML =
      '<div class="search-panel">' +
      '  <div class="search-input-row">' +
      '    <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M16.5 16.5L21 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>' +
      '    <input type="text" placeholder="' + T("Search the site…") + '" aria-label="' + T("Search the site") + '" autocomplete="off" spellcheck="false" />' +
      "    <kbd>ESC</kbd>" +
      "  </div>" +
      '  <div class="search-results" role="listbox"></div>' +
      "</div>";
    document.body.appendChild(searchOverlay);

    searchInput = searchOverlay.querySelector("input");
    searchResults = searchOverlay.querySelector(".search-results");

    searchInput.addEventListener("input", function () {
      renderResults(searchInput.value);
    });

    // Click on the dimmed backdrop closes the overlay
    searchOverlay.addEventListener("click", function (event) {
      if (event.target === searchOverlay) closeSearch();
    });
  }

  function scoreEntry(entry, words) {
    // Search both languages at once: the English fields plus their
    // dictionary translations (and optional per-entry `uk` keywords).
    // Anything added to the i18n dictionary becomes searchable in
    // Ukrainian automatically — no second index to maintain.
    const title = (entry.title + " " + T(entry.title)).toLowerCase();
    const haystack = (
      entry.title + " " + entry.text + " " + entry.path + " " + (entry.keywords || "") + " " +
      T(entry.title) + " " + T(entry.text) + " " + T(entry.path) + " " + (entry.uk || "")
    ).toLowerCase();
    let score = 0;
    for (const word of words) {
      if (haystack.indexOf(word) === -1) return 0; // every word must match
      if (title.indexOf(word) === 0) score += 6;
      else if (title.indexOf(word) !== -1) score += 4;
      else if ((entry.keywords + " " + (entry.uk || "")).toLowerCase().indexOf(word) !== -1) score += 3;
      else score += 1;
    }
    return score;
  }

  function renderResults(query) {
    const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    let matches;

    if (!words.length) {
      // Empty query: offer the most useful destinations
      matches = searchIndex.slice(0, 6);
    } else {
      matches = searchIndex
        .map(function (entry) { return { entry: entry, score: scoreEntry(entry, words) }; })
        .filter(function (m) { return m.score > 0; })
        .sort(function (a, b) { return b.score - a.score; })
        .slice(0, 8)
        .map(function (m) { return m.entry; });
    }

    activeResult = -1;

    if (!matches.length) {
      searchResults.innerHTML =
        '<div class="search-empty">' + T("Nothing found for") + ' &ldquo;' +
        query.replace(/&/g, "&amp;").replace(/</g, "&lt;") +
        '&rdquo;. ' + T("Try another word.") + "</div>";
      return;
    }

    searchResults.innerHTML = matches
      .map(function (entry) {
        return (
          '<a class="search-result" role="option" href="' + entry.url + '">' +
          '<div class="sr-path">' + T(entry.path) + "</div>" +
          '<div class="sr-title">' + T(entry.title) + "</div>" +
          '<div class="sr-snippet">' + T(entry.text) + "</div>" +
          "</a>"
        );
      })
      .join("");
  }

  function moveActive(delta) {
    const items = searchResults.querySelectorAll(".search-result");
    if (!items.length) return;
    activeResult = (activeResult + delta + items.length) % items.length;
    items.forEach(function (item, i) {
      item.classList.toggle("is-active", i === activeResult);
    });
    items[activeResult].scrollIntoView({ block: "nearest" });
  }

  function openSearch() {
    if (!searchOverlay) buildSearchOverlay();
    searchOverlay.classList.add("is-open");
    searchInput.value = "";
    renderResults("");
    searchInput.focus();
  }

  function closeSearch() {
    if (searchOverlay) searchOverlay.classList.remove("is-open");
  }

  searchTriggers.forEach(function (btn) {
    btn.addEventListener("click", openSearch);
  });

  document.addEventListener("keydown", function (event) {
    // Cmd/Ctrl+K opens search from anywhere
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      openSearch();
      return;
    }

    if (event.key === "Escape") {
      closeSearch();
      closeAllDropdowns(null);
      closeMobileMenu();
      return;
    }

    if (!searchOverlay || !searchOverlay.classList.contains("is-open")) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      moveActive(1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      moveActive(-1);
    } else if (event.key === "Enter" && activeResult >= 0) {
      const active = searchResults.querySelectorAll(".search-result")[activeResult];
      if (active) window.location.href = active.getAttribute("href");
    }
  });

  /* ------------------------------------------------------------------
     8. Intro animation (home page only)
        Navy screen with the seal, which then flies into its place in
        the brand band. Plays once per browser session; users with
        reduced motion never see it (CSS hides it, JS cleans up).
     ------------------------------------------------------------------ */
  const intro = document.getElementById("intro");

  if (intro) {
    const INTRO_KEY = "usufu-intro-played";
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const bandSeal = document.getElementById("band-seal");

    // Skip the intro when a language-switch splash is about to play —
    // two overlapping animations would fight each other.
    if (reducedMotion || !bandSeal || sessionStorage.getItem(INTRO_KEY) || sessionStorage.getItem(LANG_SPLASH_KEY)) {
      intro.remove();
    } else {
      sessionStorage.setItem(INTRO_KEY, "1");
      document.body.classList.add("intro-lock");
      window.scrollTo(0, 0);

      // There is only ever ONE visible seal: the page's own seal stays
      // hidden while the overlay seal flies, and the two swap in the
      // same frame when it lands.
      bandSeal.classList.add("is-intro-hidden");

      const introSeal = document.getElementById("intro-seal");
      let finished = false;

      function finishIntro() {
        if (finished) return;
        finished = true;
        bandSeal.classList.remove("is-intro-hidden");
        intro.classList.add("is-done");
        document.body.classList.remove("intro-lock");
        intro.remove();
      }

      // Phase 1 — seal breathes in on the navy screen
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          intro.classList.add("is-ready");
        });
      });

      // Phase 2 — fly the seal onto the brand-band seal, dissolve the navy
      setTimeout(function () {
        const target = bandSeal.getBoundingClientRect();
        const sealWidth = introSeal.getBoundingClientRect().width;
        // The seal is square; fall back to width if the image hasn't
        // decoded yet and its measured height is still 0.
        const targetHeight = target.height || target.width;
        const scale = target.width / sealWidth;
        const dx = target.left + target.width / 2 - window.innerWidth / 2;
        const dy = target.top + targetHeight / 2 - window.innerHeight / 2;

        intro.style.setProperty(
          "--intro-target",
          "translate(calc(-50% + " + dx + "px), calc(-50% + " + dy + "px)) scale(" + scale + ")"
        );
        intro.classList.add("is-landing");

        introSeal.addEventListener("transitionend", finishIntro, { once: true });
        setTimeout(finishIntro, 1600); // safety net if transitionend never fires
      }, 1100);
    }
  }

  /* ------------------------------------------------------------------
     9. Language switch + splash
        The toggle shows the language you'd switch TO. Clicking it
        raises a navy splash with the seal, flips the preference and
        reloads; after the reload the splash dissolves over the
        translated page. (Translation itself happens in js/i18n.js.)
     ------------------------------------------------------------------ */
  const i18n = window.USUFU_I18N;
  const langButtons = document.querySelectorAll(".lang-toggle");

  function makeSplash() {
    const splash = document.createElement("div");
    splash.className = "lang-splash";
    splash.setAttribute("aria-hidden", "true");
    splash.innerHTML = '<img src="assets/img/usufu-seal.png" alt="" />';
    document.body.appendChild(splash);
    return splash;
  }

  if (i18n) {
    // Label shows the language the click switches to
    langButtons.forEach(function (btn) {
      btn.textContent = i18n.lang() === "uk" ? "EN" : "UA";
      btn.addEventListener("click", function () {
        const splash = makeSplash();
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            splash.classList.add("is-on");
          });
        });
        setTimeout(function () {
          i18n.setLang(i18n.lang() === "uk" ? "en" : "uk");
          sessionStorage.setItem(LANG_SPLASH_KEY, "1");
          window.location.reload();
        }, 700);
      });
    });

    // Arriving from a language switch: the splash is already up,
    // let it dissolve over the freshly translated page.
    if (sessionStorage.getItem(LANG_SPLASH_KEY)) {
      sessionStorage.removeItem(LANG_SPLASH_KEY);
      const splash = makeSplash();
      splash.classList.add("is-on");
      setTimeout(function () {
        splash.classList.remove("is-on");
        setTimeout(function () { splash.remove(); }, 450);
      }, 550);
    }
  }

  /* ------------------------------------------------------------------
     10. Perpetual countdown (timelines page)
        Counts down to summer break (June 1) or to the school year
        (September 1), whichever comes next, and switches over
        automatically at each boundary.
     ------------------------------------------------------------------ */
  const countdown = document.getElementById("countdown");

  if (countdown) {
    const labelEl = document.getElementById("countdown-label");
    const dateEl = document.getElementById("countdown-date");
    const cells = {
      days: document.getElementById("count-days"),
      hours: document.getElementById("count-hours"),
      minutes: document.getElementById("count-minutes"),
      seconds: document.getElementById("count-seconds"),
    };

    function nextMilestone(now) {
      const year = now.getFullYear();
      const summer = new Date(year, 5, 1);      // June 1
      const school = new Date(year, 8, 1);      // September 1
      if (now < summer) return { date: summer, label: "Days until summer break" };
      if (now < school) return { date: school, label: "Days until the school year" };
      return { date: new Date(year + 1, 5, 1), label: "Days until summer break" };
    }

    function tick() {
      const now = new Date();
      const target = nextMilestone(now);
      let diff = Math.max(0, target.date - now);

      const days = Math.floor(diff / 86400000);
      diff -= days * 86400000;
      const hours = Math.floor(diff / 3600000);
      diff -= hours * 3600000;
      const minutes = Math.floor(diff / 60000);
      const seconds = Math.floor((diff - minutes * 60000) / 1000);

      cells.days.textContent = String(days);
      cells.hours.textContent = String(hours).padStart(2, "0");
      cells.minutes.textContent = String(minutes).padStart(2, "0");
      cells.seconds.textContent = String(seconds).padStart(2, "0");

      labelEl.textContent = T(target.label);
      const locale = i18n && i18n.lang() === "uk" ? "uk-UA" : "en-US";
      dateEl.textContent = target.date.toLocaleDateString(locale, {
        weekday: "long", year: "numeric", month: "long", day: "numeric",
      });
    }

    tick();
    setInterval(tick, 1000);
  }

  /* ------------------------------------------------------------------
     11. Scroll-in reveal animation
     ------------------------------------------------------------------ */
  const revealTargets = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");

  function revealAll() {
    // Skip the fade. A renderer that never scrolls may also have its CSS
    // transitions frozen (a background tab does exactly this), so the class
    // alone could still snapshot at opacity 0. This makes it immediate.
    document.documentElement.classList.add("reveal-instant");
    revealTargets.forEach(function (element) {
      element.classList.add("is-visible");
    });
  }

  if (!("IntersectionObserver" in window)) {
    // No observer means nothing would ever un-hide the page. Show it.
    revealAll();
  } else {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealTargets.forEach(function (element) {
      revealObserver.observe(element);
    });

    // Failsafe. Nearly every word on a page sits inside a .reveal, which
    // starts at opacity:0 — so anything that renders the page WITHOUT
    // scrolling captures it almost blank: Googlebot (it runs JS, so the
    // <noscript> fallback never applies to it), social-preview scrapers,
    // headless screenshots.
    //
    // Gated on a scroll having happened, so this never costs a real reader
    // the animation: scrolling is the signal that someone is actually
    // reading, and from then on the observer alone drives the reveal. Only
    // a visitor who has not scrolled at all after three seconds — which is
    // every non-human renderer — gets the whole page shown at once, and by
    // definition they are not watching anything fade.
    var hasScrolled = false;
    window.addEventListener("scroll", function () { hasScrolled = true; },
                            { once: true, passive: true });
    window.setTimeout(function () {
      if (!hasScrolled) revealAll();
    }, 3000);
  }

  /* ------------------------------------------------------------------
     12. Number inputs vs. the mouse wheel
         Browsers spin the value of a focused number input on scroll —
         so scrolling past a calculator silently corrupts what was
         typed. Blurring on wheel keeps the value and lets the page
         scroll normally. Applies to every calculator on the site.
     ------------------------------------------------------------------ */
  document.addEventListener(
    "wheel",
    function (event) {
      const el = event.target;
      if (
        el &&
        el.tagName === "INPUT" &&
        el.type === "number" &&
        document.activeElement === el
      ) {
        el.blur();
      }
    },
    { capture: true, passive: true }
  );
})();
