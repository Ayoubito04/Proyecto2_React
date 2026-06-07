import React, { useRef } from 'react';
import { useFeedback } from '../../context/FormularioContext';
import './formulario.css';

const Formulario = () => {
    const nameFeed = useRef();
    const feedbackRef = useRef();
    const satisfactionRef = useRef();

    const { addFeedback } = useFeedback();

    const handleSubmit = (e) => {
        e.preventDefault();

        const name = nameFeed.current.value || "Usuario Anónimo";
        const feedback = feedbackRef.current.value;
        const satisfaction = satisfactionRef.current.value;

        if (feedback.trim() !== "") {
            addFeedback(name, feedback, satisfaction);

            feedbackRef.current.value = "";
            nameFeed.current.value = "";
            satisfactionRef.current.value = "5";
        }
    };

    return (
        <div className='formulario-container' id='formulario'>
            <h2>Deja tu opinión, nos importa mucho</h2>
            <form onSubmit={handleSubmit}>
                <input ref={nameFeed} type='text' placeholder='Escribe tu nombre aquí...' />
                <textarea ref={feedbackRef} placeholder='Escribe tu feedback aquí...'></textarea>

                <label className='satisfaction-field'>
                    <span>Satisfacción con el servicio</span>
                    <select ref={satisfactionRef} defaultValue='5'>
                        <option value='1'>1 - Muy baja</option>
                        <option value='2'>2 - Baja</option>
                        <option value='3'>3 - Media</option>
                        <option value='4'>4 - Alta</option>
                        <option value='5'>5 - Excelente</option>
                    </select>
                </label>

                <button type='submit'>Enviar</button>
            </form>
        </div>
    );
};

export default Formulario;
