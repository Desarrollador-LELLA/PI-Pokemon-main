import React from 'react';
import s from '../../css/detalle.module.css';

const Detalle = ({ detalle }) => {

    const { id, nombre, vida, ataque, defenza, velocidad, altura, peso, imagen, tipos } = detalle;

    const sVida = {
        width: ((vida / 280) * 100).toString() + '%'
    }

    const sAtaque = {
        width: ((ataque / 280) * 100).toString() + '%'
    }

    const sDefensa = {
        width: ((defenza / 280) * 100).toString() + '%'
    }

    const sVelocidad = {
        width: ((velocidad / 280) * 100).toString() + '%'
    }

    return (
        <div>
            <div className={s.colcero}>
                <div>{nombre}</div>
            </div>
            <div className={s.coluno}>
                <div><img className={s.imagen} src={imagen} alt={nombre} /></div>
                <div>ID: {id}</div>
            </div>
            <div className={s.colpadre}>
                <div className={s.coldos}>
                    <div className={s.estadisticas}>Estadisticas</div>
                    <div className={s.altupeso}>
                        <div>Altura: {altura}</div>
                        <div>Peso: {peso}</div>
                    </div>
                    <div className={s.grafico}>
                        <div className={s.barra}>
                            <div className={s.barranombre}>Vida</div>
                            <div className={s.barrastat}>
                                <div className={s.nivel} style={sVida} >
                                    <div>{vida}</div>
                                </div>
                            </div>
                        </div>
                        <div className={s.barra}>
                            <div className={s.barranombre}>Ataque</div>
                            <div className={s.barrastat}>
                                <div className={s.nivel} style={sAtaque} >
                                    <div>{ataque}</div>
                                </div>
                            </div>
                        </div>
                        <div className={s.barra}>
                            <div className={s.barranombre}>Defenza</div>
                            <div className={s.barrastat}>
                                <div className={s.nivel} style={sDefensa} >
                                    <div>{defenza}</div>
                                </div>
                            </div>
                        </div>
                        <div className={s.barra}>
                            <div className={s.barranombre}>Velocidad</div>
                            <div className={s.barrastat}>
                                <div className={s.nivel} style={sVelocidad} >
                                    <div>{velocidad}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={s.coltres}>
                    <div className={s.tipos}>Tipos</div>
                    <div className={s.tiposoption}>
                        {
                            tipos?.map(x => {
                                return <div key={x}>{x}</div>;
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detalle;