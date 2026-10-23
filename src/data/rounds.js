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

  // ── ROUND 2: The Drunk TikTok ────────────────────────────────────────────
  {
    id: 'round2',
    number: 2,
    title: 'The Drunk TikTok',
    theme: 'Consent & Right to Erasure',
    laws: ['GDPR'],
    timerSeconds: 120,
    points: 100,
    bonusPoints: 50,

    scenario: {
      title: 'The Drunk TikTok',
      text: `Marta and her friends were at a party. Her friend filmed her dancing — clearly intoxicated — and posted it on TikTok without asking. The video hit 12.4K likes overnight.

The next morning Marta found it and messaged her friend: "Take it down, that's not funny!" The reply came back: "Hell no, you were at a party, not a private place. It's funny, get over it."`,
      imageUrl: 'drunk-tiktok.png',
      imageCaption: 'TikTok post + Marta\'s takedown request ignored',
    },

    question: 'Under GDPR, can Marta legally force her friend to remove the video?',
    options: [
      { id: 'A', text: 'No — she was in a public place, so no privacy protection applies' },
      { id: 'B', text: 'Yes — no consent was given; Art. 17 right to erasure applies' },
      { id: 'C', text: 'Only if the video shows her face clearly enough to identify her' },
      { id: 'D', text: 'Only TikTok is responsible — her friend is just a private person' },
    ],
    correctAnswer: 'B',

    reveal: {
      title: '"Public place" is not a GDPR exemption',
      verdict: 'B is correct',
      points: [
        {
          icon: '🔴',
          law: 'GDPR Art. 6',
          text: '"You were at a party" is not a legal basis. Processing personal data (a video showing an identifiable face) requires a lawful basis — consent, legitimate interest, etc. Her friend had none.',
        },
        {
          icon: '🔴',
          law: 'GDPR Art. 17',
          text: 'Right to erasure applies: no valid legal basis exists, Marta objected, and the data is being processed for entertainment. Both her friend AND TikTok can be required to delete it.',
        },
        {
          icon: '⚖️',
          law: 'Legitimate Interest test',
          text: '"It\'s funny, get over it" fails the balancing test. The friend\'s interest in viral views does NOT override Marta\'s right to control her own image, especially in a compromising situation.',
        },
        {
          icon: '📋',
          law: 'Remedies',
          text: 'Marta can: (1) file a GDPR erasure request to TikTok directly, (2) complain to the DPA, (3) sue her friend for damages. TikTok as a platform has DSA + GDPR obligations once notified.',
        },
      ],
    },

    bonus: {
      question: 'What legal basis SHOULD Marta\'s friend have used before posting the video?',
      options: [
        { id: 'A', text: 'Legitimate interest — parties are semi-public events' },
        { id: 'B', text: 'Explicit consent — ask Marta before posting' },
        { id: 'C', text: 'Contract — they\'re friends, implied permission' },
        { id: 'D', text: 'No basis needed — GDPR doesn\'t cover personal posts' },
      ],
      correctAnswer: 'B',
      explanation: 'Consent (Art. 6(1)(a)) is the correct basis for sharing someone\'s image publicly. Note: GDPR\'s "household exemption" (Art. 2(2)(c)) covers truly private use — sharing only with a small group of mutual friends. Publishing to TikTok with 12K+ views is NOT household use. Explicit consent was required.',
    },
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

  // ── ROUND 4: The Personas Kods ────────────────────────────────────────────
  {
    id: 'round4',
    number: 4,
    title: 'The Personas Kods',
    theme: 'Doxxing & Personal Data in Public Groups',
    laws: ['GDPR', 'Latvian PDPA'],
    timerSeconds: 120,
    points: 100,
    bonusPoints: 50,

    scenario: {
      title: 'The Personas Kods',
      text: `In a Telegram group called "Rīgas čats" with 1,248 members, Anna posts a photo of a woman she doesn't know: "Kas ir zināms par viņu?" ("What do you know about her?")

Three minutes later, Jānis replies with her full name and personas kods (personal ID code). Liene replies: "Paldies!" (Thanks!)

The woman in the photo has no idea this is happening.`,
      imageUrl: 'personas-kods.png',
      imageCaption: '"Rīgas čats" Telegram group — name and personal code shared with 1,248 members',
    },

    question: 'What is the PRIMARY GDPR violation in this Telegram exchange?',
    options: [
      { id: 'A', text: 'None — Telegram is a private messaging app, GDPR doesn\'t apply' },
      { id: 'B', text: 'Jānis processed personal data (name + ID code) with no lawful basis to 1,248 strangers' },
      { id: 'C', text: 'Only Anna violated GDPR by posting the photo — Jānis just answered her question' },
      { id: 'D', text: 'The personas kods is not personal data — it\'s an administrative number, not a name' },
    ],
    correctAnswer: 'B',

    reveal: {
      title: 'Doxxing 1,248 people deep — textbook GDPR violation',
      verdict: 'B is correct',
      points: [
        {
          icon: '🔴',
          law: 'GDPR Art. 4(1)',
          text: 'The Latvian personas kods IS personal data. It directly identifies a specific person, encodes their date of birth, and is linked to medical, tax, property and state records. Sharing it = sharing an identity key.',
        },
        {
          icon: '🔴',
          law: 'GDPR Art. 6',
          text: 'Jānis had zero lawful basis. Not consent (the subject has no idea). Not legitimate interest (curiosity of 1,248 strangers does not outweigh the risk of identity theft, fraud, and stalking). Not contract. Nothing.',
        },
        {
          icon: '🔴',
          law: 'GDPR Art. 5(1)(f)',
          text: 'Integrity & confidentiality: posting someone\'s ID code in a 1,248-member group creates a massive exposure risk. This data can be used to impersonate the person, access government e-services, and commit financial fraud.',
        },
        {
          icon: '📋',
          law: 'Liability',
          text: 'Both Anna (posted photo, solicited the info) and Jānis (posted the data) are data controllers in breach of GDPR. Telegram bears potential DSA liability if notified and doesn\'t act. The subject can sue for damages + DPA complaint.',
        },
      ],
    },

    bonus: {
      question: 'The personas kods encodes the person\'s date of birth. Does this make it "special category" data under GDPR Art. 9?',
      options: [
        { id: 'A', text: 'Yes — date of birth is health-adjacent, triggering Art. 9 extra protection' },
        { id: 'B', text: 'No — it\'s regular personal data (Art. 4), but still strictly protected' },
        { id: 'C', text: 'Yes — any government ID number is automatically special category data' },
        { id: 'D', text: 'No — date of birth is public information, no protection applies' },
      ],
      correctAnswer: 'B',
      explanation: 'Art. 9 "special categories" are: racial/ethnic origin, political opinions, religious beliefs, trade union membership, genetic/biometric data, health data, sex life/orientation. Date of birth and ID numbers are NOT Art. 9 — they\'re regular personal data under Art. 4. But "regular" still means you need a lawful basis under Art. 6. The personas kods is so powerful an identifier (linked to all state systems) that Latvia\'s own PDPA gives it additional protection beyond standard GDPR.',
    },
  },


  // ── ROUND 5: The AI Nude ──────────────────────────────────────────────────
  {
    id: 'round5',
    number: 5,
    title: 'The AI Nude',
    theme: 'Deepfakes, Biometric Data & AI Act',
    laws: ['GDPR', 'AI Act'],
    timerSeconds: 120,
    points: 100,
    bonusPoints: 50,

    scenario: {
      title: 'The AI Nude',
      text: `Aigars, 22, downloads a free "AI photo enhancer" app he found on Telegram. He uploads a public Instagram photo of his ex-girlfriend. The app uses AI to generate a realistic nude image of her — combining her real face with a synthetic body.

He shares the result in a group chat with 14 mutual friends, adding: "AI дало мне то, чего она не давала" ("AI gave me what she wouldn't").

The image is entirely synthetic — her face is real, the body is generated. She never posed for any photo like this.`,
      imageUrl: 'ai-nude.png',
      imageCaption: 'AI-generated composite: real face + synthetic body (body pixelated for display)',
    },

    question: 'Under EU law, which statement about Aigars\'s actions is MOST accurate?',
    options: [
      { id: 'A', text: 'No GDPR violation — the image is fake, not a real photo, so no real data was processed' },
      { id: 'B', text: 'Only criminal law applies; GDPR and AI Act don\'t cover AI-generated synthetic imagery' },
      { id: 'C', text: 'He violated GDPR (biometric data processed without consent) + AI Act (deepfake not labelled) + likely criminal law' },
      { id: 'D', text: 'Only the app developer is liable — Aigars just used an existing tool' },
    ],
    correctAnswer: 'C',

    reveal: {
      title: '"It\'s fake" is not a defence — her face is real data',
      verdict: 'C is correct',
      points: [
        {
          icon: '🔴',
          law: 'GDPR Art. 9',
          text: 'Her face in the Instagram photo is biometric data — it uniquely identifies her. Processing it to generate intimate imagery without consent = processing special category data with no lawful basis. This is the most serious tier of GDPR violation.',
        },
        {
          icon: '🔴',
          law: 'AI Act Art. 50',
          text: 'Deepfakes — AI-generated images depicting real people — must be clearly labelled as artificially generated. Aigars shared an unlabelled deepfake. The app developer also has transparency obligations. Neither complied.',
        },
        {
          icon: '🔴',
          law: 'Criminal Law',
          text: 'Non-consensual intimate imagery (NCII) laws are in force or pending across EU member states. Latvia\'s Criminal Law (Krimināllikums) Art. 145² covers intimate image abuse. This is not just an administrative fine — it is a criminal offence.',
        },
        {
          icon: '⚖️',
          law: 'Liability split',
          text: 'The app developer violated AI Act + GDPR as a controller/processor. Aigars violated GDPR as the person who chose to process her biometric data. Sharing it added DSA implications. "I just used the tool" is not a defence — you made the choice.',
        },
      ],
    },

    bonus: {
      question: 'Under GDPR, her Instagram photo (showing her face) is classified as which type of data?',
      options: [
        { id: 'A', text: 'Regular personal data (Art. 4) — a face photo is not special category' },
        { id: 'B', text: 'Special category data (Art. 9) — biometric data used to uniquely identify a person' },
        { id: 'C', text: 'Anonymised data — public Instagram posts cannot be personal data' },
        { id: 'D', text: 'Sensitive data (Art. 6) — requires a higher lawful basis than regular data' },
      ],
      correctAnswer: 'B',
      explanation: 'GDPR Art. 9 defines special category data to include "biometric data for the purpose of uniquely identifying a natural person." A face photo processed by an AI system to identify or generate content about a specific person qualifies. The key is the PURPOSE of processing — using her face to generate intimate content is exactly the kind of biometric processing Art. 9 targets. Processing special category data requires an explicit legal basis under Art. 9(2), of which none exists here.',
    },
  },

]

export const getRound = (id) => ROUNDS.find(r => r.id === id) || ROUNDS[0]
