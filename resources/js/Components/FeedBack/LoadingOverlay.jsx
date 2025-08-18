// components/FeedBack/LoadingOverlay.jsx
import { motion, AnimatePresence } from 'framer-motion';
import SmoothPulseLoader from './SmoothPulseLoader';
import { useEffect, useState } from 'react';

export default function LoadingOverlay({
    className = "",
    loading,
    ...props
}) {
    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`loading-overlay  ${className}`}
                    {...props}
                >
                    <SmoothPulseLoader loading={true} />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
