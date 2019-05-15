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
}

export default Resort;