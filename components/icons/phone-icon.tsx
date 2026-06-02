import { cn } from "@/lib/cn";

type PhoneIconProps = {
  className?: string;
};

export function PhoneIcon({ className }: PhoneIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
      className={cn("h-[18px] w-[18px] shrink-0", className)}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.5 4h2.2c.5 0 .9.3 1 .8l.5 2.5c.1.4 0 .9-.4 1.1l-1.4.9c1.2 2.4 3.1 4.3 5.5 5.5l.9-1.4c.2-.4.7-.5 1.1-.4l2.5.5c.5.1.8.5.8 1v2.2c0 .6-.5 1.1-1.1 1.1C10.1 18.9 5.1 13.9 5.1 7.6c0-.6.4-1.1 1-1.1z"
      />
    </svg>
  );
}
