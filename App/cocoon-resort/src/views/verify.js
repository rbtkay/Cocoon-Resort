import React, { Component } from 'react';

import Auth from '../classes/auth';

class Verify extends Component {
    render() {
        return (
            <p>Verifying your email...</p>
        )
    }

    async componentDidMount() {
        const queryString = require('query-string');
        const info = queryString.parse(this.props.location.search)

        const { token, id, name, email } = info;

        // const jwt = require('jsonwebtoken');

        // const decoded = jwt.decode(token);
        // console.log(decoded);

        // const email = decoded.sub;

        const auth = new Auth();

        const isVerified = await auth.verifyClient(token);
        if (isVerified === true) {
            localStorage.setItem("auth", token);
            localStorage.setItem("id", id);
            localStorage.setItem("email", email);
            localStorage.setItem("name", name);
        }
        window.location = '/welcome'
    }
}

export default Verify;

