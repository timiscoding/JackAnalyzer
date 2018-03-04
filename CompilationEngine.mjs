import fs from 'fs';
import {default as JackTokenizer, TokenTypes, TokenKeywords} from './JackTokenizer';

const { KEYWORD, SYMBOL, IDENTIFIER, INT_CONST, STRING_CONST } = TokenTypes;
const {
  CLASS, METHOD, FUNCTION, CONSTRUCTOR, INT, BOOLEAN, CHAR, VOID, VAR, STATIC, FIELD, LET,
  DO, IF, ELSE, WHILE, RETURN, TRUE, FALSE, NULL, THIS,
} = TokenKeywords;

const tokenMethod = new Map([
  [KEYWORD, 'keyword'],
  [SYMBOL, 'symbol'],
  [IDENTIFIER, 'identifier'],
  [INT_CONST, 'intVal'],
  [STRING_CONST, 'stringVal']
]);
const TYPE_RULE = [INT, CHAR, BOOLEAN, IDENTIFIER];

class CompilationEngine {
  constructor(inputFile, outputFile) {
    this.inputFile = inputFile;
    this.outputFile = fs.openSync(outputFile, 'w+');
    this.tk = new JackTokenizer(inputFile);
    this.indentLevel = 0;

    if (this.tk.hasMoreTokens()) {
      this.tk.advance(); // set the first token
    }
  }

  getToken(type) {
    return this.tk[tokenMethod.get(type)]();
  }

  log(str) {
    console.log('  '.repeat(this.indentLevel) + str);
  }

  logWrapper(compileCb, tag) {
    this.indentLevel++;
    this.log(`<${tag}>`);
    compileCb.call(this);
    this.log(`</${tag}>`);
    this.indentLevel--;
  }

  eat(accepted) {
    this.indentLevel++;
    const thisTokenType = this.tk.tokenType();
    const thisToken = this.getToken(thisTokenType);

    if ((Array.isArray(accepted) && (accepted.includes(thisToken) || accepted.includes(thisTokenType)))
        || accepted === thisToken || accepted === thisTokenType) {
      this.log(`<${thisTokenType.display}> ${thisToken.display || thisToken} </${thisTokenType.display}>`)

      if (this.tk.hasMoreTokens()) {
        this.tk.advance();
      }
    } else {
      throw new Error(`Failed to see "${accepted.display || accepted}" token`);
    }

    this.indentLevel--;
  }

  compileClass() {
    console.log('um', IDENTIFIER);
    this.log('<class>');
    this.eat(CLASS);
    this.eat(IDENTIFIER);
    this.eat('{');

    while (this.tk.tokenType === KEYWORD &&
          this.tk.keyword() === STATIC ||
          this.tk.keyword() === FIELD) {
      this.logWrapper(this.compileClassVarDec, 'classVarDec');
    }

    while (this.tk.tokenType() === KEYWORD &&
        [CONSTRUCTOR, FUNCTION, METHOD].includes(this.tk.keyword())) {
      this.logWrapper(this.compileSubroutineDec, 'subroutineDec');
    }

    this.log('</class>');
  }

  compileClassVarDec() {
    this.eat([STATIC, FIELD]);
    this.eat(TYPE_RULE);
    this.eat(IDENTIFIER);

    while (this.tk.tokenType() === SYMBOL && this.tk.symbol() === ',') {
      this.eat(',');
      this.eat(IDENTIFIER);
    }

    this.eat(';');
  }

  compileSubroutineDec() {
    this.eat([CONSTRUCTOR, FUNCTION, METHOD]);
    this.eat([VOID, ...TYPE_RULE]);
  }
}

const ce = new CompilationEngine('ExpressionLessSquare/Square.jack', 'parsed.xml');
ce.compileClass();
