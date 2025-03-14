<ul class="nav nav-pills mt-2">
    @for ($e = 1; $e <= $unidades ; $e++)
        @if ($e == $unidade)
        <li class="nav-item"><button class="nav-link active"  id="unidade-atual"> Unidade {{ $e }} </button></li>
            @else
            <li class="nav-item"><button class="nav-link unidade-link" href="{{ $url . "&unidade=$e" }}"> Unidade {{ $e }}</button></li>
        @endif
    @endfor
</ul>