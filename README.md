
![Logo](https://mir-s3-cdn-cf.behance.net/project_modules/1400/74731f76965389.5c7945b0cfcc3.gif)

# JS Work-CLI
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://makeapullrequest.com)

An easy-to-use JavaScript/TypeScript framework for generating custom files using CLI. NPM link [here](https://www.npmjs.com/package/js-work-cli)

## Installation

``` bash
npm i js-work-cli
```

## Documentation

Currently, only two frameworks are supported (React and Express), but we plan to expand to include languages such as Svelte, Vue, and more.

When **HasMultipleFiles** is checked in the table below, simply designate the **--fileName** argument as an **underscore (_)**.
The **--fileType**w  argument consists only of two values: **TS** and **JS**

**The scripts below are the arguments in the CLI**

```
npx js-work-cli --framework --template --folderPath --fileName --fileType
```

## React Templates
| Template  | Description | HasMultipleFiles |
| :---: | :--- | :---: |
| `plain`  | Plain react file  |    ⨉
| `pState`  | Built in useState sample in file  |   ⨉
| `pEffect`  | Built in useEffect sample in file  | ⨉
| `pRef`  | Built in useRef sample in file  |   ⨉
| `stef`  | Built in useState and useEffect sample in file  |   ⨉
| `stefr`  | Built in useState, useEffect and useRef sample in file |   ⨉
| `httpService`  | Custom Http Service (Sample API request provided)  |  ✓
| `zustand`  | Custom Zustand Store |   ⨉
| `debounce`  | Debounce Hook  |    ⨉

## Express Template
| Template  | Description | HasMultipleFiles |
| :---: | :--- | :---: |
| `eConfig`  | Express config file  |   ⨉
| `mConfig`  | Mongoose config file  | ⨉
| `routes`  | Custom Routes setting |   ⨉
| `schema`  | Custom Mongoose Schema  | ⨉
| `crud`  | Custom CRUD (controller, schema, routes and interface provided)  |  ✓

## Sample Usage


**Express - Mongoose Config**
```
npx js-work-cli express mConfig core/configurations mongoose.config ts
```
Result in folder view:
 ```
    - core (cli generated folder)
        - configurations (cli generated folder)
            - cronjob.config.ts (sample file)
            - express.config.ts (sample file)
            - moongose.config.ts (cli generated template file)
    - src (sample folder)
    - index.js (sample file)
 ```

**React - HttpService**
```
npx js-work-cli react httpService core/services _ ts
```
Result in folder view:
 ```
    - core (cli generated folder)
        - services (cli generated folder)
            - httpRequest (cli generated folder)
                - apiService (cli generated template file) // Sample usage of API
                - baseService (cli generated template file) // Custom HttpService using axios
    - pages (sample folder)
    - src (sample folder)
    - app.js (sample file)
    - app.css (sample file)
    - index.js (sample file)
 ```
 
Note: that the **CLI Generated folder** will only manifest itself if it is not currently active within your project directory. Therefore, it is imperative that you do not become confused when viewing the **result folder above**.

## Supported Languages
- React (Javascript and Typecript)
- Express (Javascript and Typecript)

## Soon to Support Languages
- Vue
- Svelte
- More...

#### Demo
![Demo](https://github.com/kyooowe/js-work-cli/blob/devel/showoff.gif)
