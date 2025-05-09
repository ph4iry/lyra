'use client';
import { useState, useEffect } from 'react';
import { Workspace } from '../types/workspaces';
const WORKSPACES_KEY = 'workspaces';

export default function useWorkspaces() {
  const [workspaces, setWorkspaces] = useState<Workspace[] | null>(null);

  useEffect(() => {
    const storedWorkspaces = localStorage.getItem(WORKSPACES_KEY);
    console.log('storedWorkspaces', storedWorkspaces);
    if (storedWorkspaces) {
      setWorkspaces(JSON.parse(storedWorkspaces));
    } else {
      setWorkspaces([]);
    }
  }, []);



  const updateWorkspaces = (newWorkspaces: Workspace[]) => {
    localStorage.setItem(WORKSPACES_KEY, JSON.stringify(newWorkspaces));
    setWorkspaces(newWorkspaces);
  };

  return [workspaces, updateWorkspaces] as const;
}