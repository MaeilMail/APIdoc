import 'dotenv/config'
import { app } from './src/app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`서버 정상 실행 http://localhost:${PORT}`)
})