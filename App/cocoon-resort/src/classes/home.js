import App from '../app/App';

class Home {
    async getHome() {
        const response = await fetch("http://localhost:8080/cocoon-resort/HomeServlet");

        const res = await response.json();

        return res;
    }
}

export default Home;