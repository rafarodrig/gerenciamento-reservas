<!DOCTYPE html>
<html lang="pt-br">
<head>
    <title>{{$title ?? "Gerenciar Reservas";}}</title>  
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    @vite(['resources/css/app.css', 'resources/js/app.js','resources/scss/app.scss'])

    

</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item"><x-nav-link href="/" :active="request()->is('gerenciamento-salas')">Consultar Reservas</x-nav-link></li>
                    <li class="nav-item"><x-nav-link href="/cadastrar-reservas" :active="request()->is('cadastrar-reservas')">Cadastrar Reservas</x-nav-link></li>
                    <li class="nav-item"><x-nav-link href="/gerenciar-salas" :active="request()->is('gerenciar-salas')">Gerenciar Salas</x-nav-link></li>
                </ul>
            </div>
        </div>
    </nav>
    {{ $slot }}

</body>

</html>