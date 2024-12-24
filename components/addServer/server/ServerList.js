import React from 'react';
import styles from '../../../styles/AddServer.module.scss';
export const ServerList = ({ servers, getServerTypeName }) => {
    return (
        <div className="box-outline">
            <div className="box-header">
                <h2>Inventory</h2>
            </div>
            <div className="box-inline">
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Hostname</th>
                                <th>Listname</th>
                            </tr>
                        </thead>
                        <tbody>
                            {servers.map((server, index) => (
                                <tr key={server.id || index}>
                                    <td>{server.hostname}</td>
                                    <td>{getServerTypeName(server.server_type)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}