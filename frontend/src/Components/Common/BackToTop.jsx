import { useState, useEffect } from 'react'

export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener('scroll', toggleVisibility)
        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="back-to-top"
                    aria-label="Back to top"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 15l-6-6-6 6" />
                    </svg>
                </button>
            )}

            <style jsx="true">{`
                .back-to-top {
                    position: fixed;
                    bottom: 24px;
                    right: 24px;
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    background: var(--primary);
                    color: white;
                    border: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: var(--shadow-xl);
                    transition: all var(--transition-base);
                    z-index: 1000;
                    animation: fadeInUp 0.3s ease-out;
                }

                .back-to-top:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 12px 24px rgba(246, 139, 30, 0.4);
                }

                .back-to-top:active {
                    transform: translateY(-2px);
                }

                @media (max-width: 768px) {
                    .back-to-top {
                        bottom: 16px;
                        right: 16px;
                        width: 44px;
                        height: 44px;
                    }
                }
            `}</style>
        </>
    )
}
