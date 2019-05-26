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
        try {
            const token = localStorage.getItem('auth');
            const response = await fetch(`http://localhost:8080/cocoon-resort/PackageServlet?action=create&name=${name}&resortId=${resortId}&details=${details}&price=${price}&from=${from}&to=${to}&capacity=${capacity}&image=${image}&token=${token}`);

            if (response.ok) {
                return true;
            }
        } catch (e) {
            return false;
        }
    }

    async filterByResort(id) {
        try {
            const token = localStorage.getItem("auth");
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

    async updatePackage(packId, name, details, price, from, to, capacity) {
        try {
            const id = localStorage.getItem('id');
            const token = localStorage.getItem("auth");
            const response = await fetch(`http://localhost:8080/cocoon-resort/PackageServlet?action=updatePackage&id=${id}&packId=${packId}&name=${name}&details=${details}&price=${price}&from=${from}&to=${to}&capacity=${capacity}&token=${token}`);

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

    async getImageNames(id) {
        try {
            const response = await fetch(`http://localhost:8080/cocoon-resort/PackageServlet?action=getImageNames&packageId=${id}`);

            if (response.ok) {
                const imageNames = await response.text();
                // console.log(`response is ok for ${id}`, imageNames);
                
                return imageNames;
            } else {
                console.log('response is NULL');
                return null;
            }
        } catch (err) {
            throw err;
        }
    }

    async getSingleImageName(id) {
        try {
            const response = await fetch(`http://localhost:8080/cocoon-resort/PackageServlet?action=getSingleImageName&packageId=${id}`);

            if (response.ok) {
                const imageNames = await response.text();
                // console.log(`response is ok for ${id}`, imageNames);
                return imageNames;
            } else {
                console.log('response is NULL');
                return null;
            }
        } catch (err) {
            throw err;
        }
    }

    async getImage(name) {
        console.log('name', name)
        if (name) {
            try {
                const response = await fetch(`http://localhost:8080/cocoon-resort/UploadDownloadFileServlet?imageName=${name}`);

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

    async deletePackage(packId) {
        const id = localStorage.getItem('id');
        const token = localStorage.getItem('auth');
        try {
            const response = await fetch(`http://localhost:8080/cocoon-resort/PackageServlet?action=delete&id=${id}&token=${token}&packId=${packId}`);

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
