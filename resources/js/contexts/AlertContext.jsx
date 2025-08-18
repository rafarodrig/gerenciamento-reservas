import { createContext, useContext, useState } from 'react';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState(null);

    const showAlert = (message, type) => {
        setAlert({ show: true, message, type });
    };

    const clearAlert = () => {
        setAlert((prev) => ({ ...prev, show: false }));
    };

    return (
        <AlertContext.Provider value={{ alert, showAlert, clearAlert }}>
            {children}
        </AlertContext.Provider>
    );
};

// Hook para acessar facilmente
export const useAlert = () => useContext(AlertContext);
