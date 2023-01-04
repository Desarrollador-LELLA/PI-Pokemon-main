import React from 'react';
import s from '../../css/cardpokemon.module.css';
import { useNavigate } from 'react-router-dom';
import Boton from '../com/Boton';
import iconoDelete from '../imagenes/ic_delete.svg';
import iconoEdit from '../imagenes/ic_edit.svg';
import { useDispatch } from 'react-redux';
import { deletePokemon } from '../../redux/actions/pokemonsAction';

const CardPokemon = ({ nombre, imagen, tipos, id, col, act }) => {

    const navegar = useNavigate();
    const dispatch = useDispatch();

    const onClick = () => {
        navegar(`/pokemons/detalle/${id}`);
    };

    const onClickDel = () => {
        dispatch(deletePokemon(id))
    };

    const onClickEdi = () => {
        alert("Editar");
    };

    return (
        <div className={col}>
            <div className={s.card} /*onClick={onClick}¨*/ >
                <div className={s.agoclick} onClick={onClick}>

                    <div>{nombre}</div>
                    <img src={imagen} alt={nombre} width='107px' height='107px' />
                    <div className={s.tipos}>
                        {
                            tipos?.map(x => <div key={x} className={s.tipo}>{x}</div>)
                        }
                    </div>
                </div>
                {
                    act ? null : 
                    (/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(id)) &&
                    <div className={s.contenedorbotones}>
                        <div>
                            {/* <Boton icono={iconoEdit} alt='Editar' onClick={onClickEdi} /> */}
                        </div>
                        <div>
                            <Boton icono={iconoDelete} alt='Eliminar' onClick={onClickDel} />
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default CardPokemon;