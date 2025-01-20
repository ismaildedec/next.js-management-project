import { useEffect } from 'react';
import '../../node_modules/datatables.net-dt/css/dataTables.dataTables.css';
import DataTable from 'datatables.net-dt';
import moment from 'moment';
import 'moment/locale/tr';
import { notify } from '../../utils/notify';
export default function BackupTable({ data, onCheck }) {
    useEffect(() => {
        // DataTables initialization
        const table = new DataTable('#backup-table', {
            url:"api/integrity/check/",
            data: data,
            pageLength: 15,
            lengthMenu: [15, 25, 50, 100],
            order: [[0, 'desc']],
            columns: [
                {
                    data: 'index_date',
                    render: (value) => {
                        // `timestamp` sıralama için kullanılacak
                        const timestamp = value ? moment(value).valueOf() : null;
                        return value ? moment(value).format('DD MMMM YYYY') : 'None'; // Görsel format
                    },
                    type: 'num', // Sayısal sıralama için 'num' tipi ekliyoruz
                },
                { data: 'hostname' },
                { data: 'hash' },
                {
                    data: 'healthcheck_date',
                    render: (value) => {
                        // `timestamp` sıralama için kullanılacak
                        const timestamp = value ? moment(value).valueOf() : null;
                        return value ? moment(value).format('DD MMMM YYYY HH:mm:ss') : 'None'; // Görsel format
                    },
                    type: 'num', // Sayısal sıralama için 'num' tipi ekliyoruz
                },
                {
                    data: 'healthcheck_state',
                    render: (value) => {
                        return value ?
                            '<span style="color:green">Green</span>' :
                            '<span style="color:red">Red</span>';
                    }
                },
                {
                    data: 'id',
                    render: (value) => `
                                        <button class="btn-default btn-sm check-button" value="${value}">
                                        <i class="fas fa-sync-alt" style="padding-right:5px;"></i>Check
                                        </button>
                                        `
                }
            ]
        });
        // Handle check button clicks
        document.querySelector('#backup-table').addEventListener('click', (e) => {
            if (e.target.closest('.check-button')) {
                const id = e.target.closest('.check-button').value;
                onCheck(id);
            }
        });
        return () => {
            table.destroy();
        };
    }, [data]);
    return (
        <table id="backup-table" className="display cell-border table-border">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Server</th>
                    <th>Hash</th>
                    <th>Last Control Date</th>
                    <th>Health</th>
                    <th>Actions</th>
                </tr>
            </thead>
        </table>
    );
}
// import { useEffect } from 'react';
// import DataTable from 'datatables.net-dt';
// import moment from 'moment';
// import 'moment/locale/tr';
// import { notify } from '../../utils/notify';
// export default function BackupTable({ data, onCheck }) {
//     useEffect(() => {
//         // DataTables initialization
//         const table = new DataTable('#backup-table', {
//             data: data,
//             pageLength: 15,
//             lengthMenu: [15, 25, 50, 100],
//             order: [[0, 'desc']],
//             columns: [
//                 {
//                     data: 'index_date',
//                     render: (value) => (value ? moment(value).format('DD MMMM YYYY') : 'None'),
//                     type: 'num',
//                 },
//                 { data: 'hostname' },
//                 { data: 'hash' },
//                 {
//                     data: 'healthcheck_date',
//                     render: (value) => (value ? moment(value).format('DD MMMM YYYY HH:mm:ss') : 'None'),
//                     type: 'num',
//                 },
//                 {
//                     data: 'healthcheck_state',
//                     render: (value) =>
//                         value ? '<span style="color:green">Green</span>' : '<span style="color:red">Red</span>',
//                 },
//                 {
//                     data: 'id',
//                     render: (value) =>
//                         `<button class="btn-default btn-sm check-button" onClick="(${onCheck(value)})">
//                         <i class="fas fa-sync-alt" style="padding-right:5px;"></i>Check
//                         </button>`,
//                 },
//             ],
//         });
//         return () => {
//             table.destroy();
//         };
//     }, [data]);
//     return (
//         <table id="backup-table" className="display cell-border table-border">
//             <thead>
//                 <tr>
//                     <th>Date</th>
//                     <th>Server</th>
//                     <th>Hash</th>
//                     <th>Last Control Date</th>
//                     <th>Health</th>
//                     <th>Actions</th>
//                 </tr>
//             </thead>
//         </table>
//     );
// }