import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const redirect = useNavigate();

  // STATES
  const [activeTab, setActiveTab] = useState('pending');
  const [pendingLoans, setPendingLoans] = useState([
    {
      id: 1,
      name: "Bola Tinubu",
      amount: 50000,
      bankName: "Access Bank",
      accountNumber: "0123456789",
      creditScore: 720,
      income: 200000,
    },
    {
      id: 2,
      name: "Mary Johnson",
      amount: 200000,
      bankName: "GTBank",
      accountNumber: "0987654321",
      creditScore: 690,
      income: 180000,
    },
    {
      id: 3,
      name: "Alamu Temitope",
      amount: 76000,
      bankName: "GTBank",
      accountNumber: "0987654321",
      creditScore: 690,
      income: 180000,
    },
    {
      id: 4,
      name: "Tajudeen Micheal",
      amount: 5000,
      bankName: "GTBank",
      accountNumber: "0987654321",
      creditScore: 690,
      income: 180000,
    }
  ]);
  const [acceptedLoans, setAcceptedLoans] = useState([]);
  const [rejectedLoans, setRejectedLoans] = useState([]);

  // LOGOUT HANDLER
  const handleLogout = () => {
    redirect("/login");
  };

  // APPROVE FUNCTION
  const approveLoan = (loan) => {
    setAcceptedLoans([...acceptedLoans, loan]);
    setPendingLoans(pendingLoans.filter((item) => item.id !== loan.id));
  };

  // REJECT FUNCTION
  const rejectLoan = (loan) => {
    const reason = prompt("Enter rejection reason:");
    if (reason) {
      setRejectedLoans([...rejectedLoans, { ...loan, reason }]);
      setPendingLoans(pendingLoans.filter((item) => item.id !== loan.id));
    }
  };

  return (
    <div className="app-container">
      {/* HEADER */}
      <header className="header">
        <h1>Credit Application System</h1>
        <button onClick={handleLogout} className="btn-logout">Logout</button>
      </header>

      {/* NAVIGATION */}
      <nav className="navigation">
        <button
          className={activeTab === 'pending' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => setActiveTab('pending')}
        >
          Pending Loans ({pendingLoans.length})
        </button>
        <button
          className={activeTab === 'accepted' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => setActiveTab('accepted')}
        >
          Accepted Loans ({acceptedLoans.length})
        </button>
        <button
          className={activeTab === 'rejected' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => setActiveTab('rejected')}
        >
          Rejected Loans ({rejectedLoans.length})
        </button>
      </nav>

      {/* MAIN CONTENT */}
      <main className="main-content">
        {activeTab === 'pending' && (
          <div className="loans-section">
            <h2>Pending Loan Applications</h2>
            {pendingLoans.length === 0 ? (
              <p className="empty-state">No pending loan applications</p>
            ) : (
              <div className="loans-grid">
                {pendingLoans.map((loan) => (
                  <div key={loan.id} className="loan-card">
                    <h3>{loan.name}</h3>
                    <div className="loan-details">
                      <p><strong>Loan Amount:</strong> ₦{loan.amount.toLocaleString()}</p>
                      <p><strong>Bank:</strong> {loan.bankName}</p>
                      <p><strong>Account Number:</strong> {loan.accountNumber}</p>
                      <p><strong>Credit Score:</strong> {loan.creditScore}</p>
                      <p><strong>Annual Income:</strong> ₦{loan.income.toLocaleString()}</p>
                    </div>
                    <div className="action-buttons">
                      <button className="btn-approve" onClick={() => approveLoan(loan)}>Approve</button>
                      <button className="btn-reject" onClick={() => rejectLoan(loan)}>Reject</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'accepted' && (
          <div className="loans-section">
            <h2>Accepted Loan Applications</h2>
            {acceptedLoans.length === 0 ? (
              <p className="empty-state">No accepted loan applications</p>
            ) : (
              <div className="loans-grid">
                {acceptedLoans.map((loan) => (
                  <div key={loan.id} className="loan-card accepted">
                    <h3>{loan.name}</h3>
                    <div className="loan-details">
                      <p><strong>Loan Amount:</strong> ₦{loan.amount.toLocaleString()}</p>
                      <p><strong>Bank:</strong> {loan.bankName}</p>
                      <p><strong>Account Number:</strong> {loan.accountNumber}</p>
                      <p><strong>Credit Score:</strong> {loan.creditScore}</p>
                      <p><strong>Annual Income:</strong> ₦{loan.income.toLocaleString()}</p>
                    </div>
                    <div className="status-badge success">Approved</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'rejected' && (
          <div className="loans-section">
            <h2>Rejected Loan Applications</h2>
            {rejectedLoans.length === 0 ? (
              <p className="empty-state">No rejected loan applications</p>
            ) : (
              <div className="loans-grid">
                {rejectedLoans.map((loan) => (
                  <div key={loan.id} className="loan-card rejected">
                    <h3>{loan.name}</h3>
                    <div className="loan-details">
                      <p><strong>Loan Amount:</strong> ₦{loan.amount.toLocaleString()}</p>
                      <p><strong>Bank:</strong> {loan.bankName}</p>
                      <p><strong>Account Number:</strong> {loan.accountNumber}</p>
                      <p><strong>Credit Score:</strong> {loan.creditScore}</p>
                      <p><strong>Annual Income:</strong> ₦{loan.income.toLocaleString()}</p>
                      <p><strong>Reason:</strong> {loan.reason}</p>
                    </div>
                    <div className="status-badge danger">Rejected</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
      </div>
  );
}
    