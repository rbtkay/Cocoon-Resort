import React from 'react';

import PackageComponent from './Package';

const ListPackages = (props) => {
    if (props.packages.length < 1) {
        return (
            <h3>No packages found... :(</h3>
        );
    } else {
        return props.packages.map(item => {
            return (
                <PackageComponent key={item.id} info={item} isResort={props.isResort} redirect={props.redirect} viewPack={props.viewPack} />
            );
        });
    }
}

export default ListPackages;