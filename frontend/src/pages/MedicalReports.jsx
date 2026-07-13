import React, { useState, useCallback } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { medicalReportService } from '../services/medicalReportService';

const MedicalReports = () => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }, []);

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleBrowseClick = () => {
    document.getElementById('file-upload').click();
  };

  const handleFiles = (fileList) => {
    const newFiles = Array.from(fileList).map(file => ({
      file,
      id: Date.now() + Math.random(),
      status: 'pending'
    }));
    setFiles(prev => [...prev, ...newFiles]);
  };

  const uploadFile = async (fileObj) => {
    setUploading(true);
    setError('');
    
    try {
      const response = await medicalReportService.upload(fileObj.file);
      setFiles(prev => prev.map(f => 
        f.id === fileObj.id ? { ...f, status: 'uploaded', ...response } : f
      ));
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to upload file. Please try again.');
      setFiles(prev => prev.map(f => 
        f.id === fileObj.id ? { ...f, status: 'error' } : f
      ));
    } finally {
      setUploading(false);
    }
  };

  const removeFile = (id) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload Medical Reports</h2>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-4">
            {error}
          </div>
        )}
        
        <div
          className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
            dragActive 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-blue-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="text-5xl mb-4">📄</div>
          <p className="text-gray-600 mb-2">
            Drag and drop your medical reports here
          </p>
          <p className="text-gray-500 text-sm mb-4">
            Supports PDF, JPG, PNG files
          </p>
          <input
            type="file"
            multiple
            onChange={handleChange}
            className="hidden"
            id="file-upload"
            accept=".pdf,.jpg,.jpeg,.png"
          />
          <Button 
            variant="secondary" 
            size="md" 
            onClick={handleBrowseClick}
            type="button"
          >
            Browse Files
          </Button>
        </div>
      </Card>

      {files.length > 0 && (
        <Card>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Uploaded Files</h3>
          <div className="space-y-3">
            {files.map((fileObj) => (
              <div
                key={fileObj.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">📋</div>
                  <div>
                    <p className="font-medium text-gray-800">{fileObj.file.name}</p>
                    <p className="text-sm text-gray-500">
                      {(fileObj.file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {fileObj.status === 'pending' && (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => uploadFile(fileObj)}
                      disabled={uploading}
                    >
                      {uploading ? 'Uploading...' : 'Upload'}
                    </Button>
                  )}
                  {fileObj.status === 'uploaded' && (
                    <span className="text-green-600 text-sm font-medium">✓ Uploaded</span>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(fileObj.id)}
                  >
                    ✕
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Upload Status</h3>
        <div className="bg-blue-50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="text-3xl">📊</div>
            <div>
              <p className="font-medium text-gray-800">Total Files: {files.length}</p>
              <p className="text-sm text-gray-600">
                Uploaded: {files.filter(f => f.status === 'uploaded').length}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MedicalReports;
