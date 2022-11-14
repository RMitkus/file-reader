import { config } from 'dotenv'
import express, {
	Application, Request, Response
} from 'express'
import { writeFileSync } from 'fs'
import morgan from 'morgan'
import cors from 'cors'
import { store } from './store/store'
import { getFiles, scanFiles } from './store/fileSlice'


config()

const app: Application = express()

app.use(cors({
}))
app.use(morgan('dev'))
app.use(express.json({
	limit: '50mb'
}))
app.use(express.urlencoded({
	limit: '50mb',
	extended: true
}))

store.dispatch(getFiles())

app.get('/list', (req: Request, res: Response) => {
	const { files } = store.getState()
	res.json(files)
})

app.get('/scan', (req: Request, res: Response) => {
	store.dispatch(scanFiles())
	const files = store.getState()
	res.json(files)
})

app.get('/download-state', (req: Request, res: Response) => {
	const { files } = store.getState()
	writeFileSync('state.json', JSON.stringify(files))
	res.download('state.json')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
	console.log(`Server is listening on port http://localhost:${PORT}`)
})

