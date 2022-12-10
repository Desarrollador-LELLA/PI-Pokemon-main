import React from 'react';
import s from '../../css/cardpokemon.module.css';

const CardPokemon = ({ nombre, imagen, tipos }) => {
    console.log(nombre);
    return (
        <div className={s.col}>
            <div className={s.card}>
                <div>{nombre}</div>
                <img src={imagen} alt={nombre} width='107px' height='107px' />
                <div className={s.tipos}>
                    {
                        tipos.map(x => <div className={s.tipo}>{x}</div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default CardPokemon;