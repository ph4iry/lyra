import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="fixed z-[-1] left-0 top-0 bg-dark-800 dark:bg-dark-800-dark h-full w-[25vw] max-w-xs py-20 px-8">
      <div className="text-sm font-semibold uppercase text-neutral-600">Workspaces</div>
    </div>
  )
}