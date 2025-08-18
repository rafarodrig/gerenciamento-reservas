import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Container, Form } from 'react-bootstrap';
import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/Buttons/PrimaryButton';
import SenacLogo from '@/Components/SenacLogo';
import { register } from '@/services/auth';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        try {
            const data = await register(formData);
            console.log('Login bem-sucedido', data);
            router.visit('/consultar-reservas'); // Redireciona após sucesso
        } catch (err) {
            setErrors(err.response?.data?.errors || {});
        }
    };

    return (
        <GuestLayout>
            <Head title="Registrar-se" />
            <Container
                className="container-style p-5 position-absolute top-50 start-50 translate-middle"
                style={{ maxWidth: '500px' }}
            >
                <div className="text-center mb-4">
                    <SenacLogo width={150} height={150} />
                </div>

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="form-floating mb-3">
                        <Form.Control
                            id="register-name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Nome"
                            isInvalid={!!errors?.name}
                        />
                        <Form.Label htmlFor="register-name">Nome</Form.Label>
                        <Form.Control.Feedback type="invalid">
                            {errors?.name}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="form-floating mb-3">
                        <Form.Control
                            id="register-email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            isInvalid={!!errors?.email}
                        />
                        <Form.Label htmlFor="register-email">Email</Form.Label>
                        <Form.Control.Feedback type="invalid">
                            {errors?.email}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="form-floating mb-3">
                        <Form.Control
                            id="register-password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Senha"
                            isInvalid={!!errors?.password}
                        />
                        <Form.Label htmlFor="register-password">Senha</Form.Label>
                        <Form.Control.Feedback type="invalid">
                            {errors?.password}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="form-floating mb-4">
                        <Form.Control
                            id="register-password-confirmation"
                            type="password"
                            name="password_confirmation"
                            value={formData.password_confirmation}
                            onChange={handleChange}
                            placeholder="Confirme a senha"
                            isInvalid={!!errors?.password_confirmation}
                        />
                        <Form.Label htmlFor="register-password-confirmation">
                            Confirmar Senha
                        </Form.Label>
                        <Form.Control.Feedback type="invalid">
                            {errors?.password_confirmation}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <PrimaryButton className="py-3 w-100" type="submit">
                        Registrar
                    </PrimaryButton>
                    <div className="text-center mt-3">
                        <span>Já tem uma conta? </span>
                        <Link href={route('login')} className="text-primary text-decoration-none">
                            Faça login
                        </Link>
                    </div>
                </Form>
            </Container>
        </GuestLayout>
    );
}
