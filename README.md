# node-retriever

A node app that retrieves images from corrupted files.

To use this application please follow the following steps.
<br/>
<br/>

---

## Installation

---

git clone the repo

run inside the cloned folder (node-retriever folder)

```
npm i
```

Put the corrupted file in the 'assets' folder and it should be with the name 'corrupted-image' so that it gets ignored and not pushed to repo by mistake.
<br/>
<br/>
`Note`: putting the file outside the assets folder will not be accessed by the code. If you want to place it outside the folder changes to filePath variable should be done in the index.js file.
<br/>
<br/>
Run the following command in the terminal while inside the node-retriever folder:

```
node index.js
```

The code will create a retrieved jpg image file in the folder and will prompt the time it was taken to excute the code in the terminal.
