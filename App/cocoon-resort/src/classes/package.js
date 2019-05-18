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

    async createPackage(name, resortId, details, price, from, to, guests) {
        const response = await fetch(`http://localhost:8080/cocoon-resort/PackageServlet?action=create&name=${name}&resortId=${resortId}&details=${details}&price=${price}&from=${from}&to=${to}&guests=${guests}`);

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

    async updatePackage(id, name, details, price, from, to, capacity) {
        try {
            const response = await fetch(`http://localhost:8080/cocoon-resort/PackageServlet?action=updatePackage&id=${id}&name=${name}&details=${details}&price=${price}&from=${from}&to=${to}&capacity=${capacity}`);

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

export default Package;
