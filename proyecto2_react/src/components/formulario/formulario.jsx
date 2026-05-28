//Para poder cumplir con los requisitos tendríamos que crear un formulario para el usuario,este formulario será un feedback del portafolio
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './formulario.css';

const Formulario = () => {  
    //En este formulario vamos a usar un UseRef para obtener los datos del formulario,ya que estos no se van a renderizar sino,que solo van a aparecer en una librería local
     const nameFeed=useRef();//Para guardar el valor del nameFeed,useRef se usa principalmente para poder tener acceso a la lógica del formulario,sin renderizar el componente cada vez que se cambie el valor del nameFeed,ya que esto no es necesario,ya que solo queremos guardar el nameFeed en la localstorage y mostrarlo en un modal,es decir que useRef actua desde dentro
    const feedbackRef = useRef();//Para guardar el valor del feedback,useRef se usa principalmente para poder tener acceso a la lógica del formulario,sin renderizar el componente cada vez que se cambie el valor del feedback,ya que esto no es necesario,ya que solo queremos guardar el feedback en la localstorage y mostrarlo en un modal
    //Es decir que useRef actua desde dentro
    const [feedbacks, setFeedbacks] = useState([]);//Para guardar los feedbacks en un estado
    const [showModal, setShowModal] = useState(false);//Para mostrar el modal con los feedbacks guardados en la localstorage
    useEffect(() => {
        const storedFeedbacks = JSON.parse(localStorage.getItem("feedbacks") || "[]");
        if (Array.isArray(storedFeedbacks)) {
            setFeedbacks(storedFeedbacks);
            //Guardamos los feedbacks en array para poder mostrarlos en el modal,ya que la localstorage solo guarda strings,por eso tenemos que convertirlo a un array para poder mostrarlo en el modal
            //Y esto es para que el
        }
    }, []);

    //Definimos también el estado del modal para mostrar los feedbacks guardados en la localstorage
    const handleSubmit =(e)=>{
        e.preventDefault();//Para evitar que se recargue la página
        const name = nameFeed.current.value;//Obtenemos el valor del nameFeed,se puede usar para darle un valor al nameFeed,ya que el useRef nos da acceso a la lógica del formulario,pero no renderiza el componente cada vez que se cambie el valor del nameFeed,ya que esto no es necesario,ya que solo queremos guardar el nameFeed en la localstorage y mostrarlo en un modal
        const feedback = feedbackRef.current.value;//Obtenemos el valor del feedback,se puede usar para darle un valor al feedback,ya que el useRef nos da acceso a la lógica del formulario,pero no renderiza el componente cada vez que se cambie el valor del feedback,ya que esto no es necesario,ya que solo queremos guardar el feedback en la localstorage y mostrarlo en un modal
        if(feedback.trim()!==""){//Si el feedback no está vacío
            setFeedbacks((prevFeedbacks) => {
                const updatedFeedbacks = [...prevFeedbacks, { name, feedback }];
                //Una vez que hayamos terminado con la lógica del formulario,vamos a guardarlo en la localstorage
                localStorage.setItem("feedbacks", JSON.stringify(updatedFeedbacks));//Guardamos el feedback en la localstorage
                return updatedFeedbacks;
            });//Agregamos el feedback al estado
            feedbackRef.current.value="";//Limpiamos el formulario
            nameFeed.current.value="";//Limpiamos el nombre

        }
    }
    //Una vez terminado con la lógica,vamos a crear un modal para mostrar los feedbacks guardados en la localstorage
     const handleShowModal=()=>{
        setShowModal(true);//Mostramos el modal

     }
        const handleCloseModal=()=>{
        setShowModal(false);//Cerramos el modal

     }
     //Una vez que hayamos definido esta lógica,vamos a crear el modal para mostrar los feedbacks guardados en la localstorage
     return (
        <div className='formulario-container'>
            <h2>Deja tu opinión, nos importa mucho</h2>
            <form onSubmit={handleSubmit}>
                <input ref={nameFeed} type='text' placeholder='Escribe tu nombre aquí...'/>
                <textarea ref={feedbackRef} placeholder='Escribe tu feedback aquí...'></textarea>
                <button type='submit'>Enviar</button>
            </form>
            <button type='button' onClick={handleShowModal}>Ver feedbacks guardados</button>
            {showModal && createPortal(
                <div className='modal' role='dialog' aria-modal='true' aria-label='Feedbacks guardados'>
                    <div className='modal-content'>
                        <h3>Feedbacks guardados</h3>
                        <ul>
                            {feedbacks.map((fb,index)=>(
                                <li key={index}><strong>{fb.name}:</strong> {fb.feedback}</li>
                                //Aquí nos van a mostrar todos los feedbacks guardados en la localStorage
                         
                            ))}
                            {feedbacks.length === 0 && <li>No hay feedbacks guardados</li>}
                        </ul>
                        <button type='button' onClick={handleCloseModal}>Cerrar</button>
                    </div>
                </div>
            , document.body)}
        </div>
     )
}
export default Formulario;