import { AnimatePresence, motion } from 'motion/react';
import { useState, useContext } from 'react';
import { WorkspacesContext, Workspace, ActiveWorkspaceContext } from '@/renderer/types/workspaces';
import { Node, Edge } from '@xyflow/react';

interface WorkspaceTemplate {
  name: string;
  description: string;
  id: string;
  nodes?: Node[];
  edges?: Edge[];
}

export default function NewWorkspace() {
  const [open, setOpen] = useState(false);
  const [workspaces, setWorkspaces] = useContext(WorkspacesContext);
  const [activeWorkspace, setActiveWorkspace] = useContext(ActiveWorkspaceContext);
  const [wsName, setWsName] = useState('');
  const templates = [
    { name: 'School Report', description: 'Organize and present school projects effectively.', id: 'school-report' },
    { name: 'Book Notes', description: 'Summarize and analyze books efficiently.', id: 'book-notes' },
    { name: 'Project Planning', description: 'Plan and track your project milestones.', id: 'project-planning' },
    { name: 'Meeting Notes', description: 'Capture and organize meeting discussions.', id: 'meeting-notes' },
    { name: 'Personal Journal', description: 'Keep track of your daily thoughts and ideas.', id: 'personal-journal' },
    { name: 'Blank', description: 'Start with an empty workspace.', id: 'blank' },
  ];

  const [activeTemplate, setActiveTemplate] = useState<string>(null!);

  return (
    <>
      <button id="new-workspace" onClick={() => setOpen(true)} className="w-full py-2 px-4 text-center border-2 border-dashed border-neutral-700 text-neutral-700 hover:border-neutral-400 hover:text-neutral-400 rounded-md transition uppercase font-semibold">New Workspace</button>
      <AnimatePresence>
        {open && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 w-screen h-screen z-20">
          <div className="absolute inset-0 bg-black opacity-50" onClick={() => setOpen(false)}></div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-neutral-800 p-6 rounded-md shadow-lg pointer-events-auto max-w-3xl w-full">
              <h2 className="text-lg font-semibold">Create a new workspace</h2>
              <input type="text" placeholder="Workspace name" className="border border-neutral-700 rounded-md p-2 w-full mt-4 bg-neutral-800 focus:outline-none" onChange={(e) => setWsName(e.target.value)}/>
              
              <div>
                <span className="block text-center mt-6 mb-3">Choose a template</span>
                <TemplateGallery templates={templates} active={activeTemplate} setActive={setActiveTemplate} />
              </div>
              
              <button className="bg-rose-500 rounded-md p-2 w-full mt-4" onClick={() => {
                const now = new Date();
                setWorkspaces([...workspaces, {
                  name: wsName,
                  id: `${now.valueOf()}`,
                  createdAt: now,
                  updatedAt: now,
                  documents: [],
                  operations: []
                }]);

                // if its the first workspace, set it as the active workspace; its reading length for 0 because it hasnt rerendered yet
                if (workspaces.length === 0) {
                  setActiveWorkspace(`${now.valueOf()}`);
                }
                setOpen(false);
              }}>Create</button>
            </div>
          </div>
        </motion.div>}
      </AnimatePresence>
    </>
  )
}

function TemplateGallery({ templates, active, setActive }:{ templates: WorkspaceTemplate[], active: string, setActive: (id: string) => void }) {

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {templates.map((template, index) => (
          <button
            key={index}
            className={`border border-neutral-700 rounded-md p-4 text-left hover:border-neutral-400 hover:bg-neutral-700/30 transition ${active === template.id ? 'border-neutral-400 bg-neutral-700' : ''}`}
            onClick={() => setActive(template.id)}
          >
            <h3 className="font-semibold">{template.name}</h3>
            <p className="text-sm text-neutral-400 mt-2">{template.description}</p>
          </button>
        ))}
      </div>
    </div>
  )
}