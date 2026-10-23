// ─── BRUSSELS TRIBUNAL — GAME ROUNDS ────────────────────────────────────────
// Test prototype contains Round 3 only.
// Full game will have 5 rounds covering GDPR, DMA, DSA, AI Act.
// ────────────────────────────────────────────────────────────────────────────

export const ROUNDS = [
  {
    id: 'round3',
    number: 3,
    title: 'Who Is Liable?',
    theme: 'Platform Responsibility',
    laws: ['GDPR', 'DSA'],
    timerSeconds: 60,
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
      {
        id: 'A',
        label: 'A',
        text: 'The landlord who posted it',
        subtext: 'Posted personal data without consent'
      },
      {
        id: 'B',
        label: 'B',
        text: 'Facebook (Meta)',
        subtext: 'Platform allowed illegal content'
      },
      {
        id: 'C',
        label: 'C',
        text: 'Both — but for different violations',
        subtext: 'Different laws, different roles'
      },
      {
        id: 'D',
        label: 'D',
        text: 'No one — legitimate interest applies',
        subtext: 'Warning others is a valid purpose'
      }
    ],
    correctAnswer: 'C',

    reveal: {
      title: 'Both are liable — under different laws',
      verdict: 'C is correct',
      points: [
        {
          icon: '🔴',
          law: 'GDPR',
          text: 'The landlord is a data controller. Publishing a passport scan has no valid legal basis — legitimate interest fails because less intrusive means exist (text description, no ID photo). Fine: up to €20M or 4% global turnover.'
        },
        {
          icon: '🔴',
          law: 'DSA',
          text: 'Facebook bears liability once notified of illegal content and fails to act. Hosting a passport scan without consent = illegal content under GDPR. Facebook also has GDPR processor obligations.'
        },
        {
          icon: '✅',
          law: 'Key Principle',
          text: 'Legitimate interest ≠ exposing full identity documents. Data minimisation principle (GDPR Art. 5): use only what is strictly necessary. A name and description would suffice; a passport scan does not pass the proportionality test.'
        },
        {
          icon: '📋',
          law: 'Remedies',
          text: 'Subject access request (Art. 15) + Right to erasure (Art. 17) + Complaint to DPA. DSA Article 16 takedown request to platform.'
        }
      ]
    },

    bonus: {
      question: 'Under GDPR, which right should the tenant exercise FIRST to get the post removed?',
      options: [
        { id: 'A', text: 'Right to access (Art. 15)' },
        { id: 'B', text: 'Right to erasure (Art. 17)' },
        { id: 'C', text: 'Right to portability (Art. 20)' },
        { id: 'D', text: 'Right to restriction (Art. 18)' }
      ],
      correctAnswer: 'B',
      explanation: 'Right to erasure — Art. 17 ("right to be forgotten"). Since the posting has no valid legal basis, the tenant can demand immediate deletion. Access (A) is useful for evidence, but erasure is the direct remedy. Restriction (D) would pause processing, not remove the data.'
    }
  }
]

export const getRound = (id) => ROUNDS.find(r => r.id === id) || ROUNDS[0]
