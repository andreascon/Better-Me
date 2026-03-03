import { QuadrantData, QuadrantCategory } from "./types";

export const categoryLabels: Record<QuadrantCategory, string> = {
  leadership: "Leadership & Influence",
  interpersonal: "Interpersonal & Social",
  work: "Work & Achievement",
  personal: "Personal & Character",
};

export const quadrants: QuadrantData[] = [
  // ── LEADERSHIP & INFLUENCE ────────────────────────────
  {
    id: "decisive",
    category: "leadership",
    coreQuality: {
      trait: "Decisive",
      description:
        "You make decisions quickly and confidently, cutting through ambiguity to move things forward.",
    },
    pitfall: {
      trait: "Rash",
      description:
        "When overdone, decisiveness becomes impulsiveness — making choices too quickly without considering all perspectives.",
    },
    challenge: {
      trait: "Patience",
      description:
        "Your growth area is developing patience — the ability to slow down, gather input, and allow decisions to mature.",
    },
    allergy: {
      trait: "Passive",
      description:
        "People who are excessively passive or indecisive likely trigger strong irritation in you — passivity is the extreme opposite of your core quality.",
    },
    growthTip:
      "Practice pausing before major decisions. Ask one more person for input than feels natural.",
  },
  {
    id: "visionary",
    category: "leadership",
    coreQuality: {
      trait: "Visionary",
      description:
        "You see possibilities where others see limitations, naturally painting a compelling picture of what could be.",
    },
    pitfall: {
      trait: "Unrealistic",
      description:
        "When overdone, your vision disconnects from reality — grand ideas that lack grounding in what's actually achievable.",
    },
    challenge: {
      trait: "Pragmatism",
      description:
        "Your growth area is grounding vision in practical steps — bridging the gap between aspiration and execution.",
    },
    allergy: {
      trait: "Narrow-minded",
      description:
        "People who can only see what's directly in front of them, refusing to consider new possibilities, likely frustrate you deeply.",
    },
    growthTip:
      "For every bold vision, define three concrete first steps. Let reality inform your dreams without shrinking them.",
  },
  {
    id: "confident",
    category: "leadership",
    coreQuality: {
      trait: "Confident",
      description:
        "You carry a natural self-assurance that inspires trust and gives others a sense of security in your leadership.",
    },
    pitfall: {
      trait: "Arrogant",
      description:
        "When overdone, confidence tips into arrogance — an inability to acknowledge limitations or truly hear others' perspectives.",
    },
    challenge: {
      trait: "Humility",
      description:
        "Your growth area is genuine humility — staying open to being wrong and valuing others' contributions as much as your own.",
    },
    allergy: {
      trait: "Insecure",
      description:
        "People who constantly doubt themselves and seek reassurance likely drain your energy — their insecurity mirrors the opposite of your nature.",
    },
    growthTip:
      "Regularly ask 'What am I missing?' and genuinely listen. Humility isn't weakness — it's confidence mature enough to learn.",
  },
  {
    id: "courageous",
    category: "leadership",
    coreQuality: {
      trait: "Courageous",
      description:
        "You face uncertainty and risk head-on, willing to step into the unknown when others hesitate.",
    },
    pitfall: {
      trait: "Reckless",
      description:
        "When overdone, courage becomes recklessness — taking unnecessary risks without adequate preparation or consideration of consequences.",
    },
    challenge: {
      trait: "Prudence",
      description:
        "Your growth area is wise caution — learning to assess risks thoughtfully before acting on your brave impulses.",
    },
    allergy: {
      trait: "Fearful",
      description:
        "People who are paralyzed by fear and refuse to take any risk at all likely trigger deep frustration in you.",
    },
    growthTip:
      "Before leaping, ask yourself: 'Is this brave or just reckless?' A moment of reflection amplifies true courage.",
  },
  {
    id: "driven",
    category: "leadership",
    coreQuality: {
      trait: "Driven",
      description:
        "You have an inner engine that propels you forward relentlessly, pursuing goals with intensity and determination.",
    },
    pitfall: {
      trait: "Obsessive",
      description:
        "When overdone, drive becomes obsession — sacrificing health, relationships, and balance in pursuit of achievement.",
    },
    challenge: {
      trait: "Contentment",
      description:
        "Your growth area is learning to appreciate what you've already achieved and finding peace in the present moment.",
    },
    allergy: {
      trait: "Complacent",
      description:
        "People who seem satisfied with mediocrity and lack ambition likely irritate you intensely — their complacency feels like wasted potential.",
    },
    growthTip:
      "Schedule genuine rest as non-negotiable. Achievement means nothing if you burn out before you can enjoy it.",
  },
  {
    id: "authoritative",
    category: "leadership",
    coreQuality: {
      trait: "Authoritative",
      description:
        "You naturally take charge and provide clear direction, creating structure and certainty for those around you.",
    },
    pitfall: {
      trait: "Domineering",
      description:
        "When overdone, authority becomes control — micromanaging and suppressing others' autonomy and initiative.",
    },
    challenge: {
      trait: "Collaboration",
      description:
        "Your growth area is true collaboration — sharing power and trusting others to contribute their own leadership.",
    },
    allergy: {
      trait: "Submissive",
      description:
        "People who won't take any initiative and passively wait to be told what to do likely trigger your impatience.",
    },
    growthTip:
      "In your next meeting, ask a question instead of giving a directive. Great leaders create other leaders.",
  },
  {
    id: "strategic",
    category: "leadership",
    coreQuality: {
      trait: "Strategic",
      description:
        "You naturally think several moves ahead, seeing patterns and connections that help you navigate complex situations.",
    },
    pitfall: {
      trait: "Manipulative",
      description:
        "When overdone, strategic thinking becomes manipulation — using your insight to control outcomes at others' expense.",
    },
    challenge: {
      trait: "Transparency",
      description:
        "Your growth area is radical openness — sharing your thinking process and motivations honestly with others.",
    },
    allergy: {
      trait: "Naive",
      description:
        "People who stumble through situations without any forethought or awareness of dynamics likely frustrate you.",
    },
    growthTip:
      "Share your reasoning out loud more often. When people understand your 'why,' strategy becomes leadership instead of manipulation.",
  },
  {
    id: "persuasive",
    category: "leadership",
    coreQuality: {
      trait: "Persuasive",
      description:
        "You have a natural ability to influence others, articulating ideas in ways that win hearts and minds.",
    },
    pitfall: {
      trait: "Pushy",
      description:
        "When overdone, persuasion becomes pressure — not knowing when to stop advocating and start listening.",
    },
    challenge: {
      trait: "Receptiveness",
      description:
        "Your growth area is genuine receptiveness — being as open to being influenced as you are skilled at influencing.",
    },
    allergy: {
      trait: "Easily Swayed",
      description:
        "People who have no backbone and change their mind with every conversation likely trigger your frustration.",
    },
    growthTip:
      "Practice saying 'Tell me more about your perspective' before making your case. Influence grows when people feel heard first.",
  },
  {
    id: "initiating",
    category: "leadership",
    coreQuality: {
      trait: "Initiating",
      description:
        "You naturally start things — seeing an opportunity and immediately moving to action while others are still deliberating.",
    },
    pitfall: {
      trait: "Impetuous",
      description:
        "When overdone, initiative becomes haste — launching into action before the situation is fully understood.",
    },
    challenge: {
      trait: "Deliberateness",
      description:
        "Your growth area is thoughtful deliberation — giving ideas time to develop before acting on them.",
    },
    allergy: {
      trait: "Stagnant",
      description:
        "People who endlessly discuss without ever starting anything likely make you deeply impatient.",
    },
    growthTip:
      "Before starting your next project, write down three things you need to understand first. Action informed by reflection is unstoppable.",
  },
  {
    id: "resilient",
    category: "leadership",
    coreQuality: {
      trait: "Resilient",
      description:
        "You bounce back from setbacks with remarkable strength, maintaining your course despite obstacles and adversity.",
    },
    pitfall: {
      trait: "Stubborn",
      description:
        "When overdone, resilience becomes stubbornness — persisting on a path long after it's clear a change is needed.",
    },
    challenge: {
      trait: "Flexibility",
      description:
        "Your growth area is adaptive flexibility — knowing when to persist and when to pivot gracefully.",
    },
    allergy: {
      trait: "Inconsistent",
      description:
        "People who abandon their commitments at the first sign of difficulty likely trigger your deepest frustration.",
    },
    growthTip:
      "Ask trusted colleagues: 'Am I being resilient or just stubborn here?' Sometimes the bravest thing is changing direction.",
  },
  {
    id: "accountable",
    category: "leadership",
    coreQuality: {
      trait: "Accountable",
      description:
        "You take full ownership of your responsibilities and outcomes, holding yourself to high standards of follow-through.",
    },
    pitfall: {
      trait: "Self-blaming",
      description:
        "When overdone, accountability becomes self-punishment — taking on guilt for things beyond your control.",
    },
    challenge: {
      trait: "Self-compassion",
      description:
        "Your growth area is treating yourself with the same understanding you'd offer a good friend who made a mistake.",
    },
    allergy: {
      trait: "Irresponsible",
      description:
        "People who dodge responsibility and blame everyone else likely trigger intense frustration in you.",
    },
    growthTip:
      "When something goes wrong, separate what was yours to own from what wasn't. Responsibility has limits, and that's healthy.",
  },
  {
    id: "charismatic",
    category: "leadership",
    coreQuality: {
      trait: "Charismatic",
      description:
        "You have a magnetic presence that naturally draws people in and energizes those around you.",
    },
    pitfall: {
      trait: "Attention-seeking",
      description:
        "When overdone, charisma becomes performance — needing to be the center of attention and overshadowing others.",
    },
    challenge: {
      trait: "Substance",
      description:
        "Your growth area is ensuring your presence is backed by depth — letting your work speak as loudly as your personality.",
    },
    allergy: {
      trait: "Withdrawn",
      description:
        "People who refuse to engage, contribute, or show any energy in group settings likely puzzle and frustrate you.",
    },
    growthTip:
      "In your next group setting, deliberately spotlight someone else's contribution. True charisma lifts others up.",
  },
  {
    id: "principled",
    category: "leadership",
    coreQuality: {
      trait: "Principled",
      description:
        "You hold firm to your values and ethics, providing a moral compass that others can rely on.",
    },
    pitfall: {
      trait: "Dogmatic",
      description:
        "When overdone, principle becomes rigidity — an inability to see that complex situations may require nuanced responses.",
    },
    challenge: {
      trait: "Open-mindedness",
      description:
        "Your growth area is holding your values while remaining genuinely curious about perspectives that challenge them.",
    },
    allergy: {
      trait: "Unprincipled",
      description:
        "People who seem to have no moral compass and shift their ethics based on convenience likely disgust you.",
    },
    growthTip:
      "Seek out a thoughtful person who disagrees with you on something important. Understanding their 'why' doesn't weaken your principles — it deepens them.",
  },

  // ── INTERPERSONAL & SOCIAL ────────────────────────────
  {
    id: "empathetic",
    category: "interpersonal",
    coreQuality: {
      trait: "Empathetic",
      description:
        "You naturally feel what others feel, creating deep connections through your ability to understand emotional experiences.",
    },
    pitfall: {
      trait: "Over-involved",
      description:
        "When overdone, empathy becomes enmeshment — absorbing others' pain to the point where you lose yourself.",
    },
    challenge: {
      trait: "Healthy Detachment",
      description:
        "Your growth area is caring without carrying — maintaining compassion while protecting your own emotional boundaries.",
    },
    allergy: {
      trait: "Cold",
      description:
        "People who seem emotionally disconnected and indifferent to others' suffering likely trigger deep discomfort in you.",
    },
    growthTip:
      "After emotionally intense conversations, take five minutes alone. You can hold space for others without holding their pain.",
  },
  {
    id: "generous",
    category: "interpersonal",
    coreQuality: {
      trait: "Generous",
      description:
        "You give freely of your time, energy, and resources, finding genuine joy in supporting others' wellbeing.",
    },
    pitfall: {
      trait: "Self-sacrificing",
      description:
        "When overdone, generosity becomes self-depletion — giving so much that you have nothing left for yourself.",
    },
    challenge: {
      trait: "Boundary-setting",
      description:
        "Your growth area is learning to set healthy limits — understanding that protecting your own needs isn't selfish.",
    },
    allergy: {
      trait: "Selfish",
      description:
        "People who take without giving and show no consideration for others' needs likely trigger strong reactions in you.",
    },
    growthTip:
      "Practice saying 'Let me think about that' before automatically saying yes. Your generosity is more sustainable when it's chosen, not compulsive.",
  },
  {
    id: "loyal",
    category: "interpersonal",
    coreQuality: {
      trait: "Loyal",
      description:
        "You stand by the people and commitments you believe in, offering steadfast support through thick and thin.",
    },
    pitfall: {
      trait: "Blindly Loyal",
      description:
        "When overdone, loyalty becomes enabling — supporting people or causes even when they clearly need to change.",
    },
    challenge: {
      trait: "Objectivity",
      description:
        "Your growth area is honest assessment — being able to see clearly even when your heart is invested.",
    },
    allergy: {
      trait: "Disloyal",
      description:
        "People who abandon relationships when things get difficult or betray trust casually likely outrage you.",
    },
    growthTip:
      "True loyalty sometimes means telling people what they need to hear, not what they want to hear.",
  },
  {
    id: "caring",
    category: "interpersonal",
    coreQuality: {
      trait: "Caring",
      description:
        "You naturally nurture and look after others, creating warmth and safety in your relationships.",
    },
    pitfall: {
      trait: "Smothering",
      description:
        "When overdone, caring becomes overprotection — not allowing others the space to struggle, learn, and grow on their own.",
    },
    challenge: {
      trait: "Letting Go",
      description:
        "Your growth area is trusting others to handle their own challenges — knowing when to step back and let them grow.",
    },
    allergy: {
      trait: "Neglectful",
      description:
        "People who seem oblivious to others' needs and never check in on anyone likely disturb you deeply.",
    },
    growthTip:
      "Ask 'Would you like help, or would you like me to listen?' Sometimes the most caring thing is trusting someone's capability.",
  },
  {
    id: "trusting",
    category: "interpersonal",
    coreQuality: {
      trait: "Trusting",
      description:
        "You extend trust readily to others, believing in people's good intentions and creating openness in relationships.",
    },
    pitfall: {
      trait: "Gullible",
      description:
        "When overdone, trust becomes naivety — failing to recognize when someone is taking advantage of your openness.",
    },
    challenge: {
      trait: "Discernment",
      description:
        "Your growth area is wise discernment — maintaining your openness while developing a sharper read of people's true intentions.",
    },
    allergy: {
      trait: "Suspicious",
      description:
        "People who trust no one and always assume the worst in others likely feel exhausting and sad to you.",
    },
    growthTip:
      "Trust, but verify. Pay attention to patterns in behavior, not just words. Your trust is a gift — give it wisely.",
  },
  {
    id: "diplomatic",
    category: "interpersonal",
    coreQuality: {
      trait: "Diplomatic",
      description:
        "You navigate sensitive situations with grace, finding ways to address issues without creating unnecessary conflict.",
    },
    pitfall: {
      trait: "Conflict-avoidant",
      description:
        "When overdone, diplomacy becomes avoidance — dancing around important issues so carefully that nothing gets resolved.",
    },
    challenge: {
      trait: "Directness",
      description:
        "Your growth area is loving directness — being willing to have uncomfortable conversations when they matter.",
    },
    allergy: {
      trait: "Tactless",
      description:
        "People who blurt out harsh truths with no regard for how their words land likely make you cringe.",
    },
    growthTip:
      "Before your next difficult conversation, prepare one honest statement you'd normally soften. Kindness and clarity can coexist.",
  },
  {
    id: "supportive",
    category: "interpersonal",
    coreQuality: {
      trait: "Supportive",
      description:
        "You naturally encourage and uplift others, providing the emotional backing people need to take on challenges.",
    },
    pitfall: {
      trait: "Enabling",
      description:
        "When overdone, support becomes enabling — protecting people from consequences they need to face to grow.",
    },
    challenge: {
      trait: "Challenging Others",
      description:
        "Your growth area is constructive challenge — sometimes the most supportive thing is pushing someone beyond their comfort zone.",
    },
    allergy: {
      trait: "Harsh",
      description:
        "People who are needlessly critical and tear others down without any encouragement likely repel you.",
    },
    growthTip:
      "Next time someone shares a problem, resist solving it for them. Ask: 'What do you think you should do?' Support their strength, not their dependency.",
  },
  {
    id: "forgiving",
    category: "interpersonal",
    coreQuality: {
      trait: "Forgiving",
      description:
        "You let go of grudges and give people second chances, understanding that everyone makes mistakes.",
    },
    pitfall: {
      trait: "Permissive",
      description:
        "When overdone, forgiveness becomes doormat behavior — repeatedly accepting unacceptable treatment without consequences.",
    },
    challenge: {
      trait: "Asserting Boundaries",
      description:
        "Your growth area is clear boundaries — forgiveness doesn't mean tolerating repeated mistreatment.",
    },
    allergy: {
      trait: "Vindictive",
      description:
        "People who hold grudges forever and seek revenge for every slight likely feel toxic and exhausting to you.",
    },
    growthTip:
      "Forgive the person, but address the behavior. You can release resentment and still say 'This isn't acceptable.'",
  },
  {
    id: "harmonious",
    category: "interpersonal",
    coreQuality: {
      trait: "Harmonious",
      description:
        "You create peaceful environments and naturally smooth over tensions, helping groups find common ground.",
    },
    pitfall: {
      trait: "People-pleasing",
      description:
        "When overdone, harmony-seeking becomes people-pleasing — suppressing your own needs and opinions to keep everyone happy.",
    },
    challenge: {
      trait: "Constructive Confrontation",
      description:
        "Your growth area is engaging in healthy conflict — understanding that productive disagreement often leads to better outcomes.",
    },
    allergy: {
      trait: "Aggressive",
      description:
        "People who create unnecessary conflict, raise their voice, or use intimidation likely make you deeply uncomfortable.",
    },
    growthTip:
      "Remind yourself: disagreement is not the same as disharmony. The best teams argue well, not less.",
  },
  {
    id: "cooperative",
    category: "interpersonal",
    coreQuality: {
      trait: "Cooperative",
      description:
        "You work well with others, naturally finding ways to align your efforts with the group's goals.",
    },
    pitfall: {
      trait: "Compliant",
      description:
        "When overdone, cooperation becomes compliance — going along with everything even when you disagree or see problems.",
    },
    challenge: {
      trait: "Assertiveness",
      description:
        "Your growth area is standing your ground — sharing your dissenting view when it matters, even if it creates tension.",
    },
    allergy: {
      trait: "Domineering",
      description:
        "People who bulldoze over everyone else's input and insist on their way likely trigger strong resistance in you.",
    },
    growthTip:
      "In your next team meeting, voice one opinion you'd normally keep to yourself. Your perspective matters as much as anyone's.",
  },
  {
    id: "inclusive",
    category: "interpersonal",
    coreQuality: {
      trait: "Inclusive",
      description:
        "You naturally ensure everyone feels welcomed and valued, creating spaces where diverse voices are heard.",
    },
    pitfall: {
      trait: "Over-accommodating",
      description:
        "When overdone, inclusion becomes indiscriminate — trying to include everyone to the point where focus and standards suffer.",
    },
    challenge: {
      trait: "Selectiveness",
      description:
        "Your growth area is thoughtful curation — understanding that not every situation benefits from maximum inclusion.",
    },
    allergy: {
      trait: "Cliquish",
      description:
        "People who form exclusive groups and deliberately shut others out likely offend your sense of fairness.",
    },
    growthTip:
      "Inclusion doesn't mean everyone is in every room. It means everyone has access to the rooms that matter for them.",
  },
  {
    id: "patient",
    category: "interpersonal",
    coreQuality: {
      trait: "Patient",
      description:
        "You give people and processes the time they need, maintaining calm and understanding when things move slowly.",
    },
    pitfall: {
      trait: "Tolerating Too Much",
      description:
        "When overdone, patience becomes passivity — accepting unacceptable situations because you're too patient to object.",
    },
    challenge: {
      trait: "Speaking Up",
      description:
        "Your growth area is timely assertiveness — knowing when patience has run its course and action is needed.",
    },
    allergy: {
      trait: "Short-tempered",
      description:
        "People who explode at the slightest delay or inconvenience likely strike you as immature and exhausting.",
    },
    growthTip:
      "Set internal deadlines for your patience. If nothing has changed by then, it's time to speak up — calmly but firmly.",
  },
  {
    id: "tactful",
    category: "interpersonal",
    coreQuality: {
      trait: "Tactful",
      description:
        "You deliver sensitive messages with care and timing, protecting others' dignity while still communicating truth.",
    },
    pitfall: {
      trait: "Evasive",
      description:
        "When overdone, tact becomes evasiveness — being so careful with words that the actual message never lands.",
    },
    challenge: {
      trait: "Candor",
      description:
        "Your growth area is straightforward honesty — trusting that people can handle the truth when delivered with respect.",
    },
    allergy: {
      trait: "Insensitive",
      description:
        "People who say whatever comes to mind with zero regard for the impact of their words likely appall you.",
    },
    growthTip:
      "Ask yourself: 'Am I being tactful or just avoiding?' If the message isn't landing, clarity is kindness.",
  },

  // ── WORK & ACHIEVEMENT ────────────────────────────────
  {
    id: "detail-oriented",
    category: "work",
    coreQuality: {
      trait: "Detail-oriented",
      description:
        "You notice what others miss, bringing precision and thoroughness that ensures quality in everything you produce.",
    },
    pitfall: {
      trait: "Perfectionist",
      description:
        "When overdone, attention to detail becomes perfectionism — spending excessive time on minor elements while missing deadlines.",
    },
    challenge: {
      trait: "Big-picture Thinking",
      description:
        "Your growth area is zooming out — seeing the forest for the trees and knowing when 'good enough' truly is enough.",
    },
    allergy: {
      trait: "Sloppy",
      description:
        "People who produce careless, error-filled work without seeming to care about quality likely drive you crazy.",
    },
    growthTip:
      "Before diving into details, ask: 'Will this level of precision change the outcome?' Save your superpower for where it matters most.",
  },
  {
    id: "organized",
    category: "work",
    coreQuality: {
      trait: "Organized",
      description:
        "You create order from chaos, building systems and structures that help everything run smoothly.",
    },
    pitfall: {
      trait: "Rigid",
      description:
        "When overdone, organization becomes rigidity — clinging to systems and plans even when circumstances demand adaptation.",
    },
    challenge: {
      trait: "Spontaneity",
      description:
        "Your growth area is embracing the unplanned — allowing room for happy accidents and organic developments.",
    },
    allergy: {
      trait: "Chaotic",
      description:
        "People who live in constant disorder with no system for anything likely make your skin crawl.",
    },
    growthTip:
      "Leave one block of unstructured time in your week. Some of the best ideas emerge when you stop planning for them.",
  },
  {
    id: "ambitious",
    category: "work",
    coreQuality: {
      trait: "Ambitious",
      description:
        "You set your sights high and pursue meaningful goals with energy and determination.",
    },
    pitfall: {
      trait: "Ruthless",
      description:
        "When overdone, ambition becomes ruthlessness — pursuing success at the cost of relationships and ethics.",
    },
    challenge: {
      trait: "Appreciation",
      description:
        "Your growth area is gratitude and savoring — pausing to appreciate what you have before reaching for more.",
    },
    allergy: {
      trait: "Aimless",
      description:
        "People who drift through life with no goals and no desire to improve themselves likely confuse and frustrate you.",
    },
    growthTip:
      "Celebrate one achievement fully before setting the next goal. Ambition is a journey, not just a destination.",
  },
  {
    id: "efficient",
    category: "work",
    coreQuality: {
      trait: "Efficient",
      description:
        "You find the fastest path to results, eliminating waste and streamlining processes naturally.",
    },
    pitfall: {
      trait: "Cutting Corners",
      description:
        "When overdone, efficiency becomes shortcuts — sacrificing quality or important steps in the rush to finish.",
    },
    challenge: {
      trait: "Thoroughness",
      description:
        "Your growth area is knowing when to slow down — some things deserve more time and care than the minimum.",
    },
    allergy: {
      trait: "Wasteful",
      description:
        "People who waste time, resources, and energy through needless inefficiency likely make you deeply impatient.",
    },
    growthTip:
      "Identify one area where 'doing it right' matters more than 'doing it fast.' Not everything is an optimization problem.",
  },
  {
    id: "analytical",
    category: "work",
    coreQuality: {
      trait: "Analytical",
      description:
        "You break complex problems into clear components, using logic and data to find the best solutions.",
    },
    pitfall: {
      trait: "Over-thinking",
      description:
        "When overdone, analysis becomes paralysis — drowning in data and considerations without ever reaching a conclusion.",
    },
    challenge: {
      trait: "Intuition",
      description:
        "Your growth area is trusting your gut — learning to make decisions with incomplete information when the moment demands it.",
    },
    allergy: {
      trait: "Superficial",
      description:
        "People who make important decisions based on feelings alone without examining any evidence likely frustrate you.",
    },
    growthTip:
      "Set a time limit for your next analysis. When it's up, go with your best judgment. Perfect information rarely exists.",
  },
  {
    id: "focused",
    category: "work",
    coreQuality: {
      trait: "Focused",
      description:
        "You lock onto priorities with laser-like intensity, blocking out distractions to deliver deep, concentrated work.",
    },
    pitfall: {
      trait: "Tunnel-vision",
      description:
        "When overdone, focus becomes tunnel vision — missing important signals, opportunities, or people because you're so locked in.",
    },
    challenge: {
      trait: "Adaptability",
      description:
        "Your growth area is peripheral awareness — staying focused while remaining open to shifts that require a change in direction.",
    },
    allergy: {
      trait: "Scattered",
      description:
        "People who can't concentrate on anything for more than five minutes and constantly jump between tasks likely exhaust you.",
    },
    growthTip:
      "Schedule brief 'scan the horizon' breaks in your focused work sessions. What are you missing while your head is down?",
  },
  {
    id: "reliable",
    category: "work",
    coreQuality: {
      trait: "Reliable",
      description:
        "You follow through on commitments consistently — when you say you'll do something, people know it will happen.",
    },
    pitfall: {
      trait: "Predictable",
      description:
        "When overdone, reliability becomes predictability — an inability to improvise, surprise, or deviate from established patterns.",
    },
    challenge: {
      trait: "Spontaneity",
      description:
        "Your growth area is comfortable improvisation — sometimes the best response isn't the planned one.",
    },
    allergy: {
      trait: "Flaky",
      description:
        "People who make promises they don't keep and can't be counted on for anything likely infuriate you.",
    },
    growthTip:
      "Try one unplanned thing this week. Reliability is your foundation, but spontaneity adds the color.",
  },
  {
    id: "thorough",
    category: "work",
    coreQuality: {
      trait: "Thorough",
      description:
        "You leave no stone unturned, ensuring comprehensive coverage and deep understanding before considering something complete.",
    },
    pitfall: {
      trait: "Slow",
      description:
        "When overdone, thoroughness becomes a bottleneck — taking so long to finish that opportunities pass you by.",
    },
    challenge: {
      trait: "Decisiveness",
      description:
        "Your growth area is knowing when you have enough — making timely calls before every last detail is perfect.",
    },
    allergy: {
      trait: "Hasty",
      description:
        "People who rush through important work without proper research or preparation likely make you nervous.",
    },
    growthTip:
      "Define 'done enough' before you start. Without a clear finish line, thoroughness becomes an endless loop.",
  },
  {
    id: "innovative",
    category: "work",
    coreQuality: {
      trait: "Innovative",
      description:
        "You naturally generate fresh ideas and new approaches, bringing creative energy to every challenge.",
    },
    pitfall: {
      trait: "Impractical",
      description:
        "When overdone, innovation becomes impracticality — constantly reinventing things that already work perfectly well.",
    },
    challenge: {
      trait: "Stability",
      description:
        "Your growth area is appreciating what works — understanding that not everything needs to be disrupted.",
    },
    allergy: {
      trait: "Status-quo Bound",
      description:
        "People who refuse to consider new approaches and cling to 'the way we've always done it' likely drive you mad.",
    },
    growthTip:
      "Before proposing a new solution, ask: 'What's working well that I should preserve?' Innovation and stability are partners, not enemies.",
  },
  {
    id: "disciplined",
    category: "work",
    coreQuality: {
      trait: "Disciplined",
      description:
        "You maintain consistent habits and routines, showing remarkable self-control in pursuit of your goals.",
    },
    pitfall: {
      trait: "Inflexible",
      description:
        "When overdone, discipline becomes inflexibility — rigidly following routines even when circumstances demand a different approach.",
    },
    challenge: {
      trait: "Adaptability",
      description:
        "Your growth area is graceful adaptation — being disciplined in your principles while flexible in your methods.",
    },
    allergy: {
      trait: "Undisciplined",
      description:
        "People who can't stick to any routine or commitment and constantly give in to impulses likely puzzle you.",
    },
    growthTip:
      "Break one of your own rules this week — deliberately. Notice how it feels to adapt. Discipline is a tool, not a cage.",
  },
  {
    id: "quality-conscious",
    category: "work",
    coreQuality: {
      trait: "Quality-conscious",
      description:
        "You hold everything to a high standard, refusing to let subpar work represent you or your team.",
    },
    pitfall: {
      trait: "Never Finished",
      description:
        "When overdone, quality standards become impossible — nothing ever feels complete because it could always be better.",
    },
    challenge: {
      trait: "Pragmatic Completion",
      description:
        "Your growth area is shipping — understanding that a completed good project beats an endlessly polished perfect one.",
    },
    allergy: {
      trait: "Mediocrity-accepting",
      description:
        "People who are satisfied with 'good enough' when excellence is achievable likely deeply disappoint you.",
    },
    growthTip:
      "Set a 'ship date' before you start and honor it. Quality is important, but so is impact — and impact requires completion.",
  },
  {
    id: "productive",
    category: "work",
    coreQuality: {
      trait: "Productive",
      description:
        "You accomplish a remarkable amount, consistently converting your time and energy into tangible results.",
    },
    pitfall: {
      trait: "Burnout-prone",
      description:
        "When overdone, productivity becomes unsustainable — pushing yourself until your body or mind forces you to stop.",
    },
    challenge: {
      trait: "Rest and Renewal",
      description:
        "Your growth area is strategic rest — understanding that recovery isn't laziness, it's an investment in sustained performance.",
    },
    allergy: {
      trait: "Lazy",
      description:
        "People who seem to waste their potential through inaction and lack of effort likely trigger your judgment.",
    },
    growthTip:
      "Schedule rest with the same commitment you schedule work. Your productivity tomorrow depends on your recovery today.",
  },
  {
    id: "results-oriented",
    category: "work",
    coreQuality: {
      trait: "Results-oriented",
      description:
        "You stay laser-focused on outcomes, ensuring that effort translates into measurable achievements.",
    },
    pitfall: {
      trait: "Ends-justify-means",
      description:
        "When overdone, results focus becomes ruthless — achieving targets at the expense of people, relationships, or ethics.",
    },
    challenge: {
      trait: "Process Appreciation",
      description:
        "Your growth area is valuing the journey — understanding that how you achieve results matters as much as the results themselves.",
    },
    allergy: {
      trait: "Directionless",
      description:
        "People who work hard but produce nothing tangible, with no clear sense of what they're trying to achieve, likely frustrate you.",
    },
    growthTip:
      "After your next win, ask your team: 'How did the process feel for everyone?' Great results and great experiences can coexist.",
  },

  // ── PERSONAL & CHARACTER ──────────────────────────────
  {
    id: "creative",
    category: "personal",
    coreQuality: {
      trait: "Creative",
      description:
        "You see the world through a unique lens, naturally generating original ideas and finding unexpected connections.",
    },
    pitfall: {
      trait: "Scattered",
      description:
        "When overdone, creativity becomes chaos — so many ideas flowing that none get the focused attention they need to flourish.",
    },
    challenge: {
      trait: "Structure",
      description:
        "Your growth area is giving your creativity a container — using structure not to limit ideas but to bring the best ones to life.",
    },
    allergy: {
      trait: "Rigid",
      description:
        "People who follow rules blindly and can't think outside any box likely feel suffocating to you.",
    },
    growthTip:
      "Pick your best idea from the last month and create a simple plan for it. Creativity without execution is just daydreaming.",
  },
  {
    id: "independent",
    category: "personal",
    coreQuality: {
      trait: "Independent",
      description:
        "You think and act autonomously, trusting your own judgment and not needing external validation to move forward.",
    },
    pitfall: {
      trait: "Isolated",
      description:
        "When overdone, independence becomes isolation — cutting yourself off from the support, feedback, and connection that everyone needs.",
    },
    challenge: {
      trait: "Interdependence",
      description:
        "Your growth area is healthy interdependence — recognizing that collaboration multiplies what you can achieve alone.",
    },
    allergy: {
      trait: "Dependent",
      description:
        "People who can't make any decision without someone else's approval and constantly need reassurance likely try your patience.",
    },
    growthTip:
      "Ask for help on something this week — not because you can't do it alone, but because it might be better together.",
  },
  {
    id: "passionate",
    category: "personal",
    coreQuality: {
      trait: "Passionate",
      description:
        "You bring intense energy and enthusiasm to what matters to you, inspiring others with your fire and commitment.",
    },
    pitfall: {
      trait: "Fanatical",
      description:
        "When overdone, passion becomes fanaticism — an intensity that overwhelms others and can't see beyond its own cause.",
    },
    challenge: {
      trait: "Moderation",
      description:
        "Your growth area is balanced intensity — channeling your fire without burning yourself or others out.",
    },
    allergy: {
      trait: "Apathetic",
      description:
        "People who don't seem to care about anything and go through life on autopilot likely baffle and sadden you.",
    },
    growthTip:
      "Notice when your passion is pulling others in versus pushing them away. The same fire that warms can also scorch.",
  },
  {
    id: "authentic",
    category: "personal",
    coreQuality: {
      trait: "Authentic",
      description:
        "You are genuinely yourself in all situations, refusing to wear masks or play roles that don't reflect who you really are.",
    },
    pitfall: {
      trait: "Blunt",
      description:
        "When overdone, authenticity becomes bluntness — using 'I'm just being honest' as an excuse for hurtful directness.",
    },
    challenge: {
      trait: "Consideration",
      description:
        "Your growth area is thoughtful authenticity — being true to yourself while considering how your truth affects others.",
    },
    allergy: {
      trait: "Fake",
      description:
        "People who are obviously putting on an act and saying what they think others want to hear likely repel you.",
    },
    growthTip:
      "Being authentic includes being authentically kind. Before sharing a hard truth, ask: 'Is this necessary, and am I saying it with care?'",
  },
  {
    id: "optimistic",
    category: "personal",
    coreQuality: {
      trait: "Optimistic",
      description:
        "You see the bright side naturally, maintaining hope and positive expectations even in challenging circumstances.",
    },
    pitfall: {
      trait: "Unrealistic",
      description:
        "When overdone, optimism becomes denial — ignoring real problems and dismissing legitimate concerns as negativity.",
    },
    challenge: {
      trait: "Realistic Assessment",
      description:
        "Your growth area is grounded optimism — maintaining hope while honestly acknowledging obstacles and risks.",
    },
    allergy: {
      trait: "Pessimistic",
      description:
        "People who always see the worst in everything and shoot down every idea with doom and gloom likely drain you.",
    },
    growthTip:
      "When someone raises a concern, resist saying 'It'll be fine.' Instead, say 'That's worth thinking about' — then think about it.",
  },
  {
    id: "humble",
    category: "personal",
    coreQuality: {
      trait: "Humble",
      description:
        "You don't seek the spotlight, preferring to let your work speak for itself and giving credit to others.",
    },
    pitfall: {
      trait: "Self-effacing",
      description:
        "When overdone, humility becomes invisibility — downplaying your contributions to the point where you're overlooked and undervalued.",
    },
    challenge: {
      trait: "Self-promotion",
      description:
        "Your growth area is making your value visible — learning that sharing your achievements isn't bragging, it's communication.",
    },
    allergy: {
      trait: "Boastful",
      description:
        "People who constantly trumpet their accomplishments and make everything about themselves likely turn your stomach.",
    },
    growthTip:
      "Practice stating one accomplishment this week without qualifying it. You deserve to be seen for what you contribute.",
  },
  {
    id: "curious",
    category: "personal",
    coreQuality: {
      trait: "Curious",
      description:
        "You have an insatiable desire to learn and understand, asking questions others don't think to ask.",
    },
    pitfall: {
      trait: "Nosy",
      description:
        "When overdone, curiosity becomes intrusiveness — probing into areas that aren't your business or losing focus by chasing every interesting thread.",
    },
    challenge: {
      trait: "Focus",
      description:
        "Your growth area is directed curiosity — channeling your questioning mind toward what matters most right now.",
    },
    allergy: {
      trait: "Closed-minded",
      description:
        "People who show no interest in learning anything new and dismiss unfamiliar ideas outright likely frustrate you deeply.",
    },
    growthTip:
      "Before pursuing a new rabbit hole, ask: 'Will this serve my current priorities?' Curiosity is a superpower when aimed well.",
  },
  {
    id: "spontaneous",
    category: "personal",
    coreQuality: {
      trait: "Spontaneous",
      description:
        "You embrace the moment, responding to life with flexibility and a willingness to follow where opportunity leads.",
    },
    pitfall: {
      trait: "Impulsive",
      description:
        "When overdone, spontaneity becomes impulsiveness — acting without thinking and creating chaos for yourself and others.",
    },
    challenge: {
      trait: "Planning",
      description:
        "Your growth area is thoughtful preparation — giving important things a framework while keeping room for the unexpected.",
    },
    allergy: {
      trait: "Over-planned",
      description:
        "People who plan every minute and can't handle any deviation from their schedule likely feel stifling to you.",
    },
    growthTip:
      "For important commitments, try planning the first three steps. You can still improvise — but from a stronger starting point.",
  },
  {
    id: "self-aware",
    category: "personal",
    coreQuality: {
      trait: "Self-aware",
      description:
        "You have deep insight into your own patterns, motivations, and emotions, understanding why you do what you do.",
    },
    pitfall: {
      trait: "Self-absorbed",
      description:
        "When overdone, self-awareness becomes self-obsession — endlessly analyzing your inner world while missing what's happening around you.",
    },
    challenge: {
      trait: "Outward Focus",
      description:
        "Your growth area is turning your perceptiveness outward — applying your deep awareness to understanding others and the world.",
    },
    allergy: {
      trait: "Oblivious",
      description:
        "People who have zero insight into their own behavior and blindly stumble through interpersonal situations likely exasperate you.",
    },
    growthTip:
      "This week, spend as much time understanding someone else's perspective as you spend analyzing your own. Awareness is a bridge, not a mirror.",
  },
  {
    id: "calm",
    category: "personal",
    coreQuality: {
      trait: "Calm",
      description:
        "You maintain composure under pressure, providing a steady presence that helps others feel grounded and safe.",
    },
    pitfall: {
      trait: "Detached",
      description:
        "When overdone, calm becomes emotional disconnection — appearing to not care or feel anything when situations call for engagement.",
    },
    challenge: {
      trait: "Expressiveness",
      description:
        "Your growth area is emotional expression — letting people see what you feel, especially when it matters to them.",
    },
    allergy: {
      trait: "Volatile",
      description:
        "People who are emotionally explosive and create drama out of every situation likely feel chaotic and destabilizing to you.",
    },
    growthTip:
      "Practice naming your emotions out loud: 'I'm excited about this' or 'That concerns me.' Others need to see your humanity, not just your composure.",
  },
  {
    id: "honest",
    category: "personal",
    coreQuality: {
      trait: "Honest",
      description:
        "You value truth above comfort, speaking plainly and building relationships on a foundation of genuine transparency.",
    },
    pitfall: {
      trait: "Brutally Blunt",
      description:
        "When overdone, honesty becomes a weapon — delivering truths without care for timing, context, or the other person's readiness to hear them.",
    },
    challenge: {
      trait: "Diplomatic Honesty",
      description:
        "Your growth area is compassionate truth-telling — finding ways to be honest that also honor the listener's dignity.",
    },
    allergy: {
      trait: "Deceptive",
      description:
        "People who lie, manipulate the truth, or hide behind half-truths likely trigger your deepest contempt.",
    },
    growthTip:
      "Before sharing a hard truth, ask: 'What's the most caring way to say this?' Honesty and kindness aren't opposites — they're partners.",
  },
];

export const quadrantsByCategory: Record<QuadrantCategory, QuadrantData[]> = {
  leadership: quadrants.filter((q) => q.category === "leadership"),
  interpersonal: quadrants.filter((q) => q.category === "interpersonal"),
  work: quadrants.filter((q) => q.category === "work"),
  personal: quadrants.filter((q) => q.category === "personal"),
};

export function getQuadrantById(id: string): QuadrantData | undefined {
  return quadrants.find((q) => q.id === id);
}
