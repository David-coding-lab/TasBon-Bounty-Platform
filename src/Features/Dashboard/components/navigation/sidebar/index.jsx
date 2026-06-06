import React, { useState } from 'react'

const Sidebar = () => {
  const menuItems = [
    { icon: '🏠', label: 'Dashboard', active: true },
    { icon: '🎯', label: 'Bounties' },
    { icon: '📝', label: 'Applications' },
    { icon: '🏆', label: 'Hackathons' },
    { icon: '💰', label: 'Grants' },
    { icon: '💵', label: 'Earnings' },
    { icon: '💬', label: 'Messages' },
    { icon: '🔖', label: 'Bookmarks' },
    { icon: '⚙️', label: 'Settings' },
  ]

  return (
    <aside className="sidebar">
      <div className="logo">
        <span className="logo-icon">T</span>
        <span>TASBUN</span>
      </div>

      <nav>
        {menuItems.map((item, idx) => (
          <div key={idx} className={`nav-item ${item.active ? 'active' : ''}`}>
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </nav>

      <div className="host-bounty">
        <div className="gift-icon">🎁</div>
        <h4>Host a bounty</h4>
        <p>Get high-quality solutions from skilled builders</p>
        <button className="create-btn">Create bounty →</button>
      </div>
    </aside>
  )
}

export default function Dashboard() {
  const stats = [
    {
      label: 'Total Earnings',
      value: '$2,450.00',
      change: '+9.5% this month',
      icon: '↗️',
    },
    { label: 'Active Bounties', value: '4', change: 'In progress', icon: '⋯' },
    { label: 'Applications', value: '12', change: '5 new updates', icon: '' },
    { label: 'Success Rate', value: '78%', change: '+5% this month', icon: '' },
  ]

  const recommended = [
    {
      title: 'Audit DeFi Protocol Smart Contracts',
      client: 'Nexus Protocol',
      amount: '$1,200 USDC',
      level: 'Intermediate',
      tag: 'Smart Contract',
    },
    {
      title: 'Build Analytics Dashboard for DAO',
      client: 'LayerOne',
      amount: '$750 USDC',
      level: 'Intermediate',
      tag: 'Frontend',
    },
    {
      title: 'Integrate Wallet Connect for Web App',
      client: 'DAO Collective',
      amount: '$600 USDC',
      level: 'Beginner',
      tag: 'Web3',
    },
  ]

  const activeBounties = [
    {
      bounty: 'Build a DeFi Analytics Dashboard',
      client: 'Nexus Protocol',
      reward: '$500 USDC',
      due: 'Jun 15, 2025',
    },
    {
      bounty: 'Smart Contract Audit Tool',
      client: 'LayerOne',
      reward: '$1,200 USDC',
      due: 'Jun 22, 2025',
    },
    {
      bounty: 'Community Voting DApp',
      client: 'DAO Collective',
      reward: '$300 USDC',
      due: 'Jun 30, 2025',
    },
    {
      bounty: 'Wallet Integration for dApp',
      client: 'Web3Labs',
      reward: '$450 USDC',
      due: 'Jul 06, 2025',
    },
  ]

  return (
    <div className="dashboard">
      <Sidebar />

      <main className="main-content">
        <header className="topbar">
          <div className="search-box">
            <span>🔍</span>
            <input type="text" placeholder="Search..." />
          </div>
          <div className="user-menu">
            <span>🔔</span>
            <div className="user-info">
              <span>Alex Rivera</span>
              <span>▼</span>
            </div>
          </div>
        </header>

        <div className="content-grid">
          <div className="left-panel">
            <h1>Welcome back, Alex 👋</h1>
            <p className="subtitle">
              Discover opportunities, build solutions, and earn rewards.
            </p>

            <div className="stats-grid">
              {stats.map((stat, idx) => (
                <div key={idx} className="stat-card">
                  <div className="stat-header">
                    <span>{stat.label}</span>
                    {stat.icon && <span>{stat.icon}</span>}
                  </div>
                  <h2>{stat.value}</h2>
                  <span className="stat-change">{stat.change}</span>
                </div>
              ))}
            </div>

            <section>
              <div className="section-header">
                <h3>Recommended for you</h3>
                <button>View all →</button>
              </div>
              <div className="bounty-cards">
                {recommended.map((item, idx) => (
                  <div key={idx} className="bounty-card">
                    <div className="bounty-img"></div>
                    <span className="tag">{item.tag}</span>
                    <h4>{item.title}</h4>
                    <p className="client">● {item.client}</p>
                    <h3>{item.amount}</h3>
                    <span className="level">● {item.level}</span>
                    <button className="view-btn">View bounty →</button>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="section-header">
                <h3>Active Bounties</h3>
                <button>View all →</button>
              </div>
              <table className="bounty-table">
                <thead>
                  <tr>
                    <th>BOUNTY</th>
                    <th>CLIENT</th>
                    <th>REWARD</th>
                    <th>DUE DATE</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {activeBounties.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.bounty}</td>
                      <td>{item.client}</td>
                      <td>{item.reward}</td>
                      <td>{item.due}</td>
                      <td>
                        <button className="submit-btn">Submit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>

          <div className="right-panel">
            <div className="profile-card">
              <img src="https://i.pravatar.cc/60" alt="Alex" />
              <div>
                <h4>Alex Rivera</h4>
                <span>Builder</span>
              </div>
              <div className="xp-bar">
                <div className="xp-fill"></div>
                <span>1250 / 2500 XP</span>
              </div>
            </div>

            <section>
              <div className="section-header">
                <h3>Top bounty creators</h3>
                <button>View all →</button>
              </div>
              {[
                'Nexus Protocol',
                'LayerOne',
                'DAO Collective',
                'Web3Labs',
                'ChainGuard',
              ].map((name, idx) => (
                <div key={idx} className="creator-item">
                  <span className="rank">{idx + 1}</span>
                  <span>{name}</span>
                </div>
              ))}
            </section>

            <section>
              <h3>Recent activity</h3>
              <div className="activity">
                <p>💰 You earned $180 USDC from completing a bounty</p>
                <p>🏆 Your application for Web3 Social Grant was shortlisted</p>
                <p>✨ New bounty match for your skills</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Inter, -apple-system, sans-serif; background: #f8fafc; }
        
        .dashboard { display: flex; min-height: 100vh; }
        
        .sidebar { width: 240px; background: white; padding: 24px; border-right: 1px solid #e2e8f0; }
        .logo { display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 18px; margin-bottom: 32px; }
        .logo-icon { background: #10b981; color: white; width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
        .nav-item { display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: 8px; cursor: pointer; color: #64748b; margin-bottom: 4px; }
        .nav-item.active { background: #f0fdf4; color: #10b981; font-weight: 600; }
        .host-bounty { margin-top: 40px; background: #10b981; color: white; padding: 20px; border-radius: 12px; }
        .gift-icon { font-size: 32px; margin-bottom: 8px; }
        .create-btn { width: 100%; padding: 10px; background: white; color: #10b981; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; margin-top: 12px; }
        
        .main-content { flex: 1; padding: 32px; overflow-y: auto; }
        .topbar { display: flex; justify-content: space-between; margin-bottom: 32px; }
        .search-box { display: flex; align-items: center; gap: 8px; background: white; padding: 10px 16px; border-radius: 8px; width: 300px; }
        .search-box input { border: none; outline: none; flex: 1; }
        .user-menu { display: flex; align-items: center; gap: 16px; }
        
        .content-grid { display: grid; grid-template-columns: 1fr 320px; gap: 32px; }
        h1 { font-size: 28px; margin-bottom: 8px; }
        .subtitle { color: #64748b; margin-bottom: 32px; }
        
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 40px; }
        .stat-card { background: white; padding: 20px; border-radius: 12px; }
        .stat-header { display: flex; justify-content: space-between; color: #64748b; font-size: 14px; margin-bottom: 8px; }
        .stat-card h2 { font-size: 28px; margin-bottom: 4px; }
        .stat-change { font-size: 13px; color: #10b981; }
        
        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
        .section-header h3 { font-size: 18px; }
        .section-header button { color: #10b981; background: none; border: none; cursor: pointer; }
        
        .bounty-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 40px; }
        .bounty-card { background: white; padding: 16px; border-radius: 12px; }
        .bounty-img { height: 120px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; margin-bottom: 12px; }
        .tag { font-size: 12px; color: #64748b; }
        .bounty-card h4 { margin: 8px 0; font-size: 16px; }
        .client { font-size: 13px; color: #64748b; margin-bottom: 8px; }
        .bounty-card h3 { color: #10b981; margin-bottom: 8px; }
        .level { font-size: 13px; color: #64748b; display: block; margin-bottom: 12px; }
        .view-btn { width: 100%; padding: 10px; background: #10b981; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; }
        
        .bounty-table { width: 100%; background: white; border-radius: 12px; overflow: hidden; }
        .bounty-table th { text-align: left; padding: 16px; background: #f8fafc; font-size: 12px; color: #64748b; }
        .bounty-table td { padding: 16px; border-top: 1px solid #e2e8f0; }
        .submit-btn { padding: 6px 16px; background: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 13px; }
        
        .right-panel { display: flex; flex-direction: column; gap: 24px; }
        .profile-card { background: #065f46; color: white; padding: 20px; border-radius: 12px; }
        .profile-card img { border-radius: 50%; margin-bottom: 12px; }
        .xp-bar { background: rgba(255,255,255,0.2); height: 6px; border-radius: 3px; margin-top: 12px; position: relative; }
        .xp-fill { background: white; width: 50%; height: 100%; border-radius: 3px; }
        .xp-bar span { position: absolute; top: -20px; right: 0; font-size: 12px; }
        
        .creator-item { display: flex; gap: 12px; padding: 12px 0; }
        .rank { color: #64748b; width: 20px; }
        .activity p { padding: 12px 0; font-size: 14px; color: #475569; }
      `}</style>
    </div>
  )
}
