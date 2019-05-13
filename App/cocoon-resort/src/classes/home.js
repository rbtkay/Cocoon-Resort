import App from '../app/App';

class Home {
    async getHome() {

        try {
            const response = await fetch("http://localhost:8080/cocoon-resort/ClientServlet?action=login&name=dse&password=123");

            console.log("result", response.status)
            const res = await response.json();

            return res;
        } catch (e) {
            throw e;
        }
    }
}

export default Home;