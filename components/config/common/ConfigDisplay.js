import styles from '../../styles/Config.module.scss';

export const ConfigDisplay = ({
    configData,
    applicationId
}) => {
    if (!configData) return null;

    if (configData === 'empty') {
        return <p >No configuration data found for this application.</p>;
    }

    return (
        <>
            {configData.map((conf, index) => (
                <div key={index} className="box-outline">
                    <div className="box-header">
                        <h5>{conf[1]}</h5>
                        {conf[0].map((hostData, idx) => (
                            <div key={idx}>
                                <b>{hostData.host} ({applicationId}): </b>
                            
                            </div>
                        ))}
                    </div>
                    <div className={`box-inline ${styles.configGrid}`}>
                        {conf[0].map((hostData) => (
                            
                                <textarea
                                    className={styles.configText}
                                    readOnly
                                    value={hostData.output}
                                    cols="60"
                                    rows="30"
                                />
                           
                        ))}
                    </div>
                </div>
            ))}
        </>
    );
};