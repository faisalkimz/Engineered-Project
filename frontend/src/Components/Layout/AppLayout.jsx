import React from 'react'
import Header from './Header'
import Footer from './Footer'

export default function AppLayout({ children }) {
    return (
        <>
            <div className="app-layout">
                <Header />
                <main className="main-content">
                    {children}
                </main>
                <Footer />
            </div>

            <style jsx="true">{`
                .app-layout {
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    background: var(--bg-primary);
                }
                
                .main-content {
                    flex: 1 1 auto;
                    display: flex;
                    flex-direction: column;
                }
            `}</style>
        </>
    )
}
