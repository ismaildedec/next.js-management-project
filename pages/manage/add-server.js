import { useEffect, useState } from 'react';
import { ServerList } from '../../components/addServer/servers/ServerList';
import { ServerForm } from '../../components/addServer/servers/ServerForm';
import { serverService } from '../../services/addServer/api';
import Head from 'next/head';
const AddServer = () => {
    const [servers, setServers] = useState([]);
    const [serverTypes, setServerTypes] = useState([]);
    const [formData, setFormData] = useState({
        hostname: '',
        ip: '',
        serverType: ''
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [serverTypesResponse, serversResponse] = await Promise.all([
                    serverService.getServerTypes(),
                    serverService.getAllServers()
                ]);
                setServerTypes(serverTypesResponse.data);
                setServers(serversResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    const getServerTypeName = (typeId) => {
        const serverType = serverTypes.find((type) => type.id === typeId);
        return serverType ? serverType.type_name : 'Unknown';
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await serverService.addServer({
                hostname: formData.hostname,
                server_type: formData.serverType,
                ip: formData.ip
            });
            setServers([...servers, response.data]);
            // Form'u resetle
            setFormData({
                hostname: '',
                ip: '',
                serverType: ''
            });
        } catch (error) {
            console.error('Error adding server:', error);
            // Burada bir error handling komponenti gösterilebilir
        }
    };
    return (
       
            <div className="main">
                <Head>
                    <title>Add Server</title>
                    <link
                        rel="stylesheet"
                        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
                    />
                </Head>
                <ServerList
                    servers={servers}
                    getServerTypeName={getServerTypeName}
                />
                <ServerForm
                    hostname={formData.hostname}
                    ip={formData.ip}
                    serverType={formData.serverType}
                    serverTypes={serverTypes}
                    onSubmit={handleSubmit}
                    onHostnameChange={(e) => setFormData({ ...formData, hostname: e.target.value })}
                    onIpChange={(e) => setFormData({ ...formData, ip: e.target.value })}
                    onServerTypeChange={(e) => setFormData({ ...formData, serverType: e.target.value })}
                />
            </div>
        
    );
};
export default AddServer;