import React from 'react';
import styles from"../../styles/Cdb.module.scss"
export const AddCDBList = ({
    onSubmit,
    listName,
    setListName,
    enabled,
    setEnabled,
    content,
    setContent
}) => {
    return (
        <div className='box-outline'>
            <div className='box-header'>
                <h2>Add CDB List</h2>
            </div>
            <div className='box-inline'>
                <form onSubmit={onSubmit}>
                    <div className='col-left'>
                        <label>CDB List Name</label>
                        <br /><br />
                        <label>Active</label>
                    </div>
                    <div className='col-right'>
                        <input
                            type="text"
                            value={listName}
                            onChange={(e) => setListName(e.target.value)}
                            required
                        />
                        <br /><br />
                        <input
                            type="checkbox"
                            checked={enabled}
                            onChange={(e) => setEnabled(e.target.checked)}
                        />
                    </div>
                    {listName && (
                        <div className={styles.content_section}>
                            <h3>Add Content to CDB List: {listName}</h3>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Enter content in format:
                                                key1:value1
                                                key2:value2"
                                rows={10}
                                style={{ width: '100%', marginTop: '10px'}}
                            />
                            <div style={{ marginTop: '10px' }}>
                                <button type="submit">Add CDB List</button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};