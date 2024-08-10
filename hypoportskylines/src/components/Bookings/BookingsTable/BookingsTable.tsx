import "./bookingsTable.css";

import { formatDateForDisplay } from "../../../utils/formatDate";

type Airports = {
    id: number,
    code: string,
    title: string,
}

type BookingsItem = {
    id: number;
    firstName: string;
    lastName: string;
    departureAirportId: number;
    arrivalAirportId: number;
    departureDate: string;
    returnDate: string;
}

type BookingsList = {
    list: BookingsItem[];
    totalCount: string;
}

type BookingTableProps = {
    onDelete: (id: number) => void;
    airports: Airports[];
    bookings: BookingsList['list'];
}

export const BookingsTable = ({ bookings, onDelete, airports }: BookingTableProps) => {
    const getAirportTitle = (airportId: number) => {
        const airport = airports.find(airport => airport.id === airportId);
        return airport ? airport.title : "Unknown Airport";
    };

    return (
        <table className="bookings-list">
            <thead>
                <tr>
                    <th>Guest</th>
                    <th>Departure Airport</th>
                    <th>Destination Airport</th>
                    <th>Departure Date</th>
                    <th>Date of Return</th>
                    <th>Options</th>
                </tr>
            </thead>
            <tbody>
                {bookings?.map(booking => (
                    <tr key={booking.id}>
                        <td>{booking.firstName} {booking.lastName}</td>
                        <td>{getAirportTitle(booking.departureAirportId)}</td>
                        <td>{getAirportTitle(booking.arrivalAirportId)}</td>
                        <td>{formatDateForDisplay(booking.departureDate)}</td>
                        <td>{formatDateForDisplay(booking.returnDate)}</td>
                        <td>
                            <button
                                className="bookings-list-del-btn"
                                onClick={() => onDelete(booking.id)}
                            >
                                <i className="fa-solid fa-trash-can"></i>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}