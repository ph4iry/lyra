import { WorkspacesContext, ActiveWorkspaceContext, GlobalDocumentsContext } from "@/renderer/types/workspaces";
import { ReactNode, useEffect, useState } from "react";

export default function WorkspaceProvider({ children }:{ children: ReactNode }) {
  const [workspaces, setWorkspaces] = useState([]);
  const [activeWorkspace, setActiveWorkspace] = useState<string | null>(null); // a workspace id
  const [globalDocuments, setGlobalDocuments] = useState([]);
  
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
    console.log('workspaces changed to', workspaces);
    if (workspaces) {
      localStorage.setItem('workspaces', JSON.stringify(workspaces));
    } else {
      localStorage.setItem('workspaces', JSON.stringify([]));
    }
  }, [workspaces]);

  useEffect(() => {
    const handleStorageChange = () => {
      setGlobalDocuments(localStorage.getItem('documents') ? JSON.parse(localStorage.getItem('documents')!) : null);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <WorkspacesContext.Provider value={[workspaces, setWorkspaces]}>
      <ActiveWorkspaceContext.Provider value={[activeWorkspace, setActiveWorkspace]}>
        <GlobalDocumentsContext.Provider value={[globalDocuments, setGlobalDocuments]}>
          {children}
        </GlobalDocumentsContext.Provider>
      </ActiveWorkspaceContext.Provider>
    </WorkspacesContext.Provider>
  );
}