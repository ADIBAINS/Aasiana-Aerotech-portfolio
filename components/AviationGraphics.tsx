export function FlightPathGraphic({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 360 150" fill="none" aria-hidden="true">
      <path d="M10 127C83 125 102 49 178 55c66 5 74 63 168 28" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 8" />
      <circle cx="11" cy="127" r="5" fill="currentColor" />
      <circle cx="346" cy="83" r="5" fill="currentColor" />
      <path d="m193 39 28 8-18 8-7 19-6-2 2-18-15-7 3-4 15 3-2-7Z" fill="currentColor" />
      <circle cx="178" cy="55" r="18" stroke="currentColor" opacity=".25" />
      <circle cx="178" cy="55" r="28" stroke="currentColor" opacity=".12" />
    </svg>
  );
}

export function AircraftBlueprint({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 520 180" fill="none" aria-hidden="true">
      <path d="M24 92h472M260 16v148" stroke="currentColor" opacity=".14" strokeDasharray="4 7" />
      <path d="M72 103c62-2 117-7 162-11l-28-59 13-3 53 56 135-11c21-2 39 6 42 17-3 11-21 19-42 17L272 98l-53 56-13-3 28-59c-45-4-100-9-162-11l-29 27-10-2 16-39-16-39 10-2 29 27Z" stroke="currentColor" strokeWidth="2" />
      <path d="M428 83v18M111 75v34M385 76v32" stroke="currentColor" opacity=".45" />
      <circle cx="449" cy="92" r="4" fill="currentColor" />
    </svg>
  );
}
