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
      {/* <div className="font-bold text-7xl font-display mb-5">lyra</div> */}

      <div className="text-sm font-semibold uppercase text-neutral-600">Workspaces</div>
      <div className="flex flex-col justify-between h-full">
        <div className="space-y-2 mt-4 h-full">
          {workspaces.map((workspace) => (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ ease: 'linear', duration: 0.1 }} key={workspace.id} className={`w-full hover:bg-neutral-800 text-white/80 hover:text-white rounded-md transition flex justify-between group items-center px-4 relative py-1`}>
              <span className={`h-full absolute left-0 w-1 rounded-full -translate-x-2 ${activeWorkspace === workspace.id && 'bg-white'}`}></span>
              <button className="text-left grow truncate block" onClick={() => setActiveWorkspace(workspace.id)}>{workspace.name}</button>
              <WorkspacePanel id={workspace.id} remove={removeWorkspace} />
            </motion.div>
          ))}
          <NewWorkspace />
        </div>
        <img className="size-10 text-white" height="20" src="https://cdn.simpleicons.org/github/525252" />
      </div>
    </div>
  )
}

// note: in the future, maybe we can make it so deleted workspaces are moved from localstorage to sessionstorage so that if the user accidentally deletes a workspace, they can recover it.
function WorkspacePanel({ id, remove }: { id: string; remove: (id: string) => void }) {
  const [showPanel, setShowPanel] = useState(false);
  const [workspaces, setWorkspaces] = useContext(WorkspacesContext);
  const [activeWorkspace, setActiveWorkspace] = useContext(ActiveWorkspaceContext);

  const handleDelete = () => {
    remove(id);
    if (activeWorkspace === id) {
      setActiveWorkspace(null);
    }
    setShowPanel(false);
  };

  return (
    <div className="relative w-fit h-fit">
      <button onClick={() => setShowPanel(!showPanel)} className="group">
        <EllipsisVertical className="group-hover:opacity-100 opacity-0 transition translate-y-1" />
        <span className="sr-only">Options</span>
      </button>
      <AnimatePresence>
        {showPanel && (
          <motion.div
            className="absolute right-0 mt-2 bg-white dark:bg-neutral-800 shadow-lg rounded-md w-[15vw] p-2 z-10 text-right"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={() => {
                const newName = prompt("Enter new workspace name:");
                if (newName) {
                  const newWorkspaces = workspaces.map((workspace) =>
                    workspace.id === id ? { ...workspace, name: newName } : workspace
                  );
                  setWorkspaces(newWorkspaces);
                }
                setShowPanel(false);
              }}
              className="text-neutral-400 hover:bg-neutral-700/40 text-sm font-medium w-full text-right whitespace-nowrap transition p-2 rounded-md"
            >
              Rename Workspace
            </button>
            <span className="block text-sm uppercase font-semibold text-neutral-700">Danger Zone</span>
            <button
              onClick={handleDelete}
              className="text-red-600 hover:bg-neutral-700/40 text-sm font-medium w-full text-right whitespace-nowrap transition p-2 rounded-md"
            >
              Delete Workspace
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}