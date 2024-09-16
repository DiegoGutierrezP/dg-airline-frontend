export interface Flight {
    _id: string,
    id: string,
    origin: string;
    destination: string;
    departureDate: Date;
    arrivalDate: Date;
    flightNumber: string;
    price: number;
    totalSeats: number;
    availableSeats: number;
    status: number

}