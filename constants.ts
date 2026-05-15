import { TrainingProtocol } from './types';

export const BRAND_MANIFESTO = `
IDENTITY: "GFORCE - SPACE" (Human Performance & Space Intelligence)
HOST: Gonçalo Esteves.
CORE CONCEPT:
- We aggregate Space News (Artemis II, Starship, Lunar Research) and "De-orbit" it into human implementation.
- We translate "Extreme Environment Requirements" (PRDs, Technical Papers) into "Daily Life Performance".
- Tone: Space-Age meets Stone Age. Dry humor. High-speed signal.
- Format: Live-streaming aggregator (X, LinkedIn).
- Focus: Capability over comfort.
`;

export const ARTEMIS_II_PROTOCOL: TrainingProtocol = {
  title: "Artemis II: Life Support Audit (Tactical)",
  rounds: [
    {
      name: "PHASE 1: ATMOSPHERIC STABILIZATION",
      duration: "10:00",
      description: "Calibrating the internal environment for peak cognitive load.",
      drill: [
        "Audit CO2 scrubbers: Ensure redundant filters are primed.",
        "O2 Saturation Check: Verify cabin pressure at 10.2 psi.",
        "Thermal Regulation: Set sleep quarters to 18°C (64°F) for deep recovery."
      ]
    },
    {
      name: "PHASE 2: BIOMETRIC SYNC",
      duration: "15:00",
      description: "Aligning human systems with the capsule's life support.",
      drill: [
        "Circadian Lighting: Shift to 480nm blue light for 60 mins post-wake.",
        "Hydration Protocol: Ingest 500ml electrolyte solution (2:1 Na:K ratio).",
        "Stability Drill: 5 mins of DNS breathing to stabilize the core in microgravity."
      ]
    },
    {
      name: "PHASE 3: EMERGENCY BYPASS",
      duration: "05:00",
      description: "Rapid response to life support failure.",
      drill: [
        "Manual override of air circulation fans.",
        "Deployment of personal O2 canisters.",
        "Seal check on all biometric interfaces."
      ]
    }
  ],
  coachNotes: "The capsule is an extension of your body. If the life support fails, your performance drops within minutes. Audit the environment before you audit the mission."
};

export const INITIAL_SIGNALS: any[] = [
  {
    id: 'sig-attia-rose-250',
    title: "Audit: The Drive #250 (Kevin Rose Q&A)",
    source: "YouTube / The Drive",
    timestamp: "2024-05-15",
    rawNews: "Discussion on Zone 2, VO2 Max, Stability (DNS), and protein intake with Kevin Rose. Focus on the Centenarian Decathlon.",
    deorbitedInsight: "Longevity is a technical requirement, not a wish. If you aren't training for the 'Centenarian Decathlon', you are essentially planning for failure in your final 10 years. Stability is the most underrated 'Space-Age' metric.",
    relevance: 'PERSONAL',
    status: 'DRAFT',
    analysis: {
      processes: [
        "Centenarian Decathlon Framework",
        "Zone 2 Aerobic Foundation (3-4hrs/week)",
        "DNS (Dynamic Neuromuscular Stabilization)",
        "Protein Floor: 1g/lb of lean body mass"
      ],
      gaps: [
        "Social Protocol: No advice on maintaining 1g/lb protein during business travel.",
        "Psychological Cost: The willpower fatigue of 4x4 VO2 Max intervals isn't addressed.",
        "Scaling: Missing instructions for 'De-orbiting' these drills to a 15-minute morning routine."
      ],
      implementationEase: 'MODERATE',
      roadmap: "Week 1-2: DNS Stability + Zone 2. Week 3-4: Introduce Strength. Month 2: VO2 Max Peak Testing."
    }
  },
  {
    id: 'sig-001',
    title: "Artemis II: Life Support Audit",
    source: "NASA Mission Intel",
    timestamp: "2024-05-12",
    rawNews: "Testing Orion capsule life support for 500 days.",
    deorbitedInsight: "Your home is your capsule. If your air quality, sleep temperature, and light cycles aren't audited, you are operating on 'Legacy Systems'. Perform a 48-hour life support audit.",
    relevance: 'DESIRES',
    status: 'VALIDATING',
    analysis: {
      processes: [
        "Air Quality Filtration (HEPA/Carbon)",
        "Circadian Light Optimization",
        "Thermal Regulation (Sleep Hygiene)",
        "Biometric Monitoring Integration"
      ],
      gaps: [
        "Hardware: Most consumer HEPA filters lack the CADR required for high-CO2 environments.",
        "Software: No automated link between sleep data and HVAC adjustment.",
        "Human Error: Failure to audit the 'Capsule' on a weekly basis."
      ],
      implementationEase: 'EASY',
      roadmap: "Day 1: Audit Air/Light. Day 2: Implement Thermal Control. Day 7: Review Biometric Baseline."
    },
    protocol: ARTEMIS_II_PROTOCOL
  }
];
