import ValuesClient from "./ValuesClient";

export const metadata = {
  title: "Personal Values | Better-Me",
  description:
    "Discover your personal values through what triggers you and what you overdo. Build a values statement grounded in real behaviours, not nice-sounding words.",
};

export default function ValuesPage() {
  return <ValuesClient />;
}
