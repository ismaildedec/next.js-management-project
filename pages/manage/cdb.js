import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout';
import { AddCDBList } from '../../components/cdbList/AddCDBList';
import { ViewCDBList } from '../../components/cdbList/ViewCDBList';
import { cdbService } from '../../services/cdbList/api';
import Head from 'next/head';
const CDBListPage = () => {
    const [listName, setListName] = useState('');
    const [enabled, setEnabled] = useState(false);
    const [content, setContent] = useState('');
    const [cdbContent, setCdbContent] = useState('');
    const [cdbLists, setCdbLists] = useState([]);
    const [selectedList, setSelectedList] = useState('');
    useEffect(() => {
        const fetchCDBLists = async () => {
            const lists = await cdbService.getCDBLists();
            setCdbLists(lists);
        };
        fetchCDBLists();
    }, []);
    const handleAddList = async (e) => {
        e.preventDefault();
        try {
            const data = await cdbService.addCDBList(listName, enabled, content);
            alert('CDB Listesi başarıyla eklendi!');
            setCdbLists([...cdbLists, data]);
            // Form alanlarını temizle
            setListName('');
            setEnabled(false);
            setContent('');
        } catch (error) {
            alert('Liste eklenirken bir hata oluştu!');
        }
    };
    const handleViewList = async (e) => {
        e.preventDefault();
        if (!selectedList) {
            alert('Lütfen bir liste seçin');
            return;
        }
        try {
            const data = await cdbService.viewCDBList(selectedList);
            setCdbContent(data);
        } catch (error) {
            alert('Liste görüntülenirken bir hata oluştu: ' + error.message);
        }
    };
    return (
        <Layout>
            <div className='main'>
            <Head>
                    <title>CDB List</title>
                    <link
                        rel="stylesheet"
                        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
                    />
                </Head>
                <AddCDBList
                    onSubmit={handleAddList}
                    listName={listName}
                    setListName={setListName}
                    enabled={enabled}
                    setEnabled={setEnabled}
                    content={content}
                    setContent={setContent}
                />
                <ViewCDBList
                    onSubmit={handleViewList}
                    selectedList={selectedList}
                    setSelectedList={setSelectedList}
                    cdbLists={cdbLists}
                    cdbContent={cdbContent}
                />
            </div>
        </Layout>
    );
};
export default CDBListPage;