(function(){
  const year = document.getElementById('year');
  if(year) year.textContent = new Date().getFullYear();

  // Mobile nav
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  if(menuBtn && mobileNav){
    const closeLinks = mobileNav.querySelectorAll('[data-close]');
    const setOpen = (open) => {
      menuBtn.setAttribute('aria-expanded', String(open));
      mobileNav.hidden = !open;
    };
    menuBtn.addEventListener('click', () => {
      const open = menuBtn.getAttribute('aria-expanded') !== 'true';
      setOpen(open);
    });
    closeLinks.forEach(a => a.addEventListener('click', () => setOpen(false)));
    window.addEventListener('keydown', (e) => {
      if(e.key === 'Escape') setOpen(false);
    });
  }

  // Simple local lead capture for GitHub Pages.
  const submitToEndpoint = async (payload) => {
    const key = 'pale_blue_leads';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    existing.push({ ...payload, at: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(existing));
    return { ok: true };
  };

  const wireForm = (formId, noticeId, successMsg) => {
    const form = document.getElementById(formId);
    const notice = document.getElementById(noticeId);
    if(!form || !notice) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      notice.hidden = false;
      notice.textContent = 'Submitting...';
      try{
        const data = Object.fromEntries(new FormData(form).entries());
        await submitToEndpoint({ form: formId, ...data });
        notice.textContent = successMsg;
        form.reset();
      }catch(err){
        notice.textContent = 'Something went wrong. Please try again or call +1 (787) 428-1417.';
      }
    });
  };

  wireForm('fitForm', 'fitNotice', 'Thanks — we\'ll follow up with next steps shortly.');
  wireForm('leadMagnetForm', 'leadNotice', 'Check your inbox — we\'ll send the checklist link shortly.');
  wireForm('contactForm', 'contactNotice', 'Thanks — we\'ll respond soon.');
  wireForm('bookIntakeForm', 'bookNotice', 'Received — we\'ll confirm by email and send scheduling details.');

  // Admin page: render stored leads
  const adminTable = document.getElementById('adminTable');
  if(adminTable){
    const key = 'pale_blue_leads';
    const leads = JSON.parse(localStorage.getItem(key) || '[]').reverse();
    const safe = (v) => String(v ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
    adminTable.innerHTML = leads.map(l => {
      const at = new Date(l.at || Date.now()).toLocaleString();
      return `<tr>
        <td>${safe(at)}</td>
        <td>${safe(l.form)}</td>
        <td>${safe(l.company || l.name || '')}</td>
        <td>${safe(l.email || '')}</td>
        <td>${safe(l.goal || l.message || l.industry || '')}</td>
      </tr>`;
    }).join('') || '<tr><td colspan="5">No leads yet.</td></tr>';
  }

  // Calendly embed helper (optional)
  const calendlyContainer = document.getElementById('calendlyEmbed');
  if(calendlyContainer){
    const meta = document.querySelector('meta[name="calendly:url"]');
    const url = meta?.content || '';
    if(url && url.includes('calendly.com')){
      const s = document.createElement('script');
      s.src = 'https://assets.calendly.com/assets/external/widget.js';
      s.async = true;
      document.head.appendChild(s);

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://assets.calendly.com/assets/external/widget.css';
      document.head.appendChild(link);

      const div = document.createElement('div');
      div.className = 'calendly-inline-widget';
      div.dataset.url = url;
      div.style.minWidth = '320px';
      div.style.height = '720px';
      calendlyContainer.appendChild(div);
    }else{
      calendlyContainer.innerHTML = '<div class="notice">Add your Calendly link in the <meta name="calendly:url"> tag to enable scheduling.</div>';
    }
  }
})();