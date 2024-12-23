import React from 'react';
import styles from '../../../styles/AddServer.module.scss';
export const ServerForm = ({
    hostname,
    ip,
    serverType,
    serverTypes,
    onSubmit,
    onHostnameChange,
    onIpChange,
    onServerTypeChange
}) => {
    return (
        <div className="box-outline">
            <div className="box-header">
                <h2>Add Server To Inventory</h2>
            </div>
            <div className="box-inline">
                <form id="serverform" acceptCharset="UTF-8" onSubmit={onSubmit}>
                    <div className="col-left">
                        <label className={styles.col_label} htmlFor="hostname">Hostname:</label><br /><br />
                        <label className={styles.col_label} htmlFor="ip">IP Address:</label><br /><br />
                        <label className={styles.col_label} htmlFor="server_type">Server type:</label>
                    </div>
                    <div className="col-right">
                        <input
                            id="hostname"
                            type="text"
                            placeholder="Hostname"
                            value={hostname}
                            onChange={onHostnameChange}
                            required
                        />
                        <br /><br />
                        <input
                            id="ip"
                            type="text"
                            placeholder="IP Address"
                            value={ip}
                            onChange={onIpChange}
                            required
                        />
                        <br /><br />
                        <select
                            className="selectBox"
                            id="server_type"
                            required
                            value={serverType}
                            onChange={onServerTypeChange}
                        >
                            <option value="">Select server type</option>
                            {serverTypes.map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.type_name}
                                </option>
                            ))}
                        </select>
                        <br /><br />
                        <button
                            type="submit"
                        >
                            Add Server
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};