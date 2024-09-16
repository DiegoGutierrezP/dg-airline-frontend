export interface RegisterBookingRequest {
    flightId: string;  // ID del vuelo, podrías ajustar el tipo si es number
    numberOfSeats: number;
    customerName: string;
    totalPrice: number;
    cardNumber: string;
}