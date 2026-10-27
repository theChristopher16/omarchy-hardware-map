import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'Omarchy Hardware Map',description:'A community map of hardware, fixes and evidence for Omarchy.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
