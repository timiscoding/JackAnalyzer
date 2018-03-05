# Jack Analyzer

Reads a syntactically valid Jack program file/dir and outputs XML that represents the parse tree.

This is [project 10](http://nand2tetris.org/10.php) of the nand2tetris course.

## API

### JackAnalyzer
Reads in command line arg for dir/files with Jack programs and writes the parse tree to an XML file

### JackTokenizer
Reads and tokenizes a Jack file for use by the compilation engine.

|Method|Args|Return|Function|
|---|---|---|---|
|constructor|filename:string||Jack file or dir|
|getLine||Returns string if file contains more lines. Else false|gets a line from the file and removes any white space/comments|
|hasMoreTokens||Boolean|Do we have more tokens?|
|advance|||sets the current token to the next token|
|tokenType||TokenTypes enum `KEYWORD`, `SYMBOL`, `IDENTIFIER`, `INT_CONST`, `STRING_CONST`|Returns the type of the token|
|keyWord||TokenKeywords enum `CLASS`, `METHOD`, `FUNCTION`, `CONSTRUCTOR`, `INT`, `BOOLEAN`, `CHAR`, `VOID`, `VAR`, `STATIC`, `FIELD`, `LET`, `DO`, `IF`, `ELSE`, `WHILE`, `RETURN`, `TRUE`, `FALSE`, `NULL`, `THIS`|Returns the keyword. Should only be called if tokenType() is KEYWORD|
|symbol||string|Returns the symbol. Should only be called if tokenType() is SYMBOL|
|identifier||string|Returns the identifier. Should only be called if tokenType() is IDENTIFIER|
|intVal||Number|Returns the integer constant. Should only be called if tokenType() is INT_CONST|
|stringVal||string|Returns the string constant. Should only be called if tokenType() is STRING_CONST|

### CompilationEngine
Parses Jack programs and generates an XML parse tree.

|Method|Args|Return|Function|
|---|---|---|---|
|constructor|inputFile:string<br>outputFile:string||Creates a new instance with the given input Jack program and writes the XML data to the given output.|
|compileClass|||Compiles a complete class|
|compileClassVarDec|||Compiles a static/field declaration/s|
|compileSubroutineDec|||Compiles a constructor/method/function declaration|
|compileParameterList|||Compiles a possiblly empty subroutine parameter list not including the parentheses|
|compileSubroutineBody|||Compiles a subroutine body including the curly braces|
|compileVarDec|||Compiles a local variable declaration|
|compileStatements|||Compiles a sequence of statements|
|compileLetStatement|||Compiles an let (assignment) statement|
|compileIfStatement|||Compiles an if statement with an optional else|
|compileWhileStatment|||Compiles a while statement|
|compileReturnStatement|||Compiles a return statement|
|compileExpression|||Compiles an expression|
|compileTerm|||Compiles a term. Part of an expression|
|compileExpressionList|||Compiles an list of arguments|
|eat|accepted:<br>array\|string\|TokenType\|TokenKeyword||Checks the current token is in the token whitelist. If true, advances to next token. Else throws error due to invalid syntax|
|getToken|tokenType:TokenType|token value|Get the current token value given a token type|
|log|string||Logs the token seen in XML|
|logWrapper|compileCb:method, tag:string|Logs open/closing tags around a compileMethod|
|tokenOneOf|accepted:<br>array\|string\|TokenType\|TokenKeyword|boolean|Checks whether current token belongs to one of the given tokens|

# Build & Usage
```
npm install
node --experimental-modules JackTokenizer.mjs <dir|file>
```
XML files are written to the input dir with extension `_tim.xml`.

# Tests
Each of the directories (`Square`, `ExpressionLessSquare` and `ArrayTest`) contain a set of verified XML files for each Jack program: `xxxT.xml` is a list of tokens classified by type and value. `xxx.xml` is the parse tree. Run `regressTest.sh` to validate the generated XML (`xxx_tim.xml`) against the correct XML files.
