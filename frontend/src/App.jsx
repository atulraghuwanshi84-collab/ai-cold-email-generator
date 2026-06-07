import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    senderName: '',
    recipientName: '',
    companyName: '',
    myRole: '',
    valueProp: '',
    tone: 'Formal/Corporate' // Default value
  });
  
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);

  // Load history from localStorage on startup
  useEffect(() => {
    const savedHistory = localStorage.getItem('email_history');
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setGeneratedEmail('');

    try {
      // Note: Remember to swap this localhost URL with your live Render link when you deploy!
      const response = await axios.post('http://localhost:5000/generate-email', formData);
      const emailText = response.data.email;
      setGeneratedEmail(emailText);

      // Save to history list
      const newItem = {
        id: Date.now(),
        company: formData.companyName,
        tone: formData.tone,
        text: emailText,
        date: new Date().toLocaleDateString()
      };
      const updatedHistory = [newItem, ...history].slice(0, 5); // Keep last 5 generations
      setHistory(updatedHistory);
      localStorage.setItem('email_history', JSON.stringify(updatedHistory));

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('email_history');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Top Header / Navbar Banner */}
      <header className="bg-white border-b border-slate-200 py-6 px-8 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <span className="text-3xl"></span>
          <div>
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              AI Cold Email Generator Pro
            </h1>
            <p className="text-xs text-slate-500">Generate, customize, and keep track of your outreach pitches</p>
          </div>
        </div>
      </header>

      {/* Main Workspace Frame */}
      <main className="max-w-7xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Form Controls */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 mb-5 pb-2 border-b border-slate-100">Configuration</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Your Name</label>
                  <input type="text" name="senderName" value={formData.senderName} onChange={handleChange} required 
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="e.g., Atul" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Outreach Tone</label>
                  <select name="tone" value={formData.tone} onChange={handleChange}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500">
                    <option value="Formal/Corporate"> Formal/Corporate</option>
                    <option value="Short & Punchy"> Short & Punchy</option>
                    <option value="Casual/Startup"> Casual/Startup</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Your Role / Background</label>
                <input type="text" name="myRole" value={formData.myRole} onChange={handleChange} required 
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="e.g., Final Year CSE Student" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Recipient's Name</label>
                  <input type="text" name="recipientName" value={formData.recipientName} onChange={handleChange} required 
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="e.g., Hiring Manager" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Target Company</label>
                  <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} required 
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="e.g., Google" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Value Proposition / Skills to Offer</label>
                <textarea name="valueProp" value={formData.valueProp} onChange={handleChange} required rows="4"
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none" 
                  placeholder="What projects or skills do you want to bring to their team?..." />
              </div>

              <button type="submit" disabled={loading} 
                className="w-full bg-emerald-600 text-white py-2.5 px-4 rounded-lg font-medium text-sm hover:bg-emerald-700 active:scale-[0.99] transition-all disabled:opacity-50 mt-2 shadow-sm shadow-emerald-100">
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Drafting green pitch...
                  </span>
                ) : 'Generate Cold Email'}
              </button>
            </form>
          </div>

          {/* History Sidebar Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-semibold text-slate-900">Recent Versions</h3>
              {history.length > 0 && <button onClick={clearHistory} className="text-xs text-red-500 hover:underline">Clear History</button>}
            </div>
            {history.length === 0 ? (
              <p className="text-xs text-slate-400">No recent history cached yet.</p>
            ) : (
              <div className="space-y-2">
                {history.map((item) => (
                  <div key={item.id} onClick={() => setGeneratedEmail(item.text)}
                    className="p-2.5 border border-slate-100 rounded-xl bg-slate-50 text-left text-xs hover:border-emerald-200 hover:bg-emerald-50/30 cursor-pointer transition-all flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-slate-700">{item.company}</p>
                      <p className="text-slate-400 text-[10px]">{item.tone}</p>
                    </div>
                    <span className="text-[10px] text-slate-400">{item.date}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Output Panel */}
        <div className="lg:col-span-7 flex flex-col h-full min-h-[500px]">
          <h2 className="text-lg font-semibold text-slate-900 mb-5 flex items-center justify-between">
            <span>Generated Copywriting Output</span>
            {generatedEmail && <span className="text-xs font-normal text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">Compiled</span>}
          </h2>

          <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[400px]">
            {error && <div className="p-4 mb-4 text-sm text-red-700 bg-red-50 rounded-lg border border-red-100">{error}</div>}

            {generatedEmail ? (
              <div className="flex flex-col h-full justify-between space-y-4">
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 overflow-y-auto flex-1">
                  <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }} className="text-sm text-slate-700 leading-relaxed tracking-wide">
                    {generatedEmail}
                  </pre>
                </div>
                
                <button onClick={() => navigator.clipboard.writeText(generatedEmail)} 
                  className="self-end inline-flex items-center gap-1.5 bg-slate-900 text-white text-xs font-medium py-2 px-4 rounded-lg hover:bg-slate-800 transition-colors shadow-sm">
                  📋 Copy Text
                </button>
              </div>
            ) : (
              <div className="m-auto text-center max-w-sm">
                <div className="text-3xl mb-2">✉️</div>
                <p className="text-sm font-medium text-slate-400">Your generated email will appear here.</p>
                <p className="text-xs text-slate-400 mt-1">Select your parameters and click generate to process layout structures.</p>
              </div>
            )}
          </div>
        </div>

      </main>
    </div>
  );
}

export default App;