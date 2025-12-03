import React from 'react'

export default function SocialShare({ url, title }) {
    const shareUrl = encodeURIComponent(url || window.location.href)
    const shareTitle = encodeURIComponent(title || 'Check out this amazing product on TechMart!')

    const platforms = [
        {
            name: 'Facebook',
            url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
            color: '#1877F2',
            icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
            )
        },
        {
            name: 'Twitter',
            url: `https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`,
            color: '#1DA1F2',
            icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
            )
        },
        {
            name: 'WhatsApp',
            url: `https://api.whatsapp.com/send?text=${shareTitle} ${shareUrl}`,
            color: '#25D366',
            icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
            )
        },
        {
            name: 'Copy Link',
            action: () => {
                navigator.clipboard.writeText(decodeURIComponent(shareUrl))
                // You might want to show a toast here
            },
            color: '#333',
            icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
            )
        }
    ]

    return (
        <div className="social-share">
            <span className="share-label">Share:</span>
            <div className="share-buttons">
                {platforms.map((platform) => (
                    <a
                        key={platform.name}
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="share-btn"
                        style={{ '--hover-color': platform.color }}
                        onClick={(e) => {
                            if (platform.action) {
                                e.preventDefault()
                                platform.action()
                            }
                        }}
                        title={`Share on ${platform.name}`}
                    >
                        {platform.icon}
                    </a>
                ))}
            </div>
            <style jsx="true">{`
                .social-share {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-md);
                }

                .share-label {
                    font-weight: 600;
                    color: var(--text-secondary);
                    font-size: var(--font-size-sm);
                }

                .share-buttons {
                    display: flex;
                    gap: var(--spacing-sm);
                }

                .share-btn {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background: var(--bg-secondary);
                    color: var(--text-secondary);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all var(--transition-fast);
                    border: 1px solid var(--border-light);
                }

                .share-btn:hover {
                    background: var(--hover-color);
                    color: white;
                    border-color: var(--hover-color);
                    transform: translateY(-2px);
                }
            `}</style>
        </div>
    )
}
