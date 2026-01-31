# Pale Blue The Group LLC — Website (GitHub Pages)

This is a lightweight, professional static website designed to convert visitors into booked discovery calls.

## What’s included
- Home page with CTA + fit check
- Services, Capture System, About, Contact
- Booking page with Calendly inline embed (optional)
- Capability Statement Checklist landing page
- Simple admin demo page (localStorage) at `/admin.html`

## Set your Calendly link
Edit this line in each HTML file:
```html
<meta name="calendly:url" content="https://calendly.com/your-org/your-event" />
```

## Publish on GitHub Pages
1. Create a repo (e.g., `pale-blue-site`)
2. Upload these files to the repo root
3. In GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**
4. Select branch `main` and folder `/ (root)`

## Notes
- Forms currently store submissions in the visitor’s browser (localStorage) so it works on GitHub Pages.
- For production lead storage, connect the form submit in `script.js` to a serverless endpoint.
