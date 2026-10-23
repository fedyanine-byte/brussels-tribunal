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
        explanation: 'Legitimate interest fails when the individual\'s privacy interests clearly outweigh the company\'s interest. For cold marketing emails, consent is required. Recital 47 explicitly says legitimate interest can apply for direct marketing — but only to existing customers, not strangers.',
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

He shares the result in a group chat with 14 mutual friends, adding: "AI gave me what she wouldn't".

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


  // ── ROUND 6: The CSDD Breach ──────────────────────────────────────────────
  {
    id: 'round6',
    number: 6,
    title: 'The CSDD Breach',
    theme: 'Data Breach Notification Obligations',
    laws: ['GDPR'],
    timerSeconds: 120,
    points: 100,
    bonusPoints: 50,

    scenario: {
      title: 'The CSDD Breach',
      text: `CSDD (Ceļu satiksmes drošības direkcija) — Latvia's Road Traffic Safety Directorate — suffered a cybersecurity incident. Their databases hold driver's licence data, vehicle ownership records, home addresses, and medical fitness-to-drive assessments for virtually every driver in Latvia.

CSDD published a public warning on their website and app: "In connection with the cybersecurity incident, we urge extra caution when receiving messages or calls appearing to be from CSDD or other institutions."

The question is: what were CSDD's legal obligations under GDPR, and in what order?`,
      imageUrl: 'csdd-breach.png',
      imageCaption: 'CSDD\'s official cybersecurity incident warning published on e.csdd.lv',
    },

    question: 'Under GDPR, what was CSDD\'s FIRST mandatory obligation upon discovering the breach?',
    options: [
      { id: 'A', text: 'Notify all affected individuals immediately by post or email' },
      { id: 'B', text: 'Notify the Data Protection Authority (DVI) within 72 hours with breach details' },
      { id: 'C', text: 'Fix the security vulnerability first, then report only if actual harm occurred' },
      { id: 'D', text: 'Issue a public press release — a website warning satisfies GDPR notification' },
    ],
    correctAnswer: 'B',

    reveal: {
      title: '72 hours to DVI — then assess if individuals must be told',
      verdict: 'B is correct',
      points: [
        {
          icon: '⏱️',
          law: 'GDPR Art. 33',
          text: 'Controllers must notify the supervisory authority (Latvia: Datu valsts inspekcija — DVI) within 72 hours of becoming aware of a breach. The notification must include: nature of breach, categories and approximate number of people affected, likely consequences, and measures taken.',
        },
        {
          icon: '📢',
          law: 'GDPR Art. 34',
          text: 'If the breach is likely to result in HIGH RISK to affected individuals, the controller must ALSO notify those individuals — without undue delay. This is separate from and comes after the DPA notification. A website warning alone is not sufficient.',
        },
        {
          icon: '🔴',
          law: 'High Risk Trigger',
          text: 'CSDD holds medical fitness-to-drive data — that\'s special category data under Art. 9. Any breach involving Art. 9 data is automatically considered high-risk. CSDD was almost certainly required to notify affected drivers individually, not just post a website warning.',
        },
        {
          icon: '📋',
          law: 'What CSDD got right / wrong',
          text: 'Public warning ✅ — fulfils Art. 34 in a proportionate way when individual contact is impossible at scale. But a generic "be careful of phishing" message may not satisfy the Art. 34 requirement to explain the specific risk and what steps individuals can take.',
        },
      ],
    },

    bonus: {
      question: 'CSDD holds medical fitness-to-drive assessments alongside driver data. How does this affect the breach severity under GDPR?',
      options: [
        { id: 'A', text: 'Medical data = Art. 9 special category → breach is automatically high-risk → individual notification required' },
        { id: 'B', text: 'It doesn\'t change anything — all personal data breaches carry identical notification obligations' },
        { id: 'C', text: 'Medical data is exempt from GDPR — health authorities operate under separate rules' },
        { id: 'D', text: 'Only the doctors who issued assessments need to be notified, not the drivers themselves' },
      ],
      correctAnswer: 'A',
      explanation: 'GDPR Art. 9 designates health data as special category — the highest-risk tier. When a breach involves special category data, the "high risk to rights and freedoms" threshold under Art. 34 is almost always met, triggering mandatory individual notification. Medical fitness data also reveals sensitive health conditions that could be used to discriminate against drivers in employment, insurance, or other contexts — exactly the harm GDPR Art. 34 is designed to prevent.',
    },
  },


  // ── ROUND 7: The YouTube Face ─────────────────────────────────────────────
  {
    id: 'round7',
    number: 7,
    title: 'The YouTube Face',
    theme: 'Legitimate Interest vs Right to Object',
    laws: ['GDPR'],
    timerSeconds: 120,
    points: 100,
    bonusPoints: 50,

    scenario: {
      title: 'The YouTube Face',
      text: `A Latvian YouTuber runs a popular "City Walks Rīga" channel with 48K subscribers. He films street scenes and publishes them unedited — no blurring, no cropping. Identifiable faces appear throughout.

One viewer recognises herself walking near her workplace. She doesn't want her daily route or appearance linked to that location online. She emails the creator: "I never consented to being filmed. Remove the video or blur my face."

The YouTuber replies: "I filmed in a public space. Legitimate interest covers me. I'm not doing anything wrong."`,
      imageUrl: 'youtube-face.png',
      imageCaption: 'Street video with faces blurred — the GDPR-compliant version of what the YouTuber posted without blurring',
    },

    question: 'Is the YouTuber\'s "legitimate interest" defence valid under GDPR?',
    options: [
      { id: 'A', text: 'Yes — filming in a public space is automatic legitimate interest; the person filmed has no GDPR rights' },
      { id: 'B', text: 'Possibly, but legitimate interest requires a 3-part balancing test AND the person can object — he must then act' },
      { id: 'C', text: 'No — legitimate interest can never justify filming identifiable people in public without consent' },
      { id: 'D', text: 'GDPR doesn\'t apply — YouTube is a US company and EU law doesn\'t reach it' },
    ],
    correctAnswer: 'B',

    reveal: {
      title: 'Legitimate interest is not a blank cheque — and Art. 21 gives her a veto',
      verdict: 'B is correct',
      points: [
        {
          icon: '⚖️',
          law: 'GDPR Art. 6(1)(f) — Legitimate Interest',
          text: 'Legitimate interest can apply to street filming for journalistic, cultural or informational purposes. But it is NOT automatic. The YouTuber must pass the 3-part test: (1) pursue a legitimate purpose, (2) processing must be necessary, (3) individual\'s interests must not override his. City walks may pass parts 1–2, but part 3 is debatable.',
        },
        {
          icon: '🔴',
          law: 'GDPR Art. 21 — Right to Object',
          text: 'When processing is based on legitimate interest, the data subject can OBJECT at any time. The controller must stop processing UNLESS they demonstrate compelling legitimate grounds that override the individual\'s interests. "I have 48K subscribers" is not a compelling ground.',
        },
        {
          icon: '✅',
          law: 'GDPR Art. 5(1)(c) — Data Minimisation',
          text: 'The image shows the GDPR-compliant solution: blur the faces. If faces are blurred, there is no longer personal data — GDPR stops applying entirely. This is data minimisation in practice. The YouTuber could have avoided the entire problem by blurring from the start.',
        },
        {
          icon: '📋',
          law: 'Art. 3 — Territorial Scope',
          text: 'GDPR applies because the subject is in the EU and the processing targets people in Latvia. YouTube\'s US incorporation is irrelevant — Art. 3(2) extends GDPR to any controller offering services to EU residents or monitoring their behaviour.',
        },
      ],
    },

    bonus: {
      question: 'The woman wants the video taken down. Which GDPR right gives her the strongest and most direct remedy?',
      options: [
        { id: 'A', text: 'Art. 15 — Right of access: she can demand to know what data he holds' },
        { id: 'B', text: 'Art. 17 — Right to erasure: no valid legal basis → she can demand deletion' },
        { id: 'C', text: 'Art. 21 — Right to object: she objects to legitimate-interest-based processing and he must demonstrate override grounds' },
        { id: 'D', text: 'Art. 20 — Right to portability: she can demand he transfer the video to her' },
      ],
      correctAnswer: 'C',
      explanation: 'Art. 21 is the sharper tool here. Since the YouTuber\'s only available basis is legitimate interest (Art. 6(1)(f)), Art. 21 lets her object — and he must stop processing UNLESS he shows compelling legitimate grounds that override her privacy interests. He cannot. Art. 17 erasure also applies (no valid basis remaining once objection succeeds), but Art. 21 is the direct trigger. Art. 15 (access) just gives her information. Art. 20 (portability) applies only to consent or contract-based processing.',
    },
  },


  // ── ROUND 8: The Loan Robot ───────────────────────────────────────────────
  {
    id: 'round8',
    number: 8,
    title: 'The Loan Robot',
    theme: 'Automated Decisions & AI Act High-Risk',
    laws: ['GDPR', 'AI Act'],
    timerSeconds: 120,
    points: 100,
    bonusPoints: 50,

    scenario: {
      title: 'The Loan Robot',
      text: `Vivus.lv's system approves or rejects loan applications automatically — "Lēmums pieņemts automātiski dažu sekunžu laikā" (decision made automatically in seconds). No human reviews it.

Māris applies for a €300 loan to fix his car — he needs it for work. Automatic rejection. No reason given. No human contact.

Māris knows an old disputed debt (which he never actually owed and was later cancelled) is still showing on his credit history. The algorithm almost certainly used it.`,
      imageUrl: 'loan-robot.png',
      imageCaption: 'Vivus.lv — "Your application is approved. Decision made automatically in seconds." The same system that silently rejects others.',
    },

    question: 'Under GDPR Art. 22, which rights does Māris have against this automated rejection?',
    options: [
      { id: 'A', text: 'None — financial companies are legally permitted to use fully automated decisions' },
      { id: 'B', text: 'The right to opt out of the algorithm entirely and apply only to human-staffed lenders' },
      { id: 'C', text: 'The right to human review, to express his view, and to contest the outcome' },
      { id: 'D', text: 'The right to compensation only if he can prove the algorithm made a factual error' },
    ],
    correctAnswer: 'C',

    reveal: {
      title: 'A robot can\'t have the final word on your financial life',
      verdict: 'C is correct',
      points: [
        {
          icon: '🔴',
          law: 'GDPR Art. 22(1)',
          text: 'Individuals have the right NOT to be subject to decisions based solely on automated processing that produce significant legal effects. A loan rejection is a significant effect — it directly affects Māris\'s financial and working life.',
        },
        {
          icon: '✅',
          law: 'GDPR Art. 22(3)',
          text: 'When automated decision-making is permitted (e.g. contractual necessity), the controller MUST: (1) allow human review of the decision, (2) let the person express their point of view, (3) allow the person to contest the outcome. Vivus provided none of these.',
        },
        {
          icon: '📋',
          law: 'GDPR Art. 13–14 — Transparency',
          text: 'Vivus must inform Māris in their privacy notice that automated decisions are made, the logic involved, and the significance and consequences. "Decision made in seconds" on screen is not sufficient GDPR disclosure.',
        },
        {
          icon: '🤖',
          law: 'AI Act Annex III',
          text: 'Credit scoring AI is explicitly listed as HIGH-RISK under AI Act Annex III. Vivus must maintain documentation, conduct conformity assessments, ensure human oversight capability, and register the system in the EU AI database before deploying it.',
        },
      ],
    },

    bonus: {
      question: 'Under the AI Act, how is Vivus\'s credit-scoring algorithm classified?',
      options: [
        { id: 'A', text: 'Minimal risk — financial decision tools are excluded from AI Act regulation' },
        { id: 'B', text: 'High-risk — credit scoring is listed in AI Act Annex III under access to essential services' },
        { id: 'C', text: 'General Purpose AI — covered only if the model exceeds a compute training threshold' },
        { id: 'D', text: 'Prohibited — fully automated lending decisions are banned outright under Art. 5' },
      ],
      correctAnswer: 'B',
      explanation: 'AI Act Annex III, point 5(b): AI systems used to evaluate creditworthiness or establish credit scores are HIGH-RISK. This triggers a full compliance framework: technical documentation, human oversight mechanisms, accuracy and robustness requirements, registration in the EU AI public database, and a conformity assessment before deployment. High-risk ≠ prohibited — the system can operate, but with significant obligations. The ban (Art. 5) is reserved for social scoring by public authorities, subliminal manipulation, and a few other specific categories.',
    },
  },


  // ── ROUND 9: The Google Panel ─────────────────────────────────────────────
  {
    id: 'round9',
    number: 9,
    title: 'The Google Panel',
    theme: 'Right to De-listing & Purpose Limitation',
    laws: ['GDPR'],
    timerSeconds: 120,
    points: 100,
    bonusPoints: 50,

    scenario: {
      title: 'The Google Panel',
      text: `Google's Knowledge Panel for Aļona Ostapenko aggregates her age, DOB, weight, height, parents, siblings, education and social profiles — pulled from Wikipedia, sports databases and news sources. She never personally submitted this data to Google.

Now imagine the same thing happening to a private person: Sandris, a mid-level accountant in Rīga, was mentioned once in a local news article 8 years ago after a minor traffic incident. Google's search results still show his name, employer, neighbourhood, and a photo. He's been passed over for jobs. He wants it gone.

Google refuses: "The article is still online. We just index it."`,
      imageUrl: 'google-panel.png',
      imageCaption: 'Google\'s Knowledge Panel — data aggregated from multiple sources without the subject\'s direct input',
    },

    question: 'Can Sandris force Google to remove his data from search results under GDPR — even if the original news article stays online?',
    options: [
      { id: 'A', text: 'No — Google only indexes what\'s online; it\'s not a data controller and has no GDPR obligations' },
      { id: 'B', text: 'Yes — under Art. 17, Google must de-list results on valid request; the original article can stay' },
      { id: 'C', text: 'Only if the original article is also deleted — de-listing without deletion is meaningless' },
      { id: 'D', text: 'Only if the data is factually incorrect — GDPR cannot force removal of true information' },
    ],
    correctAnswer: 'B',

    reveal: {
      title: 'Google Spain (2014): search engines ARE controllers — and must de-list',
      verdict: 'B is correct',
      points: [
        {
          icon: '⚖️',
          law: 'Google Spain v. AEPD — C-131/12 (2014)',
          text: 'The landmark CJEU ruling: search engines are independent data controllers for the results they return. "We just index it" is not a defence. Google processes personal data when it retrieves, organises and presents results — and must respond to de-listing requests.',
        },
        {
          icon: '✅',
          law: 'GDPR Art. 17 — Right to De-listing',
          text: 'De-listing ≠ deletion. The original article stays online — Google only removes the link from search results. Sandris\'s Art. 17 claim is strong: the data is old (8 years), he\'s a private person, no ongoing public interest, and it\'s causing real harm (job applications).',
        },
        {
          icon: '🔴',
          law: 'GDPR Art. 5(1)(b) — Purpose Limitation',
          text: 'His data was published for one purpose (local news reporting). Google repurposing it into a permanent searchable profile, linked to his employer and photo, is a secondary use he never anticipated and didn\'t consent to.',
        },
        {
          icon: '⚠️',
          law: 'Why Ostapenko is different',
          text: 'For a public figure like Ostapenko, most of the Knowledge Panel survives the balance test: sporting achievements, public role data, and journalistic content serve legitimate public interest (GDPR Art. 17(3)(a)). Sandris is a private person with no ongoing public relevance — the scales tip firmly in his favour.',
        },
      ],
    },

    bonus: {
      question: 'Sandris submits a de-listing request to Google. Google rejects it. What is his next step under GDPR?',
      options: [
        { id: 'A', text: 'Sue Google directly in a Latvian court for €10,000 in damages' },
        { id: 'B', text: 'Complain to the Datu valsts inspekcija (DVI) — the Latvian supervisory authority' },
        { id: 'C', text: 'File a copyright claim with the original newspaper to force article deletion' },
        { id: 'D', text: 'Nothing — Google\'s final decision on de-listing requests cannot be appealed under GDPR' },
      ],
      correctAnswer: 'B',
      explanation: 'GDPR Art. 77 gives every data subject the right to lodge a complaint with their national supervisory authority if they believe processing violates GDPR. In Latvia that\'s the Datu valsts inspekcija (DVI). The DVI investigates, can order Google to comply, and can impose fines. He can ALSO sue in court (Art. 79) — both routes can run in parallel. Option A is available but typically follows a DVI decision. Option D is wrong — refusal of a de-listing request is always reviewable.',
    },
  },


  // ── ROUND 10: The Cheap Smart Speaker ────────────────────────────────────
  {
    id: 'round10',
    number: 10,
    title: 'The Cheap Speaker',
    theme: 'Consent, Dark Patterns & IoT',
    laws: ['GDPR'],
    timerSeconds: 120,
    points: 100,
    bonusPoints: 50,

    scenario: {
      title: 'The Cheap Smart Speaker',
      text: `You order a €12.39 Bluetooth speaker from AliExpress. During setup, a popup appears:

"Terms and Conditions: (page 47) — Device may process audio to improve service quality."

The only button reads: ACCEPT T&C.

You accept — there is no other way to use the device. The speaker sits in your kitchen, always plugged in, always on.`,
      imageUrl: 'smart-speaker.png',
      imageCaption: 'AliExpress speaker setup — consent to audio processing buried on page 47 of T&C',
    },

    question: 'Is clicking "ACCEPT T&C" valid GDPR consent for the device to process your home audio?',
    options: [
      { id: 'A', text: 'Yes — you were informed in the T&C and had the option to close the popup' },
      { id: 'B', text: 'Yes — consumer electronics are exempt from GDPR consent rules if the purpose is service improvement' },
      { id: 'C', text: 'No — valid consent must be freely given, specific and informed; a buried T&C clause is none of these' },
      { id: 'D', text: 'Depends — valid if the company has an EU address; invalid if it\'s based in China' },
    ],
    correctAnswer: 'C',

    reveal: {
      title: '"Page 47" is not consent — it\'s a dark pattern',
      verdict: 'C is correct',
      points: [
        {
          icon: '🔴',
          law: 'GDPR Art. 7(4) — Consent bundled into T&C',
          text: 'Consent bundled as a condition of accessing a service is presumed NOT freely given. "You can\'t use the device unless you accept audio processing" means the consent is coerced, not a genuine free choice.',
        },
        {
          icon: '🔴',
          law: 'GDPR Art. 4(11) — Unambiguous indication',
          text: 'Consent requires an unambiguous, affirmative act. Clicking a single "ACCEPT T&C" button for 47 pages of terms is NOT specific consent to audio processing — it\'s a take-it-or-leave-it bundle. Audio consent must be granular and separate.',
        },
        {
          icon: '🔴',
          law: 'GDPR Art. 5(1)(b) — Purpose specification',
          text: '"Improve service quality" is not a specific, explicit purpose. GDPR requires the exact purpose be stated before collection begins — not buried in page 47. What audio? When? Shared with whom? Retained how long? None of this is answered.',
        },
        {
          icon: '⚖️',
          law: 'GDPR Art. 3(2) — Territorial scope',
          text: 'GDPR applies even if the manufacturer is in China. If the device is sold to EU consumers and processes their data, EU law governs. The seller may be unreachable for enforcement — but the processing is still illegal. EU customs can also block non-compliant IoT devices at the border.',
        },
      ],
    },

    bonus: {
      question: 'Which GDPR principle does "Device may process audio to improve service quality" most directly violate?',
      options: [
        { id: 'A', text: 'Storage limitation (Art. 5(1)(e)) — audio should not be kept longer than necessary' },
        { id: 'B', text: 'Purpose limitation (Art. 5(1)(b)) — purposes must be explicit, specific and legitimate — not vague' },
        { id: 'C', text: 'Data minimisation (Art. 5(1)(c)) — a speaker doesn\'t need audio data at all' },
        { id: 'D', text: 'Accuracy (Art. 5(1)(d)) — the audio captured may not accurately reflect the user\'s words' },
      ],
      correctAnswer: 'B',
      explanation: '"Improve service quality" is classic purpose-washing — a phrase so vague it could justify collecting almost anything. GDPR Art. 5(1)(b) requires purposes to be specified, explicit and legitimate at the time of collection. Art. 13 requires the controller to inform the subject of the purpose in a clear, plain-language privacy notice — not in clause 47(c)(iii) of a T&C document. Data minimisation (C) is also a strong argument — if the device functions as a Bluetooth speaker, it may not need to process audio at all for "service improvement." Both B and C are valid critiques; B is the more direct violation of the consent notice specifically.',
    },
  },

]

export const getRound = (id) => ROUNDS.find(r => r.id === id) || ROUNDS[0]
