// Contexto para guardar y compartir las opiniones de los usuarios.
import { createContext, useState, useEffect, useContext } from "react";

export const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        const storedFeedbacks = JSON.parse(localStorage.getItem("feedbacks") || "[]");
        if (Array.isArray(storedFeedbacks)) {
            setFeedbacks(storedFeedbacks);
        }
    }, []);

    const addFeedback = (name, feedback, satisfaction) => {
        const newFeedback = {
            name,
            feedback,
            satisfaction,
        };

        setFeedbacks((prevFeedbacks) => {
            const updatedFeedbacks = [...prevFeedbacks, newFeedback];
            localStorage.setItem("feedbacks", JSON.stringify(updatedFeedbacks));
            return updatedFeedbacks;
        });
    };

    return (
        <FeedbackContext.Provider value={{ feedbacks, addFeedback }}>
            {children}
        </FeedbackContext.Provider>
    );
};

export const useFeedback = () => {
    const context = useContext(FeedbackContext);
    if (!context) {
        throw new Error("useFeedback debe ser usado dentro de un FeedbackProvider");
    }
    return context;
};
