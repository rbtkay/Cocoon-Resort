class Auth {

    async signUp(state) {
        const { firstName, lastName, email, password, phone } = state;
        const name = firstName + ' ' + lastName;
        try {
            const response = await fetch(`http://localhost:8080/cocoon-resort/ClientServlet?action=create&name=${name}&email=${email}&password=${password}&phone=${phone}`);

            if (response.status === 201) {
                // const result = await response.json();

                // const jwt = result[0].jwt;
                // const email = result[0].email;
                // const name = result[0].name;
                // localStorage.setItem("auth", jwt);
                // localStorage.setItem("email", email);
                // localStorage.setItem("name", name);

                return true;
            } else {
                return false;
            }
        } catch (e) {
            throw e;
        }
    }

    async updateUser(id, password, phone) {
        try {
            const response = await fetch(`http://localhost:8080/cocoon-resort/ClientServlet?action=update&id=${id}&password=${password}&phone=${phone}`);

            if (response.ok) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            throw err;
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

    async authResort(resortName, password) {
        try {
            const response = await fetch(`http://localhost:8080/cocoon-resort/ResortServlet?action=login&resortName=${resortName}&password=${password}`);

            if (response.status === 200) {
                const res = await response.json();
                return res;
            } else {
                return 404;
            }
        } catch (err) {
            throw err;
        }
    }

    async fetchOne(id) {
        try {
            const response = await fetch(`http://localhost:8080/cocoon-resort/ClientServlet?action=fetchOne&id=${id}`);

            if (response.ok) {
                const res = await response.json();
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

    async verifyClient(token) {
        try {
            const response = await fetch(`http://localhost:8080/cocoon-resort/AuthServlet?action=verifyClient&token=${token}`); //TODO: put the right api

            if (response.status === 200) {
                return true;
            } else {
                return false;
            }
        } catch (e) {
            throw e;
        }
    }

    async deleteUser(id) {
        try {
            const response = await fetch(`http://localhost:8080/cocoon-resort/ClientServlet?action=delete&id=${id}`);

            if (response.ok) {
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
