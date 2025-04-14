import type { ComponentProps, PropsWithChildren } from 'react'
import type { DropEvent, DropzoneOptions, FileRejection } from 'react-dropzone'
import clsx from 'clsx'
import { Upload, X } from 'lucide-react'
import { useCallback, useState } from 'react'
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
          <p className="text-gray-500 text-sm mb-1 text-center w-[400px]">
            {isDragActive ? ' Drop the files here...' : 'Drag \'n\' drop some files here, or click to select files'}
          </p>
        </UploadHintCard>
        {children}
      </div>
    </section>
  )
}

function FileCard({ data }: { data: File }) {
  return (
    <div>
      <span>{data.name}</span>
    </div>
  )
}

interface RemoveButtonProps {
  onClick?: () => void
}

function RemoveButton({ onClick }: RemoveButtonProps) {
  return (
    <button className="cursor-pointer" type="button" onClick={onClick}>
      <X />
    </button>
  )
}

/**
 * Main file upload component with drag and drop functionality
 */
export default function DragDropFile() {
  const [files, setFiles] = useState<File[]>([])
  const handleFileDrop = useCallback((files: File[]) => {
    console.debug('Dropped files:', files)
    setFiles(oldFiles => [...oldFiles, ...files])
  }, [])

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
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
        <section className="grid grid-cols-3 gap-2">
          {files.map((file, i) => {
            return (
              <div key={file.name}>
                <RemoveButton onClick={() => handleRemoveFile(i)} />
                <FileCard data={file} />
              </div>
            )
          })}
        </section>
      </DropFileOverlay>

    </section>
  )
}
