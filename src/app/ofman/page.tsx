import type { Metadata } from "next";
import OfmanQuadrantsClient from "./OfmanQuadrantsClient";

export const metadata: Metadata = {
  title: "Ofman's Core Quadrants | Better-Me",
  description:
    "Discover the hidden dynamics behind your greatest strengths — and what trips you up. An interactive self-awareness tool based on Daniel Ofman's Core Quadrants model.",
  openGraph: {
    title: "Ofman's Core Quadrants | Better-Me",
    description:
      "Discover your core quality, pitfall, challenge, and allergy with this interactive self-awareness tool.",
  },
};

export default function OfmanPage() {
  return <OfmanQuadrantsClient />;
}
