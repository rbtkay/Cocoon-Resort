class Resort {
    async getLocations() {
        try {
            const response = await fetch(`http://localhost:8080/cocoon-resort/ResortServlet?action=getLocations`);

            // console.log("result", response.status);
            if (response.status === 200) {
                const result = await response.json();
                // console.log(result);
                // console.log(result);
                return result;
            } else {
                return false;
            }
        } catch (e) {
            throw e;
        }
    }

    async create(name, password, location, category) {
        try {
            const response = await fetch(`http://localhost:8080/cocoon-resort/ResortServlet?action=create&name=${name}&password=${password}&location=${location}&category=${category}`);

            if (response.ok) {
                return true;
            }
        } catch (e) {
            return false;
        }
    }

    async readAll(category) {
        try {
            const response = await fetch(`http://localhost:8080/cocoon-resort/ResortServlet?action=readAll&category=${category}`);

            if (response.ok) {
                const result = response.json();
                return result;
            } else {
                return [];
            }
        } catch (e) {
            return 502;
        }
    }
}

export default Resort;
