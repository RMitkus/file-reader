import { createSlice } from '@reduxjs/toolkit'
import { readdirSync } from 'fs'

type File = {
    name: string,
    active: boolean
}

type Files = File[]

interface FilesState {
    value: Files
}

const initialState: FilesState = {
    value: [],
}

export const counterSlice = createSlice({
    name: 'files',
    initialState,
    reducers: {
        getFiles: (state) => {
            const fileNames = readdirSync('files')
            const files = fileNames.map(name => ({
                name,
                active: true
            }))
            state.value = files
        },
        scanFiles: (state) => {
            const currentFiles = JSON.parse(JSON.stringify(state.value)) as Files
            const newFiles = readdirSync('files')
            const removedFiles = currentFiles
                .filter(({ name }) => !newFiles.includes(name))
                .map(file => ({
                    name: file.name,
                    active: false
                }))
            const files = newFiles.map(name => ({ name, active: true }))
            state.value = [...removedFiles, ...files]
        },
    },
})

export const {
    getFiles,
    scanFiles,
} = counterSlice.actions

export default counterSlice.reducer