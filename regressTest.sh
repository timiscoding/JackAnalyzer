files=(
  ArrayTest/Main.jack
  Square/Main.jack
  Square/Square.jack
  Square/SquareGame.jack
  ExpressionLessSquare/Main.jack
  ExpressionLessSquare/Square.jack
  ExpressionLessSquare/SquareGame.jack
)

for file in ${files[@]}; do
  echo "Tokenizing $file"
  node --no-warnings --experimental-modules JackTokenizer.mjs $file
  compareFile=$(echo $file | sed -re "s/(.*)\.jack$/\\1T.xml/")
  TextComparer.sh tokens.xml $compareFile
  if [ $? != 0 ]
  then
    echo "$file COMPARISON FAILED"
    break
  fi
done
