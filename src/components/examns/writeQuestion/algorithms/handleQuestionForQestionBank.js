export const handleQuestionForQestionBank = ({ question, alternatives }) => {
  const text = Object.values(question)[0].text;
  console.log('question', text);

  const textPlain = text
    .replace(/\\space/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\\newline/g, '');
  console.log('textPlain', textPlain);

  //remmpplazar los \\ con $ y colocar el $ al final de las palabras encontradas
  const textPlainWithDollar = textPlain.replace(/\\/g, '$').replace(/(\w+)(\s|$)/g, '$1$ ');
  console.log('textPlainWithDollar', textPlainWithDollar);
};
