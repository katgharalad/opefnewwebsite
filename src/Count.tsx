import { useState, useEffect } from "react";

interface CountProps {
  target: number;
  suffix?: string;
}

export function Count({ target, suffix = "%" }: CountProps) {
  const [value, setValue] = useState(0);
  
  useEffect(() => {
    let frame = 0;
    const total = 60;
    const tick = () => {
      frame++;
      setValue(Math.round((target * frame) / total));
      if (frame < total) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target]);
  
  return (
    <span className="text-[#97B34D] font-semibold">
      {value}
      {suffix}
    </span>
  );
}
