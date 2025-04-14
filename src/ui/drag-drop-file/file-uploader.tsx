import { Upload, X } from 'lucide-react'
import { useState } from 'react'

function UploadComponent() {
  return (
    <div className="border-2 border-dashed border-blue-200 rounded-lg p-8 my-6">
      <div className="flex flex-col items-center justify-center">
        <div className="bg-blue-100 p-3 rounded-full mb-4">
          <Upload className="text-blue-500" size={24} />
        </div>
        <button type="button" className="text-blue-500 font-medium mb-2">Click to upload</button>
        <p className="text-gray-500 text-sm mb-1">or drag and drop</p>
        <p className="text-gray-400 text-xs">Maximum file size 50 MB</p>
      </div>
    </div>
  )
}

type FileWithProgress = Omit<File, 'size'> & { progress: number, size: string }

function UploadFIleCard(props: {
  file: FileWithProgress
  onClick: () => void
}) {
  return (
    <div className="flex items-center">
      <div className="text-green-500 mr-3">
        <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center">
          <span className="text-xs">📄</span>
        </div>
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium">{props.file.name}</span>
          <button
            type="button"
            onClick={props.onClick}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        </div>
        <div className="text-xs text-gray-500 mb-1">{props.file.size}</div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div
            className="bg-blue-500 h-1.5 rounded-full"
            style={{ width: `${props.file.progress}%` }}
          >
          </div>
        </div>
        <div className="flex justify-end mt-1">
          <span className="text-xs text-gray-500">
            {props.file.progress}
            {' '}
            %
          </span>
        </div>
      </div>
    </div>
  )
}

export function FileUploader() {
  const [files, setFiles] = useState<FileWithProgress[]>([
    { name: 'Report_name_01.cvs', size: '15 MB', progress: 100 },
    { name: 'Report_name_02.cvs', size: '15 MB', progress: 80 },
    { name: 'Report_name_03.cvs', size: '15 MB', progress: 40 },
  ])

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-700">Upload and attach files</h2>
          <button type="button" className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <p className="text-sm text-gray-500 mb-6">Supported formats: cvs, xls, xlsx</p>

        <UploadComponent />

        <div className="space-y-4 mb-6">
          {files.map((file, index) => (
            <UploadFIleCard key={index} file={file} onClick={() => handleRemoveFile(index)} />
          ))}
        </div>

        <div className="flex justify-end space-x-3">
          <button type="button" className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            Cancel
          </button>
          <button type="button" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Attach files
          </button>
        </div>
      </div>
    </div>
  )
}
