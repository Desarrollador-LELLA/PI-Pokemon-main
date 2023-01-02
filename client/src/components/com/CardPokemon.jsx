import React from 'react';
import s from '../../css/cardpokemon.module.css';
import { useNavigate } from 'react-router-dom';

const CardPokemon = ({ nombre, imagen, tipos, id, col }) => {

    const navegar = useNavigate();

    const onClick = () => {
        navegar(`/pokemons/detalle/${id}`)
    }

    return (
        <div className={col}>
            <div className={s.card} onClick={onClick} >
                <div>{nombre}</div>
                <img src={imagen} alt={nombre} width='107px' height='107px' />
                <div className={s.tipos}>
                    {
                        tipos.map(x => <div key={x} className={s.tipo}>{x}</div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default CardPokemon;