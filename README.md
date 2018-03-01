# Jack Analyzer

Reads a syntactically valid Jack program file/dir and outputs XML that represents the parse tree.

This is [project 10](http://nand2tetris.org/10.php) of the nand2tetris course.

## API

### JackTokenizer
Reads and tokenizes a Jack file for use by the compilation engine.

|Method|Args|Return|Function|
|---|---|---|---|
|constructor|filename:string||Jack file or dir|
|getLine||String if file contains more lines. Else false|gets a line from the file and removes any white space/comments|
|hasMoreTokens||Boolean|Do we have more tokens?|

# Build & Usage
```
npm install
node --experimental-modules JackTokenizer.mjs
```
