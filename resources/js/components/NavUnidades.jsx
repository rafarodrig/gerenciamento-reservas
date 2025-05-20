import React from 'react';

export default function UnidadeNav({ unidades=2, unidade, url, onNavigate }) {
    return (
        <ul className="nav nav-pills mt-2">
            {Array.from({ length: unidades }, (_, i) => {
                const e = i + 1;
                const isActive = e === unidade;

                return (
                    <li className="nav-item" key={e}>
                        <button
                            className={`nav-link ${isActive ? 'active' : 'unidade-link'}`}
                            id={isActive ? 'unidade-atual' : undefined}
                            onClick={() => onNavigate(`${url}&unidade=${e}`)}
                        >
                            Unidade {e}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}