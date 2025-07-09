import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import Form from 'react-bootstrap/Form';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <Form.Control
            {...props}
            type={type}
            ref={localRef}
            className={className}
        />
    );
});
