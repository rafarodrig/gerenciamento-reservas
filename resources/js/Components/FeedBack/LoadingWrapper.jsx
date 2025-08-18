import { motion } from "framer-motion";
import LoadingOverlay from "./LoadingOverlay";

const defaultTransition = { duration: 0.5, ease: "easeInOut" };

export default function LoadingWrapper({ loading, children }) {
    return (
        <div className="position-relative">
            <LoadingOverlay loading={loading} />
            <motion.div
                animate={{ opacity: loading ? 0.5 : 1 }}
                transition={defaultTransition}
            >
                {children}
            </motion.div>
        </div>
    );
}
