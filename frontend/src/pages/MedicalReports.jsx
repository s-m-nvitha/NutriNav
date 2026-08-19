import React, { useState, useCallback } from 'react';
import medicalImage from '../assets/nn_uploadfile.png';
import Card from '../components/Card';
import Button from '../components/Button';
import { medicalReportService } from '../services/medicalReportService';
import { useNavigate } from 'react-router-dom';

const MedicalReports = () => {
  const navigate = useNavigate();

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

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  }, []);

  const handleChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleBrowseClick = () => {
    document.getElementById('file-upload').click();
  };

  const handleFiles = (fileList) => {
    const newFiles = Array.from(fileList).map((file) => ({
      file,
      id: Date.now() + Math.random(),
      status: 'pending',
    }));

    setFiles((prev) => [...prev, ...newFiles]);
  };

  const uploadFile = async (fileObj) => {
    setUploading(true);
    setError('');

    try {
      const response = await medicalReportService.upload(fileObj.file);

      setFiles((prev) =>
        prev.map((f) =>
          f.id === fileObj.id
            ? { ...f, status: 'uploaded', ...response }
            : f
        )
      );

      navigate('/results');
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          'Failed to upload file. Please try again.'
      );

      setFiles((prev) =>
        prev.map((f) =>
          f.id === fileObj.id
            ? { ...f, status: 'error' }
            : f
        )
      );
    } finally {
      setUploading(false);
    }
  };

  const removeFile = (id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="space-y-2 -mt-0">

      {/* =========================================
          UPLOAD MEDICAL REPORTS
      ========================================== */}

      <Card className="!p-5">

        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Upload Medical Reports
        </h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-xl mb-3">
            {error}
          </div>
        )}

        {/* =====================================
            GREEN UPLOAD BOX
        ====================================== */}

        <div
          className={`relative overflow-hidden rounded-3xl border-2 border-dashed transition-all duration-300 ${
            dragActive
              ? 'border-green-300 bg-[#07543b]'
              : 'border-green-600/70 bg-[#043d2c]'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >

          {/* Decorative glow */}

          <div className="absolute -top-16 -left-16 w-48 h-48 bg-green-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-green-400/10 rounded-full blur-3xl pointer-events-none" />

          {/* Inner dashed border */}

          <div className="absolute inset-4 rounded-2xl border border-dashed border-green-500/50 pointer-events-none" />


          {/* MAIN CONTENT */}

          <div className="relative z-10 px-6 py-6 md:px-8 md:py-7">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-center">

              {/* =================================
                  LEFT - IMAGE
              ================================== */}

              <div className="flex justify-center items-center">

                <div className="relative flex justify-center items-center">

                  <div className="absolute w-56 h-56 bg-green-400/10 rounded-full blur-3xl" />

                  <img
                    src={medicalImage}
                    alt="Medical report upload illustration"
                    className="relative z-10 w-52 md:w-60 lg:w-[280px] max-h-[220px] object-contain drop-shadow-2xl"
                  />

                </div>

              </div>


              {/* =================================
                  RIGHT - UPLOAD CONTENT
              ================================== */}

              <div className="text-center flex flex-col items-center justify-center">

                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  Drag and drop your medical
                  <span className="block">
                    reports here
                  </span>
                </h3>

                <p className="text-green-100 text-sm md:text-base mb-1">
                  Supports PDF, JPG, PNG files
                </p>

                <p className="text-green-200/70 text-xs mb-4">
                  (Max size: 20MB)
                </p>


                {/* Hidden input */}

                <input
                  type="file"
                  multiple
                  onChange={handleChange}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.jpg,.jpeg,.png"
                />


                {/* Browse Button */}

                <Button
                  variant="primary"
                  size="md"
                  onClick={handleBrowseClick}
                  type="button"
                  className="rounded-full px-7 py-2.5"
                >
                  📁 &nbsp; Browse Files
                </Button>

              </div>

            </div>


            {/* =================================
                FEATURE ROW
            ================================== */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5 px-1 md:px-4">

              {/* Secure */}

              <div className="flex items-center gap-3 text-white">

                <div className="w-10 h-10 flex-shrink-0 rounded-full border border-green-400/30 bg-green-500/10 flex items-center justify-center text-lg">
                  🛡️
                </div>

                <div>
                  <p className="font-semibold text-xs md:text-sm">
                    Your data is secure
                  </p>

                  <p className="text-[11px] md:text-xs text-green-100/70">
                    We protect your privacy
                  </p>
                </div>

              </div>


              {/* AI Analysis */}

              <div className="flex items-center gap-3 text-white">

                <div className="w-10 h-10 flex-shrink-0 rounded-full border border-green-400/30 bg-green-500/10 flex items-center justify-center text-lg">
                  🧠
                </div>

                <div>
                  <p className="font-semibold text-xs md:text-sm">
                    AI-Powered Analysis
                  </p>

                  <p className="text-[11px] md:text-xs text-green-100/70">
                    Get accurate insights
                  </p>
                </div>

              </div>


              {/* Fast */}

              <div className="flex items-center gap-3 text-white">

                <div className="w-10 h-10 flex-shrink-0 rounded-full border border-green-400/30 bg-green-500/10 flex items-center justify-center text-lg">
                  ⚡
                </div>

                <div>
                  <p className="font-semibold text-xs md:text-sm">
                    Fast & Easy
                  </p>

                  <p className="text-[11px] md:text-xs text-green-100/70">
                    Quick upload process
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </Card>


      {/* =========================================
          UPLOADED FILES
      ========================================== */}

      {files.length > 0 && (
        <Card className="!p-4">

          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Uploaded Files
          </h3>

          <div className="space-y-2">

            {files.map((fileObj) => (

              <div
                key={fileObj.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
              >

                <div className="flex items-center gap-3">

                  <div className="text-xl">
                    📋
                  </div>

                  <div>

                    <p className="font-medium text-gray-800 text-sm">
                      {fileObj.file.name}
                    </p>

                    <p className="text-xs text-gray-500">
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
                    <span className="text-green-600 text-sm font-medium">
                      ✓ Uploaded
                    </span>
                  )}

                  {fileObj.status === 'error' && (
                    <span className="text-red-500 text-sm font-medium">
                      Upload failed
                    </span>
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


      {/* =========================================
          UPLOAD STATUS
      ========================================== */}

      <Card className="!p-4">

        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Upload Status
        </h3>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4">

          <div className="flex items-center justify-between">

            {/* LEFT */}

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-2xl">
                📊
              </div>

              <div>

                <p className="font-semibold text-gray-800">
                  Total Files: {files.length}
                </p>

                <p className="text-xs text-gray-600">
                  Uploaded: {
                    files.filter(
                      (f) => f.status === 'uploaded'
                    ).length
                  }
                </p>

              </div>

            </div>


            {/* RIGHT */}

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center text-xl">
                🕐
              </div>

              <div>

                <p className="font-semibold text-gray-800 text-sm">
                  {files.length === 0
                    ? 'No uploads yet'
                    : `${files.length} file${
                        files.length > 1 ? 's' : ''
                      } selected`}
                </p>

                <p className="text-xs text-gray-600">
                  {files.length === 0
                    ? 'Upload your reports to get started'
                    : 'Ready for analysis'}
                </p>

              </div>

            </div>

          </div>

        </div>

      </Card>

    </div>
  );
};

export default MedicalReports;