import type { Metadata } from "next";
import InterpersonalClient from "./InterpersonalClient";

export const metadata: Metadata = {
  title: "Communication Style | Better-Me",
  description:
    "Discover your communication style through two key dimensions — assertiveness and responsiveness. Find out if you're an Analytical, Driver, Amiable, or Expressive communicator.",
};

export default function InterpersonalPage() {
  return <InterpersonalClient />;
}
