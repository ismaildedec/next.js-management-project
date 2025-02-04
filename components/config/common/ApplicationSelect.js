import styles from '../../styles/Config.module.scss';
import { useState } from 'react';
import { validateConfig } from '../../utils/validation';
import { LoadingSpinner } from './common/LoadingSpinner';

export const ApplicationSelect = ({
    applications,
    selectedApp,
    onApplicationChange,
    onSubmit,
    isLoading,
    onClearCache
}) => {
    const [validationError, setValidationError] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        const error = validateConfig.application(value);
        setValidationError(error);
        onApplicationChange(e);
    };

    return (
        <form onSubmit={onSubmit} id="configform" className={styles.configForm}>
            <div className="col-left">
                <label htmlFor="application">Application:</label>
            </div>
            <div className="col-right">
                <select
                    id="application"
                    value={selectedApp}
                    onChange={handleChange}
                    required
                    className={`${validationError ? styles.errorInput : ''} ${"selectBox"}`}
                >
                    <option value="">Select Application</option>
                    {applications.map((app) => (
                        <option key={app.id} value={app.id}>
                            {app.app_name}
                        </option>
                    ))}
                </select>
                {validationError && (
                    <div className={styles.validationError}>{validationError}</div>
                )}
                <br /><br />
                <div className={styles.buttonGroup}>
                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={isLoading || !!validationError}
                    >
                        {isLoading ? 'Loading...' : 'Get Config'}
                    </button>
                    <button
                        type="button"
                        onClick={onClearCache}
                        className={styles.clearCacheButton}
                    >
                        Clear Cache
                    </button>
                </div>
                {isLoading && <LoadingSpinner />}
            </div>
        </form>
    );
};