import type { StyleType, StyleProfile, Choice } from "./types";

export const styleProfiles: Record<StyleType, StyleProfile> = {
  analytical: {
    type: "analytical",
    label: "Analytical",
    emoji: "\uD83D\uDD2C",
    tagline: "Systematic, thorough, and detail-oriented",
    description:
      "You approach the world through careful analysis and logical thinking. You value accuracy, quality, and thoroughness. Before making decisions, you prefer to gather all the facts, weigh the evidence, and think things through. Others appreciate your precision and ability to spot potential problems before they arise.",
    strengths: [
      "Precise and detail-oriented",
      "Thorough in research and preparation",
      "Strong logical and critical thinking",
      "High standards for quality",
      "Systematic and well-organised",
    ],
    watchOuts: [
      "May over-analyse or delay decisions",
      "Can seem overly critical or perfectionist",
      "May struggle with ambiguity or rapid change",
      "Risk of missing the big picture while focused on details",
      "May come across as distant or impersonal",
    ],
  },
  driver: {
    type: "driver",
    label: "Driver",
    emoji: "\uD83C\uDFAF",
    tagline: "Results-oriented, decisive, and efficient",
    description:
      "You are focused on outcomes and getting things done. You make decisions quickly, take charge of situations, and push for results. Others see you as confident, direct, and action-oriented. You value efficiency and have little patience for unnecessary process or indecision.",
    strengths: [
      "Decisive and action-oriented",
      "Strong goal focus and follow-through",
      "Confident in high-pressure situations",
      "Efficient use of time and resources",
      "Natural leadership presence",
    ],
    watchOuts: [
      "May come across as impatient or demanding",
      "Can steamroll others in pursuit of results",
      "May overlook relationship-building",
      "Risk of making decisions too quickly",
      "May struggle with tasks that require patience and listening",
    ],
  },
  amiable: {
    type: "amiable",
    label: "Amiable",
    emoji: "\uD83E\uDD1D",
    tagline: "Supportive, patient, and diplomatic",
    description:
      "You prioritise harmony and genuine connection with others. You are a natural listener and team player who values cooperation over competition. People feel comfortable around you because you create a safe, supportive environment. You build trust through consistency and genuine care for others.",
    strengths: [
      "Excellent listener and team player",
      "Builds strong, trusting relationships",
      "Patient and diplomatic",
      "Creates harmony and reduces conflict",
      "Reliable and consistent",
    ],
    watchOuts: [
      "May avoid necessary confrontation",
      "Can have difficulty saying no",
      "May be slow to act or make decisions",
      "Risk of suppressing your own needs",
      "May struggle with asserting your position",
    ],
  },
  expressive: {
    type: "expressive",
    label: "Expressive",
    emoji: "\u2728",
    tagline: "Enthusiastic, creative, and persuasive",
    description:
      "You bring energy, vision, and enthusiasm to everything you do. You are naturally persuasive and enjoy inspiring others with your ideas. You thrive in social settings and are comfortable being the centre of attention. Others are drawn to your warmth, creativity, and ability to see the big picture.",
    strengths: [
      "Inspiring and motivating to others",
      "Creative and big-picture thinking",
      "Strong communication and persuasion skills",
      "Energetic and enthusiastic",
      "Comfortable with change and new ideas",
    ],
    watchOuts: [
      "May over-commit or over-promise",
      "Can lose focus or lack follow-through",
      "May be impulsive in decisions",
      "Risk of dominating conversations",
      "May overlook important details",
    ],
  },
};

export function computeScores(
  d1Answers: Record<number, Choice>,
  d2Answers: Record<number, Choice>
): { assertiveness: number; responsiveness: number } {
  let assertiveness = 0;
  let responsiveness = 0;
  for (let i = 1; i <= 15; i++) {
    if (d1Answers[i] === "B") assertiveness++;
    if (d2Answers[i] === "B") responsiveness++;
  }
  return { assertiveness, responsiveness };
}

export function determineStyle(
  assertiveness: number,
  responsiveness: number
): StyleType {
  const midpoint = 7.5;
  if (assertiveness > midpoint && responsiveness <= midpoint) return "driver";
  if (assertiveness > midpoint && responsiveness > midpoint) return "expressive";
  if (assertiveness <= midpoint && responsiveness > midpoint) return "amiable";
  return "analytical";
}
