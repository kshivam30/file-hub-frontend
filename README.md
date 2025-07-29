# File Hub Frontend

React-based frontend for the File Hub application, built with TypeScript and modern web technologies. Features a clean, intuitive interface with advanced file management capabilities.

## ✨ Features

- **Custom FileHub Branding**: Custom logo and favicon
- **Advanced File Filtering**: Search by name, type, size, and date with smooth UX
- **Real-time Storage Analytics**: Dashboard showing deduplication savings
- **Drag & Drop Upload**: Intuitive file upload with progress indicators
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Modern UI Components**: Built with Tailwind CSS and Heroicons

## 🚀 Technology Stack

- React 18.x with TypeScript
- TanStack Query (React Query) for data fetching and caching
- Axios for API communication
- Tailwind CSS for styling
- Heroicons for UI icons
- Custom SVG logo components
- Docker for containerization

## 📋 Prerequisites

- Node.js 18.x or higher
- npm 8.x or higher
- Docker (if using containerized setup)

## 🛠️ Installation & Setup

### Local Development

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   Create `.env.local`:
   ```env
   REACT_APP_API_URL=http://localhost:8000/api
   ```

3. **Start Development Server**
   ```bash
   npm start
   ```
   Access the application at http://localhost:3000

### Docker Setup

```bash
# Build the image
docker build -t file-hub-frontend .

# Run the container
docker run -p 3000:3000 file-hub-frontend
```

## 📁 Project Structure

```
src/
├── components/         # React components
│   ├── FileHubLogo.tsx    # Custom logo component
│   ├── FileUpload.tsx     # File upload with drag & drop
│   ├── FileList.tsx       # File listing with actions
│   ├── FileFilters.tsx    # Advanced filtering panel
│   └── StorageStats.tsx   # Storage analytics dashboard
├── services/          # API services
│   └── fileService.ts     # File management API calls
├── types/             # TypeScript types
│   └── file.ts           # File-related type definitions
└── App.tsx            # Main application component
```

## 🔧 Available Scripts

- `npm start`: Start development server with hot reloading
- `npm run build`: Build optimized production bundle
- `npm run test`: Run test suite
- `npm run eject`: Eject from Create React App (not recommended)

## 🌐 API Integration

The frontend communicates with the backend API at `http://localhost:8000/api`. Key endpoints:

- `GET /api/files/`: List files with filtering support
- `POST /api/files/`: Upload files with deduplication
- `GET /api/files/stats/`: Get storage statistics
- `GET /api/files/<id>/`: Get file details
- `DELETE /api/files/<id>/`: Delete file

### Query Parameters for File Listing
- `search`: Search files by filename
- `fileType`: Filter by MIME type
- `minSize`, `maxSize`: Filter by file size (bytes)
- `startDate`, `endDate`: Filter by upload date range

## 🎨 UI Components

### FileUpload Component
- Drag & drop file upload
- Progress indicators
- File validation
- Bold selected file names

### FileFilters Component  
- Real-time search with debouncing
- File type dropdown filtering
- Size range inputs
- Date range pickers
- Smooth focus management

### StorageStats Component
- Total uploads vs unique files
- Storage savings visualization
- Deduplication percentage
- Real-time updates

### FileList Component
- Paginated file listing
- Download and delete actions
- Upload count badges for duplicates
- Responsive grid layout

## 🔒 Environment Variables

```env
# Required
REACT_APP_API_URL=http://localhost:8000/api

# Optional
REACT_APP_MAX_FILE_SIZE=10485760  # 10MB in bytes
```

## 🐛 Troubleshooting

1. **Build Issues**
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules: `rm -rf node_modules && npm install`
   - Check Node.js version compatibility

2. **API Connection Issues**
   - Verify API URL in environment variables
   - Check CORS settings in backend
   - Ensure backend is running on correct port
   - Check browser network tab for detailed errors

3. **Filter Performance Issues**
   - Filters use debouncing (500ms) for search inputs
   - Local state management prevents focus loss
   - TanStack Query provides efficient caching

4. **Upload Issues**
   - Check file size limits (10MB default)
   - Verify file permissions
   - Check browser console for detailed errors

## 🚀 Performance Optimizations

- **TanStack Query**: Intelligent caching and background updates
- **Debounced Search**: Reduces API calls during typing
- **Optimistic Updates**: Immediate UI feedback
- **Code Splitting**: Lazy loading for better performance
- **Memoized Components**: Prevents unnecessary re-renders

## 📱 Responsive Design

- Mobile-first approach with Tailwind CSS
- Responsive grid layouts
- Touch-friendly interfaces
- Adaptive component sizing

## 📚 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Follow TypeScript best practices
4. Write tests for new components
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Create a Pull Request
