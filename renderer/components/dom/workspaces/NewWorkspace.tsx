import { AnimatePresence, motion } from 'motion/react';
import { useState, useContext } from 'react';
import { WorkspacesContext, Workspace } from '@/renderer/types/workspaces';
import useStorage from '@/renderer/hooks/useStorage';

export default function NewWorkspace() {
  const [open, setOpen] = useState(false);
  const { workspaces, setWorkspaces } = useContext(WorkspacesContext);
  const { storedValue, updateValue } = useStorage<Workspace[]>('workspaces', []);
  const [wsName, setWsName] = useState('');

  return (
    <>
      <button onClick={() => setOpen(true)} className="w-full py-2 px-4 text-center border-2 border-dashed border-neutral-700 text-neutral-700 hover:border-neutral-400 hover:text-neutral-400 rounded-md transition uppercase font-semibold">New Workspace</button>
      <AnimatePresence>
        {open && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 w-screen h-screen z-20">
          <div className="absolute inset-0 bg-black opacity-50" onClick={() => setOpen(false)}></div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-neutral-800 p-6 rounded-md shadow-lg pointer-events-auto">
              <h2 className="text-lg font-semibold">Create a new workspace</h2>
              <input type="text" placeholder="Workspace name" className="border border-neutral-300 rounded-md p-2 w-full mt-4" onChange={(e) => setWsName(e.target.value)}/>
              <button className="bg-indigo-500 text-white rounded-md p-2 w-full mt-4" onClick={() => {
                const now = new Date();
                setWorkspaces([...workspaces, {
                  name: wsName,
                  id: `${now.valueOf()}`,
                  createdAt: now,
                  updatedAt: now,
                  documents: [],
                  operations: []
                }]);
                updateValue([...storedValue, {
                  name: wsName,
                  id: `${now.valueOf()}`,
                  createdAt: now,
                  updatedAt: now,
                  documents: [],
                  operations: []
                }]);
                setOpen(false);
              }}>Create</button>
            </div>
          </div>
        </motion.div>}
      </AnimatePresence>
    </>
  )
}