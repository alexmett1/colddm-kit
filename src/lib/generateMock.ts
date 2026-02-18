interface GenerateInput {
  prospectInfo: string;
  offer: string;
  tone: string;
  platform: string;
}

interface GenerateOutput {
  openers: string[];
  followUps: string[];
  objections: string[];
}

function pickToneAdj(tone: string): string {
  const map: Record<string, string[]> = {
    Friendly: ["Hey!", "Hi there!", "Hope you're doing well!"],
    Casual: ["Yo,", "Hey —", "Quick one —"],
    Direct: ["Straight to it —", "No fluff:", "Here's the deal —"],
    Professional: ["Good afternoon,", "I hope this message finds you well.", "I wanted to reach out because"],
  };
  const opts = map[tone] || map.Friendly;
  return opts[Math.floor(Math.random() * opts.length)];
}

function extractName(info: string): string {
  const words = info.trim().split(/\s+/);
  if (words.length > 0 && /^[A-Z]/.test(words[0])) return words[0];
  return "there";
}

function platformSign(platform: string): string {
  if (platform.includes("Email")) return "Best,";
  if (platform.includes("Instagram")) return "🤙";
  return "— talk soon";
}

export function generateMock(input: GenerateInput): GenerateOutput {
  const name = extractName(input.prospectInfo);
  const ta = () => pickToneAdj(input.tone);
  const sign = platformSign(input.platform);
  const offerShort = input.offer.length > 60 ? input.offer.slice(0, 60) + "…" : input.offer;

  const openers: string[] = [
    `${ta()} ${name}, I saw what you're building and it got me thinking — ${offerShort} could be a perfect fit for where you're headed. Would love 10 min to show you. ${sign}`,
    `${ta()} ${name}, been following your work and honestly impressed. I help people in your space with ${offerShort}. Curious if that's on your radar? ${sign}`,
    `${ta()} ${name}, not trying to pitch you cold — but I noticed a gap I think I can help with. ${offerShort} is what I do, and your profile tells me it'd click. Open to a quick chat? ${sign}`,
    `${ta()} ${name}, I came across your profile and had to reach out. I work with people doing exactly what you do and help them with ${offerShort}. Worth a 5-min convo? ${sign}`,
    `${ta()} ${name}, your background caught my eye. I specialize in ${offerShort} and think there's a real overlap with what you're up to. Mind if I share a quick idea? ${sign}`,
  ];

  const followUps: string[] = [
    `Hey ${name}, just floating this back up — totally get if the timing's off. Would it help if I sent over a quick case study instead? ${sign}`,
    `${name}, circling back on my last message. No pressure at all — if you're curious I can send a 2-min Loom walkthrough of how ${offerShort} works in practice. ${sign}`,
    `Bumping this once more, ${name}. If now isn't the right time, no worries — happy to reconnect whenever makes sense. ${sign}`,
  ];

  const objections: string[] = [
    `Totally fair, ${name}. Most of the people I work with felt the same way before they saw the results. Would a no-commitment 15-min demo change anything? ${sign}`,
    `I hear you — and I appreciate the honesty. What if I shared how someone in a similar situation got [specific result] in 30 days? Might shift the math. ${sign}`,
    `100% respect that. Quick question though — is it the timing, the budget, or just not a fit? Helps me know whether to follow up or leave you be. ${sign}`,
  ];

  return { openers, followUps, objections };
}
