import { PulseLoader } from "react-spinners";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function SmoothPulseLoader({
    loading,
    ...props
}) {
    // const [show, setShow] = useState(false);

    // useEffect(() => {
    //     let timeout;

    //     if (loading) {
    //         setShow(true); // entra imediatamente
    //     } else {
    //         // garante que fica visível pelo menos um ciclo (~500ms)
    //         timeout = setTimeout(() => setShow(false), 500);
    //     }

    //     return () => clearTimeout(timeout);
    // }, [loading]);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex justify-center items-center"
                >
                    <PulseLoader
                        loading={true}
                        size={10}
                        color="#0d6efd"
                        aria-label="Loading Spinner"
                        {...props}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}