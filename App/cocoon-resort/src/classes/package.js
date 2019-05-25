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
            const token = localStorage.getItem("id");
            const response = await fetch(`http://localhost:8080/cocoon-resort/PackageServlet?action=readByResortId&id=${id}&token=${token}`);
            if (response.status === 200) {
                // console.log(response);
                const result = await response.json();
                return result;
            } else {
                return [];
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

    async filterByDate(from, to) {
        from = from || '1970-01-01';
        to = to || '2050-01-01';
        console.log(from)
        console.log(to)
        try {
            const response = await fetch(`http://localhost:8080/cocoon-resort/PackageServlet?action=filterByDate&start=${from}&end=${to}`);

            if (response.ok) {
                const result = await response.json();
                return result;
            } else {
                return [];
            }
        } catch (err) {
            throw err;
        }
    }

    async getImages(id) {
        try {
            const response = await fetch(`http://localhost:8080/cocoon-resort/UploadDownloadFileServlet?packageId=${id}`);

            if (response.ok) {
                let objUrl = await response.blob();
                const imgSrc = await URL.createObjectURL(objUrl);
                // console.log('imgSrc', imgSrc);
                return imgSrc;
            }
        } catch (err) {
            throw err;
        }
    }

    async updateImage(id, fileName) {
        try {
            let formData = new FormData();
            formData.append('fileName', fileName);

            const response = await fetch(`http://localhost:8080/cocoon-resort/UploadDownloadFileServlet?packageId=${id}`, {
                method: 'POST',
                body: formData
            });
        } catch (err) {
            throw err;
        }
    }

    async readOne(id) {
        try {
            const response = await fetch(`http://localhost:8080/cocoon-resort/PackageServlet?action=readOne&id=${id}`);

            if (response.ok) {
                const result = await response.json();
                return result;
            } else {
                return 404;
            }
        } catch (e) {
            throw e;
        }
    }
}

export default Package;
