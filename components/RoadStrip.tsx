interface RoadStripProps {
  animate?: boolean;
  className?: string;
}

/** A slice of road: asphalt band, white edge lines, dashed yellow center. */
export default function RoadStrip({ animate = false, className = "" }: RoadStripProps) {
  return (
    <div className={`asphalt relative h-14 overflow-hidden ${className}`} aria-hidden="true">
      <div className="absolute inset-x-0 top-2 h-[2px] bg-white/60" />
      <div className={`absolute inset-x-0 top-1/2 -translate-y-1/2 lane-dash ${animate ? "lane-dash-animate" : ""}`} />
      <div className="absolute inset-x-0 bottom-2 h-[2px] bg-white/60" />
    </div>
  );
}
