// ===== SWEETTEXT APPLICATION =====
class SweetTextApp {
    constructor() {
        this.currentFile = null;
        this.processingSteps = [
            { id: 1, name: 'upload', status: 'pending' },
            { id: 2, name: 'gpt', status: 'pending' },
            { id: 3, name: 'humanize', status: 'pending' },
            { id: 4, name: 'zerogpt', status: 'pending' },
            { id: 5, name: 'complete', status: 'pending' }
        ];
        this.currentStep = 0;
        this.processedContent = '';
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateStats();
        this.showWelcomeAnimation();
    }

    // ===== EVENT BINDING =====
    bindEvents() {
        // File upload events
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('fileInput');
        const uploadBtn = document.getElementById('uploadBtn');

        // Upload button click
        uploadBtn?.addEventListener('click', () => {
            fileInput?.click();
        });

        // File input change
        fileInput?.addEventListener('change', (e) => {
            this.handleFileUpload(e.target.files[0]);
        });

        // Drag and drop events
        uploadArea?.addEventListener('click', () => {
            fileInput?.click();
        });

        uploadArea?.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('drag-over');
        });

        uploadArea?.addEventListener('dragleave', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('drag-over');
        });

        uploadArea?.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('drag-over');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                this.handleFileUpload(files[0]);
            }
        });

        // Navigation events
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleNavigation(link.getAttribute('href'));
            });
        });

        // Results actions
        document.getElementById('downloadBtn')?.addEventListener('click', () => {
            this.downloadContent();
        });

        document.getElementById('copyBtn')?.addEventListener('click', () => {
            this.copyContent();
        });
    }

    // ===== FILE HANDLING =====
    async handleFileUpload(file) {
        if (!file) return;

        // Validate file type
        if (file.type !== 'application/pdf') {
            this.showToast('Please select a PDF file', 'error');
            return;
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            this.showToast('File size must be less than 10MB', 'error');
            return;
        }

        this.currentFile = file;
        this.showToast(`File "${file.name}" uploaded successfully! 💖`, 'success');
        
        // Update UI
        this.updateUploadedFileUI(file);
        this.showPipeline();
        
        // Start processing
        await this.startProcessing();
    }

    updateUploadedFileUI(file) {
        const uploadContent = document.querySelector('.upload-content');
        const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
        
        uploadContent.innerHTML = `
            <i class="fas fa-file-pdf upload-icon" style="color: var(--secondary-mint);"></i>
            <p class="upload-text">📄 ${file.name}</p>
            <p class="upload-subtext">${fileSizeMB} MB • Ready for processing</p>
            <button class="upload-btn" onclick="sweetTextApp.selectNewFile()">
                <i class="fas fa-sync"></i>
                Choose Different File
            </button>
        `;
    }

    selectNewFile() {
        document.getElementById('fileInput').click();
    }

    // ===== PROCESSING WORKFLOW =====
    async startProcessing() {
        this.currentStep = 1;
        this.updatePipelineStep(1, 'completed');
        
        // Simulate processing steps
        await this.sleep(1000);
        await this.processWithGPT();
        
        await this.sleep(2000);
        await this.processWithHumanizeAI();
        
        await this.sleep(2000);
        await this.processWithZeroGPT();
        
        await this.sleep(1000);
        this.completeProcessing();
    }

    async processWithGPT() {
        this.currentStep = 2;
        this.updatePipelineStep(2, 'active');
        this.showToast('Generating human-like content with GPT... 🤖', 'info');
        
        // Simulate GPT processing
        await this.sleep(3000);
        
        // Mock GPT result
        this.processedContent = `Here's your beautifully transformed content from the PDF! ✨

The document has been carefully processed and rewritten to sound naturally human while maintaining all the important information. Our advanced AI has enhanced the readability and flow, making it feel like it was written by a friendly, knowledgeable person rather than extracted from a formal document.

Key improvements include:
• Natural, conversational tone
• Better sentence structure and flow  
• Enhanced clarity and readability
• Maintained factual accuracy
• Added warmth and personality

This content is now ready for the next step in our adorable processing pipeline! 💖`;

        this.updatePipelineStep(2, 'completed');
        this.showToast('GPT processing completed! ✨', 'success');
    }

    async processWithHumanizeAI() {
        this.currentStep = 3;
        this.updatePipelineStep(3, 'active');
        this.showToast('Smoothing content with HumanizeAI... 💫', 'info');
        
        // Simulate HumanizeAI processing
        await this.sleep(2500);
        
        // Enhance the content further
        this.processedContent += `\n\nAfter HumanizeAI processing, the content now flows even more naturally! The text has been refined to eliminate any remaining AI-like patterns and enhanced with subtle human touches that make it feel genuinely authentic.

The content now includes:
🌸 Natural variations in sentence length
🌸 Organic word choices and phrasing
🌸 Authentic transitions between ideas
🌸 Human-like emphasis and tone`;

        this.updatePipelineStep(3, 'completed');
        this.showToast('HumanizeAI smoothing completed! 🌸', 'success');
    }

    async processWithZeroGPT() {
        this.currentStep = 4;
        this.updatePipelineStep(4, 'active');
        this.showToast('Verifying human-like quality with ZeroGPT... 🛡️', 'info');
        
        // Simulate ZeroGPT checking
        await this.sleep(2000);
        
        // Mock verification results
        const humanScore = 94;
        this.processedContent += `\n\n🛡️ ZeroGPT Verification Results:
Human-like Score: ${humanScore}%
Status: ✅ Passed verification
Quality: Excellent - reads naturally and authentically

Your content has successfully passed our rigorous human-like quality checks! It's now ready for download and use. 💖`;

        this.updatePipelineStep(4, 'completed');
        this.showToast(`ZeroGPT verification passed! (${humanScore}% human-like) 🎉`, 'success');
    }

    completeProcessing() {
        this.currentStep = 5;
        this.updatePipelineStep(5, 'completed');
        this.showResults();
        this.updateStats();
        this.showToast('Processing complete! Your beautiful content is ready! 💖✨', 'success');
        
        // Add celebration animation
        this.addCelebrationAnimation();
    }

    // ===== UI UPDATES =====
    showPipeline() {
        const pipelineSection = document.getElementById('pipelineSection');
        if (pipelineSection) {
            pipelineSection.style.display = 'block';
            pipelineSection.classList.add('fade-in');
        }
    }

    updatePipelineStep(stepNumber, status) {
        const step = document.querySelector(`[data-step="${stepNumber}"]`);
        if (!step) return;

        // Remove all status classes
        step.classList.remove('active', 'completed', 'pending');
        
        // Add new status class
        step.classList.add(status);

        // Update status icon/spinner
        const statusElement = step.querySelector('.step-status');
        if (status === 'active') {
            statusElement.innerHTML = '<div class="loading-spinner"></div>';
        } else if (status === 'completed') {
            statusElement.innerHTML = '<i class="fas fa-check"></i>';
        } else {
            statusElement.innerHTML = '<div class="loading-spinner"></div>';
        }
    }

    showResults() {
        const resultsSection = document.getElementById('resultsSection');
        const contentPreview = document.getElementById('contentPreview');
        
        if (resultsSection && contentPreview) {
            contentPreview.innerHTML = `<pre style="white-space: pre-wrap; font-family: inherit;">${this.processedContent}</pre>`;
            resultsSection.style.display = 'block';
            resultsSection.classList.add('fade-in');
            
            // Scroll to results
            setTimeout(() => {
                resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);
        }
    }

    updateStats() {
        // Get stats from localStorage or use defaults
        const stats = this.getStats();
        
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach((element, index) => {
            const values = [stats.pdfsProcessed, stats.aiGenerations, stats.completed];
            if (element && values[index] !== undefined) {
                this.animateNumber(element, values[index]);
            }
        });
    }

    getStats() {
        const defaultStats = { pdfsProcessed: 0, aiGenerations: 0, completed: 0 };
        try {
            return JSON.parse(localStorage.getItem('sweetTextStats') || JSON.stringify(defaultStats));
        } catch {
            return defaultStats;
        }
    }

    updateStatsStorage(increment = {}) {
        const stats = this.getStats();
        if (increment.pdfsProcessed) stats.pdfsProcessed += increment.pdfsProcessed;
        if (increment.aiGenerations) stats.aiGenerations += increment.aiGenerations;
        if (increment.completed) stats.completed += increment.completed;
        
        localStorage.setItem('sweetTextStats', JSON.stringify(stats));
        this.updateStats();
    }

    animateNumber(element, targetNumber) {
        const currentNumber = parseInt(element.textContent) || 0;
        if (currentNumber === targetNumber) return;
        
        const increment = targetNumber > currentNumber ? 1 : -1;
        const duration = Math.abs(targetNumber - currentNumber) * 100;
        const stepTime = Math.max(duration / Math.abs(targetNumber - currentNumber), 50);
        
        let current = currentNumber;
        const timer = setInterval(() => {
            current += increment;
            element.textContent = current;
            
            if (current === targetNumber) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    // ===== NAVIGATION =====
    handleNavigation(href) {
        // Remove active class from all nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to clicked link
        document.querySelector(`[href="${href}"]`)?.classList.add('active');
        
        // Handle navigation logic (placeholder for now)
        switch (href) {
            case '#dashboard':
                this.showToast('Welcome back to your dashboard! 💖', 'info');
                break;
            case '#upload':
                document.querySelector('.upload-section')?.scrollIntoView({ behavior: 'smooth' });
                break;
            case '#history':
                this.showToast('History feature coming soon! 🌸', 'info');
                break;
        }
    }

    // ===== ACTIONS =====
    downloadContent() {
        if (!this.processedContent) {
            this.showToast('No content available for download', 'error');
            return;
        }

        const blob = new Blob([this.processedContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        
        a.href = url;
        a.download = `sweettext-processed-${new Date().getTime()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showToast('Content downloaded successfully! 💖', 'success');
        this.updateStatsStorage({ completed: 1 });
    }

    async copyContent() {
        if (!this.processedContent) {
            this.showToast('No content available to copy', 'error');
            return;
        }

        try {
            await navigator.clipboard.writeText(this.processedContent);
            this.showToast('Content copied to clipboard! ✨', 'success');
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = this.processedContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showToast('Content copied to clipboard! ✨', 'success');
        }
    }

    // ===== NOTIFICATIONS =====
    showToast(message, type = 'info') {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const iconMap = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };

        toast.innerHTML = `
            <i class="${iconMap[type] || iconMap.info}"></i>
            <span>${message}</span>
        `;

        toastContainer.appendChild(toast);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => {
                    toastContainer.removeChild(toast);
                }, 300);
            }
        }, 5000);
    }

    // ===== ANIMATIONS =====
    showWelcomeAnimation() {
        const welcomeSection = document.querySelector('.welcome-section');
        if (welcomeSection) {
            welcomeSection.classList.add('fade-in');
        }
    }

    addCelebrationAnimation() {
        // Add some sparkle effects
        const celebration = document.createElement('div');
        celebration.innerHTML = '✨💖🌸💫✨';
        celebration.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 3rem;
            z-index: 1000;
            animation: celebration 2s ease-in-out;
            pointer-events: none;
        `;
        
        // Add celebration keyframes if they don't exist
        if (!document.querySelector('#celebration-style')) {
            const style = document.createElement('style');
            style.id = 'celebration-style';
            style.textContent = `
                @keyframes celebration {
                    0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
                    50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
                    100% { opacity: 0; transform: translate(-50%, -50%) scale(1) rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(celebration);
        
        setTimeout(() => {
            if (celebration.parentNode) {
                document.body.removeChild(celebration);
            }
        }, 2000);
    }

    // ===== UTILITY FUNCTIONS =====
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // ===== AI SERVICE PLACEHOLDERS =====
    
    // GPT API Integration (placeholder)
    async callGPTAPI(content) {
        // TODO: Implement actual GPT API integration
        console.log('GPT API called with content:', content);
        return 'GPT processed content placeholder';
    }

    // HumanizeAI API Integration (placeholder)
    async callHumanizeAPI(content) {
        // TODO: Implement actual HumanizeAI API integration
        console.log('HumanizeAI API called with content:', content);
        return 'HumanizeAI processed content placeholder';
    }

    // ZeroGPT API Integration (placeholder)
    async callZeroGPTAPI(content) {
        // TODO: Implement actual ZeroGPT API integration
        console.log('ZeroGPT API called with content:', content);
        return { humanLikeness: 94, passed: true };
    }

    // PDF Processing (placeholder)
    async extractPDFContent(file) {
        // TODO: Implement actual PDF.js integration
        console.log('PDF processing for file:', file.name);
        return 'Extracted PDF content placeholder';
    }
}

// ===== INITIALIZE APPLICATION =====
let sweetTextApp;

document.addEventListener('DOMContentLoaded', () => {
    sweetTextApp = new SweetTextApp();
    
    // Add some welcome messages
    setTimeout(() => {
        sweetTextApp.showToast('Welcome to SweetText! Ready to transform your PDFs? 💖', 'info');
    }, 1000);
});

// ===== GLOBAL ERROR HANDLING =====
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    if (sweetTextApp) {
        sweetTextApp.showToast('Oops! Something went wrong. Please try again. 🌸', 'error');
    }
});

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SweetTextApp;
}