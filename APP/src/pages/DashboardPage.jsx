import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const redirect = useNavigate();

  // STATES
  const [activeTab, setActiveTab] = useState('pending');
  const [pendingLoans, setPendingLoans] = useState([
    {
      id: 1,
      name: "John Doe",
      amount: 50000,
      bankName: "Access Bank",
      accountNumber: "0123456789",
      creditScore: 720,
      income: 200000,
    },
    {
      id: 2,
      name: "Mary Johnson",
      amount: 75000,
      bankName: "GTBank",
      accountNumber: "0987654321",
      creditScore: 690,
      income: 180000,
    },
    {
      id: 3,
      name: 'Michael Jackson',
      amount: 30000,
      bankName: 'Access Bank',
      accountNumber: '5678901234',
      creditScore: 550,
      income: 80000,
      status: 'pending'
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

      {/* INLINE STYLES */}
      <style>{`
        .app-container {
          font-family: "Poppins", sans-serif;
          min-height: 100vh;
          background-color: #f9fafb;
          display: flex;
          flex-direction: column;
        }

        .header {
          background-color: #1e40af;
          color: white;
          padding: 1rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .btn-logout {
          background-color: #f43f5e;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .btn-logout:hover {
          background-color: #e11d48;
        }

        .navigation {
          display: flex;
          justify-content: center;
          gap: 1rem;
          background-color: #ffffff;
          padding: 0.8rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .nav-btn {
          background: none;
          border: 1px solid #cbd5e1;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: 0.2s ease;
        }

        .nav-btn:hover {
          background-color: #f1f5f9;
        }

        .nav-btn.active {
          background-color: #2563eb;
          color: white;
          border-color: #2563eb;
        }

        .main-content {
          flex-grow: 1;
          padding: 2rem;
        }

        .loans-section {
          background-color: #fff;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .loans-section h2 {
          font-size: 1.3rem;
          margin-bottom: 1rem;
          color: #1f2937;
        }

        .empty-state {
          text-align: center;
          color: #6b7280;
          font-size: 1rem;
          padding: 2rem 0;
        }

        .loans-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1rem;
        }

        .loan-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 1rem;
          transition: all 0.2s ease;
        }

        .loan-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
        }

        .loan-card h3 {
          font-size: 1.1rem;
          color: #1e293b;
          margin-bottom: 0.8rem;
        }

        .loan-details p {
          font-size: 0.9rem;
          color: #374151;
          margin: 0.3rem 0;
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .btn-approve, .btn-reject {
          flex: 1;
          border: none;
          padding: 0.5rem;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: 0.2s ease;
        }

        .btn-approve {
          background-color: #16a34a;
          color: white;
        }

        .btn-approve:hover {
          background-color: #15803d;
        }

        .btn-reject {
          background-color: #dc2626;
          color: white;
        }

        .btn-reject:hover {
          background-color: #b91c1c;
        }

        .status-badge {
          margin-top: 1rem;
          text-align: center;
          padding: 0.4rem;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 600;
          color: white;
        }

        .status-badge.success {
          background-color: #16a34a;
        }

        .status-badge.danger {
          background-color: #dc2626;
        }

        .loan-card.accepted {
          border-left: 4px solid #16a34a;
        }

        .loan-card.rejected {
          border-left: 4px solid #dc2626;
        }
      `}</style>
    </div>
  );
}
