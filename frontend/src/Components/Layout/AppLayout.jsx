import React from 'react'
import Header from './Header'
import Footer from './Footer'
import QuickViewModal from '../Products/QuickViewModal'
import LiveChatWidget from '../Common/LiveChatWidget'
import BackToTop from '../Common/BackToTop'

export default function AppLayout({ children }) {
    return (
        <>
            <div className="app-layout">
                <Header />
                <main className="main-content">
                    {children}
                </main>
                <Footer />

                {/* Global Components */}
                <QuickViewModal />
                <LiveChatWidget />
                <BackToTop />
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
