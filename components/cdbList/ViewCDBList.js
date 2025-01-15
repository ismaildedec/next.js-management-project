import React from 'react';
import dynamic from 'next/dynamic';
import styles from '../../styles/Cdb.module.scss';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
export const ViewCDBList = ({
    onSubmit,
    selectedList,
    setSelectedList,
    cdbLists,
    cdbContent
}) => {
    const formatContentForQuill = (content) => {
        if (!content) return '';
        let htmlContent = `
                <h3>${content.list_name}</h3>
                <p>Status: ${content.enabled ? 'Active' : 'Inactive'}
                <h2>List Content:</h2>
                <table >
                    <thead>
                        <tr>
                            <th>Key</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                <tbody>
                `;
        content.content_pairs.forEach(pair => {
            htmlContent += `
                <tr>
                    <td>${pair.key}</td>
                    <td>${pair.value}</td>
                </tr>
                `;
        });
        htmlContent += `
            </tbody>
            </table>
            `;
        return htmlContent;
    };
    const modules = {
        toolbar: false,
    };
    return (
        <div className='box-outline'>
            <div className='box-header'>
                <h2>View CDB List</h2>
            </div>
            <div className='box-inline'>
                <form onSubmit={onSubmit}>
                    <div className='col-left'>
                        <label>Select CDB List</label>
                    </div>
                    <div className='col-right'>
                        <select
                            value={selectedList}
                            onChange={(e) => setSelectedList(e.target.value)}
                            className="selectBox"
                        >
                            <option value="">Select</option>
                            {cdbLists.length > 0 ? (
                                cdbLists.map((list, index) => (
                                    <option key={index} value={list.list_name}>
                                        {list.list_name}
                                    </option>
                                ))
                            ) : (
                                <option disabled>List not available</option>
                            )}
                        </select>
                        <br /><br />
                        <button type="submit">
                            View List
                        </button>
                    </div>
                </form>
            </div>
            {cdbContent && (
                <div className={styles.editorContainer}>
                    <div className={styles.editor}
                        dangerouslySetInnerHTML={{ __html: formatContentForQuill(cdbContent) }} />
                </div>)}
        </div>
    );
};