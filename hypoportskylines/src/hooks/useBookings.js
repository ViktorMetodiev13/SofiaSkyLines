import { useState, useEffect } from "react";
import { getAllBookings, createBooking, deleteBooking } from "../services/bookingService";

export const useBookings = () => {
    const [bookings, setBookings] = useState({
        list: [],
        count: 0
    });
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setLoading(true);
                const result = await getAllBookings(page);
                setBookings(prev => ({
                    list: page === 0 ? result.list : [...prev.list, ...result.list],
                    count: result.count
                }));
            } catch (error) {
                console.error('Error fetching bookings:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [page]);

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
            setPage(prev => prev + 1);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const addBooking = async (bookingModel) => {
        try {
            const newBooking = await createBooking(bookingModel);
            setBookings(prevState => ({
                list: [...prevState.list, newBooking],
                count: prevState.count + 1,
            }));
        } catch (error) {
            console.error('Error creating booking:', error);
        }
    };

    const removeBooking = async (id) => {
        try {
            await deleteBooking(id);
            setBookings(prevState => ({
                list: prevState.list.filter(booking => booking.id !== id),
                count: prevState.count - 1,
            }));
        } catch (error) {
            console.error('Error deleting booking:', error);
        }
    };

    return { bookings, addBooking, removeBooking, loading };
};