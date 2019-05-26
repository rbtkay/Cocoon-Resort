import jwt from 'jsonwebtoken';
class Reservation {

    constructor() {
        const token = localStorage.getItem("auth");
        const id = localStorage.getItem("id");

        const decoded = jwt.decode(token);
        if (decoded.jti !== id) {
            localStorage.clear();
            window.location = '/welcome'
        }
    }

    async readAllByResort(id) {
        const token = localStorage.getItem('auth');

        try {
            const response = await fetch(`http://localhost:8080/cocoon-resort/ReservationServlet?action=readAllByResort&id=${id}&token=${token}`);
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

    async create(packId, resortId, quantity) {
        const token = localStorage.getItem('auth');

        try {
            const id = localStorage.getItem("id");
            const response = await fetch(`http://localhost:8080/cocoon-resort/ReservationServlet?action=create&id=${id}&packId=${packId}&resortId=${resortId}&quantity=${quantity}&token=${token}`);
            if (response.status === 200) {
                return true;
            } else {
                return false;
            }
        } catch (e) {
            throw e;
        }
    }

    async readAllByCustomer(id) {
        const token = localStorage.getItem('auth');
        try {
            const response = await fetch(`http://localhost:8080/cocoon-resort/ReservationServlet?action=readByCustomer&id=${id}&token=${token}`);
            if (response.status === 200) {
                const result = response.json();
                return result;
            } else if (response.status === 401) {
                return 401
            } else {
                return null;
            }
        } catch (e) {
            throw e;
        }
    }

    async cancel(reservationId, packId, quantity) {
        const token = localStorage.getItem('auth');
        try {
            const id = localStorage.getItem("id");
            const response = await fetch(`http://localhost:8080/cocoon-resort/ReservationServlet?action=cancel&id=${id}&reservationId=${reservationId}&packId=${packId}&quantity=${quantity}&token=${token}`)
            if (response.status === 200) {
                return true;
            } else {
                return false;
            }
        } catch (e) {
            throw e;
        }
    }
}

export default Reservation;
