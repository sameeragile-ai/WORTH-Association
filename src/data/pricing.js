/**
 * Pricing data formatted for Canadian non-profit society WORTH Association
 */

export const formatCAD = (amount) => {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const PRICING = {
  events: {
    yesShef: [
      {
        id: 'ys-ga',
        name: 'General Admission',
        price: 95,
        priceFormatted: formatCAD(95),
        description: 'Access to the tasting pavilion, culinary showcase, reception wines, and the main stage program.',
        features: [
          'Full tasting pass across 12 culinary pairing stations',
          'Complimentary BC VQA welcome sparkling wine',
          'Access to live chef panel and awards ceremony',
          'Official Yes Shef commemorative recipe guide',
        ],
        isPopular: true,
      },
      {
        id: 'ys-vip',
        name: 'VIP Experience',
        price: 165,
        priceFormatted: formatCAD(165),
        description: 'Exclusive 1-hour early entry, private lounge access with chef meet-and-greet, and premium tasting gift bag.',
        features: [
          'Early access at 5:00 PM (avoid the crowds)',
          'Private mezzanine lounge at Fairmont Pacific Rim',
          'Curated reserve wine flights & mixology flights',
          'Yes Shef gift tote with artisan BC products ($120 value)',
          'Reserved front-row seating for keynote remarks',
        ],
        isPopular: false,
      },
    ],
    summit: [
      {
        id: 'summit-early',
        name: 'Early Bird Pass',
        price: 249,
        priceFormatted: formatCAD(249),
        description: 'Discounted admission for members registering before year-end.',
        features: [
          'Full-day summit access with breakfast & plated luncheon',
          'Access to 4 breakout leadership masterclasses',
          'Executive mentorship speed sessions',
          'Evening cocktail reception at downtown Vancouver venue',
        ],
        isPopular: false,
      },
      {
        id: 'summit-standard',
        name: 'Standard Registration',
        price: 329,
        priceFormatted: formatCAD(329),
        description: 'Complete general registration for the 2027 WORTH Leadership Summit.',
        features: [
          'Full-day summit access including all keynote addresses',
          'Plated networking lunch & refreshment breaks',
          'Choice of interactive leadership roundtables',
          'Post-event recorded digital resource package',
        ],
        isPopular: true,
      },
    ],
    workshop: {
      price: 45,
      priceFormatted: formatCAD(45),
      label: 'Single WORTHshop Pass',
      description: 'Interactive 90-minute live skill-building workshop led by verified industry directors.',
    },
  },

  programs: {
    academy: {
      price: 495,
      priceFormatted: formatCAD(495),
      name: 'WORTH Academy (6-Week Cohort)',
      tagline: 'Build leadership confidence in 6 weeks',
      commitment: 'Weekly 90-minute live interactive modules + executive peer groups',
      subsidiesNote: 'Subsidies and employer sponsorship payment invoices readily available upon request.',
    },
    mentorship: {
      price: 150,
      priceFormatted: formatCAD(150),
      name: 'Mentorship Program (Mentee Enrollment)',
      tagline: '6-month intentional 1:1 matching with senior industry executives',
      subsidiesNote: 'Always 100% free for mentors. Financial bursaries available for emerging mentees.',
    },
    scholarships: [
      {
        id: 'sch-1000',
        amount: 1000,
        amountFormatted: formatCAD(1000),
        name: 'Emerging Talent Bursary',
        eligibility: 'Open to students enrolled in accredited BC hospitality, culinary, or tourism diplomas.',
        deadline: 'December 15, 2026',
      },
      {
        id: 'sch-2500',
        amount: 2500,
        amountFormatted: formatCAD(2500),
        name: 'Mid-Career Leadership Grant',
        eligibility: 'Women with 3–7 years experience pursuing advanced management or sommelier certification.',
        deadline: 'January 30, 2027',
      },
      {
        id: 'sch-5000',
        amount: 5000,
        amountFormatted: formatCAD(5000),
        name: 'Executive Horizons Fellowship',
        eligibility: 'Senior supervisory or entrepreneurial women pursuing executive degrees or launching ventures.',
        deadline: 'February 28, 2027',
      },
    ],
  },

  employerJobs: [
    {
      id: 'job-single',
      name: 'Single Job Posting',
      price: 99,
      priceFormatted: formatCAD(99),
      duration: '30 Days',
      description: 'Ideal for independent restaurants, boutique lodges, and municipal recreation facilities.',
      features: [
        'Live on the WORTH job board for 30 calendar days',
        'Direct link to your application portal or hiring email',
        'Inclusion in the bi-weekly member career dispatch',
        'Reviewed by WORTH team within 24 business hours',
      ],
      isPopular: false,
    },
    {
      id: 'job-featured',
      name: 'Featured Job Posting',
      price: 179,
      priceFormatted: formatCAD(179),
      duration: '30 Days',
      description: 'Highest visibility for urgent hiring, department head roles, and executive searches.',
      features: [
        'Pinned top placement on the WORTH Career Hub',
        'Dedicated highlight banner with company logo',
        'Dedicated feature shoutout in WORTH LinkedIn & Instagram story',
        'Featured inclusion in WORTH member newsletter (1,200+ subscribers)',
        '30-day posting duration with priority support',
      ],
      isPopular: true,
    },
    {
      id: 'job-bundle',
      name: 'Employer Hiring Bundle',
      price: 399,
      priceFormatted: formatCAD(399),
      duration: '5 Postings (Valid 12 Months)',
      description: 'Designed for hotel groups, regional resort operators, and large tourism operators.',
      features: [
        '5 job postings (use anytime within 12 months)',
        '1 complimentary upgrade to Featured placement',
        'Employer profile badge in our Directory of Inclusive Employers',
        'Social promotion package for key seasonal recruiting',
      ],
      isPopular: false,
    },
  ],

  partnerAds: [
    {
      id: 'ad-banner',
      name: 'Resource Hub Banner',
      cadence: 'Monthly',
      price: 250,
      priceFormatted: formatCAD(250),
      description: 'Prominent header banner across all toolkits, research studies, and webinars seen by hundreds of practitioners.',
      features: [
        'High-contrast banner on the WORTH Resource Hub',
        'Click-through tracking with monthly performance snapshot',
        'Targeted reaching managers and departmental decision-makers',
      ],
      isPopular: false,
    },
    {
      id: 'ad-homepage',
      name: 'Homepage Feature Partner',
      cadence: 'Quarterly',
      price: 1200,
      priceFormatted: formatCAD(1200),
      description: 'Premier brand positioning on the WORTH homepage as an official champion of women in hospitality.',
      features: [
        'Prominent homepage showcase placement for 90 days',
        'Co-branded spotlight story on the WORTH blog',
        'Quarterly analytics review and mutual social media amplification',
        'Logo in the continuous partner marquee',
      ],
      isPopular: true,
    },
  ],

  sponsorshipTiers: [
    {
      id: 'tier-community',
      name: 'Community Partner',
      price: 2500,
      priceFormatted: formatCAD(2500),
      description: 'Support local networking gatherings and micro-grants for emerging female operators.',
      features: [
        'Logo placement on WORTH website and event collateral',
        '2 complimentary tickets to Yes Shef Vancouver',
        'Quarterly mentions across social channels',
        'Certificate of Alliance with WORTH non-profit mission',
      ],
      isPopular: false,
    },
    {
      id: 'tier-leadership',
      name: 'Leadership Partner',
      price: 7500,
      priceFormatted: formatCAD(7500),
      description: 'Underwrite cohort scholarships for the WORTH Academy and mentor matching cohorts.',
      features: [
        'Sponsor 5 full WORTH Academy leadership scholarships',
        'Prominent brand presence at all signature events',
        '4 VIP passes to Yes Shef Vancouver & Annual Summit',
        'Featured employer profile sent to our talent network',
        'Opportunity to host a co-branded WORTHshop',
      ],
      isPopular: true,
    },
    {
      id: 'tier-presenting',
      name: 'Presenting Partner',
      price: 15000,
      priceFormatted: formatCAD(15000),
      description: 'Our highest tier of collaborative alliance, driving structural industry equity across BC and Canada.',
      features: [
        'Exclusive presenting title sponsor designation for signature program',
        'Keynote speaking invitation at the WORTH Leadership Summit',
        'Unlimited job postings on the Career Hub for 1 year',
        '10 VIP tickets to Yes Shef Vancouver + reserved executive table',
        'Joint press release and customized executive leadership roundtable',
      ],
      isPopular: false,
    },
  ],

  donationPresets: [25, 50, 100, 250],
};
