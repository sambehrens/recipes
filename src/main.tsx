import { StrictMode } from 'react'
import { ViteReactSSG } from 'vite-react-ssg/single-page'
import App from './App.tsx'
import './index.css'

export const createRoot = ViteReactSSG(<StrictMode><App /></StrictMode>);

