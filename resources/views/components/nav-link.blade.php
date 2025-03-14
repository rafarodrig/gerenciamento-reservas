@props(['active' => false])

<a class="{{ $active ? 'nav-link active' : 'nav-link' }}" aria-current="{{ $active ? 'page': 'false' }}"{{ $attributes }}>{{$slot}}</a>