import React from 'react';
import './UpdateExistingRecords.css';

function UpdateExistingRecords() {
    // This component will eventually fetch and display existing records

    return (
        <div className="records-container">
            <h2>Existing Records</h2>
            <table className="records-table">
                <thead>
                    <tr>
                        <th>#Serial Number</th>
                        <th>Condition Name</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                  {/* Rows with existing records will be dynamically inserted here */}
                </tbody>
            </table>
        </div>
    );
}

export default UpdateExistingRecords;
