import { useState, useRef } from 'react';
import { useAlert } from '@/contexts/AlertContext'; // ajuste o caminho se necessário

export function useSimpleForm({ initialValues, onSubmit }) {
    const [formData, setFormData] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const { showAlert } = useAlert();

    const initialValuesRef = useRef(initialValues); // <- mantém o valor original

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);

        try {
            await onSubmit(formData);
        } catch (err) {
            const { errors: fieldErrors, message } = err.response?.data || {};

            if (fieldErrors) setErrors(fieldErrors);
            if (message) showAlert(message, 'danger');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData(initialValuesRef.current);
        setErrors({});
    };

    return {
        formData,
        setFormData,
        errors,
        setErrors,
        loading,
        handleChange,
        handleSubmit,
        resetForm, // <-- aqui está o novo método
    };
}
