import { useState } from 'react';
import '../../node_modules/datatables.net-dt/css/dataTables.dataTables.css';
export default function FrequencyForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        intervalType: 'month',
        amount: 1,
        dow: [],
        workingHoursStart: '',
        workingHoursEnd: ''
    });
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSubmit(formData);
        } finally {
            setLoading(false);
        }
    };
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData(prev => ({
                ...prev,
                dow: checked
                    ? [...prev.dow, value]
                    : prev.dow.filter(day => day !== value)
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };
    const days = [
        'Monday',
        'Tuesday', 'Wednesday',
        'Thursday', 'Friday', 'Saturday', 'Sunday'
    ];
    return (
        <form onSubmit={handleSubmit} >
            <div className="col-left">
                <label>Time Interval</label><br /><br />
                <label>Amount</label><br /><br />
                <label>Day of the Week</label><br /><br />
            </div>
            <div className="col-right">
                <select
                    name="intervalType"
                    value={formData.intervalType}
                    onChange={handleInputChange}
                >
                    <option value="month">Month</option>
                    <option value="week">Week</option>
                    <option value="day">Day</option>
                </select><br /><br />
                <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                /><br /><br />
        
                <div >
                    {days.map((day, index) => (
                        <label key={index}>
                            <input
                                type="checkbox"
                                name="dow"
                                value={index + 1}
                                checked={formData.dow.includes((index + 1).toString())}
                                onChange={handleInputChange}
                            />
                            {day}
                        </label>
                    ))}
                </div>
                <div >
                    <label>
                        Working Hours Start:
                        <input
                            type="time"
                            name="workingHoursStart"
                            value={formData.workingHoursStart}
                            onChange={handleInputChange}
                        />
                    </label>
                    
                    <label>
                        Working Hours End:
                        <input
                            type="time"
                            name="workingHoursEnd"
                            value={formData.workingHoursEnd}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    
                >
                    {loading ? 'Saving...' : 'Save'}
                </button>
                {loading && <div  />}
            </div>
        </form>
    );
}