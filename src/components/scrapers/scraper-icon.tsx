import {
  Database,
  Globe,
  MapPin,
  MapPinned,
  MessagesSquare,
  Radar,
  Search,
  Waypoints,
  type LucideProps,
} from "lucide-react";

import type { ScraperIcon as ScraperIconKey } from "@/lib/types";

const ICONS = {
  "map-pinned": MapPinned,
  radar: Radar,
  "messages-square": MessagesSquare,
  search: Search,
  waypoints: Waypoints,
  "map-pin": MapPin,
  database: Database,
  globe: Globe,
} satisfies Record<ScraperIconKey, React.ComponentType<LucideProps>>;

export function ScraperIcon({
  icon,
  ...props
}: { icon: ScraperIconKey } & LucideProps) {
  const Icon = ICONS[icon];
  return <Icon aria-hidden {...props} />;
}
