import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import '@styles/sidebar.css';
import { useProjects } from '../hooks/useProjects';

export default function ProjectsSidebar({ isOpen, onClose }) {
    const { projects } = useProjects();
    
    // Prevent scrolling when sidebar is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div 
                        className="fd-sidebar-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={onClose}
                    />
                    
                    {/* Drawer */}
                    <motion.div 
                        className="fd-sidebar-drawer"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    >
                        <header className="fd-sidebar-header">
                            <h2 className="fd-sidebar-title">All Projects Index</h2>
                            <button className="fd-sidebar-close" onClick={onClose}>
                                <FaTimes />
                            </button>
                        </header>
                        
                        <div className="fd-sidebar-content">
                            <ul className="fd-sidebar-list">
                                {projects.map((proj, i) => (
                                    <motion.li 
                                        key={proj.key}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + (i * 0.05) }}
                                    >
                                        <a href={`/project/${proj.key}`} className="fd-sidebar-link">
                                            <span className="fd-sidebar-name">{proj.title}</span>
                                            <span className="fd-sidebar-year">{proj.year}</span>
                                        </a>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
