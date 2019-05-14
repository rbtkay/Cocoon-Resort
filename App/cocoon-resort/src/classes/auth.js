class Auth {

    async signUp(state) {
        const { firstName, lastName, email, password, phone } = state;
        const name = firstName + ' ' + lastName;
        try {
            const response = await fetch(`http://localhost:8080/cocoon-resort/ClientServlet?action=create&name=${name}&email=${email}&password=${password}&phone=${phone}`);

            console.log("result", response.status);
            if (response.status === 201) {
                return true;
            } else {
                return false;
            }
        } catch (e) {
            throw e;
        }
    }
}
export default Auth;