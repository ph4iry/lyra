'use client';
import useStorage from "@/renderer/hooks/useStorage";
import NewWorkspace from "./workspaces/NewWorkspace";
import { ActiveWorkspaceContext, Workspace, WorkspacesContext } from "@/renderer/types/workspaces";
import { useContext, useEffect, useState } from "react";
import { EllipsisVertical, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export default function Sidebar() {
  const [workspaces, setWorkspaces] = useContext(WorkspacesContext);
  const [activeWorkspace, setActiveWorkspace] = useContext(ActiveWorkspaceContext);

  const removeWorkspace = (id: string) => {
    const newWorkspaces = workspaces.filter((workspace) => workspace.id !== id);
    console.log(newWorkspaces);
    setWorkspaces(newWorkspaces);
  }
  
  return (
    <div className="bg-dark-800 dark:bg-dark-800-dark h-full w-[25vw] max-w-xs py-20 px-8">
      <div className="font-bold text-7xl font-display mb-5">lyra</div>
      <div className="text-sm font-semibold uppercase text-neutral-600">Workspaces</div>
      <div>
        <div className="flex flex-col space-y-2 mt-4" suppressHydrationWarning>
          {workspaces.map((workspace) => (
            <div key={workspace.id} className={`w-full hover:bg-neutral-800 text-white/80 hover:text-white rounded-md transition flex justify-between group items-center px-4 relative py-1`}>
              <span className={`h-full absolute left-0 w-1 rounded-full -translate-x-2 ${activeWorkspace === workspace.id && 'bg-white'}`}></span>
              <button className="text-left grow truncate block" onClick={() => setActiveWorkspace(workspace.id)}>{workspace.name}</button>
              <WorkspacePanel id={workspace.id} remove={removeWorkspace} />
            </div>
          ))}
          <NewWorkspace />
        </div>
      </div>
    </div>
  )
}

// note: in the future, maybe we can make it so deleted workspaces are moved from localstorage to sessionstorage so that if the user accidentally deletes a workspace, they can recover it.
function WorkspacePanel({ id, remove }: { id: string; remove: (id: string) => void }) {
  const [showPanel, setShowPanel] = useState(false);
  const [activeWorkspace, setActiveWorkspace] = useContext(ActiveWorkspaceContext);

  const handleDelete = () => {
    remove(id);
    if (activeWorkspace === id) {
      setActiveWorkspace(null);
    }
    setShowPanel(false);
  };

  return (
    <div className="relative">
      <button onClick={() => setShowPanel(!showPanel)} className="">
        <EllipsisVertical className="group-hover:opacity-100 opacity-0 transition" />
        <span className="sr-only">Options</span>
      </button>
      <AnimatePresence>
        {showPanel && (
          <motion.div
            className="absolute right-0 mt-2 bg-white dark:bg-dark-700 shadow-lg rounded-md p-2 z-10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={handleDelete}
              className="text-red-600 hover:text-red-800 text-sm font-medium w-full text-right whitespace-nowrap"
            >
              Delete Workspace
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}