class Reservation {
    async readAll() {
        try {

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

    async create(packId, clientId, resortId, quantity) {
        try {
            const response = await fetch(`http://localhost:8080/cocoon-resort/ReservationServlet?action=create&packId=${packId}&clientId=${clientId}&resortId=${resortId}&quantity=${quantity}`);
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
        try {
            const response = await fetch(`http://localhost:8080/cocoon-resort/ReservationServlet?action=readByCustomer&id=${id}`);
            if (response.status === 200) {
                const result = response.json();
                return result;
            } else {
                return null;
            }
        } catch (e) {
            throw e;
        }
    }

    async cancel(id, packId, quantity) {
        try {
            const response = await fetch(`http://localhost:8080/cocoon-resort/ReservationServlet?action=cancel&id=${id}&packId=${packId}&quantity=${quantity}&`)
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
