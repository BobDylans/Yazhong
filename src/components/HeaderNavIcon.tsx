import { cn } from "@/lib/utils";

export function NavIcon({ icon, active }: { icon: React.ReactNode; active?: boolean }) {
  return (
    <span className={cn(
      "flex h-11 w-11 items-center justify-center rounded-xl shrink-0 transition-all duration-300",
      active
        ? "bg-accent text-white shadow-md shadow-accent/25"
        : "bg-gradient-to-br from-zinc-100 to-zinc-50 text-zinc-500 shadow-sm ring-1 ring-zinc-200/50 group-hover:shadow-md group-hover:from-accent group-hover:to-amber-600 group-hover:text-white group-hover:ring-accent/30"
    )}>
      {icon}
    </span>
  );
}