// src/pages/Login.jsx
import { login } from '@/services/auth';
import { Head, Link, router } from '@inertiajs/react';
import { Container, Form } from 'react-bootstrap';
import PrimaryButton from '@/Components/Buttons/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import SenacLogo from '@/Components/SenacLogo';
import { useSimpleForm } from '@/hooks/useSimpleForm';
import { useAlert } from "@/contexts/AlertContext";

export default function LoginPage() {
    const { showAlert } = useAlert();

    const {
        formData,
        errors,
        handleChange,
        handleSubmit,
    } = useSimpleForm({
        initialValues: { email: '', password: '' },
        onSubmit: async (data) => {
            const res = await login(data);
            showAlert(res.message, 'success');
            setTimeout(() => {
                router.visit('/consultar-reservas');
            }, 600);
        },
    });

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
                            {errors.email}
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
                        <Link href={route('register')} className="text-primary text-decoration-none">
                            Registre-se
                        </Link>
                    </div>
                </Form>
            </Container>
        </GuestLayout>
    );
}
