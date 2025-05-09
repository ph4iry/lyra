import { WorkspacesContext, ActiveWorkspaceContext } from "@/renderer/types/workspaces";
import { ReactNode, useEffect, useState } from "react";

export default function WorkspaceProvider({ children }:{ children: ReactNode }) {
  const [workspaces, setWorkspaces] = useState([]);
  const [activeWorkspace, setActiveWorkspace] = useState<string | null>(null); // a workspace id
  
  useEffect(() => {
    const handleStorageChange = () => {
      setWorkspaces(localStorage.getItem('workspaces') ? JSON.parse(localStorage.getItem('workspaces')!) : null);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    // set localstorage workspaces to workspaces when workspaces changes
    if (workspaces) {
      localStorage.setItem('workspaces', JSON.stringify(workspaces));
    } else {
      localStorage.setItem('workspaces', JSON.stringify([]));
    }
  }, [workspaces]);

  return (
    <WorkspacesContext.Provider value={[workspaces, setWorkspaces]}>
      <ActiveWorkspaceContext.Provider value={[activeWorkspace, setActiveWorkspace]}>
        {children}
      </ActiveWorkspaceContext.Provider>
    </WorkspacesContext.Provider>
  );
}