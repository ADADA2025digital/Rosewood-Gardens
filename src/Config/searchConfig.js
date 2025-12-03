export const SEARCH_ITEMS = [
  { label: "Home", path: "/", keywords: ["home", "main"] },
  { label: "About Us", path: "/about", keywords: ["about", "who we are"] },
  { label: "Our Story", path: "/visitussoon", keywords: ["story", "history"] },
  { label: "Our Team", path: "/visitussoon", keywords: ["team", "staff"] },
  { label: "Services", path: "/services", keywords: ["services", "care"] },

  {
    label: "Support at Home",
    path: "/support-at-home",
    keywords: ["home care", "support at home", "in-home"],
  },

  {
    label: "Support at Home Price List",
    // will become /support-at-home-price-list?search=pricing on click
    path: "/support-at-home-price-list?search=pricing",
    keywords: ["price", "fees", "cost", "pricing"],
  },

  {
    label: "Facilities",
    path: "/facilities",
    keywords: ["facilities", "rooms", "amenities"],
  },

  {
    label: "FAQ",
    // will become /faq?search=faq-top on click
    path: "/faq?search=faq-top",
    keywords: ["faq", "questions", "help"],
  },

  // Contact sections – all use `?search=...`
  {
    label: "Contact – Phone",
    path: "/contact-us?search=contact-data",
    keywords: ["phone", "call", "telephone", "mobile"],
  },

  {
    label: "Contact – Email",
    path: "/contact-us?search=contact-data",
    keywords: ["email", "mail", "write to us"],
  },

  {
    label: "Contact – Form",
    path: "/contact-us?search=form",
    keywords: ["form"],
  },

  { label: "Career", path: "/career", keywords: ["jobs", "career", "apply"] },

  { label: "Blog", path: "/blog", keywords: ["blog", "articles", "news"] },

  {
    label: "Newsletter",
    path: "/newsletter",
    keywords: ["newsletter", "updates", "email updates"],
  },

  {
    label: "Events",
    path: "/events",
    keywords: ["events", "programs", "activities"],
  },

  {
    label: "Privacy Policy",
    path: "/privacypolicy",
    keywords: ["privacy", "policy", "data"],
  },

  {
    label: "Terms of Use",
    path: "/term-of-conditions",
    keywords: ["terms", "conditions", "legal"],
  },

  {
    label: "Accessibility",
    path: "/accessibility",
    keywords: ["accessibility", "a11y"],
  },

  {
    label: "Clinical Disclaimer",
    path: "/clinical-disclaimer",
    keywords: ["clinical", "disclaimer", "medical"],
  },

  {
    label: "Visit Us Soon",
    path: "/visitussoon",
    keywords: ["coming soon", "visit us"],
  },
];
