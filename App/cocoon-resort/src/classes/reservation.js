class Reservation {
    async readAll() {
        try {
            console.log("in the class");

            const response = await fetch(`http://localhost:8080/cocoon-resort/ReservationServlet?action=readAll`);
            if (response.ok) {
                const result = response.json();
                return result;
            } else {
                return 404;
            }
        } catch (e) {
            throw e;
        }
    }
}

export default Reservation;