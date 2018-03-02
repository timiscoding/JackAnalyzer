import fs from 'fs';
import JackTokenizer from './JackTokenizer';

/** Reads a Jack file from command-line arg and writes the tokens to tokens.xml */

var tk = new JackTokenizer(process.argv[2]);
var outputFile = fs.openSync('tokens.xml', 'w+');
fs.appendFileSync(outputFile, '<tokens>\n');

const toEntity = (str) => str.replace(/(")|(<)|(>)|(&)/g, (m, quote, lt, gt, amp) => {
  if (quote) {
    return '&quot;';
  } else if (lt) {
    return '&lt;';
  } else if (gt) {
    return '&gt;';
  } else if (amp) {
    return '&amp;';
  }
});

while (tk.hasMoreTokens()) {
  tk.advance();
  const { KEYWORD, SYMBOL, IDENTIFIER, INT_CONST, STRING_CONST } = JackTokenizer.types;
  let line;
  let type = tk.tokenType();
  switch (tk.tokenType()) {
    case KEYWORD:
      line = `<${type}> ${tk.keyword()} </${type}>`;
      break;
    case SYMBOL:
      line = `<${type}> ${toEntity(tk.symbol())} </${type}>`;
      break;
    case IDENTIFIER:
      line = `<${type}> ${tk.identifier()} </${type}>`;
      break;
    case INT_CONST:
      line = `<${type}> ${tk.intVal()} </${type}>`;
      break;
    case STRING_CONST:
      line = `<${type}> ${toEntity(tk.stringVal())} </${type}>`;
      break;
  }
  fs.appendFileSync(outputFile, line + '\n');

}
fs.appendFileSync(outputFile, '</tokens>\n');
fs.closeSync(outputFile);
