import { AnimatePresence, motion } from 'motion/react';
import { useState, useContext } from 'react';
import { WorkspacesContext, Workspace, Document, ActiveWorkspaceContext } from '@/renderer/types/workspaces';
import useWorkspaces from '@/renderer/hooks/useWorkspaces';
import { Plus } from 'lucide-react';

export default function NewDocument() {
  const [open, setOpen] = useState(false);
  const [workspaces, setWorkspaces] = useContext(WorkspacesContext);
  const [activeWorkspace, setActiveWorkspace] = useContext(ActiveWorkspaceContext);
  const [wsName, setWsName] = useState('');

  return (
    <>
      {activeWorkspace != '' && activeWorkspace != null && (
        <>
          <button onClick={() => setOpen(true)} className="fixed bottom-[10vh] right-[10vh] bg-neutral-800 rounded-full z-10"><Plus className="size-14" /></button>
          <AnimatePresence>
            {open && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 w-screen h-screen z-20">
              <div className="absolute inset-0 bg-black opacity-50" onClick={() => setOpen(false)}></div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-neutral-800 p-6 rounded-md shadow-lg pointer-events-auto">
                  <h2 className="text-lg font-semibold">Create a new workspace</h2>
                  <input type="text" placeholder="Workspace name" className="border border-neutral-300 rounded-md p-2 w-full mt-4" onChange={(e) => setWsName(e.target.value)}/>
                  <button className="bg-indigo-500 text-white rounded-md p-2 w-full mt-4" onClick={() => {
                    const now = new Date();
                    setWorkspaces([
                      ...workspaces,
                      {
                        id: `${now.valueOf()}`,
                        name: wsName,
                        createdAt: now,
                        documents: [] as Document[],
                        operations: [],
                        updatedAt: now,
                      }
                    ]);
                    setOpen(false);
                  }}>Create</button>
                </div>
              </div>
            </motion.div>}
          </AnimatePresence>
        </>
      )}
    </>
  )
}