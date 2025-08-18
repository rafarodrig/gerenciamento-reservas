<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use PhpParser\Node\Stmt\TryCatch;

class AuthController extends Controller
{
    /**
     * Login com autenticação por sessão
     */
    public function login(Request $request)
    {
        // try {

        // Validação
        $credentials = $request->validate([
            'email' => ['required', 'email', 'exists:usuarios,email'],
            'password' => ['required'],
        ]);

        // Tentativa de login
        if (Auth::attempt($credentials)) {
            // Regenerar sessão por segurança
            $request->session()->regenerate();

            // return redirect()->intended('/consultar-reservas')->with('success', 'Login realizado com sucesso.');
            return response()->json([
                'message' => 'Login realizado com sucesso.',
                'user' => Auth::user(),
            ]);
        } else {
            throw ValidationException::withMessages([
                'password' => 'A senha informada está incorreta.',
            ]);
        }
        // } catch (\Exception $e) {

        //     return response()->json([
        //         'message' => 'Ocorreu um erro no servidor.',
        //         'erro' => $e->getMessage()
        //     ], 500);
        // }
    }

    /**
     * Registro de novo usuário
     */
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed', // precisa de "password_confirmation"
            'password_confirmation' => ['required', 'same:password'],
        ]);

        $user = Usuario::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
        ]);


        // Login automático após registro (opcional)
        Auth::login($user);

        $request->session()->regenerate();

        return response()->json([
            'message' => 'Usuário registrado e logado com sucesso.',
            'user' => $user,
        ], 201);
    }
    /**
     * Logout e destruição da sessão
     */
    public function logout(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'Logout realizado com sucesso.',
        ]);
    }
}
