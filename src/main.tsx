import { StrictMode } from 'react'
import { ViteReactSSG } from 'vite-react-ssg/single-page'
import App from './App.tsx'
import './index.css'

// Workaround for a React issue
// where dblclick handling on the React root could cause checkboxes/radios
// to incorrectly toggle on quick successive taps on iOS and some other browsers.
// This workaround disables the dblclick listener at the DOM level.
// More details can be found in the GitHub issue:
// https://github.com/facebook/react/issues/19841
if (typeof window !== 'undefined') {
  let oldAddEventListener = Node.prototype.addEventListener;
  Node.prototype.addEventListener = function (type) {
    if (type === "dblclick") {
      // ignore
      return;
    }
    return oldAddEventListener.apply(this, arguments as any);
  };
}

export const createRoot = ViteReactSSG(<StrictMode><App /></StrictMode>);

