import { IpcHandler } from '../main/preload'

declare global {
  interface Window {
    ipc: IpcHandler
    api: {
      sendMessage: (message: string) => void;
      callApi: (endpoint: string, options?: RequestInit) => Promise<any>;
    }
  }
}
