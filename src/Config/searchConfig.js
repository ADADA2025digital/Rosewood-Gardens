export const PAGE_SEARCH_CONFIG = {
  // FAQ Page
  faq: [
    {
      label: "FAQ – General Questions",
      path: "/faq",
      sectionId: "faq-general",
      keywords: [
        "faq",
        "questions",
        "general questions",
        "rosewood gardens faq",
        "about rosewood gardens",
        "aged care questions",
        "disability care questions",
        "support options",
        "how can you support me",
        "family support",
      ],
    },
    {
      label: "FAQ – In-Home Care & HCP (Support at Home)",
      path: "/faq",
      sectionId: "faq-in-home-care",
      keywords: [
        "home care",
        "in-home care",
        "support at home",
        "hcp",
        "home care package",
        "use my hcp",
        "what does hcp cover",
        "support at home questions",
        "in-home aged care",
        "care at home",
      ],
    },
    {
      label: "FAQ – NDIS & SIL",
      path: "/faq",
      sectionId: "faq-ndis-sil",
      keywords: [
        "ndis",
        "ndis supports",
        "ndis package",
        "ndis plan",
        "support coordinator",
        "sil",
        "supported independent living",
        "sda",
        "specialist disability accommodation",
        "ndis services",
      ],
    },
    {
      label: "FAQ – Residential Care",
      path: "/faq",
      sectionId: "faq-residential-care",
      keywords: [
        "residential care",
        "aged care facility",
        "rooms",
        "single rooms",
        "ensuite",
        "24/7 nursing",
        "clinical care",
        "move into care",
        "live in the residence",
        "long-term stay",
      ],
    },
    {
      label: "FAQ – Costs & Funding",
      path: "/faq",
      sectionId: "faq-costs-funding",
      keywords: [
        "fees",
        "costs",
        "funding",
        "hcp funding",
        "ndis funding",
        "weekly fee",
        "rad",
        "dap",
        "bonds",
        "accommodation costs",
        "private self-funded care",
        "what is included",
        "what does it cover",
      ],
    },
    {
      label: "FAQ – Admissions & Tours",
      path: "/faq",
      sectionId: "faq-admissions-tours",
      keywords: [
        "admission",
        "admissions",
        "start receiving care",
        "how quickly can I start",
        "join rosewood gardens",
        "book a tour",
        "facility tour",
        "inspection",
        "visit the residence",
        "acat assessment",
        "eligibility",
      ],
    },
  ],

  // Contact Page
  contact: [
    {
      label: "Contact – Phone",
      path: "/contact-us",
      sectionId: "contact-data",
      keywords: [
        "phone",
        "call",
        "telephone",
        "mobile",
        "contact number",
        "phone number",
        "call us",
        "speak to us",
        "helpline",
        "customer support",
        "support phone",
        "care phone",
        "aged care phone",
        "home care phone",
        "ndis phone",
        "ndis contact number",
        "hcp contact",
        "hotline",
        "service number",
      ],
    },

    {
      label: "Contact – Email",
      path: "/contact-us",
      sectionId: "contact-data",
      keywords: [
        "email",
        "mail",
        "write to us",
        "contact email",
        "support email",
        "customer service email",
        "send email",
        "send message",
        "email address",
        "care email",
        "aged care email",
        "home care email",
        "ndis email",
        "hcp email",
        "service email",
      ],
    },

    {
      label: "Contact – Form",
      path: "/contact-us",
      sectionId: "form",
      keywords: [
        "form",
        "enquiry",
        "message",
        "contact form",
        "enquiry form",
        "send enquiry",
        "submit enquiry",
        "book a call",
        "request a callback",
        "request information",
        "ask a question",
        "apply for support",
        "care enquiry",
        "ndis enquiry",
        "hcp enquiry",
        "home care enquiry",
        "aged care enquiry",
      ],
    },
  ],

  // later you can add more:
  // services: [
  //   {
  //     label: "Services – Support at Home",
  //     path: "/services",
  //     sectionId: "support-at-home",
  //     keywords: ["support at home", "home care", "in-home"],
  //   },
  // ],
};

export const SEARCH_ITEMS = Object.values(PAGE_SEARCH_CONFIG).flat();

export const KEYWORD_TO_SECTION = (() => {
  const map = {};

  Object.values(PAGE_SEARCH_CONFIG).forEach((pageItems) => {
    pageItems.forEach((item) => {
      const sectionId = item.sectionId;
      if (!sectionId) return;

      (item.keywords || []).forEach((kw) => {
        if (!kw) return;
        map[String(kw).toLowerCase()] = sectionId;
      });

      if (item.label) {
        const tokens = String(item.label)
          .toLowerCase()
          .split(/[\s–-]+/);
        tokens.forEach((t) => {
          if (t && !map[t]) {
            map[t] = sectionId;
          }
        });
      }

      map[sectionId.toLowerCase()] = sectionId;
    });
  });

  return map;
})();
