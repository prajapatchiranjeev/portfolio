"use strict";

/* =========================================================
   CHIRANJEEV PRAJAPAT — PORTFOLIO PROJECT DATA
   File: js/projects-data.js

   All portfolio cards and case studies use this file.
   Replace this entire file with the code below.
   ========================================================= */

window.SITE = {
  name: "Chiranjeev Prajapat",
  title: "Front-End Developer | Shopify & WordPress Developer | UI/UX & Graphics Designer",
  resumePath: "assets/resume/Chiranjeev-Prajapat-Resume.pdf",
  email: "prajapatrahul05@gmail.com",
  github: "https://github.com/prajapatchiranjeev",
  linkedin: "https://www.linkedin.com/in/chiranjeev-cj/",
  location: "Jaipur, Rajasthan",
  showPlaceholders: false
};

window.CATEGORIES = [
  { key: "all", label: "All" },
  { key: "ecommerce", label: "E-commerce" },
  { key: "business", label: "Business & Fintech" },
  { key: "solar", label: "Solar & Industry" },
  { key: "mobile", label: "Mobile App" },
  { key: "development", label: "Development" }
];

window.SKILLS = [
  { group: "Front-End", items: ["HTML5 & CSS3", "JavaScript (ES6+)", "React.js", "jQuery", "Bootstrap", "Tailwind CSS"] },
  { group: "Shopify", items: ["Liquid Templating", "Dawn Theme", "Shopify CLI", "Online Store 2.0", "App Integration", "Metafields"] },
  { group: "WordPress", items: ["Custom Themes", "WooCommerce", "Elementor", "ACF", "Plugin Integration", "Performance Optimisation"] },
  { group: "UI/UX & Design", items: ["Figma", "Adobe Photoshop", "Canva", "Wireframing", "Prototyping", "Responsive Design"] },
  { group: "SEO & Analytics", items: ["On-Page SEO", "Technical SEO", "Local SEO", "Core Web Vitals", "Google Analytics", "Search Console", "Semrush & Ahrefs"] },
  { group: "Mobile, Backend & Tools", items: ["Flutter (Dart)", "PHP & MySQL", "REST API Integration", "Git & GitHub", "Cross-Browser Testing", "Linux"] }
];

window.EXPERIENCE = [
  { role: "Web Developer & Graphics Designer", org: "Exdells India Pvt. Ltd.", period: "Nov 2025 – Present", tags: "WordPress · Flutter · CRM · Canva · Photoshop", points: ["Designed and developed the official company website: responsive, SEO-structured and brand-aligned.", "Built a Solar CRM platform for customer leads, project pipelines, site surveys and quotation workflows.", "Built a cross-platform Flutter app for Android and iOS with REST API integration.", "Produced brand graphics, social media creatives and marketing collateral."] },
  { role: "Web & Graphics Designer", org: "Payrupya", period: "Aug 2025 – Nov 2025", tags: "Canva · Photoshop · Figma · HTML/CSS · WordPress", points: ["Designed social media creatives, promotional banners and landing page layouts.", "Developed website UI mockups in Figma focused on visual hierarchy and user flows.", "Produced Instagram posts, Facebook ads and website sliders."] },
  { role: "Web Developer & SEO Specialist", org: "HostnetIndia", period: "Apr 2025 – Aug 2025", tags: "WordPress · PHP · Google Analytics · Search Console · Semrush", points: ["Developed and maintained responsive WordPress sites with custom themes, Elementor and PHP across client projects.", "Executed on-page and technical SEO: keywords, schema markup, canonical tags and internal linking.", "Ran technical SEO audits and worked on Core Web Vitals through image compression, lazy loading and caching."] },
  { role: "Shopify Developer & UI/UX Designer", org: "Fabritual", period: "Feb 2024 – Apr 2025", tags: "Shopify Liquid · Dawn · Shopify CLI · Figma · Canva", points: ["Built and customised Shopify storefronts with Liquid: custom sections, snippets and templates.", "Customised the Dawn theme and integrated third-party apps for reviews, upsells and email marketing.", "Built custom collection filters and product pages; turned Figma wireframes into responsive components."] },
  { role: "Web Developer", org: "Experts Mind IT Educational Pvt Ltd", period: "Dec 2022 – Jan 2024", tags: "HTML · CSS · JavaScript · PHP · WordPress · Git", points: ["Built responsive, cross-browser websites with HTML, CSS, JavaScript, PHP and WordPress.", "Applied on-page SEO practices and used Git/GitHub within a team workflow."] },
  { role: "Front-End Developer Intern", org: "eShiksa Technology Services Pvt. Ltd", period: "Aug 2018 – Jan 2019", tags: "HTML · CSS · JavaScript · Bootstrap · Git", points: ["Built responsive web interfaces and integrated REST APIs under senior developer guidance."] }
];

window.EDUCATION = {
  degree: "B.Tech, Computer Science & Engineering (Minor: Information Technology & Programming)",
  school: "Rajasthan Technical University, Kota · 2014 – 2018",
  certs: ["Google Analytics Certification, Google", "Front-End Engineer Career Path, Codecademy", "Frontend Developer Career Path, Scrimba"]
};

/* Default values shared by every project. */
function project(data) {
  return Object.assign({
    role: "",
    contribution: [],
    scope: [],
    process: [],
    challenges: [],
    learnings: [],
    context: "",
    isConcept: false,
    images: {
      desktop: "assets/projects/" + data.slug + "/desktop.jpg",
      mobile: "assets/projects/" + data.slug + "/mobile.jpg",
      full: "assets/projects/" + data.slug + "/fullpage.jpg",
      gallery: []
    },
    linkLabel: "Visit live site",
    extra: null
  }, data);
}

window.PROJECTS = [

  /* =======================================================
     1. THE FOLKLORE
     ======================================================= */

  project({
    slug: "the-folklore",
    name: "The Folklore",
    category: "ecommerce",
    url: "https://thefolklore.com/",

    summary:
      "E-commerce platform helping emerging brands sell globally with marketing and shipping tools.",

    overview:
      "The Folklore is a commerce platform for emerging brands, combining brand discovery, multi-channel selling, marketing tools and shipping resources.",

    context:
      "An international commerce platform where clear navigation, strong brand presentation and accessible information are important.",

    role: "Web Developer & UI/UX Designer",

    contribution: [
      "Reviewed the website layout and overall user experience.",
      "Focused on visual hierarchy, navigation and content presentation.",
      "Evaluated the consistency of layouts across desktop and mobile screens.",
      "Reviewed the presentation of platform features and marketing content."
    ],

    scope: [
      "Website UI and layout",
      "Navigation and content hierarchy",
      "Brand and marketing content presentation",
      "Responsive layout review",
      "Usability and visual consistency"
    ],

    process: [
      {
        title: "Website review",
        text: "Reviewed the website structure, visual identity, navigation and key content sections."
      },
      {
        title: "UI and layout evaluation",
        text: "Considered typography, spacing, visual hierarchy and the presentation of important platform features."
      },
      {
        title: "Responsive experience",
        text: "Reviewed content flow and navigation across desktop and mobile layouts."
      }
    ],

    challenges: [
      {
        challenge:
          "Presenting multiple platform features without making the interface feel cluttered.",
        solution:
          "Focused on information hierarchy, content grouping and the clarity of the main sections."
      },
      {
        challenge:
          "Maintaining a consistent experience across desktop and mobile layouts.",
        solution:
          "Reviewed responsive structure, spacing, navigation and content presentation at different screen sizes."
      }
    ],

    learnings: [
      "Presenting complex platform features through clear visual hierarchy.",
      "Balancing brand storytelling with functional information.",
      "Understanding responsive layouts and user journeys.",
      "Improving content clarity on feature-rich websites."
    ]
  }),

  /* =======================================================
     2. VELASCA
     ======================================================= */

  project({
    slug: "velasca",
    name: "Velasca",
    category: "ecommerce",
    url: "https://www.velasca.com/",

    summary:
      "Premium Italian-inspired men's footwear and clothing brand with an artisanal identity.",

    overview:
      "Velasca is a fashion brand selling shoes and clothing online and in stores, with an emphasis on artisanal quality and timeless style.",

    context:
      "A fashion e-commerce storefront where product imagery, brand storytelling and straightforward shopping navigation are important.",

    role: "Web Developer & UI/UX Designer",

    contribution: [
      "Reviewed the storefront layout and visual presentation.",
      "Focused on responsive interface structure and usability.",
      "Evaluated navigation and product presentation.",
      "Reviewed typography, spacing and consistency across page layouts."
    ],

    scope: [
      "E-commerce storefront layout",
      "Desktop and mobile presentation",
      "Navigation and product discovery",
      "Typography and spacing",
      "Visual hierarchy and usability"
    ],

    process: [
      {
        title: "Storefront review",
        text: "Reviewed the website structure, visual identity, navigation and product presentation."
      },
      {
        title: "Interface evaluation",
        text: "Considered layout consistency, typography, spacing and content hierarchy across screen sizes."
      },
      {
        title: "Shopping experience",
        text: "Evaluated navigation clarity and product discoverability throughout the storefront."
      }
    ],

    challenges: [
      {
        challenge:
          "Maintaining a premium visual experience while presenting product information clearly.",
        solution:
          "Focused on visual hierarchy, typography, spacing and the relationship between product imagery and content."
      },
      {
        challenge:
          "Keeping product discovery straightforward across desktop and mobile.",
        solution:
          "Reviewed navigation structure, responsive layouts and product presentation for consistency."
      }
    ],

    learnings: [
      "How visual storytelling supports premium fashion e-commerce.",
      "The importance of typography and consistent visual hierarchy.",
      "How responsive layouts influence shopping usability.",
      "How navigation and product presentation support discovery."
    ]
  }),

  /* =======================================================
     3. NOTEBOOK THERAPY
     ======================================================= */

  project({
    slug: "notebook-therapy",
    name: "Notebook Therapy",
    category: "ecommerce",
    url: "https://notebooktherapy.com/",

    summary:
      "Online stationery store featuring Japanese and Korean-inspired notebooks, journals and accessories.",

    overview:
      "Notebook Therapy sells East-Asian-inspired stationery, including notebooks, bullet journals, stickers, washi tape, stamps and bags.",

    context:
      "A stationery e-commerce store with a broad product catalogue and seasonal promotional collections.",

    role: "Web Developer & UI/UX Designer",

    contribution: [
      "Reviewed the storefront experience and visual presentation.",
      "Focused on category navigation and product discovery.",
      "Evaluated promotional banners and seasonal content presentation.",
      "Reviewed desktop and mobile layout consistency."
    ],

    scope: [
      "E-commerce storefront layout",
      "Category navigation",
      "Product and collection presentation",
      "Promotional banners",
      "Responsive usability review"
    ],

    process: [
      {
        title: "Storefront analysis",
        text: "Reviewed the homepage, category navigation, promotional sections and product presentation."
      },
      {
        title: "Content hierarchy",
        text: "Considered the relationship between imagery, product information, navigation and promotional messaging."
      },
      {
        title: "Responsive evaluation",
        text: "Reviewed how navigation and content adapt to smaller screens."
      }
    ],

    challenges: [
      {
        challenge:
          "Presenting a varied stationery catalogue while keeping browsing clear.",
        solution:
          "Focused on category structure, navigation labels and the hierarchy of product-related content."
      },
      {
        challenge:
          "Keeping promotional messaging readable on smaller screens.",
        solution:
          "Reviewed banner composition, image proportions, spacing and text visibility."
      }
    ],

    learnings: [
      "Organizing product catalogues for easier browsing.",
      "Using product imagery to support brand storytelling.",
      "Evaluating mobile usability for content-rich stores.",
      "Balancing seasonal promotions with product discovery."
    ]
  }),

  /* =======================================================
     4. FABDIVINE
     ======================================================= */

  project({
    slug: "fabdivine",
    name: "Fabdivine",
    category: "ecommerce",
    url: "https://www.fabdivine.com/",

    summary:
      "Handmade block-print home decor, including pillow covers, curtains and table linens.",

    overview:
      "Fabdivine sells block-printed home decor in linen and cotton, including pillow covers, curtains, roman shades, table linens, quilts and lampshades.",

    context:
      "A home-decor e-commerce storefront where product imagery, collection browsing and clear product information matter.",

    role: "Web Developer & UI/UX Designer",

    contribution: [
      "Reviewed the home-decor storefront and visual presentation.",
      "Focused on product imagery and collection presentation.",
      "Evaluated promotional content and navigation clarity.",
      "Reviewed responsive layouts and shopping usability."
    ],

    scope: [
      "Home-decor e-commerce UI",
      "Product and collection presentation",
      "Promotional banners",
      "Navigation and content layout",
      "Responsive design review"
    ],

    process: [
      {
        title: "Storefront review",
        text: "Reviewed the storefront structure, product imagery, promotional sections and navigation."
      },
      {
        title: "Content and layout",
        text: "Focused on visual hierarchy across product collections, promotional messages and supporting content."
      },
      {
        title: "Responsive evaluation",
        text: "Reviewed image presentation, spacing and content readability across screen sizes."
      }
    ],

    challenges: [
      {
        challenge:
          "Keeping product visibility clear when promotional content occupies significant screen space.",
        solution:
          "Reviewed the balance between promotional messaging, product imagery and the shopping experience."
      },
      {
        challenge:
          "Presenting detailed home-decor imagery consistently across devices.",
        solution:
          "Evaluated image proportions, spacing, content flow and responsive layout behaviour."
      }
    ],

    learnings: [
      "The importance of product imagery in home-decor e-commerce.",
      "Balancing promotional campaigns with shopping usability.",
      "Maintaining visual consistency across responsive layouts.",
      "Organizing collection content for easier discovery."
    ]
  }),

  /* =======================================================
     5. FABRITUAL
     ======================================================= */

  project({
    slug: "fabritual",
    period: "Feb 2024 – Apr 2025",
    name: "Fabritual",
    category: "ecommerce",
    url: "https://fabritual.com/",

    summary:
      "Hand-block-printed linen and cotton fabrics with colour, fabric-type and sample options.",

    overview:
      "Fabritual offers block-printed fabrics in linen, cotton and blends, with browsing options for fabric type and colour.",

    context:
      "A fabric e-commerce store with a broad catalogue and product variations.",

    role: "Shopify Developer & UI/UX Designer",

    contribution: [
      "Developed and customised Shopify storefronts using Liquid, building custom sections, snippets and templates per client requirements.",
      "Customised the Dawn theme: layout, typography, colour schemes and product pages.",
      "Integrated third-party apps for reviews, upsells and email marketing.",
      "Built custom collection filters, product pages and checkout-related experiences.",
      "Translated Figma wireframes into responsive front-end components and produced brand graphics and campaign creatives."
    ],

    scope: [
      "Shopify Liquid development",
      "Dawn theme customisation",
      "Product and collection page UI",
      "Third-party app integration",
      "Figma to front-end implementation",
      "Brand graphics and campaign creatives"
    ],

    process: [
      { title: "Planning", text: "Reviewed client requirements, Figma wireframes and the existing storefront structure." },
      { title: "Theme development", text: "Built custom Liquid sections, snippets and templates on top of the Dawn theme." },
      { title: "Integration and refinement", text: "Integrated third-party apps and refined responsive layouts, typography and product pages." }
    ],

    challenges: [
      {
        challenge: "Presenting a broad fabric catalogue with many variations in a way that is easy to browse.",
        solution: "Worked on custom collection filters and product page layouts for clearer browsing."
      },
      {
        challenge: "Keeping storefront design consistent across client requirements and screen sizes.",
        solution: "Used reusable Liquid sections and consistent typography and colour treatment."
      }
    ],

    learnings: [
      "Shopify theme development with Liquid, Dawn and Shopify CLI.",
      "Turning Figma designs into reusable theme sections.",
      "Choosing and integrating third-party Shopify apps.",
      "Designing product and collection pages around browsing and variants."
    ]
  }),

  /* =======================================================
     6. FABMYSTIC
     ======================================================= */

  project({
    slug: "fabmystic",
    name: "Fabmystic",
    category: "ecommerce",
    url: "https://fabmystic.com/",

    summary:
      "Women's block-print and solid linen dresses presented through distinct collections.",

    overview:
      "Fabmystic offers hand-block-printed and solid linen dresses for women, organized into separate collections.",

    context:
      "A fashion e-commerce storefront focused on collection presentation and product imagery.",

    role: "Web Developer & UI/UX Designer",

    contribution: [
      "Reviewed the fashion storefront and collection presentation.",
      "Focused on visual consistency across imagery and content.",
      "Evaluated navigation and promotional content.",
      "Reviewed responsive browsing layouts."
    ],

    scope: [
      "Fashion e-commerce storefront",
      "Collection and product presentation",
      "Homepage banners",
      "Navigation and content hierarchy",
      "Responsive layout review"
    ],

    process: [
      {
        title: "Storefront review",
        text: "Reviewed the homepage, fashion collections, navigation and promotional content."
      },
      {
        title: "Visual structure",
        text: "Focused on image composition, typography, spacing and content hierarchy."
      },
      {
        title: "Responsive evaluation",
        text: "Reviewed how collection imagery, navigation and supporting content adapt to smaller screens."
      }
    ],

    challenges: [
      {
        challenge:
          "Presenting multiple fashion collections while maintaining a consistent brand identity.",
        solution:
          "Reviewed collection hierarchy, image presentation, typography and spacing."
      },
      {
        challenge:
          "Keeping product imagery and navigation usable on smaller screens.",
        solution:
          "Evaluated responsive content flow, image proportions and navigation visibility."
      }
    ],

    learnings: [
      "Using visual storytelling to present fashion collections.",
      "Balancing editorial imagery with practical shopping navigation.",
      "Evaluating responsive layouts for image-led stores.",
      "Maintaining consistency across collection pages."
    ]
  }),

  /* =======================================================
     7. HOSTNET INDIA
     ======================================================= */

  project({
    slug: "hostnet-india",
    period: "Apr 2025 – Aug 2025",
    name: "Hostnet India",
    category: "business",
    url: "https://hostnetindia.com/",

    summary:
      "Web hosting provider offering cloud, VPS, dedicated and shared hosting services.",

    overview:
      "Hostnet India provides hosting and infrastructure services, including VPS, dedicated servers, cloud hosting, reseller hosting, domains and SSL.",

    context:
      "A hosting company website where service discovery, plan information and technical content need clear presentation.",

    role: "Web Developer & SEO Specialist",

    contribution: [
      "Developed and maintained responsive WordPress websites using custom themes, Elementor and PHP across multiple client projects.",
      "Carried out on-page and technical SEO: keyword optimisation, schema markup, canonical tags and internal linking.",
      "Ran technical SEO audits covering broken links, duplicate content, page speed and mobile usability.",
      "Worked on Core Web Vitals (LCP, CLS, FID) through image compression, lazy loading and caching."
    ],

    scope: [
      "WordPress development and maintenance",
      "Custom PHP and front-end refinements",
      "Responsive and cross-browser compatibility",
      "On-page and technical SEO",
      "Page speed and Core Web Vitals",
      "Google Analytics and Search Console"
    ],

    process: [
      {
        title: "Website assessment",
        text: "Reviewed website structure, page layouts, functionality and technical issues affecting usability."
      },
      {
        title: "Development and optimization",
        text: "Worked on WordPress, front-end refinements, responsive layouts and website maintenance."
      },
      {
        title: "SEO and performance review",
        text: "Focused on metadata, page structure, internal linking and relevant performance indicators."
      }
    ],

    challenges: [
      {
        challenge:
          "Maintaining usability and compatibility across devices while addressing website performance.",
        solution:
          "Focused on responsive layouts, front-end refinements and relevant page-speed improvements."
      },
      {
        challenge:
          "Improving the technical SEO foundation of website pages.",
        solution:
          "Worked on relevant on-page SEO practices, including metadata, internal linking and content structure."
      }
    ],

    learnings: [
      "Developing and maintaining WordPress websites.",
      "Working with custom PHP and front-end technologies.",
      "Connecting technical SEO with website structure and performance.",
      "Using analytics and search data to identify improvements."
    ]
  }),

  /* =======================================================
     8. HOSTINC
     ======================================================= */

  project({
    slug: "hostinc",
    name: "Hostinc",
    category: "business",
    url: "https://hostinc.in/",

    summary:
      "Hosting services website covering VPS, dedicated servers, data storage and VPN services.",

    overview:
      "Hostinc presents hosting and infrastructure services, including VPS, dedicated servers, data storage and VPN offerings.",

    context:
      "A hosting services website where visitors need to understand technical services and navigate between offerings.",

    role: "Web Developer & UI/UX Designer",

    contribution: [
      "Reviewed the website and presentation of infrastructure solutions.",
      "Focused on service navigation and technical content hierarchy.",
      "Evaluated responsive layouts and key service information.",
      "Reviewed visual clarity and consistency."
    ],

    scope: [
      "Hosting and infrastructure service pages",
      "Service navigation",
      "Technical information presentation",
      "Responsive layout review",
      "Visual consistency and usability"
    ],

    process: [
      {
        title: "Service structure review",
        text: "Reviewed the presentation of hosting, infrastructure and related service categories."
      },
      {
        title: "Content and UI review",
        text: "Focused on navigation labels, information grouping and technical content clarity."
      },
      {
        title: "Responsive evaluation",
        text: "Reviewed text readability, spacing and content structure across desktop and mobile layouts."
      }
    ],

    challenges: [
      {
        challenge:
          "Presenting technical hosting services in a way visitors can understand and navigate.",
        solution:
          "Reviewed service grouping, information hierarchy and navigation clarity."
      },
      {
        challenge:
          "Keeping service information readable across desktop and mobile screens.",
        solution:
          "Evaluated text density, spacing and responsive content structure."
      }
    ],

    learnings: [
      "Presenting technical services through clear information architecture.",
      "Organizing complex service offerings into understandable sections.",
      "Evaluating usability for business-focused websites.",
      "Improving content clarity across screen sizes."
    ]
  }),

  /* =======================================================
     9. PAYRUPYA
     ======================================================= */

  project({
    slug: "payrupya",
    period: "Aug 2025 – Nov 2025",
    name: "PayRupya",
    category: "business",
    url: "https://payrupya.in/",

    summary:
      "Utility and B2B services platform for bill payments, travel, PAN services and courier bookings.",

    overview:
      "PayRupya is a fintech and utility services platform for partners, distributors and retailers, covering bill payments, PAN services, travel booking and courier services.",

    context:
      "A B2B fintech website with multiple service categories and agent onboarding information.",

    role: "Web & Graphics Designer",

    contribution: [
      "Designed social media creatives, promotional banners and landing page layouts.",
      "Developed website UI mockups in Figma with focus on visual hierarchy, colour harmony and user flows.",
      "Produced marketing assets: Instagram posts, Facebook ads and website sliders."
    ],

    scope: [
      "Website UI mockups",
      "Landing-page layouts",
      "Promotional banners and website sliders",
      "Social media creatives",
      "Digital campaign graphics",
      "Brand presentation"
    ],

    process: [
      {
        title: "Design requirements",
        text: "Reviewed communication goals, content requirements and the visual direction for website and marketing assets."
      },
      {
        title: "UI and graphic design",
        text: "Focused on layout composition, colour harmony, typography and visual hierarchy."
      },
      {
        title: "Design refinement",
        text: "Refined layouts and creative assets to maintain consistent brand presentation and clear communication."
      }
    ],

    challenges: [
      {
        challenge:
          "Communicating multiple financial and utility services without making promotional designs difficult to scan.",
        solution:
          "Focused on information hierarchy, readable typography and clear grouping of service-related content."
      },
      {
        challenge:
          "Maintaining visual consistency across website graphics and social media creatives.",
        solution:
          "Used a consistent visual direction, colour treatment and typography across related design assets."
      }
    ],

    learnings: [
      "Designing marketing creatives for service-oriented businesses.",
      "Applying visual hierarchy to website mockups and promotional assets.",
      "Balancing brand consistency with clear digital communication.",
      "Adapting design layouts for different digital formats."
    ]
  }),

  /* =======================================================
     10. EXDELLS
     ======================================================= */

  project({
    slug: "exdells",
    period: "Nov 2025 – Present",
    name: "Exdells",
    category: "solar",
    url: "https://www.exdells.com/",

    summary:
      "Solar EPC and installation services website for residential and commercial customers.",

    overview:
      "Exdells provides rooftop solar installation services for residential and commercial customers. The business focuses on solar EPC and installation rather than manufacturing solar panels.",

    context:
      "A solar services business where the website, CRM and mobile interface support customer enquiries, lead tracking and project workflows.",

    role: "Web Developer & Graphics Designer",

    contribution: [
      "Designed and developed the company website: responsive, SEO-structured and aligned with the brand.",
      "Built a Solar CRM platform for customer leads, project pipelines, site surveys and quotation workflows.",
      "Built a cross-platform Flutter app for Android and iOS with REST API integration.",
      "Produced brand graphics, social media creatives and marketing material."
    ],

    scope: [
      "Company website UI and front-end development",
      "Solar CRM and lead-management workflows",
      "Customer and solar project management interfaces",
      "Flutter mobile application UI",
      "Responsive design and usability",
      "Brand graphics and marketing creatives"
    ],

    process: [
      {
        title: "Requirements and planning",
        text: "Reviewed business requirements for the company website, CRM workflows and mobile application."
      },
      {
        title: "Website and CRM",
        text: "Worked on responsive website development and CRM interfaces supporting customer management and lead tracking."
      },
      {
        title: "Mobile interface",
        text: "Worked on the Flutter application with attention to interface consistency and usability."
      },
      {
        title: "Visual communication",
        text: "Created marketing and brand assets aligned with Exdells' digital communication needs."
      }
    ],

    challenges: [
      {
        challenge:
          "Supporting different business workflows across the website, CRM and mobile application.",
        solution:
          "Focused on the relevant interfaces and workflows according to functional requirements, with usability and consistency in mind."
      },
      {
        challenge:
          "Presenting solar installation services and business information clearly across digital channels.",
        solution:
          "Focused on responsive layouts, structured content and brand-aligned marketing visuals."
      }
    ],

    learnings: [
      "Connecting front-end development with practical business workflows.",
      "Understanding CRM requirements for lead and project management.",
      "Working across websites, Flutter applications and marketing assets.",
      "Aligning functionality and user experience with business needs."
    ]
  }),

  /* =======================================================
     11. GOLO APP
     ======================================================= */

  project({
    slug: "golo-app",
    name: "Golo App",
    category: "mobile",
    url: "https://play.google.com/store/apps/details?id=com.godropp.load.golo&pcampaignid=web_share",

    linkLabel: "View on Google Play",

    summary:
      "Mobile application project focused on Flutter UI and customer and business-owner workflows.",

    overview:
      "Golo is a mobile application project. The portfolio entry can describe the specific screens, features and fixes contributed to during development.",

    context:
      "A mobile application project involving customer and business-owner experiences. The exact work described here should be limited to the screens and functionality personally handled.",

    role: "Flutter Frontend Developer",

    contribution: [
      "Worked on Flutter UI screens and front-end behaviour.",
      "Contributed to customer and business-owner application interfaces.",
      "Worked on cart and order-status messaging.",
      "Contributed to product validation and business-hour interface updates."
    ],

    scope: [
      "Flutter UI development",
      "Customer and business-owner screens",
      "Cart and order-related interface states",
      "Product validation and form behaviour",
      "Responsive mobile layouts",
      "UI bug fixing and refinement"
    ],

    process: [
      {
        title: "Screen and workflow review",
        text: "Reviewed the relevant screens and existing interface behaviour before making UI changes."
      },
      {
        title: "Implementation",
        text: "Worked on Flutter widgets and interface states according to the requirements of the assigned tasks."
      },
      {
        title: "Validation and refinement",
        text: "Reviewed the affected screens and refined user-facing messages and interaction behaviour."
      }
    ],

    challenges: [
      {
        challenge:
          "Keeping user-facing order and payment status messages clear and consistent.",
        solution:
          "Refined the relevant UI messages so the different order and payment states were easier to understand."
      },
      {
        challenge:
          "Handling product availability and validation feedback in the interface.",
        solution:
          "Worked on the relevant validation and UI states to provide clearer feedback during the customer and business-owner workflows."
      }
    ],

    learnings: [
      "Building and refining mobile interfaces with Flutter.",
      "Managing UI states and user-facing messages.",
      "Understanding customer and business-owner application workflows.",
      "Testing UI changes against existing application behaviour."
    ],

    extra: {
      type: "app"
    }
  }),

  /* =======================================================
     12. GITHUB
     ======================================================= */

  project({
    slug: "github",
    name: "GitHub",
    category: "development",
    url: "https://github.com/prajapatchiranjeev",

    linkLabel: "Open GitHub profile",

    summary:
      "Public development repositories and learning projects involving web technologies.",

    overview:
      "My GitHub profile contains public repositories and development projects. Forked repositories are identified separately and are not presented as original work.",

    context:
      "A collection of public code repositories and learning projects that demonstrates development practice.",

    role: "Frontend Developer",

    contribution: [
      "Maintained public repositories for development and learning projects.",
      "Practised front-end development concepts through small applications.",
      "Organized project code and repository documentation where applicable."
    ],

    scope: [
      "HTML and CSS",
      "JavaScript",
      "React learning projects",
      "Repository organization",
      "Version control with Git and GitHub"
    ],

    process: [
      {
        title: "Project development",
        text: "Worked on individual development and learning projects based on their requirements."
      },
      {
        title: "Version control",
        text: "Used GitHub repositories to maintain and organize project code."
      },
      {
        title: "Continuous learning",
        text: "Used practical projects to build familiarity with front-end development concepts."
      }
    ],

    challenges: [
      {
        challenge:
          "Organizing learning projects and code in a way that is easy to review.",
        solution:
          "Maintained separate repositories for individual projects and clearly distinguished forked work from original projects."
      }
    ],

    learnings: [
      "Using Git and GitHub for version control.",
      "Practising front-end development through projects.",
      "Organizing code into individual repositories.",
      "Distinguishing original work from forked repositories."
    ],

    extra: {
      type: "repos",
      repos: [
        {
          name: "react-todo-app",
          lang: "JavaScript",
          fork: false,
          url: "https://github.com/prajapatchiranjeev/react-todo-app"
        },
        {
          name: "Scrimba",
          lang: "CSS",
          fork: false,
          url: "https://github.com/prajapatchiranjeev/Scrimba"
        },
        {
          name: "Codecademy",
          lang: "HTML",
          fork: false,
          url: "https://github.com/prajapatchiranjeev/Codecademy"
        },
        {
          name: "quickcart_app",
          lang: "C++",
          fork: false,
          url: "https://github.com/prajapatchiranjeev/quickcart_app"
        },
        {
          name: "python3-codecademy",
          lang: "",
          fork: true,
          forkOf: "Bes0n/python3-codecademy",
          desc: "Notes of Python 3 studied from Codecademy.com",
          url: "https://github.com/prajapatchiranjeev/python3-codecademy"
        },
        {
          name: "react-admin",
          lang: "TypeScript",
          fork: true,
          forkOf: "marmelab/react-admin",
          desc: "A framework for building B2B applications with REST or GraphQL APIs.",
          url: "https://github.com/prajapatchiranjeev/react-admin"
        }
      ]
    }
  })

];

/* Labels used by case-study.js */
window.CATEGORY_LABELS = {
  ecommerce: "E-commerce",
  business: "Business & Fintech",
  solar: "Solar & Industry",
  mobile: "Mobile App",
  development: "Development"
};