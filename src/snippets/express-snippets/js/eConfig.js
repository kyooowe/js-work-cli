//#region Import
import express, { Express } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
//#endregion

//#region Configuration

// Const variable
const App = express();

// Compress Bundle
App.use(compression());

// Middle for protection in vulnerabilities
App.use(helmet());

// Use cors
App.use(cors());

// Parse incoming request with json payload
App.use(express.json());

// Get the json payload with Content-Type header
// Preventing to get undefined value in request
App.use(bodyParser.urlencoded({ extended: true }));
App.use(bodyParser.json());

//#endregion

//#region Routes Config
// App.use('/api/products', ProductsRouter);
//#endregion

export default App;
