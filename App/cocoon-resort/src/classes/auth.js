class Auth {

    async signUp(state) {
        const { firstName, lastName, email, password, phone } = state;
        const name = firstName + ' ' + lastName;
        try {
            const response = await fetch(`http://localhost:8080/cocoon-resort/ClientServlet?action=create&name=${name}&email=${email}&password=${password}&phone=${phone}`);

            if (response.status === 201) {
                return true;
            } else {
                return false;
            }
        } catch (e) {
            throw e;
        }
    }

    async authUser(email, password) {
        try {
            const response = await fetch(`http://localhost:8080/cocoon-resort/ClientServlet?action=login&email=${email}&password=${password}`);

            if (response.status === 200) {
                const res = await response.json();

                console.log(res)
                return res;
            } else {
                return 404;
            }
        } catch (err) {
            throw err;
        }
    }

    async logoutUser() {
        try {
            const response = await fetch(`http://localhost:8080/cocoon-resort/ClientServlet?action=logout`);

            if (response.status === 200) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            throw err;
        }
    }
}
export default Auth;
