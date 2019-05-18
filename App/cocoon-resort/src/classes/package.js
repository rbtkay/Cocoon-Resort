class Package {

    async readAll(category) {
        // const { location, from, to, category, guests } = info;
        const filter = category === undefined ? '' : category
        try {
            const response = await fetch(`http://localhost:8080/cocoon-resort/PackageServlet?action=readAll&category=${filter}`);
            //TODO: create Package Servlet!!
            if (response.status === 200) {
                const result = await response.json();
                return result;
            } else {
                return 404;
            }

        } catch (err) {
            throw err;
        }
    }

    async createPackage(name, resortId, details, price, from, to, capacity, image) {
        const response = await fetch(`http://localhost:8080/cocoon-resort/PackageServlet?action=create&name=${name}&resortId=${resortId}&details=${details}&price=${price}&from=${from}&to=${to}&capacity=${capacity}&image=${image}`);

        if (response.ok) {
            return true;
        }
    }

    async filterByResort(id) {
        try {
            const response = await fetch(`http://localhost:8080/cocoon-resort/PackageServlet?action=readByResortID&id=${id}`)
            if (response.ok) {
                const result = await response.json();
                return result;
            }
        } catch (e) {
            throw e;
        }
    }
}

export default Package;