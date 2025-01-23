import { useState, useEffect } from 'react';
import Head from 'next/head';
import BackupTable from '../../components/integrity/BackupTable';
import FrequencyForm from '../../components/integrity/FrequenceyForm';
import { fetchBackups, checkBackup, updateFrequency } from '../../services/integrity/api';
import styles from '../../styles/Integrity.module.scss';
import { notify } from '../../utils/notify';
import '../../node_modules/datatables.net-dt/css/dataTables.dataTables.css';
import Layout from '../../components/layout';


export default function IntegrityPage() {
    const [backups, setBackups] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadBackups();
    }, []);

    const loadBackups = async () => {
        try {
            const data = await fetchBackups();
            setBackups(data);
        } catch (error) {
            notify('Error loading backups', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleCheck = async (id) => {
        try {
            notify('Checking integrity...', 'info');
            const result = await checkBackup(id);
            notify(`Check completed: ${result.health}`, 'success');
            await loadBackups(); // Reload the table
        } catch (error) {
            notify('Error checking backup', 'error');
        }
    };

    const handleFrequencySubmit = async (formData) => {
        try {
            await updateFrequency(formData);
            notify('Frequency updated successfully', 'success');
        } catch (error) {
            notify('Error updating frequency', 'error');
        }
    };

    return (
        <Layout>
            <div className="main">

                <Head>
                    <title>Backup Integrity</title>

                </Head>
                <div className="box-outline">
                    <div className="box-header">
                        <span>Backup Integrity </span>
                    </div>
                    <div className="box-inline">
                        {loading ? (
                            <div className={styles.dotCollision} />
                        ) : (
                            <BackupTable
                                data={backups}
                                onCheck={handleCheck}
                            />
                        )}
                    </div>
                </div>

                <div className="box-outline">
                    <div className="box-header">
                        <span>Auto Backup Frequency (WIP)</span>
                    </div>
                    <div className="box-inline" >
                        <FrequencyForm onSubmit={handleFrequencySubmit} />
                    </div>
                </div>

            </div>
        </Layout>
    );
}