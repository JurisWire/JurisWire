# JurisWire Production Handoff

## Brand architecture
- Parent brand: **JurisWire**
- Descriptor: **LAW • COURTS • JUSTICE**
- Editorial division: **JurisWire News**
- Professional division: **JurisWire Legal**
- Recommended split on main homepage: approximately 80% editorial / 20% professional-practice discovery.

## CMS build
Preferred: WordPress with a custom lightweight theme, Gutenberg-compatible editorial blocks, minimal page-builder dependence.

### Custom post types / collections
1. News
2. Judgments
3. Live Blogs
4. Digests
5. Analysis / Explainers
6. Opinion
7. Professionals
8. Practice Areas

### Taxonomies
- Court
- High Court
- Judge
- Subject
- Act
- Section
- Author
- Year
- Tags

## Essential admin functionality
- Draft / review / publish / schedule
- Breaking-news toggle
- Featured-story toggle
- Editor's Pick toggle
- Homepage ordering
- Judgment metadata fields
- PDF upload
- Live-blog timestamp entries
- Author management
- Professional-profile management
- Practice-area management
- Ad-slot management
- Newsletter settings
- SEO metadata
- Social preview controls

## Core URLs
- `/`
- `/latest/`
- `/supreme-court/`
- `/high-courts/`
- `/high-courts/delhi-high-court/`
- `/judgments/`
- `/analysis/`
- `/opinion/`
- `/digests/`
- `/legal/`
- `/legal/professionals/`
- `/legal/practice-areas/`
- `/about/`
- `/contact/`

## SEO / discovery
- NewsArticle schema
- Article schema
- Breadcrumb schema
- Organization schema
- Person / author schema
- LegalService schema only on JurisWire Legal pages where appropriate
- XML sitemap
- Google News sitemap
- Image sitemap
- Canonicals
- Open Graph
- X Cards
- Google Publisher Center readiness
- Google Discover-friendly large images

## Performance
- Mobile-first
- Core Web Vitals focus
- WebP / AVIF
- responsive images
- lazy loading
- server cache
- CDN
- database optimisation
- minimal JS

## Integrations
- GA4
- Search Console
- Microsoft Clarity
- Newsletter provider
- WhatsApp Channel
- Push notifications
- AdSense / Google Ad Manager
- Direct ad slots
- YouTube / Instagram / X embeds

## Security / ownership
Client must retain ownership and admin access to domain, DNS, hosting, CDN, CMS super-admin, Analytics, Search Console, newsletter account and ad accounts.

Implement:
- HTTPS
- 2FA
- WAF/firewall
- login-rate limiting
- malware scanning
- daily database backup
- weekly full backup
- off-server backup copy
- activity logs
- role-based permissions

## Editorial / professional separation
- News authoring should use JurisWire News Desk or named editorial authors.
- Legal-practice pages should use JurisWire Legal branding.
- No client testimonials, success-rate claims or unverifiable comparative claims in the professional-practice section.
- No legal-service solicitation CTAs inside ordinary news articles.
- Final disclaimer and practice-profile wording should be reviewed before launch for applicable professional-conduct compliance.

## Phase 2 options
- AI judgment summaries
- advanced semantic judgment search
- case comparison
- personalised feeds
- text to speech
- mobile apps
- memberships
- legal jobs/internships
- law-school section
- events/webinars
- JurisWire Pro

## EXPANDED PRODUCT MODULES

### JurisWire Desk (`admin.html`)
Prototype editorial publishing workflow with headline, section, author, summary, article body, tags, featured image, Save Draft and Publish actions. The static prototype uses browser localStorage only. Production implementation must use authenticated CMS users, server/database storage, media uploads, revisions, scheduling, permalink generation and editorial permissions.

### Lex Library (`statutes.html`)
Bare Acts / Rules / Regulations library with text search and category filtering. Production implementation should support Act pages, section/chapter navigation, official PDF/source links, amendment history, cross-links to relevant judgments and SEO-friendly URLs.

### Legal Careers (`careers.html`)
Jobs, internships, government legal vacancies, panel counsel/advocate empanelments and in-house opportunities. Production fields should include organisation, role, location, PQE, deadline, eligibility, application URL, source, verification status and expiry date.

### Legal Help Desk (`consultation.html`)
Professionally separated consultation/enquiry workflow. Production implementation should use secure submission storage/email routing, spam protection, privacy consent, conflict-check workflow and an appropriate advocate advertising/solicitation disclaimer.

### Legal Careers — Public Submission & Moderation Workflow (Updated)
`careers.html` is now designed as a public legal-opportunity board, not an admin-only jobs page.

#### Public functions
- Browse published opportunities
- Search/filter by opportunity type, organisation, role, location and keyword
- Public **Post an Opportunity** form for recruiters, chambers, law firms, companies, banks/NBFCs, PSUs, institutions and government bodies
- Submission fields: organisation, opportunity type, role/title, location, work mode, experience/eligibility, vacancies, salary/stipend, deadline, description, application email/link, official source URL, recruiter name/email and consent
- Public disclaimer and applicant-verification notice

#### Supported opportunity types
- Law Firm Hiring
- Advocate Vacancy
- In-House Legal
- Government Legal Vacancy
- Empanelment
- Bank / NBFC Panel
- PSU Opportunity
- Internship
- Research / Judicial
- Other Legal Opportunity

#### Moderation workflow
**Public Submission → Pending Review → JurisWire Admin Review → Approve & Publish / Reject → Public Listing**

Public users must never have direct publish rights. Production implementation should include authenticated admin moderation, database storage, anti-spam/CAPTCHA, email verification, audit trail, expiry/unpublish rules, report-listing function, source verification flag, optional featured listing controls and secure handling of recruiter contact details.

The static prototype demonstrates this workflow using browser `localStorage` only. This is for UX demonstration and must not be treated as a production backend.

## Public Legal Enquiry Workflow
- Public CTA: **Submit a Legal Enquiry**.
- Enquiries are private and must never be published.
- Production workflow: public form → secure private database/inbox → authorized legal/admin review → internal follow-up.
- Add CAPTCHA/rate limiting, role-based access, secure document storage and appropriate retention controls.
- The form must state that submission does not itself create an advocate-client relationship, constitute acceptance of engagement, or guarantee any outcome.
