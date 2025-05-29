import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron'

const handler = {
  send(channel: string, value: unknown) {
    ipcRenderer.send(channel, value)
  },
  on(channel: string, callback: (...args: unknown[]) => void) {
    const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
      callback(...args)
    ipcRenderer.on(channel, subscription)

    return () => {
      ipcRenderer.removeListener(channel, subscription)
    }
  },
}

contextBridge.exposeInMainWorld('ipc', handler)

contextBridge.exposeInMainWorld('api', {
    // Expose secure API methods here
    sendMessage: (message) => {
      console.log('Received message:', message);
    },
    // Add new method to handle API routes
    callApi: async (endpoint: string, options: RequestInit = {}) => {
      return ipcRenderer.invoke('api-request', { endpoint, options });
    }
  }
);

export type IpcHandler = typeof handler
