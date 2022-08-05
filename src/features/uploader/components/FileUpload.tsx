import { useState } from 'react'
import {
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  FormErrorMessage,
  Icon,
} from '@chakra-ui/react'
import { FiFile } from 'react-icons/fi'
import type { Control, FieldValues } from 'react-hook-form'
import { useController, UseControllerProps } from 'react-hook-form'
import React, { useRef } from 'react'

export type FileUploadProps<T extends FieldValues> = UseControllerProps<T> & {
  name: string
  placeholder?: string
  acceptedFileTypes?: string
  children: React.ReactNode
  isRequired?: boolean
}

export const FileUpload = <T extends FieldValues>({
  name,
  placeholder,
  acceptedFileTypes = '',
  control,
  children,
  isRequired = false,
}: FileUploadProps<T>) => {
  const inputRef = useRef<HTMLInputElement>(null!)
  const {
    field: { ref, onChange, value, ...inputProps },
  } = useController({
    name,
    control,
    rules: { required: isRequired },
  })

  const [fileList, setFileList] = useState<File[]>([])
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = Array.from(e.target.files ?? [])
    setFileList(list)
    onChange(list)
  }

  return (
    <FormControl isRequired>
      <FormLabel htmlFor="writeUpFile">{children}</FormLabel>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Icon as={FiFile} />
        </InputLeftElement>
        <input
          type="file"
          multiple
          onChange={(e) => handleFileInputChange(e)}
          accept={acceptedFileTypes}
          ref={inputRef}
          {...inputProps}
          style={{ display: 'none' }}
        />
        <Input
          placeholder={placeholder || 'Your file ...'}
          onClick={() => inputRef.current.click()}
          // onChange={(e) => {}}
          readOnly={true}
          value={(value && value.name) || ''}
        />
      </InputGroup>

      <>
        {fileList.map((file) => (
          <div key={file.name}>
            {file.name} {file.size}
          </div>
        ))}
      </>

      <FormErrorMessage></FormErrorMessage>
    </FormControl>
  )
}

export default FileUpload
