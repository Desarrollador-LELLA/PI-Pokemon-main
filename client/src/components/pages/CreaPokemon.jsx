import React, { useState, useEffect } from 'react';
import s from '../../css/crear.module.css';
import CajaTexto from '../com/CajaTexto';
import Boton from '../com/Boton';
import iconoGuardar from '../imagenes/ic_disk.svg';
import { useSelector, useDispatch } from 'react-redux';
import CheckBox from '../com/CheckBox';
import { setErrorTipos, getListTipos, setLoadingTipos } from '../../redux/actions/tiposAction';
import { createPokemon, setBuscarPokemon } from '../../redux/actions/pokemonsAction';
import { setMensajes } from '../../redux/actions/mensajesAction';
import CardPokemon from '../com/CardPokemon';

const initialState = {
    nombre: '',
    altura: '',
    peso: '',
    vida: '',
    defenza: '',
    ataque: '',
    velocidad: '',
    imagen: '',
    tipos: [],
};

const validarPokemon = ({ nombre, altura, peso, vida, defenza, ataque, velocidad, imagen, tipos }) => {
    const obj = {};
    if (nombre.toString().trim().length === 0) {
        obj.nombre = 'El Nombre esta Vacio';
    } else if(Number(nombre)) {
        obj.nombre = 'El Nombre No Pueden ser solo Numeros';
    }
    if (altura.toString().trim().length === 0) {
        obj.altura = 'La Altura esta Vacia';
    } else if (typeof altura === 'number') {
        obj.altura = 'La Altura No es un Numero';
    } else if (altura < 0 || altura > 280) {
        obj.altura = 'La Altura solo puede estar entre 0 a 280';
    }

    if (peso.toString().trim().length === 0) {
        obj.peso = 'El Peso esta Vacio';
    } else if (typeof peso === 'number') {
        obj.peso = 'El Peso No es un Numero';
    } else if (peso < 0 || peso > 280) {
        obj.peso = 'El Peso solo puede estar entre 0 a 280';
    }

    if (vida.toString().trim().length === 0) {
        obj.vida = 'La Vida esta Vacia';
    } else if (typeof vida === 'number') {
        obj.vida = 'La Vida No es un Numero';
    } else if (vida < 0 || vida > 280) {
        obj.vida = 'La Vida solo puede estar entre 0 a 280';
    }

    if (defenza.toString().trim().length === 0) {
        obj.defenza = 'La Defensa esta Vacia';
    } else if (typeof defenza === 'number') {
        obj.defenza = 'La Defenza No es un Numero';
    } else if (defenza < 0 || defenza > 280) {
        obj.defenza = 'La Defensa solo puede estar entre 0 a 280';
    }

    if (ataque.toString().trim().length === 0) {
        obj.ataque = 'El Ataque esta Vacio';
    } else if (typeof ataque === 'number') {
        obj.ataque = 'El Ataque No es un Numero';
    } else if (ataque < 0 || ataque > 280) {
        obj.ataque = 'El Ataque solo puede estar entre 0 a 280';
    }

    if (velocidad.toString().trim().length === 0) {
        obj.velocidad = 'La Velocidad esta Vacia';
    } else if (typeof velocidad === 'number') {
        obj.velocidad = 'La Velocidad No es un Numero';
    } else if (velocidad < 0 || velocidad > 280) {
        obj.velocidad = 'La Velocidad solo puede estar entre 0 a 280';
    }

    if (imagen.toString().trim().length === 0) {
        obj.imagen = 'La Imagen esta Vacia';
    } else if (!/^https?:\/\/[\w]+(\.[\w]+)+[/#?]?.*$/.test(imagen)) {
        obj.imagen = 'La Url de la Imagen no es Valida';
    }

    if (tipos.length === 0) {
        obj.tipos = 'Debe seleccionar entre 1 a 4 tipos';
    }

    return obj;
};

const CreaPokemon = () => {

    const { listTipos, errorTipos, loadingTipos } = useSelector(state => state.tipos);
    const { buscarPokermon } = useSelector(state => state.pokemons);
    const [pokemon, setPokemon] = useState(initialState);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            if (errorTipos) {
                dispatch(setErrorTipos(''));
            }
        };
    }, [errorTipos, dispatch]);

    useEffect(() => {
        dispatch(setMensajes('Bienvenido a Crear Tu Pokemon'))
        dispatch(setLoadingTipos(true));
        dispatch(getListTipos());
        return () =>{
            if (buscarPokermon) {
                dispatch(setBuscarPokemon());
            }
        }
    }, [dispatch]);

    const onChange = (e) => {
        setPokemon({
            ...pokemon,
            [e.target.name]: e.target.value
        });

        setErrors(
            validarPokemon({
                ...pokemon,
                [e.target.name]: e.target.value
            })
        );
    };

    const onBlur = (e) => {
        setErrors(
            validarPokemon({
                ...pokemon,
                [e.target.name]: e.target.value
            })
        );
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const noErrors = Object.keys(errors).length === 0;
        if (noErrors) {
            dispatch(createPokemon(pokemon));
        } else {
            dispatch(setMensajes('Reviza El Formulario tienes datos sin Rellenar'))
        }
    };

    const onClickTipo = (e) => {
        const nom = e.target.innerText;
        if (pokemon.tipos.length === 4) {
            if (!pokemon.tipos.includes(nom)) {
                return;
            }
        };
        if (pokemon.tipos.includes(nom)) {
            setPokemon({
                ...pokemon,
                tipos: pokemon.tipos.filter(x => x !== nom)
            });

            setErrors(
                validarPokemon({
                    ...pokemon,
                    tipos: pokemon.tipos.filter(x => x !== nom)
                })
            );
        } else {
            setPokemon({
                ...pokemon,
                tipos: [...pokemon.tipos, nom]
            });

            setErrors(
                validarPokemon({
                    ...pokemon,
                    tipos: [...pokemon.tipos, nom]
                })
            );
        }
    };

    return (
        <>
            {
                buscarPokermon.confirmation ?
                    <div className={s.contenedorcreado}>
                        <CardPokemon nombre={buscarPokermon.result.nombre} imagen={buscarPokermon.result.imagen} tipos={buscarPokermon.result.tipos} id={buscarPokermon.result.id} col={s.creadocards} act={true} />
                    </div>
                    :
                    <div className={s.contenedorcrear}>
                        <div className={s.titulo}>Crear Pokemon</div>
                        <form onSubmit={onSubmit}>
                            <div className={s.col}>
                                <CajaTexto texto={'Nombre'} textVal={errors.nombre} propsInput={{ type: 'text', name: 'nombre', value: pokemon.nombre, onChange: onChange, onBlur: onBlur, placeholder: 'Nombre del Pokemon', autoFocus: true }} />
                            </div>
                            <div className={s.col}>
                                <CajaTexto texto={'Altura'} textVal={errors.altura} propsInput={{ type: 'number', name: 'altura', value: pokemon.altura, onChange: onChange, onBlur: onBlur, placeholder: '0 a 280' }} />
                                <CajaTexto texto={'Peso'} textVal={errors.peso} propsInput={{ type: 'number', name: 'peso', value: pokemon.peso, onChange: onChange, onBlur: onBlur, placeholder: '0 a 280' }} />
                            </div>
                            <div className={s.col}>
                                <CajaTexto texto={'Vida'} textVal={errors.vida} propsInput={{ type: 'number', name: 'vida', value: pokemon.vida, onChange: onChange, onBlur: onBlur, placeholder: '0 a 280' }} />
                                <CajaTexto texto={'Defensa'} textVal={errors.defenza} propsInput={{ type: 'number', name: 'defenza', value: pokemon.defenza, onChange: onChange, onBlur: onBlur, placeholder: '0 a 280' }} />
                            </div>
                            <div className={s.col}>
                                <CajaTexto texto={'Ataque'} textVal={errors.ataque} propsInput={{ type: 'number', name: 'ataque', value: pokemon.ataque, onChange: onChange, onBlur: onBlur, placeholder: '0 a 280' }} />
                                <CajaTexto texto={'Velocidad'} textVal={errors.velocidad} propsInput={{ type: 'number', name: 'velocidad', value: pokemon.velocidad, onChange: onChange, onBlur: onBlur, placeholder: '0 a 280' }} />
                            </div>
                            <div className={s.imagen}>
                                <CajaTexto texto={'Imagen'} textVal={errors.imagen} propsInput={{ type: 'text', name: 'imagen', value: pokemon.imagen, onChange: onChange, onBlur: onBlur, placeholder: 'http://imagen.jpg o https://imagen.png' }} />
                            </div>
                            <div className={s.tipos}>
                                <div className={s.subtitulo}>Seleccion de Tipos Max 4</div>
                                <div className={s.seleciontipos}>
                                    {errors.tipos && <span className={s.toolTips}>{errors.tipos}</span>}
                                    {
                                        loadingTipos ? <div>Cargando...</div> :
                                            listTipos.map(x => <div className={s.seleciontiposijos} key={x.id} >
                                                <CheckBox texto={x.nombre} gatillo={pokemon.tipos.includes(x.nombre)} estado={(pokemon.tipos.length >= 4) ? pokemon.tipos.includes(x.nombre) : true} propsDivCont={{ onClick: onClickTipo }} />
                                            </div>)
                                    }
                                </div>
                            </div>
                            <Boton type='submit' texto={'Guardar'} icono={iconoGuardar} alt='Guardar' />
                        </form>
                    </div>
            }
        </>
    );
};

export default CreaPokemon;