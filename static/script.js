// API Base URL
const API_BASE = '/api';

// DOM Elements
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');
const searchBtn = document.getElementById('search-btn');
const ragBtn = document.getElementById('rag-btn');
const searchQuery = document.getElementById('search-query');
const ragQuestion = document.getElementById('rag-question');
const statusIndicator = document.getElementById('status-indicator');
const statusText = document.getElementById('status-text');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    checkSystemStatus();
    // Check status every 30 seconds
    setInterval(checkSystemStatus, 30000);
});

// Tab Navigation
function setupEventListeners() {
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.dataset.tab;
            switchTab(tabName);
        });
    });
}

function switchTab(tabName) {
    // Remove active class from all tabs
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    // Add active class to selected tab
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.add('active');

    // Load system info if info tab
    if (tabName === 'info') {
        loadSystemInfo();
    }
}

// Semantic Search
async function performSearch() {
    const query = searchQuery.value.trim();
    if (!query) {
        showAlert('Please enter a search query', 'error');
        return;
    }

    const topK = parseInt(document.getElementById('top-k').value) || 5;
    
    try {
        searchBtn.disabled = true;
        searchBtn.innerHTML = '<span class="spinner"></span> Searching...';

        const response = await fetch(`${API_BASE}/search`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, top_k: topK })
        });

        if (!response.ok) throw new Error('Search failed');
        
        const data = await response.json();
        displaySearchResults(data.results, query);
    } catch (error) {
        showAlert(`Error: ${error.message}`, 'error');
        displaySearchResults([], '');
    } finally {
        searchBtn.disabled = false;
        searchBtn.innerHTML = '<i class="fas fa-search"></i> Search';
    }
}

function displaySearchResults(results, query) {
    const resultsDiv = document.getElementById('search-results');
    
    if (!results || results.length === 0) {
        resultsDiv.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <p>No results found for "${query}"</p>
            </div>
        `;
        return;
    }

    let html = `<div class="alert alert-info">
        <i class="fas fa-info-circle"></i>
        Found <strong>${results.length}</strong> relevant document(s)
    </div>`;

    results.forEach((result, index) => {
        const score = (result.score * 100).toFixed(1);
        const text = result.text || 'No text available';
        const preview = text.substring(0, 150) + (text.length > 150 ? '...' : '');

        html += `
            <div class="result-item">
                <div class="result-header">
                    <span class="result-title">Result ${index + 1}</span>
                    <span class="result-score">${score}% Match</span>
                </div>
                <p class="result-text">${preview}</p>
                <details>
                    <summary style="cursor: pointer; color: var(--primary-color); font-weight: 500;">View Full Text</summary>
                    <p style="margin-top: 0.5rem; color: var(--gray-600);">${text}</p>
                </details>
            </div>
        `;
    });

    resultsDiv.innerHTML = html;
}

// RAG Question Answering
async function performRAG() {
    const question = ragQuestion.value.trim();
    if (!question) {
        showAlert('Please enter a question', 'error');
        return;
    }

    const numContexts = parseInt(document.getElementById('num-contexts').value) || 5;
    
    try {
        ragBtn.disabled = true;
        ragBtn.innerHTML = '<span class="spinner"></span> Generating Answer...';

        const response = await fetch(`${API_BASE}/ask`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question, num_contexts: numContexts })
        });

        if (!response.ok) throw new Error('Question answering failed');
        
        const data = await response.json();
        displayRAGResults(data);
    } catch (error) {
        showAlert(`Error: ${error.message}`, 'error');
    } finally {
        ragBtn.disabled = false;
        ragBtn.innerHTML = '<i class="fas fa-brain"></i> Get Answer';
    }
}

function displayRAGResults(data) {
    const resultsDiv = document.getElementById('rag-results');
    
    if (!data.answer) {
        resultsDiv.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-lightbulb"></i>
                <p>No answer generated</p>
            </div>
        `;
        return;
    }

    let html = `
        <div class="rag-answer">
            <h3><i class="fas fa-lightbulb"></i> Answer</h3>
            <p>${escapeHtml(data.answer)}</p>
        </div>
    `;

    if (data.sources && data.sources.length > 0) {
        html += `
            <div class="sources">
                <h4><i class="fas fa-book"></i> Retrieved Sources</h4>
                <ul class="source-list">
                    ${data.sources.map((source, idx) => 
                        `<li>${idx + 1}. ${escapeHtml(source)}</li>`
                    ).join('')}
                </ul>
            </div>
        `;
    }

    resultsDiv.innerHTML = html;
}

// System Status
async function checkSystemStatus() {
    try {
        const response = await fetch(`${API_BASE}/health`);
        const data = await response.json();
        
        const isHealthy = data.status === 'healthy';
        updateStatusUI(isHealthy);
    } catch (error) {
        updateStatusUI(false);
    }
}

function updateStatusUI(isHealthy) {
    if (isHealthy) {
        statusIndicator.classList.add('healthy');
        statusIndicator.classList.remove('offline');
        statusText.textContent = 'System Online';
    } else {
        statusIndicator.classList.remove('healthy');
        statusIndicator.classList.add('offline');
        statusText.textContent = 'Endee Offline';
    }
}

async function loadSystemInfo() {
    const infoDiv = document.getElementById('system-info');
    
    try {
        const response = await fetch(`${API_BASE}/status`);
        const data = await response.json();

        let html = '';
        
        if (data.database) {
            html += `
                <div class="info-card">
                    <div class="label">Database</div>
                    <div class="value">${data.database.name}</div>
                </div>
                <div class="info-card">
                    <div class="label">Host</div>
                    <div class="value">${data.database.host}:${data.database.port}</div>
                </div>
            `;

            if (data.database.stats && data.database.stats.points_count !== undefined) {
                html += `
                    <div class="info-card">
                        <div class="label">Documents Indexed</div>
                        <div class="value">${data.database.stats.points_count}</div>
                    </div>
                `;
            }
        }

        infoDiv.innerHTML = html || '<p>Unable to load system information</p>';
    } catch (error) {
        infoDiv.innerHTML = '<p>Error loading system information</p>';
    }
}

// Utilities
function showAlert(message, type = 'info') {
    // Better to use this in a more sophisticated way, but for now just log
    console.log(`[${type.toUpperCase()}] ${message}`);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Keyboard Shortcuts
function handleSearchKeypress(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        performSearch();
    }
}

// Handle RAG textarea enter
document.addEventListener('DOMContentLoaded', () => {
    const ragQuestion = document.getElementById('rag-question');
    if (ragQuestion) {
        ragQuestion.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' && event.ctrlKey) {
                performRAG();
            }
        });
    }
});