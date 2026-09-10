import React from 'react';
import { useFeedback } from '../../context/FormularioContext';
import './review.css';

// Criterio de "destacada": a partir de cuantas estrellas entra una opinion y
// cuantas se enseñan como maximo. Se tocan aqui y afecta a toda la seccion.
const MINIMO_DESTACADA = 4;
const MAXIMO_DESTACADAS = 6;

// Cada avatar coge un tono distinto a partir del nombre, pero siempre dentro
// de la gama cálida de la marca (rojo -> naranja), para que varíen entre sí
// sin salirse de la paleta del portal.
const hueFromName = (name) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return (Math.abs(hash) % 46) - 6; // -6..39 grados
};

const Stars = ({ rating }) => (
    <span className='review-stars' aria-label={`${rating} de 5`}>
        {[1, 2, 3, 4, 5].map((star) => (
            <span
                key={star}
                aria-hidden='true'
                className={star <= rating ? 'review-star review-star--on' : 'review-star'}
            >
                ★
            </span>
        ))}
    </span>
);

const Review = () => {
    const { feedbacks } = useFeedback();

    const total = feedbacks.length;
    // La media se calcula sobre TODAS las opiniones, no solo sobre las que se
    // enseñan: si no, el resumen diría siempre un 4,5 largo y no valdría nada.
    const media = total
        ? feedbacks.reduce((suma, item) => suma + (Number(item.satisfaction) || 0), 0) / total
        : 0;

    // Guardamos el indice original para poder desempatar: a igual nota, primero
    // la mas reciente (las nuevas se añaden al final del array).
    const destacadas = feedbacks
        .map((item, indice) => ({ ...item, indice, rating: Number(item.satisfaction) || 0 }))
        .filter((item) => item.rating >= MINIMO_DESTACADA)
        .sort((a, b) => b.rating - a.rating || b.indice - a.indice)
        .slice(0, MAXIMO_DESTACADAS);

    return (
        <section className='review-container' id='review'>
            <header className='review-header'>
                <div className='review-heading'>
                    <span className='eyebrow'>La comunidad</span>
                    <h2>
                        Opiniones destacadas
                        <span className='review-badge'>{MINIMO_DESTACADA}★ o más</span>
                    </h2>
                </div>

                {/* Resumen: solo tiene sentido cuando ya hay alguna opinión */}
                {total > 0 && (
                    <div className='review-summary'>
                        <span className='review-average'>{media.toFixed(1)}</span>
                        <span className='review-summary-meta'>
                            <Stars rating={Math.round(media)} />
                            <span className='review-count'>
                                {total} {total === 1 ? 'opinión' : 'opiniones'} en total
                            </span>
                        </span>
                    </div>
                )}
            </header>

            <div className='review-list'>
                {total === 0 && (
                    <div className='review-empty'>
                        <span className='review-empty-icon' aria-hidden='true'>
                            <svg viewBox='0 0 24 24' focusable='false'>
                                <path
                                    d='M21 12a8 8 0 0 1-8 8H7l-4 3v-4.5A8 8 0 0 1 11 4h2a8 8 0 0 1 8 8Z'
                                    fill='none'
                                    stroke='currentColor'
                                    strokeWidth='1.6'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                />
                            </svg>
                        </span>
                        <p className='review-empty-title'>Todavía no hay opiniones</p>
                        <p className='review-empty-text'>
                            Sé el primero en dejar la tuya desde el formulario.
                        </p>
                    </div>
                )}

                {/* Hay opiniones, pero ninguna llega al corte */}
                {total > 0 && destacadas.length === 0 && (
                    <div className='review-empty'>
                        <span className='review-empty-icon' aria-hidden='true'>
                            <svg viewBox='0 0 24 24' focusable='false'>
                                <path
                                    d='m12 3.5 2.6 5.4 5.9.8-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9L3.5 9.7l5.9-.8L12 3.5Z'
                                    fill='none'
                                    stroke='currentColor'
                                    strokeWidth='1.6'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                />
                            </svg>
                        </span>
                        <p className='review-empty-title'>Aún no hay opiniones destacadas</p>
                        <p className='review-empty-text'>
                            Aquí solo aparecen las valoradas con {MINIMO_DESTACADA} estrellas o
                            más. De momento no hay ninguna.
                        </p>
                    </div>
                )}

                {destacadas.map((feedback) => {
                    const nombre = feedback.name || 'Anónimo';

                    return (
                        <article
                            key={feedback.indice}
                            className={`review-item${feedback.rating === 5 ? ' review-item--top' : ''}`}
                            style={{ '--avatar-hue': `${hueFromName(nombre)}deg` }}
                        >
                            <span className='review-quote' aria-hidden='true'>
                                &ldquo;
                            </span>

                            <p className='review-text'>{feedback.feedback}</p>

                            <footer className='review-author'>
                                <span className='review-avatar' aria-hidden='true'>
                                    {nombre.charAt(0).toUpperCase()}
                                </span>
                                <span className='review-author-meta'>
                                    <span className='review-name'>{nombre}</span>
                                    <Stars rating={feedback.rating} />
                                </span>
                            </footer>
                        </article>
                    );
                })}
            </div>

            {/* Se avisa de que la lista está filtrada, para no dar a entender
                que esas son todas las opiniones que hay */}
            {destacadas.length > 0 && destacadas.length < total && (
                <p className='review-note'>
                    Mostrando {destacadas.length}{' '}
                    {destacadas.length === 1 ? 'opinión destacada' : 'opiniones destacadas'} de{' '}
                    {total}.
                </p>
            )}
        </section>
    );
};

export default Review;
