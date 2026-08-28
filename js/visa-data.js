/* ==========================================================================
   United States Universities For Ukraine — visa-data.js

   Lead-time reference table for the Visa & Document Processing Backward-
   Scheduler (visa-scheduler.html; logic in js/tools.js module 17).

   This is NOT the university dataset (js/aid-data.js). It is a small,
   structurally different reference of PROCESS lead times — how long each
   step between "documents not gathered" and "arrived at the interview"
   takes — used to schedule backward from a fixed target date.

   WHY EVERY NUMBER HERE IS A RANGE, NOT A POINT
   ---------------------------------------------
   None of these lead times is stable. The scheduler always plans against
   the LONGER (max) end to find the latest *safe* start date, and shows the
   range so a family sees the uncertainty rather than a false-precise date.

   THE ONE NUMBER THAT IS NOT SAFE TO PUBLISH AT ALL — visa appointment
   wait time — is deliberately handled as a wide, clearly-labelled planning
   band, never a per-post "current" figure. It changes weekly per post and
   has been paused entirely by policy before (a real May-2025 precedent).
   A static site cannot know the live value. The scheduler ALWAYS links out
   to the State Department's weekly-updated page as the source of truth, and
   shows the `policyPause` banner (below) whenever Phase B is in view.

   TIME-SENSITIVE — re-verify before each admissions cycle and bump
   `verified`. Units are stated per field: "business" days skip weekends
   (Ukrainian/US public holidays are NOT modelled — a documented, honest
   simplification the UI states out loud), "calendar" days do not.

   Context confirmed Jul 2026: the U.S. Embassy in Kyiv has not resumed
   routine nonimmigrant (incl. F-1) visa services since Feb 2022, so a
   Ukrainian applicant must interview at a third-country post. Since Sep
   2025 the State Department generally restricts third-country processing,
   but residents of Ukraine remain explicitly able to apply at any U.S.
   post worldwide — which is exactly why this tool exists, and exactly the
   kind of policy that can change without notice (hence `policyPause`).
   ========================================================================== */

window.USUFU_VISA_DATA = {
  "verified": "July 2026",

  /* ----------------------------------------------------------------------
     POLICY-PAUSE TOGGLE — the one piece of fast-moving, high-stakes state
     the team can flip WITHOUT touching tool logic. When a global F/M/J
     interview-scheduling pause is in effect (it has happened before), set
     active:true, fill `since` and `note`, and the scheduler upgrades its
     standing Phase-B disclaimer to a dated, stronger warning. Leaving it
     false still shows the standing "this could happen" caveat — the pause
     risk is never hidden, it is only escalated here.
     ---------------------------------------------------------------------- */
  "policyPause": {
    "active": false,
    "since": null,
    "note": null
  },

  /* Authoritative sources the tool sends students to. These are the
     source of truth; this dataset only gets a family close. */
  "links": {
    "waitTimes": "https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/wait-times.html",
    "kyivStatus": "https://ua.usembassy.gov/visas/",
    "pauseNews": "https://travel.state.gov/content/travel/en/News/visas-news/temporary-pause-of-visa-operations.html",
    "sevis": "https://www.fmjfee.com/",
    "apostille": "https://mon.gov.ua/"
  },

  /* Interview posts a Ukrainian F-1 applicant commonly uses. `wait` is a
     CONSERVATIVE planning band in weeks — NOT a live figure. Named posts
     share one honest band; "undetermined" widens it rather than inventing
     a post-specific number. Always superseded by the live wait-times page. */
  "posts": [
    { "id": "warsaw",     "city": "Warsaw, Poland" },
    { "id": "prague",     "city": "Prague, Czechia" },
    { "id": "bucharest",  "city": "Bucharest, Romania" },
    { "id": "frankfurt",  "city": "Frankfurt, Germany" },
    { "id": "krakow",     "city": "Kraków, Poland" },
    { "id": "other",      "city": "Another post — I know which" }
  ],

  "steps": {

    /* PHASE A ------------------------------------------------------------ */

    /* Apostille of the ORIGINAL Ukrainian document. Must precede certified
       translation in the normal flow (you apostille the original, then
       translate the apostilled document) — see the sequencing note in
       tools.js module 17. Older/pre-1991 records route through archives
       and take materially longer. */
    "apostille": {
      "minDays": 5, "maxDays": 20, "unit": "business",
      "olderDocExtraDays": 10,
      "note": "Ukrainian documents are apostilled by the issuing ministry (education records via the Ministry of Education and Science). Pre-1991 or archival documents take longer.",
      "src": "Compiled from Ukrainian Ministry of Education & Science apostille guidance, verified Jul 2026",
      "conf": "medium"
    },

    /* Certified translation of the apostilled document. Standard vs rush is
       a real, common trade-off families make under time pressure. */
    "translation": {
      "unit": "business",
      "options": {
        "standard": { "minDays": 4, "maxDays": 6, "label": "Standard" },
        "rush":     { "minDays": 2, "maxDays": 3, "label": "Rush (extra cost)" },
        "express":  { "minDays": 1, "maxDays": 1, "label": "24-hour express (highest cost)" }
      },
      "note": "Rush and 24-hour options exist at additional cost — a genuine time-for-money trade-off.",
      "src": "Compiled from certified-translation provider service levels, verified Jul 2026",
      "conf": "medium"
    },

    /* Buffer to actually assemble and submit the application once a
       document is ready — a few calendar days, not a processing queue. */
    "submissionBuffer": {
      "minDays": 3, "maxDays": 3, "unit": "calendar",
      "note": "Slack to upload and submit once documents are in hand.",
      "src": "Planning buffer, verified Jul 2026",
      "conf": "planning"
    },

    /* PHASE B ------------------------------------------------------------ */

    /* SEVIS I-901 fee. Must be PAID AND CLEARED before the interview;
       official guidance recommends at least three business days ahead.
       Runs in PARALLEL with appointment booking — modelled as a branch
       that must finish before the interview, not in the main chain. */
    "sevis": {
      "minDays": 3, "maxDays": 3, "unit": "business",
      "note": "Pay the I-901 SEVIS fee at least three business days before the interview so the payment clears in the system.",
      "src": "U.S. government SEVIS I-901 guidance (fmjfee.com / studyinthestates.dhs.gov), verified Jul 2026",
      "conf": "high"
    },

    /* Visa appointment wait time — THE volatile number. Weeks, conservative,
       label-as-planning-only. Named posts share one band; undetermined is
       wider. NEVER shown without the live-page link beside it. */
    "waitTime": {
      "unit": "week",
      "named":        { "minWeeks": 3, "maxWeeks": 14 },
      "undetermined": { "minWeeks": 3, "maxWeeks": 20 },
      "note": "A deliberately wide planning band, not a live figure. Appointment availability changes weekly by post and can be paused by policy. Always confirm the current wait for your post on the State Department page before booking travel.",
      "src": "Conservative planning band; live values at travel.state.gov/wait-times, verified Jul 2026",
      "conf": "planning"
    },

    /* Buffer to arrange international travel and accommodation to the
       third-country interview post and arrive with margin. Editable —
       a student with visa-free travel or existing plans may shorten it. */
    "thirdCountryTravel": {
      "minDays": 7, "maxDays": 14, "unit": "calendar",
      "note": "Time to book international travel and lodging to your interview post and arrive with a comfortable margin.",
      "src": "Planning buffer, verified Jul 2026",
      "conf": "planning"
    },

    /* Gap between a successful interview and the passport (with visa)
       actually back in hand. Can extend under administrative processing. */
    "issuance": {
      "minDays": 5, "maxDays": 14, "unit": "calendar",
      "note": "Passports are usually returned within about a week or two after approval, but administrative processing can extend this without notice.",
      "src": "U.S. Department of State visa-issuance guidance, verified Jul 2026",
      "conf": "medium"
    },

    /* Modest buffer between having the visa in hand and the program start
       date, to book flights back to the U.S. and settle in. */
    "finalTravel": {
      "minDays": 7, "maxDays": 10, "unit": "calendar",
      "note": "Slack after the visa is in hand to fly to the U.S. and arrive before your program begins.",
      "src": "Planning buffer, verified Jul 2026",
      "conf": "planning"
    }
  }
};
