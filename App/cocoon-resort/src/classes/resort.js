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

            if (response.status === 201) {
                const result = await response.json();

                const jwt = result[0].jwt;
                const id = result[0].id;
                const name = result[0].name;
                localStorage.setItem("auth", jwt);
                localStorage.setItem("id", id);
                localStorage.setItem("resortName", name);
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

    async updateImage(fileName) {
        const id = localStorage.getItem('id');
        try {
            let formData = new FormData();
            formData.append('fileName', fileName);

            const response = await fetch(`http://localhost:8080/cocoon-resort/UploadDownloadFileServlet?packageId=${id}&type=resort`, {
                method: 'POST',
                body: formData
            });
        } catch (err) {
            throw err;
        }
    }
}

export default Resort;
