// Ask a native speaker to check the Filipino and Cebuano text.
const text = {
  en: {
    skip: "Skip to main content", navHome: "Home", navAppt: "Appointments",
    navResults: "Lab results", navLogin: "Log in",
    title: "Your health records, in one place",
    lead: "See your appointments and lab results, and book a visit with a doctor. No account needed to call us.",
    cta: "Book an appointment", servicesTitle: "What you can do here",
    s1: "View or book appointments", s1d: "Choose a doctor, a date and a time.",
    s2: "See lab results", s2d: "Read your test results after the lab sends them.",
    s3: "Check prescriptions", s3d: "See which medicines your doctor ordered.",
    s4: "Contact the hospital", s4d: "Send a question or find our phone number.",
    emTitle: "Is this an emergency?",
    emText: "Do not use this website. Call the emergency number or go to the Emergency Room right away.",
    footer: "This is a student project and not a real hospital website."
  },
  fil: {
    skip: "Lumaktaw sa pangunahing nilalaman", navHome: "Tahanan", navAppt: "Mga appointment",
    navResults: "Resulta ng lab", navLogin: "Mag-log in",
    title: "Lahat ng iyong health record, nasa isang lugar",
    lead: "Tingnan ang iyong mga appointment at resulta ng lab, at mag-book ng pagbisita sa doktor. Hindi kailangan ng account para tumawag sa amin.",
    cta: "Mag-book ng appointment", servicesTitle: "Ano ang magagawa mo rito",
    s1: "Tingnan o mag-book ng appointment", s1d: "Pumili ng doktor, petsa at oras.",
    s2: "Tingnan ang resulta ng lab", s2d: "Basahin ang resulta ng iyong test kapag naipadala na ng lab.",
    s3: "Tingnan ang mga reseta", s3d: "Alamin ang mga gamot na inireseta ng doktor mo.",
    s4: "Makipag-ugnayan sa ospital", s4d: "Magpadala ng tanong o hanapin ang aming numero.",
    emTitle: "Emergency ba ito?",
    emText: "Huwag gamitin ang website na ito. Tumawag sa emergency number o pumunta agad sa Emergency Room.",
    footer: "Proyekto ito ng mga estudyante at hindi totoong website ng ospital."
  },
  ceb: {
    skip: "Laktaw sa panguna nga sulod", navHome: "Panimalay", navAppt: "Mga appointment",
    navResults: "Resulta sa lab", navLogin: "Pag-log in",
    title: "Tanan nimong health record, naa sa usa ka lugar",
    lead: "Tan-awa ang imong mga appointment ug resulta sa lab, ug mag-book og pagbisita sa doktor. Dili kinahanglan og account aron motawag kanamo.",
    cta: "Mag-book og appointment", servicesTitle: "Unsa ang imong mahimo dinhi",
    s1: "Tan-awa o mag-book og appointment", s1d: "Pili og doktor, petsa ug oras.",
    s2: "Tan-awa ang resulta sa lab", s2d: "Basaha ang resulta sa imong test kung gipadala na sa lab.",
    s3: "Tan-awa ang mga reseta", s3d: "Tan-awa kung unsang mga tambal ang gireseta sa imong doktor.",
    s4: "Kontaka ang ospital", s4d: "Magpadala og pangutana o pangitaa ang among numero.",
    emTitle: "Emergency ba ni?",
    emText: "Ayaw gamita kining website. Tawag sa emergency number o adto dayon sa Emergency Room.",
    footer: "Kini usa ka proyekto sa mga estudyante ug dili tinuod nga website sa ospital."
  }
};

const html = document.documentElement;
const langButtons = document.querySelectorAll("[data-lang]");

function save(key, value) { try { localStorage.setItem(key, value); } catch (e) {} }
function load(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }

function setLanguage(code) {
  html.lang = code;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const value = text[code][el.dataset.i18n];
    if (value) el.textContent = value;
  });
  langButtons.forEach(b => b.setAttribute("aria-pressed", String(b.dataset.lang === code)));
  save("lang", code);
}

langButtons.forEach(b => b.addEventListener("click", () => setLanguage(b.dataset.lang)));

let scale = Number(load("scale")) || 100;
function setScale(value) {
  scale = Math.min(200, Math.max(100, value));
  html.style.fontSize = scale + "%";
  save("scale", scale);
}
document.getElementById("larger").addEventListener("click", () => setScale(scale + 20));
document.getElementById("smaller").addEventListener("click", () => setScale(scale - 20));

setScale(scale);
setLanguage(load("lang") && text[load("lang")] ? load("lang") : "en");
/* ---------- Show or hide parts of the site depending on log in ---------- */
function portalIsLoggedIn() {
  try { return !!sessionStorage.getItem("loggedInId"); } catch (e) { return false; }
}

function applyAuthState() {
  const loggedIn = portalIsLoggedIn();
  document.querySelectorAll("[data-auth='in']").forEach(el => { el.hidden = !loggedIn; });
  document.querySelectorAll("[data-auth='out']").forEach(el => { el.hidden = loggedIn; });
}
applyAuthState();

// Pages marked data-protected send visitors who are not logged in to the log in page
if (document.body.hasAttribute("data-protected") && !portalIsLoggedIn()) {
  window.location.replace("login.html");
}