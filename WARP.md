# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

SweetText is a pastel-themed, girly web application that transforms PDF content into polished, human-sounding writing using AI services. The app guides users through a pipeline of GPT generation, HumanizeAI smoothing, and ZeroGPT verification with a charming, approachable interface.

## Commands

### Development
- `npm install` - Install all dependencies
- `npm run dev` - Start development server on port 3000 with live reload
- `npm start` - Start basic live server on port 3000

### Build & Test (placeholders)
- `npm run build` - Build process (currently echoes placeholder message)
- `npm test` - Run tests (currently echoes placeholder message)

### Single File Development
- Open `index.html` directly in browser for static development
- Use browser dev tools to test JavaScript functionality
- Modify CSS in `css/styles.css` for styling changes

## Architecture Overview

### Core Structure
This is a **client-side single-page application (SPA)** built with vanilla JavaScript, HTML, and CSS. The app follows a class-based architecture with a single main `SweetTextApp` class that manages all application state and functionality.

### Key Components

**Main Application Class** (`js/app.js`):
- `SweetTextApp` - Central controller class handling all app functionality
- Manages processing pipeline state through `processingSteps` array
- Handles file uploads, UI updates, and API placeholders
- Uses event-driven architecture for user interactions

**Processing Pipeline**:
The app implements a 5-step processing workflow:
1. PDF Upload & Validation
2. GPT Content Generation  
3. HumanizeAI Content Smoothing
4. ZeroGPT Human-like Verification
5. Download/Export Completion

**State Management**:
- `currentFile` - Stores uploaded PDF file object
- `processedContent` - Stores generated/processed text content
- `currentStep` - Tracks pipeline progress (0-5)
- `localStorage` - Persists user statistics across sessions

**UI System**:
- **Toast Notifications** - Real-time user feedback system
- **Pipeline Visualization** - Step-by-step progress display with animations
- **Drag & Drop Interface** - File upload with visual feedback
- **Responsive Grid Layout** - Dashboard statistics and content areas

### Design System

**CSS Architecture** (`css/styles.css`):
- **CSS Custom Properties** - Comprehensive design token system
- **Pastel Color Palette** - Pink-centric theme with mint, purple, blue, peach accents
- **Component-based Styling** - Each UI section has dedicated styles
- **Animation System** - Keyframe animations for interactions (heartbeat, float, pulse, spin)

**Color System**:
- Primary: Pink shades (`--primary-pink`, `--primary-pink-light`, `--primary-pink-dark`)
- Secondary: Complementary pastels (`--secondary-purple`, `--secondary-mint`, etc.)
- Gradients: Multiple predefined gradients for backgrounds and buttons

**Typography**:
- Primary: 'Poppins' for body text
- Secondary: 'Quicksand' for headings and branding
- Font Awesome icons throughout the interface

### API Integration Points

The application includes placeholder methods for future API integrations:
- `callGPTAPI()` - OpenAI GPT integration
- `callHumanizeAPI()` - HumanizeAI service integration  
- `callZeroGPTAPI()` - ZeroGPT verification service
- `extractPDFContent()` - PDF.js content extraction

All API calls are currently mocked with simulated delays and response data.

### File Processing

**PDF Handling**:
- File validation (type: application/pdf, size: max 10MB)
- Drag & drop and click-to-upload interfaces
- Visual feedback during upload process
- Currently uses placeholder extraction logic

**Content Management**:
- Text processing pipeline with multiple AI service steps
- Content preview with formatted display
- Export functionality (download as .txt file)
- Copy-to-clipboard support with fallback for older browsers

## Development Patterns

### Event System
The app uses a centralized event binding system in `bindEvents()` method. All DOM interactions are managed through this single point of control.

### Error Handling
- Global error handler captures uncaught exceptions
- User-friendly toast notifications for all error states
- Graceful degradation for browser compatibility issues

### Animation & Feedback
- Extensive use of CSS transitions and keyframe animations
- Loading states with spinners during processing
- Success celebrations with dynamic emoji animations
- Hover effects and visual feedback throughout

### Local Storage
Statistics are persisted using localStorage with error handling:
- PDF processing count
- AI generation count
- Completed processing count

### Responsive Design
Mobile-first approach with breakpoints at 768px for tablet/mobile layouts.

## Future Development Notes

### Planned Integrations
- OpenAI GPT API for content generation
- HumanizeAI API for content smoothing
- ZeroGPT API for verification
- PDF.js for actual PDF content extraction

### Current Limitations
- No actual PDF processing (placeholder extraction)
- No real AI service integration (simulated responses)
- No user authentication or data persistence beyond localStorage
- No batch processing capabilities

### Extension Points
- API service configuration in environment variables
- User history and project management
- Export format options (PDF, DOCX, HTML)
- Custom AI prompt templates
- Progress saving and resume functionality