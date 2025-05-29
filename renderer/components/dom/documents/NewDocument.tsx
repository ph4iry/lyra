import { AnimatePresence, motion } from 'motion/react';
import { useState, useContext } from 'react';
import { WorkspacesContext, Workspace, Document, ActiveWorkspaceContext } from '@/renderer/types/workspaces';
import useWorkspaces from '@/renderer/hooks/useWorkspaces';
import { ArrowRight, Plus } from 'lucide-react';
import { ArticleData } from '@extractus/article-extractor';
import { useNodesState, useEdgesState, addEdge, useReactFlow } from '@xyflow/react';

export default function NewDocument() {
  const [open, setOpen] = useState(false);
  const [workspaces, setWorkspaces] = useContext(WorkspacesContext);
  const [activeWorkspace, setActiveWorkspace] = useContext(ActiveWorkspaceContext);
  const [wsName, setWsName] = useState('');
  const { setNodes, setEdges } = useReactFlow();
  const [articleLink, setArticleLink] = useState('');

  const sanitizeDocument = (html: string): string => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const sanitizedText = tempDiv.textContent || tempDiv.innerText || '';
    const links = Array.from(tempDiv.querySelectorAll('a'))
      .map((link) => link.href)
      .join(', ');
    return `${sanitizedText}\n\nLYRA_LINKS: ${links}`;
  };

  const handleCreateDocument = async () => {
    try {
      const articleData: ArticleData = window.api ? await window.api.callApi('articles/extract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ link: articleLink }),
      }) : await fetch(`http://localhost:3001/api/articles/extract`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ link: articleLink }),
      }).then(async (res) => await res.json());

      const sanitizedContent = sanitizeDocument(articleData.content || '');

      const now = new Date();
      const newNodeId = `${now.valueOf()}`;

      console.log(articleData);

      const documentNode = {
        id: newNodeId,
        type: 'document',
        data: {
          source: {
            ...articleData,
            value: sanitizedContent,
          },
        },
        position: { x: 250, y: 0 },
      };

      console.log('active workspace', activeWorkspace);
      const newWorkspaces = workspaces.map((ws: Workspace) => ws.id === activeWorkspace ? ({
        ...ws,
        documents: [
          ...ws.documents,
          {
            id: newNodeId,
            title: articleData.title || 'Untitled',
            content: sanitizedContent,
            createdAt: now,
            updatedAt: now,
            source: articleData.source || '',
            x: 250,
            y: 0,
          } as Partial<Document & ArticleData>,
        ]
      }) : ws);

      console.log('new workspace', newWorkspaces)

      setWorkspaces(newWorkspaces);

      const placeholderNode = {
        id: `${newNodeId}-placeholder`,
        type: 'placeholder',
        data: {
          operation: 'summarize',
        },
        position: { x: 500, y: 0 },
      };

      setNodes((nds) => [...nds, documentNode, placeholderNode]);
      setEdges((eds) =>
        addEdge(
          {
            id: `e-${newNodeId}-placeholder`,
            source: newNodeId,
            target: `${newNodeId}-placeholder`,
            type: 'floating',
          },
          eds
        )
      );

      setOpen(false);
    } catch (error) {
      console.error('Error creating document:', error);
    }
  };

  return (
    <>
      {activeWorkspace != '' && activeWorkspace != null && (
        <>
          <div className="fixed bottom-[10vh] right-[10vh] z-10">
            <span className="pointer-events-none">
              <span className="text-neutral-600 text-sm">New Document</span>
              <ArrowRight />
            </span>
            <button
              onClick={() => setOpen(true)}
              className="bg-neutral-800 rounded-full z-10"
            >
              <Plus className="size-14" />
            </button>
          </div>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 w-screen h-screen z-20"
              >
                <div
                  className="absolute inset-0 bg-black opacity-50"
                  onClick={() => setOpen(false)}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-neutral-800 p-6 rounded-md shadow-lg pointer-events-auto w-full max-w-4xl">
                    <h2 className="text-lg font-semibold">
                      Paste a link to an article
                    </h2>
                    <input
                      type="text"
                      placeholder="Article Link"
                      className="border border-neutral-700 rounded-md p-2 w-full mt-4 bg-neutral-800 focus:outline-none"
                      onChange={(e) => setArticleLink(e.target.value)}
                    />

                    <button
                      className="bg-indigo-500 text-white rounded-md p-2 w-full mt-4"
                      onClick={handleCreateDocument}
                    >
                      Create
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </>
  );
}