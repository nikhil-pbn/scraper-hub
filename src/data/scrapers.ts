import type { Scraper } from "@/lib/types";

/**
 * Every scraper shown in the hub, in display order.
 *
 * Facts below were taken from each project's source, README and git history on
 * 2026-09-22. Where something could not be verified it is left out rather than
 * guessed. To add a scraper, append an object here; the UI hides any section
 * whose data is missing. Drop a screenshot into /public and set `image` to
 * replace the generated placeholder art.
 */
export const scrapers: Scraper[] = [
  {
    slug: "referring-domains-automation",
    name: "Referring Domains Automation",
    tagline:
      "Pulls a competitor's referring domains from Ahrefs, scrapes each linking site for contact details and upserts the rows into per-competitor Google Sheet tabs.",
    description: [
      "Referring Domains Automation replaces a three-step manual workflow: exporting a competitor's referring domains from Ahrefs, visiting each linking site to find a phone number or email, and pasting rows into a spreadsheet. It is built as three independent phases where the output of one is the input of the next: referring domains, business records, sheet append summaries.",
      "Several competitors can run in one pass. Every domain and record is tagged with its competitor, and Save writes each row into that competitor's own worksheet tab of a master Google Sheet as an upsert keyed on Source URL. Referring domains can also be uploaded or pasted instead of fetched, which costs no Ahrefs units.",
      "Rows that produced no contact data are set aside in a separate no-data research workspace for manual follow-up, junk-looking phones and emails are flagged and stripped unless overridden per row, and every save is recorded in an admin-only audit log. Access is gated by a shared password or Google sign-in restricted to the company domain.",
    ],
    category: "seo",
    status: "active",
    icon: "waypoints",
    runsOn: "Vercel",
    lastUpdated: "2026-08-18",
    liveUrl: "https://ahref-referring-domains.vercel.app/",
    githubUrl: "https://github.com/nikhil-pbn/competitors-scrapper",
    resources: [
      {
        label: "How it works",
        href: "https://github.com/nikhil-pbn/competitors-scrapper/blob/master/HOW-IT-WORKS.md",
        description: "Engineering map of the three phases",
        kind: "docs",
      },
      {
        label: "README",
        href: "https://github.com/nikhil-pbn/competitors-scrapper#readme",
        description: "Non-technical user guide",
        kind: "docs",
      },
    ],
    source: {
      summary: "Ahrefs API v3 referring domains, then each linking website",
      details: [
        "Ahrefs Site Explorer refdomains endpoint, ordered by Domain Rating, with New / Lost / date-range filters",
        "Each referring domain's homepage over HTTPS, then /contact, /contact-us, /about and /about-us when details are missing",
        "JSON-LD, og:site_name, page titles, mailto: and tel: links and body-text patterns",
        "Alternatively a CSV/TSV/TXT upload or a pasted list or Ahrefs table",
      ],
    },
    destination: {
      summary: "Google Sheets, one tab per competitor",
      details: [
        "Upsert into the master spreadsheet, matching rows by Source URL and stamping new rows with date_added",
        "CSV downloads of the referring-domains and contact-details tables",
        "No-data URLs saved to a research workspace; every save logged to Vercel Blob",
      ],
    },
    keyData: ["Practice", "Doctor", "Phone", "Email", "Location", "State", "Source URL", "DR"],
    input: [
      {
        label: "Competitor tab(s)",
        description:
          "Multi-select of worksheet names read live from the master sheet. Preset competitors map to sites such as adit.com, dentalintel.com, nexhealth.com, getweave.com and revenuewell.com.",
      },
      { label: "Domain contains", description: "Keyword filter on the referring domain, for example “dent”." },
      { label: "Status", description: "All, New or Lost, with a link-status sub-filter." },
      { label: "Date range", description: "Last 24 hours through All time. Default: last month." },
      { label: "Row limit", description: "1 to 5,000 referring domains. Default 1,000." },
      {
        label: "Own data instead of Ahrefs",
        description: "Upload CSV/TSV/TXT, paste a URL list, or paste a table copied from the Ahrefs web UI.",
      },
      {
        label: "Review controls",
        description: "Untick rows, add a record by hand, override junk-flagged values, move rows to no-data.",
      },
    ],
    dataCollected: [
      { name: "Domain", group: "Referring domain metrics" },
      { name: "Domain Rating (DR)", group: "Referring domain metrics" },
      { name: "Domain traffic", group: "Referring domain metrics" },
      { name: "Keywords", group: "Referring domain metrics" },
      { name: "Links to target", group: "Referring domain metrics" },
      { name: "Dofollow links", group: "Referring domain metrics" },
      { name: "Dofollow ref. domains", group: "Referring domain metrics" },
      { name: "Dofollow linked domains", group: "Referring domain metrics" },
      { name: "First seen / Last seen", group: "Referring domain metrics" },
      { name: "New links", description: "Drives the “New” badge", group: "Referring domain metrics" },
      { name: "practice_name", description: "JSON-LD name, og:site_name or page title", group: "Contact details" },
      { name: "doctor_name", description: "“Dr. First Last” pattern in body text", group: "Contact details" },
      { name: "office_manager_name", description: "Always blank; rarely published", group: "Contact details" },
      { name: "phone", description: "tel: links and US phone patterns", group: "Contact details" },
      { name: "email", description: "mailto: links and email patterns", group: "Contact details" },
      { name: "location", description: "Street, locality and region from JSON-LD or a City, ST 12345 pattern", group: "Contact details" },
      { name: "State", description: "Two-letter US state code", group: "Contact details" },
      { name: "source_url", description: "https://<referring domain>; the upsert key", group: "Contact details" },
      { name: "date_added", description: "IST date stamped on new rows", group: "Contact details" },
    ],
    howItWorks: [
      {
        title: "Sign in",
        description: "Shared password or Google sign-in restricted to the company domain. Every API route checks the session.",
      },
      {
        title: "Pick competitor tabs",
        description: "The dropdown lists the master sheet's worksheet names, read live; the URLs reference tab is excluded.",
      },
      {
        title: "Phase 1: get referring domains",
        description:
          "Search calls Ahrefs once per selected competitor, or upload, paste or load sample data at no cost. Domains are de-duplicated across competitors.",
      },
      {
        title: "Phase 2: analyse each site",
        description:
          "A worker pool of 8 fetches homepages (10 s timeout, HTML only) and, when email, phone or name are still missing, the contact and about pages. Rows stream in over Server-Sent Events.",
      },
      {
        title: "Review",
        description:
          "Junk-looking phones and emails show struck through; rows with nothing found move to an amber no-data notice. Untick, add or override before saving.",
      },
      {
        title: "Phase 3: save",
        description:
          "Per tab, rows are matched by Source URL and either appended, updated in place when a cell changed, or left alone. Blank incoming values never overwrite existing cells.",
      },
      {
        title: "Log and link",
        description:
          "An audit entry records who saved what, and the response deep-links straight to the worksheet tab.",
      },
    ],
    output: [
      "A sortable, filterable referring-domains table with CSV export and “New” badges, followed by a live-streaming contact-details table with checkboxes and junk highlighting.",
      "After saving, a confirmation such as “Saved to 2 tabs · 14 added · 3 updated” with a per-tab breakdown and a Go to worksheet button.",
      "In the sheet: one row per referring domain under its competitor's tab, with the eight contact columns plus date_added.",
    ],
    technologies: [
      { name: "Next.js 16", kind: "framework" },
      { name: "React 19", kind: "framework" },
      { name: "TypeScript", kind: "language" },
      { name: "Tailwind CSS v4", kind: "library" },
      { name: "shadcn/ui", kind: "library" },
      { name: "TanStack Table", kind: "library" },
      { name: "cheerio", kind: "library" },
      { name: "googleapis", kind: "library" },
      { name: "zod", kind: "library" },
      { name: "jose", kind: "library" },
      { name: "Ahrefs API v3", kind: "api" },
      { name: "Google Sheets API", kind: "api" },
      { name: "Google OAuth", kind: "api" },
      { name: "Vercel", kind: "infra" },
      { name: "Vercel Blob", kind: "infra" },
      { name: "Server-Sent Events", kind: "technique" },
    ],
    exampleOutputs: [
      {
        title: "Referring domains (sample data for adit.com, keyword “dent”)",
        caption: "Sample rows bundled with the app for trying the pipeline without spending Ahrefs units.",
        columns: ["Domain", "DR", "Traffic", "Links to target", "Dofollow links", "Dofollow ref. domains", "Keywords", "First seen"],
        rows: [
          ["rosecrestdental.com", "35", "63", "15", "15", "95", "66", "2026-06-30"],
          ["ballantynefamilydental.com", "12", "276", "41", "41", "64", "43", "2026-06-24"],
          ["andersonwinchesterdental.ca", "10", "48", "2", "2", "7", "6", "2026-06-25"],
          ["dentaltechhub.com", "8", "0", "2", "2", "25", "0", "2026-07-08"],
          ["wecaredentalpllc.com", "7", "86", "1", "1", "38", "7", "2026-06-28"],
        ],
      },
      {
        title: "Contact-details columns written to each competitor tab",
        caption: "No scraped contact rows are committed to the repository, so only the column shape is shown.",
        columns: ["practice_name", "doctor_name", "office_manager_name", "phone", "email", "location", "State", "source_url", "date_added"],
        rows: [],
      },
    ],
    limitations: [
      "Only the Search button consumes Ahrefs API units; one call per selected competitor. Upload, paste, analyse and save are free.",
      "Row limit 1 to 5,000 per Ahrefs call; the analyse route runs for at most 300 s with a 10 s fetch timeout per site.",
      "Scraping is best-effort. Many sites publish no contact details, office_manager_name is always blank by design, and a dead site yields only its source URL.",
      "Phone and email extraction is US-centric (NANP numbers, 50 states plus DC).",
      "Junk-looking values are stripped at save unless overridden per row.",
      "Rows match on Source URL only; source_url is never rewritten and duplicates within one batch are skipped.",
      "A tab without a header row is refused, and the spreadsheet must be shared with the service account as Editor.",
      "The audit log and no-data workspace degrade to empty when Vercel Blob credentials are missing.",
    ],
  },

  {
    slug: "dentist-finder",
    name: "Dentist Finder",
    tagline:
      "Find dental practices near any US ZIP code, with addresses, phones, emails and websites, ready to export or save to a shared sheet.",
    description: [
      "Dentist Finder takes a US ZIP code, a result count and a search radius, geocodes the ZIP to coordinates and asks a map data provider for every business tagged as a dentist inside that radius. Results are normalised into one provider-independent model, de-duplicated, sorted nearest-first and shown as a paginated table, with cards on mobile.",
      "It runs on free OpenStreetMap services by default (Nominatim for geocoding, Overpass for places) with no API key or billing, and can be switched to Google Places (New) with a single environment variable. Any field the source does not have is left empty and rendered as a dash; nothing is guessed or padded.",
      "Every search can be exported to CSV or Excel, or saved into a shared Google Sheet as an upsert keyed on the Map URL, so repeated searches enrich the sheet instead of duplicating it.",
      "A built-in Detect Competitor step crawls each practice's public website and names the practice-management (PMS) or patient-engagement vendor it links to, by matching link, form, iframe, script and redirect hosts against a curated list of 32 vendors such as Dentrix, Eaglesoft, Open Dental, Denticon, Weave, NexHealth and RevenueWell. The result fills a Competitor column in the table, the exports and the sheet: a vendor name, a comma-joined list, “No Competitor” when the site was inspected and nothing matched, or empty when the site could not be inspected.",
    ],
    category: "lead-generation",
    status: "active",
    icon: "map-pinned",
    runsOn: "Vercel",
    lastUpdated: "2026-09-14",
    liveUrl: "https://dentist-finder-pms.vercel.app",
    githubUrl: "https://github.com/nikhil-pbn/dentist-finder",
    resources: [
      {
        label: "README",
        href: "https://github.com/nikhil-pbn/dentist-finder#readme",
        description: "Setup, providers, exports and known limitations",
        kind: "docs",
      },
      {
        label: "Competitor detection guide",
        href: "https://github.com/nikhil-pbn/dentist-finder/blob/master/docs/competitor-detection.md",
        description: "How vendor matching works and what each note means",
        kind: "docs",
      },
    ],
    source: {
      summary: "OpenStreetMap (Nominatim + Overpass), optionally Google Places",
      details: [
        "Nominatim geocodes the ZIP code to coordinates (one request per second at most)",
        "Overpass API returns amenity=dentist nodes, ways and relations within the radius",
        "Google Geocoding and Places (New) Text Search when MAP_PROVIDER is set to google",
      ],
    },
    destination: {
      summary: "CSV, Excel and Google Sheets",
      details: [
        "CSV download named dentists-<zip>-<km>km.csv",
        "Excel .xlsx download written without a spreadsheet library",
        "Upsert into a Google Sheet, one tab per provider (osm / google), keyed on Map URL",
      ],
    },
    keyData: ["Name", "Address", "Phone", "Email", "Website", "Map URL", "Competitor"],
    input: [
      { label: "ZIP code", description: "5-digit US ZIP; ZIP+4 is accepted and truncated." },
      { label: "Results", description: "20, 30, 50 dentists or All (no limit). Default 20." },
      { label: "Search radius", description: "5, 10, 15, 25 or 50 km. Default 15 km." },
      {
        label: "Only show dentists that have a website",
        description: "Checkbox, on by default. Narrows results heavily.",
      },
    ],
    dataCollected: [
      { name: "Name" },
      { name: "Address", description: "Full and short forms" },
      { name: "Phone" },
      { name: "Email", description: "OpenStreetMap only, roughly a third of practices with a website" },
      { name: "Website" },
      { name: "Latitude / Longitude" },
      { name: "Distance", description: "Straight-line kilometres from the ZIP centre" },
      { name: "Map URL", description: "OpenStreetMap or Google Maps link; the upsert key" },
      { name: "Opening hours" },
      { name: "Open now", description: "Google provider only" },
      { name: "Rating / Reviews", description: "Google provider only" },
      { name: "Business status", description: "Google provider only" },
      { name: "Search ZIP", description: "The ZIP that was searched, kept from first sighting" },
      {
        name: "Competitor",
        description: "Vendor named by the Detect Competitor crawl, “No Competitor”, or empty when the site could not be inspected",
      },
      { name: "Source", description: "osm or google" },
    ],
    howItWorks: [
      {
        title: "Enter a ZIP, result count and radius",
        description: "The form checks the ZIP shape immediately for fast feedback.",
      },
      {
        title: "Browser calls the search API",
        description:
          "The route enforces a per-IP budget of 20 requests per minute and re-validates every parameter; bad values get a 400, never a silent fix.",
      },
      {
        title: "Geocode the ZIP",
        description: "Nominatim (or Google Geocoding) turns the ZIP into a latitude and longitude.",
      },
      {
        title: "Fetch dentist places",
        description:
          "Overpass (or Places Text Search) returns every dentist within the radius, with retries, backoff and endpoint failover.",
      },
      {
        title: "Normalise, de-duplicate, sort",
        description:
          "Records become one Dentist model, duplicates within 50 m with the same name are merged, and results sort nearest-first.",
      },
      {
        title: "Render and export",
        description:
          "The table shows 20 per page; exports and sheet saves always cover every result of the search.",
      },
      {
        title: "Optionally detect competitors",
        description:
          "Detect Competitor crawls each practice website in batches of 10 (honouring robots.txt, HTML only) and fills the Competitor column live; only known vendor names can be saved to the sheet.",
      },
    ],
    output: [
      "A paginated results table with Dentist, Address, Phone, Email, Website, Map and Competitor columns, cards on mobile, and a summary line such as “Centred on Irvine, CA 92618 · 20 dentists found”.",
      "Exports share one column set per provider. OpenStreetMap: Name, Address, Phone, Email, Website, Map URL, Search ZIP, Competitor. Google adds Rating, Reviews, Open Now and Business Status.",
      "Saving to Google Sheets is an upsert keyed on Map URL: new practices are appended, changed cells rewritten, blanks never overwrite existing values and nothing is deleted.",
    ],
    technologies: [
      { name: "Next.js 16", kind: "framework" },
      { name: "React 19", kind: "framework" },
      { name: "TypeScript", kind: "language" },
      { name: "Tailwind CSS v4", kind: "library" },
      { name: "shadcn/ui", kind: "library" },
      { name: "Nominatim", kind: "api" },
      { name: "Overpass API", kind: "api" },
      { name: "Google Places API (New)", kind: "api" },
      { name: "Google Sheets API", kind: "api" },
      { name: "Google Drive API", kind: "api" },
      { name: "Vercel", kind: "infra" },
      { name: "Service-account JWT via node:crypto", kind: "technique" },
    ],
    exampleOutputs: [
      {
        title: "CSV export (OpenStreetMap provider)",
        caption:
          "Column order exactly as exported. The row is the project's own test fixture, not a real practice.",
        columns: ["Name", "Address", "Phone", "Email", "Website", "Map URL", "Search ZIP", "Competitor"],
        rows: [
          [
            "Irvine Family Dental",
            "123 Main St, Irvine, CA 92618",
            "+1 949-555-0100",
            "example@email.com",
            "https://example.com/",
            "https://www.openstreetmap.org/node/1",
            "92618",
            "",
          ],
        ],
      },
    ],
    limitations: [
      "OpenStreetMap is community-maintained and incomplete. Fewer results than requested is normal and nothing is padded or invented.",
      "The public Overpass endpoint fails roughly one request in three under load. The app retries up to three times with backoff inside a 50 s budget and can fail over to another endpoint.",
      "Rate limited to 20 searches per minute per client IP. Nominatim is throttled to about one request per second.",
      "Email coverage is roughly one third of OpenStreetMap dentists that list a website. Emails are never inferred.",
      "The Google provider caps at 60 results, never returns emails, and bills every uncached search.",
      "Caches and rate-limit counters live per process, so hit rates drop on serverless deployments.",
      "Distances are straight-line (Haversine), not driving distance. ZIP geocoding accuracy is OpenStreetMap's.",
      "Provider attribution (OpenStreetMap ODbL, “Powered by Google”) is not currently rendered and must be added before external use.",
      "Competitor detection is URL-host matching only: a vendor's marketing link counts, links rendered by JavaScript are not seen, and an empty cell is not “No Competitor”. The scan lives in the browser tab, so save or export before reloading.",
    ],
  },

  {
    slug: "reddit-monitor",
    name: "Reddit Monitor",
    tagline:
      "Searches selected dental subreddits for posts and comments that mention your keywords, then exports the hits or appends them to a Google Sheet with an email alert.",
    description: [
      "Reddit Monitor (Reddit Community & Keyword Monitor) searches a fixed set of dental professional subreddits for recent posts and comments that mention practice-operations keywords such as forms, billing, payment plans and patient portals. The form opens pre-filled with the default communities and keywords so a routine check is a single click.",
      "Data comes from the free, key-less Arctic Shift Reddit archive rather than the Reddit API. The server fetches a window of each community's recent posts and comments, matches keywords locally, de-duplicates and sorts, then explains any community that contributed nothing: not in the archive, nothing in the time range, or nothing that matched.",
      "Hits can be filtered and paginated on screen, exported to CSV, or appended to a Google Sheet that is de-duplicated by URL. Whenever new rows land in the sheet an HTML notification email goes out over SMTP or Resend.",
    ],
    category: "monitoring",
    status: "active",
    icon: "messages-square",
    runsOn: "Vercel",
    lastUpdated: "2026-09-22",
    liveUrl: "https://reddit-monitoring-tool.vercel.app/",
    githubUrl: "https://github.com/nikhil-pbn/reddit-monitoring-tool",
    githubPrivate: true,
    source: {
      summary: "Arctic Shift Reddit archive (no API key)",
      details: [
        "arctic-shift.photon-reddit.com posts/search and comments/search, 100 items per page, two pages per community",
        "Subreddit index lookup, used only to explain communities that returned nothing",
        "reddit.com is used only to build permalinks",
      ],
    },
    destination: {
      summary: "CSV download, Google Sheets and email",
      details: [
        "CSV download named reddit-monitor-<date>.csv, UTF-8 with BOM",
        "Rows appended to the first tab of a Google Sheet, de-duplicated by URL",
        "HTML email via SMTP (Nodemailer) or Resend when new rows were appended",
      ],
    },
    keyData: ["Type", "Community", "Keyword", "Title / Content", "Score", "Date", "URL"],
    input: [
      {
        label: "Reddit communities",
        description:
          "Chips, up to 15. Default: askdentists, Dentistry, Dentists, DentalAssistant, DentalBilling, DentalHygienist.",
      },
      {
        label: "Keywords",
        description:
          "Chips, up to 30. Default: forms, dental forms, patient forms, intake forms, consent forms, payment, payment plan, billing, patient portal.",
      },
      { label: "Sort", description: "Newest (default), Most relevant, Top or Most comments." },
      { label: "Timeframe", description: "Past day, Past week (default), Past month, Past year or All time." },
      { label: "Reset to defaults", description: "Restores all four fields. Nothing is persisted between visits." },
    ],
    dataCollected: [
      { name: "Type", description: "post or comment" },
      { name: "Community", description: "Subreddit, shown as r/name" },
      { name: "Matched keywords", description: "Every keyword found in the title or body" },
      { name: "Title", description: "Posts only" },
      { name: "Content", description: "Post selftext or comment body" },
      { name: "URL", description: "Reddit permalink; the de-duplication key in the sheet" },
      { name: "Created at", description: "ISO 8601 timestamp" },
      { name: "Score" },
    ],
    howItWorks: [
      {
        title: "Open the pre-filled form",
        description: "Default communities and keywords load from a presets file, so a routine check is one click.",
      },
      {
        title: "Browser posts to the search route",
        description: "The browser never contacts the data provider directly.",
      },
      {
        title: "Validate and cap the request",
        description: "Terms are trimmed and de-duplicated; limits are 15 communities, 30 keywords and 100 characters per term.",
      },
      {
        title: "Fan out to Arctic Shift",
        description:
          "Each community yields one posts fetch and one comments fetch, two requests at a time, paging up to 2 × 100 items inside the timeframe.",
      },
      {
        title: "Match, de-duplicate, sort",
        description:
          "Keywords are matched locally as case-insensitive substrings over title and body; duplicates merge their matched keywords.",
      },
      {
        title: "Explain empty communities",
        description: "Not in the archive, nothing in the time range, or nothing that mentioned your keywords.",
      },
      {
        title: "Filter, export or save",
        description:
          "Filter and paginate on screen, download CSV, or append to the Google Sheet, which emails the genuinely new rows.",
      },
    ],
    output: [
      "A results table (Type, Community, Keyword, Title / Content, Score, Date, URL) with a free-text filter, per-column filters and 20, 50 or 100 rows per page.",
      "A CSV export with formula-injection protection, or a sheet save that reports “Added 5 rows, 2 already there · emailed”.",
      "The email carries up to 10 result cards with type, community, date, score, title and keyword chips, plus a button to open the spreadsheet.",
    ],
    technologies: [
      { name: "Next.js 16", kind: "framework" },
      { name: "React 19", kind: "framework" },
      { name: "TypeScript", kind: "language" },
      { name: "Tailwind CSS v4", kind: "library" },
      { name: "shadcn/ui", kind: "library" },
      { name: "Nodemailer", kind: "library" },
      { name: "Arctic Shift API", kind: "api" },
      { name: "Google Sheets API v4", kind: "api" },
      { name: "Resend API", kind: "api" },
      { name: "SMTP", kind: "infra" },
      { name: "Service-account JWT via node:crypto", kind: "technique" },
    ],
    exampleOutputs: [
      {
        title: "Columns shared by the CSV, the Google Sheet and the email",
        caption: "No sample rows are committed to the repository, so only the exact column shape is shown.",
        columns: ["Type", "Community", "Keyword", "Title / Content", "Score", "Date", "URL"],
        rows: [],
      },
    ],
    limitations: [
      "Coverage per search is bounded to 200 posts and 200 comments per community. Busy subreddits over long timeframes get truncated.",
      "Arctic Shift rate-limits aggressively, so concurrency is pinned to two requests and busy periods surface as “Reddit search is busy right now”.",
      "The archive's own text search times out, so keyword matching happens locally after fetching.",
      "“Most comments” has no local equivalent and falls back to newest. Scores are often 1 because items are archived close to posting time.",
      "AutoModerator comments and removed or deleted bodies are dropped. Private subreddits cannot be searched.",
      "Caps: 15 communities, 30 keywords, 100 characters per term, 2,000 rows per sheet save.",
      "Results are not persisted; every search refetches and resets filters and pagination.",
      "Email failure never fails a save. Rows are written first and the mail error is reported as a warning.",
    ],
  },

  {
    slug: "ahrefs-keyword-scraper",
    name: "Ahrefs Keyword Scraper",
    tagline:
      "Finds the websites ranking for a keyword in a chosen country and enriches each domain with Ahrefs traffic, backlink and rating metrics.",
    description: [
      "Ahrefs Keyword Scraper (in-app title: Ahrefs Website Scraper) finds the websites ranking organically for a keyword in a chosen country through the Ahrefs API v3 SERP Overview endpoint, then enriches each unique domain with Site Explorer metrics: organic traffic, keywords, traffic value, backlinks, referring domains and top traffic country.",
      "It has two modes. Keyword search needs the paid Ahrefs API add-on and returns the full enriched table. Domain lookup works on the free public tier: paste a list of domains and get Domain Rating for each. The app detects which tier the configured token has and locks the tabs accordingly.",
      "Results stream into the browser as NDJSON events, so the activity log, progress bar and table update row by row. The table is sortable on every column and downloads as Excel, Word, CSV or JSON.",
    ],
    category: "seo",
    status: "prototype",
    icon: "search",
    runsOn: "Vercel",
    lastUpdated: "2026-07-17",
    liveUrl: "https://ahref-web-scrapper.vercel.app/",
    githubUrl: "https://github.com/nikhil-pbn/Ahref-Web-Scrapper",
    source: {
      summary: "Ahrefs API v3",
      details: [
        "SERP Overview for the ranking pages of a keyword and country",
        "Site Explorer metrics, backlinks-stats and metrics-by-country per domain",
        "Public domain-rating-free endpoint for the free-tier Domain lookup mode",
        "Subscription info to detect the token's tier and remaining units",
      ],
    },
    destination: {
      summary: "Excel, Word, CSV or JSON download",
      details: [
        "Excel .xlsx (default), Word .doc, CSV with BOM, or a JSON bundle with the run metadata",
        "Files are named ahrefs-<keyword>.<ext> or ahrefs-domain-ratings.<ext>",
        "Nothing is stored server-side; results live in the page until refresh",
      ],
    },
    keyData: ["Domain", "DR", "UR", "Backlinks", "Ref. domains", "Keywords", "Traffic", "Top country"],
    input: [
      { label: "Keyword", description: "Free text, for example “dentist”." },
      {
        label: "Country",
        description:
          "14 options: US, UK, Canada, Australia, India, Germany, France, Spain, Italy, Netherlands, Brazil, UAE, Singapore, South Africa.",
      },
      { label: "How many websites", description: "1 to 50. Default 10." },
      {
        label: "Only keep results where the keyword appears in the domain or URL",
        description: "Checkbox, off by default. Useful for exact-match-domain prospecting.",
      },
      { label: "Domains", description: "Domain lookup mode: one per line or comma-separated, up to 100." },
      {
        label: "Ahrefs API token",
        description: "Optional override; otherwise the server's configured token is used and never leaves the server.",
      },
    ],
    dataCollected: [
      { name: "Position", description: "Re-ranked 1..N over organic results only" },
      { name: "URL / Title" },
      { name: "Domain" },
      { name: "Domain Rating (DR)" },
      { name: "URL Rating (UR)" },
      { name: "Backlinks" },
      { name: "Referring domains" },
      { name: "Organic keywords" },
      { name: "Page traffic" },
      { name: "Domain organic traffic" },
      { name: "Domain traffic value", description: "USD, converted from Ahrefs cents" },
      { name: "Top keyword / volume", description: "JSON export only" },
      { name: "Top traffic country" },
    ],
    howItWorks: [
      {
        title: "Detect the token tier on load",
        description:
          "A config route reports whether a token is present and whether it is full or public tier, without exposing the token.",
      },
      {
        title: "Connect and test",
        description:
          "The connection panel validates the token shape and shows plan name and API units used. Public-tier tokens lock the Keyword search tab.",
      },
      {
        title: "Discover ranking pages",
        description: "SERP Overview results are filtered to organic positions, sorted and de-duplicated by URL.",
      },
      {
        title: "Optionally filter to keyword-in-URL",
        description: "Keeps only results whose URL contains the keyword.",
      },
      {
        title: "Enrich each domain",
        description:
          "Four workers fetch three Site Explorer endpoints per domain in parallel; results are memoised so duplicate domains do not burn extra units.",
      },
      {
        title: "Stream rows to the browser",
        description: "Each finished row arrives as an NDJSON event and appears in the table immediately.",
      },
      {
        title: "Sort and download",
        description: "Click any column to sort (blanks sink to the bottom), then download in the chosen format.",
      },
    ],
    output: [
      "A live-updating, click-sortable table: #, Website / Page, DR, UR, Backlinks, Ref. domains, Keywords, Page traffic, Domain traffic, Domain value, Top country.",
      "Downloads as Excel (default), Word, CSV or JSON. The JSON bundle wraps mode, keyword, country, generatedAt, total and the full result objects.",
      "Domain lookup mode returns a simpler table: #, Domain, Domain Rating.",
    ],
    technologies: [
      { name: "Next.js 16", kind: "framework" },
      { name: "React 19", kind: "framework" },
      { name: "TypeScript", kind: "language" },
      { name: "Tailwind CSS v4", kind: "library" },
      { name: "SheetJS (xlsx)", kind: "library" },
      { name: "Ahrefs API v3", kind: "api" },
      { name: "NDJSON streaming", kind: "technique" },
    ],
    exampleOutputs: [
      {
        title: "Export columns (Keyword search mode)",
        caption: "No sample rows are committed to the repository, so only the exact export header is shown.",
        columns: [
          "#",
          "Domain",
          "URL",
          "Title",
          "DR",
          "UR",
          "Backlinks",
          "Ref. domains",
          "Keywords",
          "Page traffic",
          "Domain traffic",
          "Domain value (USD)",
          "Top country",
        ],
        rows: [],
      },
    ],
    limitations: [
      "Keyword search requires a paid Ahrefs API subscription and consumes API units. Free tokens get Domain Rating only.",
      "At most 50 websites per keyword run and 100 domains per Domain Rating run.",
      "Four concurrent enrichments and five concurrent DR lookups; there is no rate-limit backoff or retry.",
      "Routes run for at most 300 s, so a 50-site run near the ceiling can be cut off.",
      "Organic results only: ads and SERP features are dropped, so the # column is not the true SERP position.",
      "SERP Overview and Site Explorer are separate access levels; a token can work for one and not the other.",
      "Free-tier tokens cannot be validated because the public endpoints accept any string.",
      "No persistence: results vanish on refresh. No auth or rate limiting on the app's own routes.",
    ],
  },

  {
    slug: "location-scraper",
    name: "Location Scraper",
    tagline:
      "Paste company website URLs and it finds each site's locations page and extracts every physical location with address, phone, coordinates and hours.",
    description: [
      "Location Scraper turns a list of company website URLs into a structured table of their physical locations. For each site it discovers the Locations, Stores, Branches, Dealers or Find-a-Clinic page, extracts every location it can find and writes the results to CSV, Excel and JSON.",
      "Discovery scores navigation and footer links by location keywords, reads sitemaps declared in robots.txt and sitemap.xml, and probes about 25 common paths such as /locations and /store-locator. Extraction runs four layered static strategies (JSON-LD, embedded JSON in script tags, schema.org microdata and HTML card or table heuristics) and falls back to a headless Chromium render that scrolls, clicks Load more and captures the page's hidden JSON APIs when static parsing finds nothing.",
      "A local Flask web UI streams progress into a live table with per-site status, and the same engine runs from the command line. Observed usage so far has been US dental practices and groups.",
    ],
    category: "data-extraction",
    status: "prototype",
    icon: "map-pin",
    runsOn: "Local · Python / Flask",
    lastUpdated: "2026-07-30",
    source: {
      summary: "The supplied company websites themselves",
      details: [
        "Homepage, robots.txt (Sitemap entries only), sitemap.xml and sitemap_index.xml",
        "About 25 common paths such as /locations, /store-locator, /branches, /dealers, /clinics and /find-us",
        "Same-domain hub sub-pages and individual location detail pages",
        "Hidden JSON/XHR endpoints captured passively during a headless Chromium render",
      ],
    },
    destination: {
      summary: "CSV, Excel and JSON files per job",
      details: [
        "outputs/<job id>/locations.csv, locations.xlsx and locations.json",
        "summary.csv with one row per website and failed.csv for sites that yielded nothing",
        "Browser downloads of the CSV, summary and Excel files",
      ],
    },
    keyData: ["Business name", "Location name", "Address", "City / State / ZIP", "Lat / Lng", "Phone", "Hours", "Source"],
    input: [
      { label: "Website URLs", description: "Textarea, one per line or free text; URLs are auto-detected. Up to 1,000 per run." },
      { label: "Import CSV / TXT", description: "Appends URLs from a file to the textarea." },
      { label: "Parallel sites", description: "1 to 30 concurrent sites. Default 8." },
      { label: "Table filter", description: "Client-side search over the live results table." },
      {
        label: "CLI flags",
        description: "--concurrency, --timeout, --retries, --output-dir, --max-depth, --delay, --no-headless.",
      },
    ],
    dataCollected: [
      { name: "website" },
      { name: "business_name" },
      { name: "location_name" },
      { name: "address", description: "Full string plus street, city, state, zip and country" },
      { name: "latitude / longitude" },
      { name: "phone" },
      { name: "email" },
      { name: "manager" },
      { name: "hours" },
      { name: "services" },
      { name: "store_id" },
      { name: "location_url" },
      { name: "google_maps_url / directions_url" },
      { name: "source", description: "json-ld, embedded-json, microdata, html-card, html-table or hidden-api" },
    ],
    howItWorks: [
      {
        title: "Parse the URL list",
        description: "URLs are extracted client-side, posted to the Flask API and normalised again on the server.",
      },
      {
        title: "Start a background job",
        description: "Each run gets a job id and executes in a thread with an asyncio semaphore bounding parallel sites.",
      },
      {
        title: "Discover the locations page",
        description:
          "Score same-domain links by location keywords with a nav and footer bonus, scan sitemaps, then probe common paths if nothing scores.",
      },
      {
        title: "Extract statically",
        description:
          "JSON-LD, embedded JSON, microdata and HTML heuristics run in order and merge, de-duplicating on name, address, phone and coordinates.",
      },
      {
        title: "Fall back to a browser render",
        description:
          "Headless Chromium accepts cookie banners, scrolls six times, clicks Load more up to five times and captures JSON responses that look like location data.",
      },
      {
        title: "Enrich and retry",
        description: "Directory pages with three or more records are followed into detail pages to fill blanks.",
      },
      {
        title: "Write outputs",
        description:
          "Results return to input order and are written per job while the browser polls for live stats, a per-site feed and the table.",
      },
    ],
    output: [
      "Four stat tiles (sites done, locations found, sites with data, elapsed), a per-site feed with status chips, and a filterable table of the first 2,000 rows.",
      "Per job on disk: locations.csv, locations.xlsx and locations.json with the 21 fields, plus summary.csv and failed.csv.",
      "Largest recorded run: 128 locations from three dental-group websites, including 88 from a single chain.",
    ],
    technologies: [
      { name: "Python 3", kind: "language" },
      { name: "Flask", kind: "framework" },
      { name: "aiohttp", kind: "library" },
      { name: "BeautifulSoup4 + lxml", kind: "library" },
      { name: "Playwright (Chromium)", kind: "library" },
      { name: "pandas", kind: "library" },
      { name: "openpyxl", kind: "library" },
      { name: "tqdm", kind: "library" },
      { name: "Vanilla HTML + JS UI", kind: "technique" },
    ],
    exampleOutputs: [
      {
        title: "locations.csv (selected columns from real runs)",
        caption: "Real business records from two recorded jobs. Full files carry 21 columns.",
        columns: ["website", "location_name", "street", "city", "state", "zip", "phone", "source"],
        rows: [
          [
            "northeastoralsurgery.com",
            "Northeast Oral Surgery and Dental Implant Center",
            "203 Turnpike St Suite G-2",
            "North Andover",
            "MA",
            "01845",
            "+19786825255",
            "json-ld",
          ],
          [
            "dentalassociates.com",
            "Appleton",
            "4660 W. College Ave",
            "Appleton",
            "WI",
            "54913",
            "(920) 730-0345",
            "embedded-json",
          ],
        ],
      },
      {
        title: "summary.csv",
        caption: "One row per website, complete file from a recorded job.",
        columns: ["Website", "Total Locations", "Status", "Time Taken (s)", "Location Page", "Errors"],
        rows: [
          ["https://btydentalwa.com", "9", "ok", "13.1", "https://btydentalwa.com/contact-us/", ""],
          ["https://dentalassociates.com", "31", "ok", "18.8", "https://www.dentalassociates.com/locations", ""],
          ["https://coastdental.com", "88", "ok", "48.5", "https://coastdental.com/locations", ""],
        ],
      },
    ],
    limitations: [
      "Up to 1,000 URLs per run and 1 to 30 parallel sites. Requests time out at 20 s with three retries, exponential backoff and a random 0.4 to 1.2 s delay per site.",
      "Per-site caps: crawl depth 2, 25 pages, 40 detail pages, six scroll rounds and five Load more clicks.",
      "robots.txt is read only for Sitemap entries; Disallow rules are not honoured.",
      "Bot-blocked or captcha pages are flagged as a possible block and still processed, so results can vary between runs of the same sites.",
      "Heuristic extraction produces artefacts: street numbers mistaken for ZIPs, page furniture such as “Call Us Today!” as a location name, duplicate rows from different strategies, and hours kept as raw HTML.",
      "Playwright is optional. Without the Chromium download, JavaScript-heavy sites are skipped and only static extraction runs.",
      "Jobs live in memory with no persistence; restarting the server loses job state, though files on disk remain.",
      "Serves on localhost only with no auth, and both entry points pip-install their dependencies at import time.",
    ],
  },
];
