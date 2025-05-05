import useStorage from "@/renderer/hooks/useStorage";
import NewWorkspace from "./workspaces/NewWorkspace";
import { Workspace, WorkspacesContext } from "@/renderer/types/workspaces";
import { useContext } from "react";

export default function Sidebar() {
  const { workspaces, setWorkspaces } = useContext(WorkspacesContext);
  
  return (
    <div className="bg-dark-800 dark:bg-dark-800-dark h-full w-[25vw] max-w-xs py-20 px-8">
      <div className="font-bold text-7xl font-display mb-5">lyra</div>
      <div className="text-sm font-semibold uppercase text-neutral-600">Workspaces</div>
      <div>
        <div className="flex flex-col space-y-2 mt-4">
          {workspaces.map((workspace) => (
            <button key={workspace.id} className="w-full py-2 px-4 text-left border-2 border-neutral-700 hover:border-neutral-400 hover:text-neutral-400 rounded-md transition">{workspace.name}</button>
          ))}
        </div>
      </div>
      <NewWorkspace />
    </div>
  )
}