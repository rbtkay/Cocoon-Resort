class Package {

    async getFilteredPackages(info) {
        const { location, from, to, category, guests } = info;
        try {
            const response = await fetch(`http://localhost:8080/cocoon-resort/PackageServlet?location=${location}&from=${from}&to=${to}&category=${category}&guests=${guests}`);
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
}

export default Package;