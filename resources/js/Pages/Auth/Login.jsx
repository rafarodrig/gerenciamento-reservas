// src/pages/Login.jsx
import { useEffect, useState } from 'react';
import { login } from '@/services/auth';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Container, Form } from 'react-bootstrap';
import PrimaryButton from '@/Components/Buttons/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import SenacLogo from '@/Components/SenacLogo';
import AlertPop from '@/Components/Alerts/Alert';


export default function LoginPage() {
    const [alert, setAlert] = useState({})
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Limpa o erro do campo específico
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        try {
            const data = await login(formData);
            console.log('Login bem-sucedido', data);

            router.visit('/consultar-reservas');
        } catch (err) {
            setErrors(err.response?.data?.errors || {});
        }
    };

    return (
        <GuestLayout>
            <Head title="Log-in" />
            <Container
                className="container-style p-5 position-absolute top-50 start-50 translate-middle"
                style={{ maxWidth: '500px' }}
            >
                <div className="text-center mb-4">
                    <SenacLogo width={150} height={120} />
                </div>

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="form-floating mb-3">
                        <Form.Control
                            id="login-email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            isInvalid={!!errors?.email}
                        />
                        <Form.Label htmlFor="login-email">Email</Form.Label>
                        <Form.Control.Feedback type="invalid">
                            {errors?.email}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="form-floating mb-4">
                        <Form.Control
                            id="login-password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Senha"
                            isInvalid={!!errors?.password}
                        />
                        <Form.Label htmlFor="login-password">Senha</Form.Label>
                        <Form.Control.Feedback type="invalid">
                            {errors?.password}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <PrimaryButton className="py-3 w-100" type="submit">
                        Fazer Login
                    </PrimaryButton>
                    <div className="text-center mt-4">
                        <span>Não tem uma conta? </span>
                        <Link href="/register" className="text-primary text-decoration-none">
                            Registre-se
                        </Link>
                    </div>
                </Form>
            </Container>

            <AlertPop alert={alert} setAlert={setAlert} />
        </GuestLayout>
    );
}
