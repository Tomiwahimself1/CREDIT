import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
//import './DashboardPage.css';

export default function DashboardPage() {
  const redirect = useNavigate(); 
  const [activeTab, setActiveTab] = useState('pending');
  const [pendingLoans, setPendingLoans] = useState([
    { id: 1, name: 'Bola Tinubu', amount: 50000, bankName: 'UNION BANK', accountNumber: '0123456567', creditScore: 720, income: 500000 },
    { id: 2, name: 'Mary Johnson', amount: 200000, bankName: 'U.B.A', accountNumber: '0287654327', creditScore: 700, income: 300000 },
    { id: 3, name: 'Alamu Temitope', amount: 76000, bankName: 'FIRST BANK', accountNumber: '0987654321', creditScore: 1000, income: 200000 },
    { id: 4, name: 'Tajudeen Micheal', amount: 5000, bankName: 'ACCESS BANK', accountNumber: '0814654733', creditScore: 800, income: 180000 },
    { id: 4, name: 'Shettima Obi', amount: 6000, bankName: 'SKYE BANK', accountNumber: '0887655322', creditScore: 800, income: 100000 }
  ]);
  const [acceptedLoans, setAcceptedLoans] = useState([]);
  const [rejectedLoans, setRejectedLoans] = useState([]); 

  const handleLogout = () => redirect('/login'); 

  const approveLoan = (loan) => {
    setAcceptedLoans([...acceptedLoans, loan]);
    setPendingLoans(pendingLoans.filter((item) => item.id !== loan.id));
  };

  const rejectLoan = (loan) => {
    const reason = prompt('Enter rejection reason:');
    if (reason) {
      setRejectedLoans([...rejectedLoans, { ...loan, reason }]);
      setPendingLoans(pendingLoans.filter((item) => item.id !== loan.id));
    }
  };

  const pendingColumns = [
    { name: 'Name', selector: (row) => row.name, sortable: true },
    { name: 'Amount', selector: (row) => `₦${row.amount.toLocaleString()}`, sortable: true },
    { name: 'Bank', selector: (row) => row.bankName },
    { name: 'Account Number', selector: (row) => row.accountNumber },
    { name: 'Credit Score', selector: (row) => row.creditScore },
    { name: 'Income', selector: (row) => `₦${row.income.toLocaleString()}` },
    {
      name: 'Actions',
      cell: (row) => (
        <div className="actions-container">
          <button className="btn-approve" onClick={() => approveLoan(row)}>Approve</button>
          <button className="btn-reject" onClick={() => rejectLoan(row)}>Reject</button>
        </div>
      ),
    },
  ];

  const acceptedColumns = [
    { name: 'Name', selector: (row) => row.name },
    { name: 'Amount', selector: (row) => `₦${row.amount.toLocaleString()}` },
    { name: 'Bank', selector: (row) => row.bankName },
    { name: 'Account Number', selector: (row) => row.accountNumber },
    { name: 'Credit Score', selector: (row) => row.creditScore },
    { name: 'Income', selector: (row) => `₦${row.income.toLocaleString()}` },
  ];

  const rejectedColumns = [
    { name: 'Name', selector: (row) => row.name },
    { name: 'Amount', selector: (row) => `₦${row.amount.toLocaleString()}` },
    { name: 'Bank', selector: (row) => row.bankName },
    { name: 'Account Number', selector: (row) => row.accountNumber },
    { name: 'Credit Score', selector: (row) => row.creditScore },
    { name: 'Income', selector: (row) => `₦${row.income.toLocaleString()}` },
    { name: 'Reason', selector: (row) => row.reason },
  ];

  return (
    <div className="app-container">
      <header className="header">
        <h1>Credit Application System</h1>
        <button onClick={handleLogout} className="btn-logout">Logout</button>
      </header>

      <nav className="navigation">
        <button className={activeTab === 'pending' ? 'nav-btn active' : 'nav-btn'} onClick={() => setActiveTab('pending')}>
          Pending Loans ({pendingLoans.length})
        </button>
        <button className={activeTab === 'accepted' ? 'nav-btn active' : 'nav-btn'} onClick={() => setActiveTab('accepted')}>
          Accepted Loans ({acceptedLoans.length})
        </button>
        <button className={activeTab === 'rejected' ? 'nav-btn active' : 'nav-btn'} onClick={() => setActiveTab('rejected')}>
          Rejected Loans ({rejectedLoans.length})
        </button>
      </nav>

      <main className="main-content">
        {activeTab === 'pending' && (
          <DataTable
            title="Pending Loan Applications"
            columns={pendingColumns}
            data={pendingLoans}
            pagination
            highlightOnHover
            striped
          />
        )}

        {activeTab === 'accepted' && (
          <DataTable
            title="Accepted Loan Applications"
            columns={acceptedColumns}
            data={acceptedLoans}
            pagination
            highlightOnHover
            striped
          />
        )}

        {activeTab === 'rejected' && (
          <DataTable
            title="Rejected Loan Applications"
            columns={rejectedColumns}
            data={rejectedLoans}
            pagination
            highlightOnHover
            striped
          />
        )}
      </main>
    </div>
  );
}
