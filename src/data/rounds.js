// ─── BRUSSELS TRIBUNAL — GAME ROUNDS ────────────────────────────────────────
// Round 1 = multi-question terminology warm-up (isMultiQuestion: true)
// Rounds 2-10 = single scenario → question → bonus → leaderboard
// ────────────────────────────────────────────────────────────────────────────

export const ROUNDS = [

  // ── ROUND 1: Terminology Warm-Up ─────────────────────────────────────────
  {
    id: 'round1',
    number: 1,
    title: 'Know Your Laws',
    theme: 'EU Digital Law Terminology',
    laws: ['GDPR', 'DSA', 'DMA', 'AI Act'],

    isMultiQuestion: true,
    questionTimerSeconds: 60,   // shorter — terminology is faster to read

    scenario: {
      title: 'Terminology Warm-Up',
      text: '7 rapid-fire questions on key terms from EU digital regulation. 20 pts each. Let\'s see who read the lecture notes.',
    },

    questions: [
      {
        id: 'q1',
        question: 'Which of these is NOT personal data under GDPR?',
        options: [
          { id: 'A', text: 'Your name and home address' },
          { id: 'B', text: "Your car's license plate number" },
          { id: 'C', text: 'The weather temperature in your city' },
          { id: 'D', text: 'Your IP address and browser fingerprint' },
        ],
        correctAnswer: 'C',
        points: 20,
        law: 'GDPR Art. 4(1)',
        explanation: 'Personal data = any information about an identifiable natural person. Weather data belongs to no individual — it\'s environmental. IP addresses and license plates DO identify people.',
      },
      {
        id: 'q2',
        question: 'TikTok decides to collect your location data to show local ads. Meta processes this data on TikTok\'s behalf. Who is the data CONTROLLER?',
        options: [
          { id: 'A', text: 'Meta — they do the actual processing' },
          { id: 'B', text: 'TikTok — they decide what data to collect and why' },
          { id: 'C', text: 'Both share controller status equally' },
          { id: 'D', text: 'You — it\'s your personal data' },
        ],
        correctAnswer: 'B',
        points: 20,
        law: 'GDPR Art. 4(7–8)',
        explanation: 'Controller = entity that determines the purposes and means of processing. Processor = entity that acts on the controller\'s instructions. TikTok decides what and why; Meta just executes.',
      },
      {
        id: 'q3',
        question: 'A company sends you marketing emails without asking. They claim it\'s their "legitimate interest." Is this valid under GDPR?',
        options: [
          { id: 'A', text: 'Yes — legitimate interest covers any business purpose' },
          { id: 'B', text: 'Yes — if they provide an unsubscribe link' },
          { id: 'C', text: 'No — direct marketing to strangers requires consent' },
          { id: 'D', text: 'This is covered by DSA, not GDPR' },
        ],
        correctAnswer: 'C',
        points: 20,
        law: 'GDPR Art. 6 + Recital 47',
        explanation: 'Legitimate interest fails when the individual\'s privacy interests clearly outweigh the company\'s interest. For cold marketing emails, consent is required. Recital 47 explicitly says LI can apply for direct marketing — but only to existing customers, not strangers.',
      },
      {
        id: 'q4',
        question: 'You report a scam post on Instagram. 6 weeks later, nothing happens. Which law gives you the strongest enforcement tool?',
        options: [
          { id: 'A', text: 'GDPR — your personal data was exposed in the scam' },
          { id: 'B', text: 'DMA — Instagram is a designated gatekeeper' },
          { id: 'C', text: 'DSA — platforms must handle illegal content reports without undue delay' },
          { id: 'D', text: 'AI Act — Instagram\'s algorithm promoted the scam' },
        ],
        correctAnswer: 'C',
        points: 20,
        law: 'DSA Art. 16',
        explanation: 'DSA Art. 16 requires platforms to run notice-and-action systems. Large platforms (like Instagram, a VLOP) must act quickly on reports and give users reasons for decisions. Ignoring reports for 6 weeks is a DSA violation.',
      },
      {
        id: 'q5',
        question: 'Apple forces all iPhone users to install apps only through the App Store and charges developers a 30% commission. Which law directly addresses this?',
        options: [
          { id: 'A', text: 'GDPR — App Store collects developer personal data' },
          { id: 'B', text: 'DSA — App Store is an online marketplace' },
          { id: 'C', text: 'DMA — Apple is a designated gatekeeper; exclusivity is prohibited' },
          { id: 'D', text: 'AI Act — App Store uses AI-powered recommendation algorithms' },
        ],
        correctAnswer: 'C',
        points: 20,
        law: 'DMA Art. 5–6',
        explanation: 'DMA targets "gatekeepers" — large platforms with strategic positions. Apple was designated a gatekeeper in 2023. Mandatory App Store exclusivity violates DMA Art. 5(4). Since 2024, EU iPhone users can install apps from other sources.',
      },
      {
        id: 'q6',
        question: 'Which AI system is classified as PROHIBITED (not just "high-risk") under the AI Act?',
        options: [
          { id: 'A', text: 'A Netflix algorithm that recommends movies to you' },
          { id: 'B', text: 'An AI tool that ranks job applicants from CVs' },
          { id: 'C', text: 'Real-time facial recognition cameras monitoring all pedestrians in a city' },
          { id: 'D', text: 'An AI that helps doctors diagnose cancer from X-rays' },
        ],
        correctAnswer: 'C',
        points: 20,
        law: 'AI Act Art. 5(1)(d)',
        explanation: 'AI Act Art. 5 prohibits real-time remote biometric identification in public spaces by law enforcement, with very narrow exceptions. CV screening (B) and medical diagnosis AI (D) are high-risk (heavily regulated) but not prohibited. Netflix (A) is minimal risk.',
      },
      {
        id: 'q7',
        question: 'You want to know everything Google has collected about you — all fields, all purposes, every recipient. Which GDPR right do you exercise?',
        options: [
          { id: 'A', text: 'Right to erasure (Art. 17) — "right to be forgotten"' },
          { id: 'B', text: 'Right of access (Art. 15) — subject access request (SAR)' },
          { id: 'C', text: 'Right to portability (Art. 20) — download your data to switch providers' },
          { id: 'D', text: 'Right to restriction (Art. 18) — pause all processing temporarily' },
        ],
        correctAnswer: 'B',
        points: 20,
        law: 'GDPR Art. 15',
        explanation: 'Right of access = receive a copy of all your personal data, plus the purposes, categories, recipients, retention periods, and logic behind automated decisions. It\'s free, must be answered within 1 month. Erasure deletes data; portability lets you take it elsewhere.',
      },
    ],
  },

  // ── ROUND 3: Tenant Blacklist ─────────────────────────────────────────────
  // NOTE: REDACTED image only (tenant-blacklist.png). Original contains real
  // Latvian passport data — NEVER use in classroom. See project security note.
  {
    id: 'round3',
    number: 3,
    title: 'Who Is Liable?',
    theme: 'Platform Responsibility',
    laws: ['GDPR', 'DSA'],
    timerSeconds: 120,
    points: 100,
    bonusPoints: 50,

    scenario: {
      title: 'The Tenant Blacklist',
      text: `A Facebook group called "Tenant Blacklist" lets landlords warn others about problem tenants. One landlord posts a scan of a tenant's full passport (name, DOB, photo, ID number), photos of a damaged apartment, and writes: "DO NOT RENT TO THIS PERSON — she destroyed my apartment and refuses to pay compensation."

The post stays up for 3 weeks. The tenant finds it, is refused by two other landlords who saw it, and files a complaint.`,
      imageUrl: 'tenant-blacklist.png',
      imageCaption: 'Actual post from a Latvian "Tenant Blacklist" Facebook group (details redacted)',
    },

    question: 'Who bears PRIMARY legal responsibility for this situation?',
    options: [
      { id: 'A', label: 'A', text: 'The landlord who posted it',      subtext: 'Posted personal data without consent' },
      { id: 'B', label: 'B', text: 'Facebook (Meta)',                  subtext: 'Platform allowed illegal content' },
      { id: 'C', label: 'C', text: 'Both — but for different violations', subtext: 'Different laws, different roles' },
      { id: 'D', label: 'D', text: 'No one — legitimate interest applies', subtext: 'Warning others is a valid purpose' },
    ],
    correctAnswer: 'C',

    reveal: {
      title: 'Both are liable — under different laws',
      verdict: 'C is correct',
      points: [
        {
          icon: '🔴',
          law: 'GDPR',
          text: 'The landlord is a data controller. Publishing a passport scan has no valid legal basis — legitimate interest fails because less intrusive means exist (text description, no ID photo). Fine: up to €20M or 4% global turnover.',
        },
        {
          icon: '🔴',
          law: 'DSA',
          text: 'Facebook bears liability once notified of illegal content and fails to act. Hosting a passport scan without consent = illegal content under GDPR. Facebook also has GDPR processor obligations.',
        },
        {
          icon: '✅',
          law: 'Key Principle',
          text: 'Legitimate interest ≠ exposing full identity documents. Data minimisation (GDPR Art. 5): use only what is strictly necessary. A name and description would suffice; a passport scan does not pass the proportionality test.',
        },
        {
          icon: '📋',
          law: 'Remedies',
          text: 'Subject access request (Art. 15) + Right to erasure (Art. 17) + Complaint to DPA. DSA Article 16 takedown request to platform.',
        },
      ],
    },

    bonus: {
      question: 'Under GDPR, which right should the tenant exercise FIRST to get the post removed?',
      options: [
        { id: 'A', text: 'Right to access (Art. 15)' },
        { id: 'B', text: 'Right to erasure (Art. 17)' },
        { id: 'C', text: 'Right to portability (Art. 20)' },
        { id: 'D', text: 'Right to restriction (Art. 18)' },
      ],
      correctAnswer: 'B',
      explanation: 'Right to erasure — Art. 17 ("right to be forgotten"). Since the posting has no valid legal basis, the tenant can demand immediate deletion. Access (A) is useful for evidence, but erasure is the direct remedy. Restriction (D) would pause processing, not remove the data.',
    },
  },
]

export const getRound = (id) => ROUNDS.find(r => r.id === id) || ROUNDS[0]
