DANCESCENE WEBSITE - LOCAL BUILD
================================

This is a static HTML/CSS/JavaScript website designed so it can later be moved to a public host and connected to dancescene.com.

FILES
-----
index.html      Main website
styles.css      All visual styling
script.js       Mobile navigation, timetable filters, animation and enquiry email behaviour
assets/         Logo and temporary concept imagery

HOW TO OPEN LOCALLY
-------------------
Double-click index.html, or right-click and open it in Chrome/Edge/Safari.

IMPORTANT: TEMPORARY CONTENT
----------------------------
- The hero image is cropped from the supplied concept mock-up and should be replaced with a real Dancescene performance photo before public launch.
- Gallery blocks are placeholders for real photography.
- Teacher names, biographies, class times, ages and prices still need final information.
- Instagram and Facebook links are placeholders.
- Northampton School address/map details are still required.
- Privacy policy should be added before launch.

CONTACT FORM
------------
The local build uses a mailto link. When submitted, it opens the visitor's email app with the enquiry pre-filled.
For a public site, this can be replaced with:
- IONOS/PHP form handling,
- Formspree,
- Netlify Forms,
- another secure form service,
- or a lightweight serverless endpoint.

DOMAIN / PUBLIC WEBSITE LATER
-----------------------------
Because this is plain HTML/CSS/JS, it can be hosted almost anywhere.
Good options include:
1. IONOS web hosting, using the dancescene.com domain already owned there.
2. Netlify or Cloudflare Pages, with dancescene.com pointed to that host using DNS records.
3. A future CMS version if Sophie eventually wants more self-service editing.

The current code has deliberately been kept framework-free so it is easy to transfer, maintain and host.


v1.2: Opening year wording changed to 2007. Gallery covers now open scrollable single-page album pop-outs. Print purchase buttons are UI placeholders only; live checkout/fulfilment requires payment and printer integrations when the site is deployed publicly.
