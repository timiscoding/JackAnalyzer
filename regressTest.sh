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
  node --no-warnings --experimental-modules JackTokenizerTest.mjs $file
  compareFile=$(echo $file | sed -re "s/(.*)\.jack$/\\1T.xml/")
  TextComparer.sh tokens.xml $compareFile
  if [ $? != 0 ]
  then
    echo "$file COMPARISON FAILED"
    break
  fi
done

for file in ${files[@]}; do
  node --no-warnings --experimental-modules JackAnalyzer.mjs $file
  compareFile=$(echo $file | sed -re "s/(.*)\.jack$/\\1.xml/")
  myFile=$(echo $file | sed -re "s/(.*)\.jack$/\\1_tim.xml/")
  TextComparer.sh $myFile $compareFile
  if [ $? != 0 ]
  then
    echo "$file COMPARISON FAILED"
    break
  fi
done
