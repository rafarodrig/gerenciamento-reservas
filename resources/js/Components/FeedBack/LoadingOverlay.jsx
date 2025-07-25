// components/FeedBack/LoadingOverlay.jsx
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingOverlay({ isVisible }) {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="loading-overlay"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        zIndex: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                        style={{
                            width: '2.5rem',
                            height: '2.5rem',
                            border: '4px solid #0d6efd',
                            borderTop: '4px solid transparent',
                            borderRadius: '50%',
                        }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
