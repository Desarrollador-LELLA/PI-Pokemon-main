import React from 'react';
import s from '../../css/detalle.module.css';

const Detalle = ({ detalle }) => {

    const { id, nombre, vida, ataque, defenza, velocidad, altura, peso, imagen, tipos } = detalle;

    const metodo = (valor, div) => {
        const ancho = (valor / 280) * 100
        if(div){
            div.setAttribute("style", `width: ${ancho.toString()}%;`);
        }
    }

    const nivelBarra = () => {
        metodo(vida, document.getElementById('vida'))
        metodo(ataque, document.getElementById('ataque'))
        metodo(defenza, document.getElementById('defenza'))
        metodo(velocidad, document.getElementById('velocidad'))
    }

    return (
        <>
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
                                <div className={s.nivel} id='vida'>
                                    <div>{vida}</div>
                                </div>
                            </div>
                        </div>
                        <div className={s.barra}>
                            <div className={s.barranombre}>Ataque</div>
                            <div className={s.barrastat}>
                                <div className={s.nivel} id='ataque'>
                                    <div>{ataque}</div>
                                </div>
                            </div>
                        </div>
                        <div className={s.barra}>
                            <div className={s.barranombre}>Defenza</div>
                            <div className={s.barrastat}>
                                <div className={s.nivel} id='defenza'>
                                    <div>{defenza}</div>
                                </div>
                            </div>
                        </div>
                        <div className={s.barra}>
                            <div className={s.barranombre}>Velocidad</div>
                            <div className={s.barrastat}>
                                <div className={s.nivel} id='velocidad'>
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
            {nivelBarra()}
        </>
    );
};

export default Detalle;