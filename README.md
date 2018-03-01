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
|advance|||sets the current token to the next token|
|tokenType||One of JackTokenizer.types {`KEYWORD`, `SYMBOL`, `IDENTIFIER`, `INT_CONST`, `STRING_CONST`}|Returns the type of the token|
|keyWord||One of JackTokenizer.keywords {`CLASS`, `METHOD`, `FUNCTION`, `CONSTRUCTOR`, `INT`, `BOOLEAN`, `CHAR`, `VOID`, `VAR`, `STATIC`, `FIELD`, `LET`, `DO`, `IF`, `ELSE`, `WHILE`, `RETURN`, `TRUE`, `FALSE`, `NULL`, `THIS`}|Returns the keyword. Should only be called if tokenType() is KEYWORD|
|symbol||string|Returns the symbol. Should only be called if tokenType() is SYMBOL|
|identifier||string|Returns the identifier. Should only be called if tokenType() is IDENTIFIER|
|intVal||Number|Returns the integer constant. Should only be called if tokenType() is INT_CONST|
|stringVal||string|Returns the string constant. Should only be called if tokenType() is STRING_CONST|

# Build & Usage
```
npm install
node --experimental-modules JackTokenizer.mjs
```
