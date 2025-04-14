import type { ComponentProps, PropsWithChildren } from 'react'
import type { DropEvent, DropzoneOptions, FileRejection } from 'react-dropzone'
import { useObjectUrl } from '@reactuses/core'
import clsx from 'clsx'
import { Upload, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'

type OnDropFunction = <T extends File>(
  acceptedFiles: T[],
  fileRejections: FileRejection[],
  event: DropEvent
) => void

type DropFileOverlayProps = Pick<DropzoneOptions, 'accept' | 'maxFiles' | 'maxSize' | 'noClick'> & {
  /** Function called when files are dropped */
  onFileDrop: OnDropFunction
}

function UploadHintCard({ children, className }: ComponentProps<'div'>) {
  return (
    <div
      className={clsx('border-2 border-dashed border-blue-200 rounded-lg p-8 m-6', className)}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="bg-blue-100 p-3 rounded-full mb-4">
          <Upload className="text-blue-500" size={24} />
        </div>
        {children}
      </div>
    </div>
  )
}

/**
 * A component that provides a dropzone for file uploads
 */
function DropFileOverlay({
  onFileDrop,
  accept,
  maxSize,
  maxFiles,
  noClick,
  children,
}: PropsWithChildren<DropFileOverlayProps>) {
  const onDrop = useCallback(onFileDrop, [onFileDrop])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    maxFiles,
    noClick,
  })
  const hideHint = !isDragActive && noClick
  return (
    <section className={clsx('h-full w-full grid ', !hideHint && 'cursor-pointer')}>
      <div {...getRootProps()} className="grid place-content-center h-full w-full">
        <input {...getInputProps()} />

        <UploadHintCard className={clsx(hideHint && 'hidden')}>
          <p className="text-gray-500 text-sm mb-1 text-center w-full max-w-md">
            {isDragActive ? ' Drop the files here...' : 'Drag \'n\' drop some files here, or click to select files'}
          </p>
        </UploadHintCard>
        {children}
      </div>
    </section>
  )
}

function FileCard({ data }: { data: File }) {
  const objectUrl = useObjectUrl(data)

  return (
    <div className="border rounded-md p-2 bg-gray-50">
      <div className="text-sm truncate">{data.name}</div>
      {objectUrl !== undefined && data.type.startsWith('image/') && (
        <img
          src={objectUrl}
          alt={data.name}
          className="w-full object-cover mt-2 rounded"
        />
      )}
      <div className="text-xs text-gray-500 mt-1">
        {(data.size / 1024).toFixed(1)}
        {' '}
        KB
      </div>
    </div>
  )
}

interface RemoveButtonProps {
  onClick?: () => void
}

function RemoveButton({ onClick }: RemoveButtonProps) {
  return (
    <button
      className="absolute top-1 right-1"
      type="button"
      onClick={onClick}
      aria-label="Remove file"
    >
      <X size={16} className="stroke-red-500 stroke-3 cursor-pointer" />
    </button>
  )
}

// Type for file with its URL
interface FileWithUrl {
  file: File
  id: string
}

/**
 * Main file upload component with drag and drop functionality
 */
export default function DragDropFile() {
  const [files, setFiles] = useState<FileWithUrl[]>([])
  const fileCounter = useRef(0)

  // Map to track created object URLs for batch cleanup
  const objectUrlMapRef = useRef<Map<string, string>>(new Map())

  // Cleanup function for all object URLs
  const cleanupObjectUrls = useCallback(() => {
    objectUrlMapRef.current.forEach((url) => {
      URL.revokeObjectURL(url)
    })
    objectUrlMapRef.current.clear()
  }, [])

  // Handle file drops
  const handleFileDrop = useCallback((droppedFiles: File[]) => {
    console.debug('Dropped files:', droppedFiles)

    setFiles(prevFiles => [
      ...prevFiles,
      ...droppedFiles.map(file => ({
        file,
        id: `file-${fileCounter.current++}-${file.name}`, // Generate unique ID
      })),
    ])
  }, [])

  // Remove a file and revoke its URL
  const handleRemoveFile = useCallback((idToRemove: string) => {
    setFiles(prevFiles => prevFiles.filter(({ id }) => id !== idToRemove))
  }, [])

  // Cleanup all object URLs when component unmounts
  useEffect(() => {
    return () => {
      cleanupObjectUrls()
    }
  }, [cleanupObjectUrls])

  // For efficient virtual rendering with many files
  const renderFiles = () => {
    if (files.length === 0) {
      return null
    }

    return (
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
        {files.map(({ file, id }) => (
          <div key={id} className="relative">
            <RemoveButton onClick={() => handleRemoveFile(id)} />
            <FileCard data={file} />
          </div>
        ))}
      </section>
    )
  }

  return (
    <section className="h-screen">
      <DropFileOverlay
        onFileDrop={handleFileDrop}
        noClick={!!files.length}
        // Uncomment these optional props as needed
        // accept={{ 'image/*': ['.jpeg', '.png', '.jpg'] }}
        // maxSize={5242880} // 5MB
        // maxFiles={5}
      >
        {renderFiles()}
      </DropFileOverlay>
    </section>
  )
}
