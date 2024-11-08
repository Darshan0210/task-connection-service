import React, { useState } from 'react';
import axios from 'axios';

function Insurance() {
  const [isEnrolled, setIsEnrolled] = useState({});
  const [insuranceOptions] = useState([
    { type: 'Liability Coverage', amount: 5000 },
    { type: 'Injury Protection', amount: 10000 },
    { type: 'Property Damage', amount: 7500 },
  ]);
  const [selectedInsurance, setSelectedInsurance] = useState(null);
  const [showClaimForm, setShowClaimForm] = useState(false);
  const [claimDetails, setClaimDetails] = useState({ description: '', amount: '' });
  
  // Assuming taskerID is available from a context, session, or prop
  const taskerID = 1; // Replace this with actual tasker ID logic
  
  // Handle enrollment for a selected insurance type
  const handleEnrollment = async (insurance) => {
    try {
      const { type, amount } = insurance;

      // Send insurance enrollment data to the backend
      const response = await axios.post('http://localhost:5000/api/Insurance', {
        taskerID,
        insuranceType: type,
        coverageAmount: amount,
      });

      if (response.status === 200) {
        setIsEnrolled((prev) => ({ ...prev, [insurance.type]: true }));
        alert(response.data.message); // Show success message with insurance type
      }
    } catch (error) {
      console.error('Error enrolling in insurance:', error);
      alert('Error enrolling in insurance. Please try again.');
    }
  };

  // Show claim form when "File a Claim" is clicked
  const handleShowClaimForm = (insuranceType) => {
    setSelectedInsurance(insuranceType);
    setShowClaimForm(true);
  };

  // Handle input change for claim details
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClaimDetails({ ...claimDetails, [name]: value });
  };

  // Submit claim (this should link to backend in production)
  const handleSubmitClaim = async () => {
    try {
      // In a real-world scenario, you'd send the claim data to the backend for processing
      const response = await axios.post('/api/SubmitClaim', {
        taskerID,
        insuranceType: selectedInsurance,
        description: claimDetails.description,
        amount: claimDetails.amount,
      });

      if (response.status === 200) {
        alert(`Claim for ${selectedInsurance} submitted successfully!`);
        // Reset form state
        setShowClaimForm(false);
        setClaimDetails({ description: '', amount: '' });
      }
    } catch (error) {
      console.error('Error submitting claim:', error);
      alert('Error submitting claim. Please try again.');
    }
  };

  return (
    <div className="insurance-container p-6 max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Tasker Insurance Program</h2>

      {insuranceOptions.map((insurance, index) => (
        <div key={index} className="mb-6 p-4 bg-gray-100 rounded shadow">
          <h3 className="text-xl font-semibold">{insurance.type}</h3>
          <p>Coverage Amount: ${insurance.amount}</p>

          {isEnrolled[insurance.type] ? (
            <button
              onClick={() => handleShowClaimForm(insurance.type)}
              className="px-4 py-2 mt-4 bg-green-600 text-white rounded hover:bg-green-700"
            >
              File a Claim
            </button>
          ) : (
            <button
              onClick={() => handleEnrollment(insurance)}
              className="px-4 py-2 mt-4 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Enroll in {insurance.type}
            </button>
          )}
        </div>
      ))}

      {showClaimForm && (
        <div className="file-claim-section mt-6">
          <h4 className="text-lg font-semibold">File a Claim for {selectedInsurance}</h4>
          <form className="mt-4">
            <div className="mb-4">
              <label className="block text-gray-700">Description of Issue</label>
              <input
                type="text"
                name="description"
                value={claimDetails.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Claim Amount</label>
              <input
                type="text"
                name="amount"
                value={claimDetails.amount}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>

            <button
              type="button"
              onClick={handleSubmitClaim}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Submit Claim
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Insurance;
