import rangeParser from 'parse-numeric-range';

export function parseOptions(metastring) {
  const defaults = {
    // Code block title
    title: null,
    // Show line numbers
    lineNumbers: false,
    // Array of line numbers to highlight
    highlight: [],
    // Show copy code button
    copy: false,
    // Show a language tab
    languageTab: true
  };

  const booleanOptions = ['lineNumbers', 'copy', 'languageTab'];

  if (metastring) {
    const options = {};

    // Each option is going to be wrapped with curly brackets
    for (let option of metastring.split('{').map((i) => i.trim())) {
      if (option) {
        let [name, value] = option
          // Remove the closing curly bracket
          .slice(0, -1)
          // The option and its value are split with a semicolon
          .split(':')
          .map((i) => i.trim());

        if (name && value) {
          if (booleanOptions.includes(name)) {
            value = value.toLowerCase() === 'true';
          } else if (name === 'highlight') {
            value = rangeParser(value);
          }

          options[name] = value;
        }
      }
    }

    return { ...defaults, ...options };
  }

  return defaults;
}
