import React from 'react';
import { useFeedback } from '../../context/FormularioContext';
import './review.css';

const Review = () => {
    const { feedbacks } = useFeedback();

    const renderStars = (value) => {
        const rating = Number(value);

        if (!rating) {
            return 'Sin valorar';
        }

        return `${'★'.repeat(rating)}${'☆'.repeat(5 - rating)} ${rating}/5`;
    };

    return (
        <div className='review-container' id='review'>
            <h2>Opiniones de los usuarios</h2>
            <div className='review-list'>
                {feedbacks.length === 0 ? (
                    <p className='review-empty'>No hay opiniones aún. ¡Sé el primero en dejar la tuya desde la página de Contacto!</p>
                ) : (
                    feedbacks.map((feedback, index) => (
                        <div
                            key={index}
                            className='review-item'
                            data-initial={(feedback.name?.[0] ?? '?').toUpperCase()}
                        >
                            <h3>{feedback.name || 'Anónimo'}</h3>
                            <p className='review-satisfaction'>{renderStars(feedback.satisfaction)}</p>
                            <p>{feedback.feedback}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Review;
