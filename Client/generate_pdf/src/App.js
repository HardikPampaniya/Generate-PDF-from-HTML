import React, { useState } from 'react';
import axios from 'axios';
import "./App.css"

const App = () => {
  const [htmlCode, setHtmlCode] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const convertAndSendPDF = async () => {
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/convertandsend', { htmlCode, recipientEmail }, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      alert('PDF generated and sent successfully');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate PDF or send email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container ">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="heading">
              Convert and Send PDF
            </div><br></br>
            <div className="card-body">
              <div className="form-group">
                <textarea
                  className="form-control"
                  value={htmlCode}
                  onChange={(e) => setHtmlCode(e.target.value)}
                  placeholder="Enter HTML code"
                  rows={8} 
                /><br></br>
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  placeholder="Recipient Email"
                /><br></br><br></br>
              </div>
              <button
                className="btn"
                onClick={convertAndSendPDF}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Convert and Send PDF'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
