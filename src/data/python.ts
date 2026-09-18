import type { Course } from './courses'

/**
 * Python — a genuine from-zero Python 3 course for MendixGo. Nine units take a
 * complete beginner from print() and variables through loops, functions and
 * OOP, then bridge to the FastAPI backend behind Cortex. Every code snippet is
 * valid Python 3 and every stated output is exactly what Python 3 prints.
 */
export const pythonCourse: Course = {
  id: 'python',
  title: 'Python',
  subtitle: 'Learn to code, from zero',
  icon: '🐍',
  color: '#1cb0f6',
  blurb: 'Start from zero and learn Python 3, from variables and loops to functions and OOP, then bridge to the FastAPI backend behind Cortex.',
  units: [
    /* ---------------------------- Unit 1 ---------------------------- */
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: '🐍',
      blurb: 'What Python is, how to run it, and your very first line of code.',
      lessons: [
        {
          id: 'what-is-python',
          title: 'What is Python?',
          exercises: [
            {
              kind: 'choice',
              q: 'What best describes Python?',
              options: [
                'A spreadsheet program',
                'A general-purpose programming language',
                'A type of computer hardware',
                'A web browser',
              ],
              correct: 1,
              why: 'Python is a general-purpose, high-level programming language used for web apps, data, automation, AI and much more.',
            },
            {
              kind: 'choice',
              q: 'Why is Python popular with beginners?',
              options: [
                'It has no rules at all',
                'Its readable, English-like syntax and huge library ecosystem',
                'It only runs on one operating system',
                'It never makes mistakes',
              ],
              correct: 1,
              why: 'Readable syntax, a big standard library, and a massive third-party ecosystem make Python approachable and powerful.',
            },
            {
              kind: 'choice',
              q: 'Which version does this course teach?',
              options: ['Python 1', 'Python 2', 'Python 3', 'Python 4'],
              correct: 2,
              why: 'Python 3 is the current, supported version. Python 2 reached end of life in 2020.',
            },
            {
              kind: 'choice',
              q: 'How do you usually run Python code?',
              options: [
                'You must compile it to an .exe first',
                'An interpreter runs your code directly',
                'It only runs inside a web browser',
                'You email it to a server',
              ],
              correct: 1,
              why: 'Python is interpreted: the Python interpreter reads and runs your .py file directly, with no separate compile step.',
            },
            {
              kind: 'reveal',
              q: 'Name three things people commonly build with Python.',
              answer: 'Web backends (FastAPI, Django, Flask), data analysis and machine learning (pandas, PyTorch), and automation or scripts. It is also popular for testing and scraping.',
              hint: 'Think web, data, and automation.',
            },
            {
              kind: 'match',
              prompt: 'Match each Python term to its meaning.',
              pairs: [
                { term: 'interpreter', def: 'The program that reads and runs your Python code' },
                { term: 'syntax', def: 'The rules for how valid code must be written' },
                { term: '.py file', def: 'A plain text file that holds Python code' },
                { term: 'library', def: 'Reusable code you import instead of writing yourself' },
              ],
            },
          ],
        },
        {
          id: 'print-and-output',
          title: 'print() and output',
          exercises: [
            {
              kind: 'reveal',
              q: `What does this print?  print("Hello, world!")`,
              answer: `Hello, world! The print() function writes its argument to the screen, and the quotes only mark the text, so they are not shown.`,
            },
            {
              kind: 'reveal',
              q: 'What does print(3 + 4) show?',
              answer: '7. Python works out 3 + 4 first, then print shows the result 7 as a number, with no quotes.',
            },
            {
              kind: 'choice',
              q: `What does print("3" + "4") show?`,
              options: ['7', '34', '"34"', 'An error'],
              correct: 1,
              why: 'Both values are strings, so + joins them into "34". Numbers written in quotes are text, not values to add.',
            },
            {
              kind: 'choice',
              q: `What does print("Hi", "Om") display?`,
              options: ['HiOm', 'Hi Om', 'Hi,Om', 'An error'],
              correct: 1,
              why: 'print() joins several arguments with a single space by default, so you get "Hi Om".',
            },
            {
              kind: 'reveal',
              q: 'How would you print your name, Om, to the screen?',
              answer: `print("Om"). Call print() with your text inside quotes.`,
            },
            {
              kind: 'choice',
              q: `After print("a") then print("b") run, how does the output look?`,
              options: [
                'ab on one line',
                'a and b on separate lines',
                'Nothing prints',
                'a b with a space',
              ],
              correct: 1,
              why: 'Each print() ends with a newline by default, so "a" and "b" land on their own lines.',
            },
            {
              kind: 'reveal',
              q: 'What does print() with nothing inside the parentheses do?',
              answer: 'It prints an empty line (just a newline). Handy for adding spacing between other output.',
            },
            {
              kind: 'multi',
              q: 'Which of these are true about print()? (select all)',
              options: [
                'It shows output on the screen',
                'It adds a newline at the end by default',
                'It permanently saves data to a file',
                'It can take several arguments separated by commas',
              ],
              correct: [0, 1, 3],
              why: 'print() displays its arguments, ends with a newline, and accepts several comma-separated values. It does not save anything to a file.',
            },
          ],
        },
        {
          id: 'comments-and-running',
          title: 'Comments & running code',
          exercises: [
            {
              kind: 'choice',
              q: 'How do you write a comment in Python?',
              options: ['// like this', '# like this', '<!-- like this -->', '/* like this */'],
              correct: 1,
              why: 'A Python comment starts with # and runs to the end of the line. Python ignores everything after the #.',
            },
            {
              kind: 'reveal',
              q: `What does this print?\n# print("A")\nprint("B")`,
              answer: 'B. The first line is a comment (it starts with #), so Python skips it and only runs print("B").',
            },
            {
              kind: 'choice',
              q: 'Why write comments?',
              options: [
                'They make code run faster',
                'They explain code to humans, and Python ignores them',
                'They are required on every line',
                'They print notes to the user',
              ],
              correct: 1,
              why: 'Comments are notes for people reading the code. Python ignores them and they never appear in the output.',
            },
            {
              kind: 'order',
              q: 'Order the steps to run a Python script from a file.',
              items: [
                'Write your code in a file named hello.py',
                'Save the file',
                'Open a terminal in that folder',
                'Type: python hello.py',
                'Press Enter and read the output',
              ],
              why: 'You save your code in a .py file, then run it with the python command in a terminal. The interpreter executes it top to bottom.',
            },
            {
              kind: 'choice',
              q: 'What happens if you misspell print as prin?',
              options: [
                'It still works',
                'Python raises a NameError',
                'It prints prin',
                'It becomes a comment',
              ],
              correct: 1,
              why: 'Python does not know a name called prin, so it raises a NameError. Names must be spelled exactly.',
            },
            {
              kind: 'choice',
              q: 'In what order does Python run the lines of a simple script?',
              options: [
                'Bottom to top',
                'Top to bottom, one line at a time',
                'In a random order',
                'All at once',
              ],
              correct: 1,
              why: 'Python runs statements top to bottom, one at a time, until something like a function call or a loop changes the flow.',
            },
          ],
        },
      ],
    },

    /* ---------------------------- Unit 2 ---------------------------- */
    {
      id: 'variables',
      title: 'Variables & Data Types',
      icon: '📦',
      blurb: 'Store values in named boxes, and meet the core types: int, float, str and bool.',
      lessons: [
        {
          id: 'variables-assignment',
          title: 'Variables & assignment',
          exercises: [
            {
              kind: 'choice',
              q: 'What is a variable?',
              options: [
                'A fixed number that never changes',
                'A name that refers to a value',
                'A kind of loop',
                'A comment',
              ],
              correct: 1,
              why: 'A variable is a name that points to a value. You can reassign it to a new value later.',
            },
            {
              kind: 'reveal',
              q: 'How would you store the number 7 in a variable called age?',
              answer: 'age = 7. The = sign assigns the value on the right to the name on the left.',
            },
            {
              kind: 'reveal',
              q: `What does this print?\nx = 5\nx = 10\nprint(x)`,
              answer: '10. The second assignment replaces the first, so x now refers to 10.',
            },
            {
              kind: 'choice',
              q: 'Which is a valid variable name?',
              options: ['2cool', 'my-name', 'user_name', 'class'],
              correct: 2,
              why: 'Names may use letters, digits and underscores, must not start with a digit, cannot contain hyphens, and cannot be a keyword like class.',
            },
            {
              kind: 'reveal',
              q: `What does this print?\na = 3\nb = a\na = 99\nprint(b)`,
              answer: '3. b was set to the value of a (3) at that moment. Reassigning a later does not change b.',
            },
            {
              kind: 'choice',
              q: 'Are name and Name the same variable?',
              options: [
                'Yes, they are the same',
                'No, they are two different variables',
                'Only inside functions',
                'Only for numbers',
              ],
              correct: 1,
              why: 'Python is case-sensitive, so name, Name and NAME are three different variables.',
            },
            {
              kind: 'reveal',
              q: 'How would you give x and y the values 1 and 2 in one line?',
              answer: 'x, y = 1, 2. Python unpacks the values on the right into the names on the left in order.',
            },
          ],
        },
        {
          id: 'core-types',
          title: 'Core data types',
          exercises: [
            {
              kind: 'match',
              prompt: 'Match each type to an example value.',
              pairs: [
                { term: 'int', def: 'A whole number like 42' },
                { term: 'float', def: 'A decimal number like 3.14' },
                { term: 'str', def: 'Text like "hello"' },
                { term: 'bool', def: 'A True or False value' },
              ],
            },
            {
              kind: 'choice',
              q: 'Which of these is a float?',
              options: ['42', '"3.14"', '3.14', 'True'],
              correct: 2,
              why: '3.14 has a decimal point, so it is a float. "3.14" in quotes is a string, and 42 is an int.',
            },
            {
              kind: 'choice',
              q: 'What type is "42"?',
              options: ['int', 'float', 'str', 'bool'],
              correct: 2,
              why: 'Anything wrapped in quotes is a string (str), even when it looks like a number.',
            },
            {
              kind: 'reveal',
              q: 'What are the two boolean values in Python?',
              answer: 'True and False, written with a capital first letter. They are the only two values of type bool.',
            },
            {
              kind: 'choice',
              q: 'Which of these is an integer (int)?',
              options: ['3.0', '3', '"3"', 'true'],
              correct: 1,
              why: '3 with no decimal point and no quotes is an int. 3.0 is a float, "3" is a str, and lowercase true is not valid Python.',
            },
            {
              kind: 'reveal',
              q: 'What does print(True) show, and what does print(true) do?',
              answer: 'print(True) shows True. print(true) raises a NameError, because Python booleans are capitalized: True and False.',
            },
            {
              kind: 'multi',
              q: 'Which of these are built-in Python types? (select all)',
              options: ['int', 'str', 'bool', 'number', 'decimal'],
              correct: [0, 1, 2],
              why: 'int, str and bool are built-in types. There is no built-in type called number or decimal.',
            },
          ],
        },
        {
          id: 'type-and-conversion',
          title: 'type() and conversion',
          exercises: [
            {
              kind: 'reveal',
              q: 'What does print(type(5)) show?',
              answer: `<class 'int'>. type() tells you the kind of a value, and 5 is an int.`,
            },
            {
              kind: 'reveal',
              q: `What does print(type("hi")) show?`,
              answer: `<class 'str'>. Text in quotes is a string.`,
            },
            {
              kind: 'reveal',
              q: 'What does print(type(3.0)) show?',
              answer: `<class 'float'>. The decimal point makes it a float.`,
            },
            {
              kind: 'choice',
              q: `How do you turn the string "5" into the integer 5?`,
              options: [`int("5")`, 'str(5)', `bool("5")`, `round("5")`],
              correct: 0,
              why: 'int("5") converts the string "5" to the integer 5. str(5) does the opposite, turning 5 into "5".',
            },
            {
              kind: 'reveal',
              q: `What does print(int("3") + int("4")) show?`,
              answer: '7. int() converts each string to a number first, then + adds them to get 7.',
            },
            {
              kind: 'choice',
              q: 'What does int(3.9) give?',
              options: ['4', '3', '3.9', 'An error'],
              correct: 1,
              why: 'int() drops the decimal part (truncates toward zero), so int(3.9) is 3. It does not round.',
            },
            {
              kind: 'reveal',
              q: `What does print("Score: " + str(10)) show?`,
              answer: `Score: 10. str(10) turns the number into the string "10" so it can be joined to the text with +. Without str() this would raise a TypeError.`,
            },
          ],
        },
      ],
    },

    /* ---------------------------- Unit 3 ---------------------------- */
    {
      id: 'numbers-math',
      title: 'Numbers & Math',
      icon: '🔢',
      blurb: 'Do arithmetic with Python, from plain +/- to floor division, remainders and powers.',
      lessons: [
        {
          id: 'arithmetic',
          title: 'Arithmetic operators',
          exercises: [
            {
              kind: 'match',
              prompt: 'Match each operator to what it does.',
              pairs: [
                { term: '+', def: 'Add' },
                { term: '-', def: 'Subtract' },
                { term: '*', def: 'Multiply' },
                { term: '/', def: 'Divide' },
              ],
            },
            {
              kind: 'reveal',
              q: 'What does print(10 / 2) show?',
              answer: '5.0. In Python 3 the / operator always gives a float, so you get 5.0, not 5.',
            },
            {
              kind: 'choice',
              q: 'What does 7 * 2 give?',
              options: ['9', '14', '72', '5'],
              correct: 1,
              why: '* multiplies, so 7 * 2 is 14.',
            },
            {
              kind: 'reveal',
              q: 'What does print(5 - 8) show?',
              answer: '-3. Subtraction can produce negative numbers.',
            },
            {
              kind: 'choice',
              q: 'What does print(2 * 3 + 1) give?',
              options: ['8', '7', '9', '6'],
              correct: 1,
              why: 'Multiplication happens before addition, so 2 * 3 is 6, then 6 + 1 is 7.',
            },
            {
              kind: 'reveal',
              q: 'What does print(9 / 3) show, 3 or 3.0?',
              answer: '3.0. The / operator always returns a float in Python 3, even when the result is a whole number.',
            },
          ],
        },
        {
          id: 'floor-mod-power',
          title: 'Floor, remainder & powers',
          exercises: [
            {
              kind: 'reveal',
              q: 'What does print(17 // 5) show?',
              answer: '3. // is floor division: it divides then drops the fractional part, so 17 // 5 is 3.',
            },
            {
              kind: 'reveal',
              q: 'What does print(17 % 5) show?',
              answer: '2. % gives the remainder after division. 17 is 5 times 3 plus 2, so the remainder is 2.',
            },
            {
              kind: 'reveal',
              q: 'What does print(2 ** 3) show?',
              answer: '8. ** is exponentiation, so 2 ** 3 means 2 to the power 3, which is 2 * 2 * 2 = 8.',
            },
            {
              kind: 'choice',
              q: 'Which operator gives the remainder after division?',
              options: ['//', '%', '**', '/'],
              correct: 1,
              why: '% is the modulo operator. It returns what is left over after dividing.',
            },
            {
              kind: 'choice',
              q: 'How do you check whether a number n is even?',
              options: ['n % 2 == 0', 'n // 2 == 0', 'n ** 2 == 0', 'n / 2 == 0'],
              correct: 0,
              why: 'A number is even when it divides by 2 with no remainder, so n % 2 == 0.',
            },
            {
              kind: 'reveal',
              q: 'What does print(10 // 3) and print(10 % 3) show?',
              answer: '3 and 1. 10 // 3 is 3 (the whole part) and 10 % 3 is 1 (the remainder), because 10 is 3 times 3 plus 1.',
            },
            {
              kind: 'reveal',
              q: 'What does print(7 // 2) show?',
              answer: '3. Floor division keeps only the whole part of 3.5, which is 3.',
            },
            {
              kind: 'multi',
              q: 'Which of these give an integer (type int) result? (select all)',
              options: ['7 // 2', '7 % 2', '10 / 2', '2 ** 3'],
              correct: [0, 1, 3],
              why: '7 // 2 is 3, 7 % 2 is 1 and 2 ** 3 is 8, all ints. But 10 / 2 is 5.0, a float, because / always returns a float.',
            },
          ],
        },
        {
          id: 'order-of-operations',
          title: 'Order of operations',
          exercises: [
            {
              kind: 'reveal',
              q: 'What does print(3 + 4 * 2) show?',
              answer: '11. Multiplication runs before addition, so 4 * 2 is 8, then 3 + 8 is 11.',
            },
            {
              kind: 'reveal',
              q: 'What does print((3 + 4) * 2) show?',
              answer: '14. Parentheses run first, so 3 + 4 is 7, then 7 * 2 is 14.',
            },
            {
              kind: 'choice',
              q: 'Which runs first in 2 + 3 * 4?',
              options: ['2 + 3', '3 * 4', 'Always left to right', 'It is an error'],
              correct: 1,
              why: 'Multiplication has higher precedence than addition, so 3 * 4 is done first (12), then 2 + 12 is 14.',
            },
            {
              kind: 'order',
              q: 'Order these from what Python evaluates first to last.',
              items: [
                'Parentheses ( )',
                'Exponent **',
                'Multiply and divide  *  /  //  %',
                'Add and subtract  +  -',
              ],
              why: 'Python follows the usual precedence: parentheses, then exponents, then multiply and divide, then add and subtract. Within the same level it goes left to right.',
            },
            {
              kind: 'reveal',
              q: 'What does print(2 ** 3 * 2) show?',
              answer: '16. The exponent runs first, so 2 ** 3 is 8, then 8 * 2 is 16.',
            },
            {
              kind: 'choice',
              q: 'What does 10 - 2 - 3 give?',
              options: ['5', '11', '9', '15'],
              correct: 0,
              why: 'Subtraction goes left to right: (10 - 2) - 3 is 8 - 3, which is 5.',
            },
          ],
        },
      ],
    },

    /* ---------------------------- Unit 4 ---------------------------- */
    {
      id: 'strings',
      title: 'Strings',
      icon: '🔤',
      blurb: 'Work with text: index it, slice it, format it with f-strings, and clean it up with methods.',
      lessons: [
        {
          id: 'indexing-slicing',
          title: 'Indexing & slicing',
          exercises: [
            {
              kind: 'reveal',
              q: `For s = "Python", what does print(s[0]) show?`,
              answer: `P. Indexing starts at 0, so s[0] is the first character, "P".`,
            },
            {
              kind: 'reveal',
              q: `For s = "Python", what does print(s[-1]) show?`,
              answer: `n. Negative indexes count from the end, so s[-1] is the last character, "n".`,
            },
            {
              kind: 'reveal',
              q: `For s = "Python", what does print(s[0:3]) show?`,
              answer: `Pyt. A slice [0:3] takes characters at indexes 0, 1 and 2. The end index 3 is not included.`,
            },
            {
              kind: 'choice',
              q: `For s = "hello", what is s[1]?`,
              options: ['h', 'e', 'l', 'o'],
              correct: 1,
              why: 'Indexing is zero-based, so s[0] is "h" and s[1] is "e".',
            },
            {
              kind: 'reveal',
              q: `What does print(len("hello")) show?`,
              answer: '5. len() counts the characters, and "hello" has 5.',
            },
            {
              kind: 'reveal',
              q: `For s = "Python", what does print(s[2:]) show?`,
              answer: `thon. Leaving out the end index takes everything from index 2 to the end of the string.`,
            },
            {
              kind: 'choice',
              q: `Can you change a character with s[0] = "J"?`,
              options: [
                'Yes, strings are mutable',
                'No, strings are immutable, so it raises a TypeError',
                'Only the first character can change',
                'Yes, but only inside a loop',
              ],
              correct: 1,
              why: 'Strings are immutable: you cannot change a character in place. You build a new string instead, for example with replace or slicing.',
            },
          ],
        },
        {
          id: 'fstrings-concat',
          title: 'f-strings & joining text',
          exercises: [
            {
              kind: 'reveal',
              q: `For name = "Om", what does print(f"Hi {name}") show?`,
              answer: `Hi Om. An f-string (the f before the quotes) swaps {name} for the value of the variable.`,
            },
            {
              kind: 'reveal',
              q: `What does print(f"{2 + 3} apples") show?`,
              answer: '5 apples. You can put any expression inside {}, and Python inserts its result.',
            },
            {
              kind: 'choice',
              q: `What does "ab" + "cd" give?`,
              options: ['abcd', 'ab cd', 'a b c d', 'An error'],
              correct: 0,
              why: '+ joins (concatenates) two strings directly, with no space added, giving "abcd".',
            },
            {
              kind: 'reveal',
              q: `What does print("ha" * 3) show?`,
              answer: 'hahaha. Multiplying a string by an integer repeats it that many times.',
            },
            {
              kind: 'choice',
              q: `You have age = 25 (an int). What prints "I am 25"?`,
              options: [`"I am " + age`, `f"I am {age}"`, `"I am age"`, `"I am " * age`],
              correct: 1,
              why: 'f"I am {age}" inserts the number for you. "I am " + age would raise a TypeError because you cannot add a string and an int directly.',
            },
            {
              kind: 'reveal',
              q: 'For price = 5, how would you print it with two decimals, like 5.00?',
              answer: `print(f"{price:.2f}"). The :.2f format shows the value as a float with 2 decimal places, giving 5.00.`,
            },
            {
              kind: 'multi',
              q: `Which of these produce the string "aaa"? (select all)`,
              options: [`"a" * 3`, `"a" + "a" + "a"`, `"aaa"`, `"a" * "3"`],
              correct: [0, 1, 2],
              why: '"a" * 3, "a" + "a" + "a" and the literal "aaa" all give "aaa". But "a" * "3" raises a TypeError, since you cannot multiply a string by a string.',
            },
          ],
        },
        {
          id: 'string-methods',
          title: 'String methods',
          exercises: [
            {
              kind: 'reveal',
              q: `What does print("hello".upper()) show?`,
              answer: 'HELLO. .upper() returns a new string with every letter in uppercase.',
            },
            {
              kind: 'reveal',
              q: `What does print("HELLO".lower()) show?`,
              answer: 'hello. .lower() returns a lowercase copy of the string.',
            },
            {
              kind: 'reveal',
              q: `What does print("  hi  ".strip()) show?`,
              answer: 'hi. .strip() removes whitespace from both ends, leaving "hi".',
            },
            {
              kind: 'reveal',
              q: `What does print("a,b,c".split(",")) show?`,
              answer: `['a', 'b', 'c']. .split(",") breaks the string at each comma and returns a list of the pieces.`,
            },
            {
              kind: 'reveal',
              q: `What does print("hello".replace("l", "L")) show?`,
              answer: `heLLo. .replace(old, new) swaps every "l" for "L", giving "heLLo".`,
            },
            {
              kind: 'match',
              prompt: 'Match each string method to what it does.',
              pairs: [
                { term: '.upper()', def: 'Return an all-uppercase copy' },
                { term: '.lower()', def: 'Return an all-lowercase copy' },
                { term: '.strip()', def: 'Remove whitespace from both ends' },
                { term: '.split(",")', def: 'Break into a list at each comma' },
                { term: '.replace(a, b)', def: 'Swap every a for b' },
              ],
            },
            {
              kind: 'choice',
              q: 'Do string methods change the original string?',
              options: [
                'Yes, they edit it in place',
                'No, they return a new string and leave the original unchanged',
                'Only .strip() does',
                'They delete the original',
              ],
              correct: 1,
              why: 'Strings are immutable, so methods like .upper() return a brand-new string and leave the original as it was.',
            },
          ],
        },
      ],
    },

    /* ---------------------------- Unit 5 ---------------------------- */
    {
      id: 'conditionals',
      title: 'Booleans, Conditionals & Comparison',
      icon: '🔀',
      blurb: 'Ask yes/no questions with comparisons, and make decisions with if, elif, else and logic.',
      lessons: [
        {
          id: 'comparison',
          title: 'Comparison operators',
          exercises: [
            {
              kind: 'match',
              prompt: 'Match each comparison operator to its meaning.',
              pairs: [
                { term: '==', def: 'Equal to' },
                { term: '!=', def: 'Not equal to' },
                { term: '>', def: 'Greater than' },
                { term: '<', def: 'Less than' },
                { term: '>=', def: 'Greater than or equal to' },
              ],
            },
            {
              kind: 'reveal',
              q: 'What does print(5 == 5) show?',
              answer: 'True. == checks equality, and 5 does equal 5.',
            },
            {
              kind: 'choice',
              q: 'What does 3 != 4 give?',
              options: ['True', 'False', '7', 'An error'],
              correct: 0,
              why: '!= means "not equal". 3 is not equal to 4, so the result is True.',
            },
            {
              kind: 'reveal',
              q: 'What is the difference between = and ==?',
              answer: '= assigns a value to a variable (x = 5). == compares two values and gives True or False (x == 5). Mixing them up is a common beginner bug.',
            },
            {
              kind: 'reveal',
              q: 'What does print(10 > 20) show?',
              answer: 'False. 10 is not greater than 20, so the comparison is False.',
            },
            {
              kind: 'choice',
              q: `What does "cat" == "Cat" give?`,
              options: ['True', 'False', 'An error', 'cat'],
              correct: 1,
              why: 'String comparison is case-sensitive, so "cat" and "Cat" are not equal.',
            },
            {
              kind: 'multi',
              q: 'Which of these comparisons evaluate to True? (select all)',
              options: ['5 > 3', '2 == 2', '4 != 4', '10 < 1', '7 >= 7'],
              correct: [0, 1, 4],
              why: '5 > 3 is True, 2 == 2 is True, and 7 >= 7 is True. But 4 != 4 is False and 10 < 1 is False.',
            },
          ],
        },
        {
          id: 'if-elif-else',
          title: 'if / elif / else',
          exercises: [
            {
              kind: 'reveal',
              q: `What does this print?\nx = 7\nif x > 5:\n    print("big")`,
              answer: 'big. The condition x > 5 is True (7 > 5), so the indented line runs.',
            },
            {
              kind: 'choice',
              q: 'How does Python know which lines belong inside an if?',
              options: ['Curly braces { }', 'Indentation (spaces)', 'A semicolon', 'The word then'],
              correct: 1,
              why: 'Python uses indentation to group a block. The indented lines under an if: run only when the condition is True.',
            },
            {
              kind: 'order',
              q: 'Order these lines into a working grade check.',
              items: [
                'score = 85',
                'if score >= 90:',
                '    grade = "A"',
                'elif score >= 80:',
                '    grade = "B"',
                'else:',
                '    grade = "C"',
              ],
              why: 'Python checks conditions top to bottom, runs the first True branch, and else catches everything else. Here a score of 85 makes grade "B".',
            },
            {
              kind: 'reveal',
              q: `What does this print?\nx = 3\nif x > 5:\n    print("big")\nelse:\n    print("small")`,
              answer: 'small. x > 5 is False (3 is not greater than 5), so the else branch runs.',
            },
            {
              kind: 'choice',
              q: 'What is elif short for?',
              options: ['end if', 'else if', 'elevate if', 'either if'],
              correct: 1,
              why: 'elif means "else if". It checks another condition only when the earlier ones were False.',
            },
            {
              kind: 'reveal',
              q: `What does this print?\nn = 0\nif n > 0:\n    print("positive")\nelif n == 0:\n    print("zero")\nelse:\n    print("negative")`,
              answer: 'zero. n > 0 is False, so Python checks the elif: n == 0 is True, so it prints "zero".',
            },
            {
              kind: 'choice',
              q: 'Do you need a colon after an if condition?',
              options: [
                'No',
                'Yes, an if header ends with a colon',
                'Only with elif',
                'Only inside functions',
              ],
              correct: 1,
              why: 'Every if, elif and else header ends with a colon (:), and the body underneath is indented.',
            },
          ],
        },
        {
          id: 'logical-operators',
          title: 'and / or / not',
          exercises: [
            {
              kind: 'reveal',
              q: 'What does print(True and False) show?',
              answer: 'False. and is True only when both sides are True. Here one side is False, so the result is False.',
            },
            {
              kind: 'reveal',
              q: 'What does print(True or False) show?',
              answer: 'True. or is True when at least one side is True.',
            },
            {
              kind: 'reveal',
              q: 'What does print(not True) show?',
              answer: 'False. not flips a boolean, so not True becomes False.',
            },
            {
              kind: 'choice',
              q: 'When is (a and b) True?',
              options: [
                'When either a or b is True',
                'Only when both a and b are True',
                'Only when both are False',
                'Always',
              ],
              correct: 1,
              why: 'and needs both sides to be True. If either side is False, the whole thing is False.',
            },
            {
              kind: 'choice',
              q: 'What does (5 > 3) and (2 > 10) give?',
              options: ['True', 'False', 'An error', '5'],
              correct: 1,
              why: '5 > 3 is True but 2 > 10 is False. and needs both True, so the result is False.',
            },
            {
              kind: 'match',
              prompt: 'Match each logical operator to what it does.',
              pairs: [
                { term: 'and', def: 'True only if both sides are True' },
                { term: 'or', def: 'True if at least one side is True' },
                { term: 'not', def: 'Flips True to False and False to True' },
              ],
            },
            {
              kind: 'reveal',
              q: 'How would you check that age is between 13 and 19 inclusive?',
              answer: 'age >= 13 and age <= 19. Combine two comparisons with and. Python also allows the shorthand 13 <= age <= 19.',
            },
          ],
        },
      ],
    },

    /* ---------------------------- Unit 6 ---------------------------- */
    {
      id: 'lists-loops',
      title: 'Lists & Loops',
      icon: '📋',
      blurb: 'Hold many values in a list, then walk through them with for and while loops.',
      lessons: [
        {
          id: 'lists-basics',
          title: 'Lists',
          exercises: [
            {
              kind: 'reveal',
              q: 'How would you make a list of the numbers 1, 2 and 3?',
              answer: 'nums = [1, 2, 3]. A list is written with square brackets and comma-separated items.',
            },
            {
              kind: 'reveal',
              q: 'For nums = [10, 20, 30], what does print(nums[0]) show?',
              answer: '10. List indexing starts at 0, so nums[0] is the first item.',
            },
            {
              kind: 'reveal',
              q: 'For nums = [10, 20, 30], what does print(nums[-1]) show?',
              answer: '30. Index -1 is the last item.',
            },
            {
              kind: 'reveal',
              q: `What does this print?\nnums = [1, 2, 3]\nnums.append(4)\nprint(nums)`,
              answer: '[1, 2, 3, 4]. .append(4) adds 4 to the end of the list, changing it in place.',
            },
            {
              kind: 'reveal',
              q: 'What does print(len([5, 6, 7])) show?',
              answer: '3. len() counts the items in the list, and there are 3.',
            },
            {
              kind: 'choice',
              q: `Can a list hold different types at once, like [1, "hi", True]?`,
              options: [
                'No, all items must be the same type',
                'Yes, a list can mix types',
                'Only numbers are allowed',
                'Only two items are allowed',
              ],
              correct: 1,
              why: 'A Python list can hold any mix of types, though keeping items the same type is often cleaner.',
            },
            {
              kind: 'reveal',
              q: `What does this print?\nnums = [1, 2, 3]\nnums[1] = 20\nprint(nums)`,
              answer: '[1, 20, 3]. Lists are mutable, so assigning to nums[1] changes the second item to 20.',
            },
          ],
        },
        {
          id: 'for-loops-range',
          title: 'for loops & range()',
          exercises: [
            {
              kind: 'reveal',
              q: `What does this print?\nfor i in range(3):\n    print(i)`,
              answer: '0, then 1, then 2, each on its own line. range(3) gives 0, 1, 2 and stops before 3.',
            },
            {
              kind: 'reveal',
              q: 'What does list(range(1, 4)) give?',
              answer: '[1, 2, 3]. range(1, 4) starts at 1 and stops before 4.',
            },
            {
              kind: 'choice',
              q: 'How many times does this loop run: for i in range(5)?',
              options: ['4', '5', '6', 'Forever'],
              correct: 1,
              why: 'range(5) produces 0, 1, 2, 3, 4, which is five values, so the loop body runs 5 times.',
            },
            {
              kind: 'reveal',
              q: `What does this print?\nfor c in "hi":\n    print(c)`,
              answer: 'h, then i, each on its own line. A for loop over a string visits one character at a time.',
            },
            {
              kind: 'reveal',
              q: `What does this print?\ntotal = 0\nfor n in [1, 2, 3]:\n    total = total + n\nprint(total)`,
              answer: '6. The loop adds each number to total: 0 + 1 + 2 + 3 = 6.',
            },
            {
              kind: 'reveal',
              q: 'What does list(range(0, 10, 2)) give?',
              answer: '[0, 2, 4, 6, 8]. The third number is the step, so it counts up by 2 and stops before 10.',
            },
            {
              kind: 'choice',
              q: 'What does range(2, 8) include?',
              options: ['2 through 8', '2 through 7', '3 through 8', '2 through 9'],
              correct: 1,
              why: 'range(start, stop) includes start but stops before stop, so range(2, 8) is 2, 3, 4, 5, 6, 7.',
            },
          ],
        },
        {
          id: 'while-loops',
          title: 'while loops',
          exercises: [
            {
              kind: 'reveal',
              q: `What does this print?\ni = 0\nwhile i < 3:\n    print(i)\n    i = i + 1`,
              answer: '0, 1, 2, each on its own line. The loop repeats while i < 3, printing i and adding 1 each time, until i reaches 3.',
            },
            {
              kind: 'choice',
              q: 'What is the danger with while loops?',
              options: [
                'They can only run once',
                'If the condition never becomes False, it loops forever',
                'They cannot use variables',
                'They are slower than lists',
              ],
              correct: 1,
              why: 'If nothing inside the loop makes the condition False, you get an infinite loop. Always make sure the condition can eventually stop.',
            },
            {
              kind: 'reveal',
              q: 'What does break do inside a loop?',
              answer: 'break immediately stops the loop and continues with the code after it, even if the loop condition is still True.',
            },
            {
              kind: 'reveal',
              q: 'What does continue do inside a loop?',
              answer: 'continue skips the rest of the current iteration and jumps to the next one, without leaving the loop.',
            },
            {
              kind: 'choice',
              q: 'When should you prefer a for loop over a while loop?',
              options: [
                'When you loop over a known sequence or a fixed number of times',
                'When you never want the loop to stop',
                'Only for strings',
                'Never, while is always better',
              ],
              correct: 0,
              why: 'A for loop is cleanest when you iterate over a collection or a known count with range. A while loop suits "keep going until some condition changes".',
            },
            {
              kind: 'order',
              q: 'Order these lines into a countdown that prints 3, 2, 1, then Go!.',
              items: ['n = 3', 'while n > 0:', '    print(n)', '    n = n - 1', 'print("Go!")'],
              why: 'Set a start value, loop while the condition holds, do the work, and change the variable each pass so the loop can end. This prints 3, 2, 1, then Go!.',
            },
          ],
        },
      ],
    },

    /* ---------------------------- Unit 7 ---------------------------- */
    {
      id: 'dicts-sets',
      title: 'Dictionaries & Sets',
      icon: '🗂️',
      blurb: 'Look values up by key with dictionaries, and keep unique items with sets.',
      lessons: [
        {
          id: 'dict-basics',
          title: 'Dictionaries',
          exercises: [
            {
              kind: 'reveal',
              q: 'How would you make a dictionary mapping "name" to "Om" and "age" to 25?',
              answer: `person = {"name": "Om", "age": 25}. A dict uses curly braces with key: value pairs.`,
            },
            {
              kind: 'reveal',
              q: `For person = {"name": "Om"}, what does print(person["name"]) show?`,
              answer: 'Om. You look up a value by its key using square brackets.',
            },
            {
              kind: 'choice',
              q: 'What is a dictionary good for?',
              options: [
                'Keeping items in sorted order only',
                'Storing key-value pairs for fast lookup by key',
                'Only holding numbers',
                'Repeating code',
              ],
              correct: 1,
              why: 'A dict stores key-value pairs and lets you look up a value quickly by its key, like a lookup table.',
            },
            {
              kind: 'reveal',
              q: `What does this print?\nd = {"a": 1}\nd["b"] = 2\nprint(d)`,
              answer: `{'a': 1, 'b': 2}. Assigning to a new key adds it to the dict.`,
            },
            {
              kind: 'choice',
              q: 'Can a dictionary have two of the same key?',
              options: [
                'Yes, duplicates are kept',
                'No, keys are unique, so a repeat overwrites the old value',
                'Only for string keys',
                'Only inside a loop',
              ],
              correct: 1,
              why: 'Dictionary keys are unique. Assigning to an existing key replaces its value rather than adding a duplicate.',
            },
            {
              kind: 'reveal',
              q: `What does print(person["email"]) do if "email" is not a key?`,
              answer: `It raises a KeyError, because that key does not exist. Use person.get("email") to get None instead of an error.`,
            },
          ],
        },
        {
          id: 'dict-iterate-get',
          title: 'Iterating & .get()',
          exercises: [
            {
              kind: 'reveal',
              q: `For d = {"a": 1}, what does print(d.get("b")) show?`,
              answer: 'None. .get() returns None for a missing key instead of raising an error.',
            },
            {
              kind: 'reveal',
              q: `For d = {"a": 1}, what does print(d.get("b", 0)) show?`,
              answer: '0. The second argument to .get() is the default returned when the key is missing.',
            },
            {
              kind: 'reveal',
              q: `What does this print?\nd = {"x": 1, "y": 2}\nfor key in d:\n    print(key)`,
              answer: 'x, then y, each on its own line. Looping over a dict gives you its keys, in insertion order.',
            },
            {
              kind: 'choice',
              q: 'How do you loop over both keys and values at once?',
              options: [
                'for k in d.keys()',
                'for k, v in d.items()',
                'for v in d.values()',
                'for k in d.pairs()',
              ],
              correct: 1,
              why: 'd.items() yields (key, value) pairs, so for k, v in d.items() gives you both at once.',
            },
            {
              kind: 'reveal',
              q: `What does d.values() give for d = {"a": 1, "b": 2}?`,
              answer: 'The values 1 and 2 (as a dict_values view). You often wrap it in list() to get [1, 2].',
            },
            {
              kind: 'match',
              prompt: 'Match each dictionary access to what it does.',
              pairs: [
                { term: 'd[key]', def: 'Get a value, or raise KeyError if missing' },
                { term: 'd.get(key)', def: 'Get a value, or None if missing' },
                { term: 'd.keys()', def: 'All the keys' },
                { term: 'd.values()', def: 'All the values' },
                { term: 'd.items()', def: 'All the key-value pairs' },
              ],
            },
          ],
        },
        {
          id: 'sets',
          title: 'Sets',
          exercises: [
            {
              kind: 'reveal',
              q: 'What does print({1, 2, 2, 3}) show?',
              answer: '{1, 2, 3}. A set automatically removes duplicates, so the repeated 2 appears only once. (A set has no guaranteed order.)',
            },
            {
              kind: 'reveal',
              q: 'What does print(len({1, 2, 2, 3})) show?',
              answer: '3. Duplicates are dropped, so the set has three unique items.',
            },
            {
              kind: 'choice',
              q: 'When is a set the right choice?',
              options: [
                'When you need ordered items with duplicates',
                'When you need unique items and fast membership tests',
                'When you need key-value pairs',
                'When you need a guaranteed insertion order',
              ],
              correct: 1,
              why: 'Sets store unique values and make "is x in here?" checks very fast. They do not keep duplicates or a guaranteed order.',
            },
            {
              kind: 'reveal',
              q: 'What does print(3 in {1, 2, 3}) show?',
              answer: 'True. in checks membership, and 3 is in the set.',
            },
            {
              kind: 'match',
              prompt: 'Match each collection to when you would reach for it.',
              pairs: [
                { term: 'list', def: 'Ordered items, duplicates allowed' },
                { term: 'dict', def: 'Key-value lookups' },
                { term: 'set', def: 'Unique items, fast membership' },
                { term: 'str', def: 'Text' },
              ],
            },
            {
              kind: 'reveal',
              q: 'How would you get the unique items from a list nums = [1, 1, 2, 3, 3]?',
              answer: 'set(nums). Wrapping a list in set() removes duplicates, giving {1, 2, 3}. Use list(set(nums)) to get a list back.',
            },
            {
              kind: 'multi',
              q: 'Which of these are true about sets? (select all)',
              options: [
                'They remove duplicate values',
                'They keep items in a guaranteed sorted order',
                'They make membership tests fast',
                'They store key-value pairs',
              ],
              correct: [0, 2],
              why: 'Sets drop duplicates and give fast membership tests. They do not guarantee an order, and key-value pairs are what dictionaries are for.',
            },
          ],
        },
      ],
    },

    /* ---------------------------- Unit 8 ---------------------------- */
    {
      id: 'functions',
      title: 'Functions',
      icon: '⚙️',
      blurb: 'Package code you can reuse: define functions, pass in arguments, and return results.',
      lessons: [
        {
          id: 'def-return',
          title: 'def & return',
          exercises: [
            {
              kind: 'reveal',
              q: 'How would you define a function greet that prints "Hello"?',
              answer: `def greet():\n    print("Hello")\ndef names the function, and the indented body is what it does.`,
            },
            {
              kind: 'reveal',
              q: `What does this print?\ndef add(a, b):\n    return a + b\nprint(add(2, 3))`,
              answer: '5. add(2, 3) runs the function with a = 2 and b = 3, returns 5, and print shows it.',
            },
            {
              kind: 'choice',
              q: 'What does return do?',
              options: [
                'Prints a value to the screen',
                'Sends a value back to whoever called the function',
                'Ends the whole program',
                'Defines a variable',
              ],
              correct: 1,
              why: 'return hands a value back to the caller and ends the function. It does not print; you print the returned value if you want to see it.',
            },
            {
              kind: 'reveal',
              q: 'What is the difference between print and return?',
              answer: 'print shows text on the screen. return gives a value back to the code that called the function, so it can be stored or reused. A function that only prints returns None.',
            },
            {
              kind: 'reveal',
              q: `What does this print?\ndef square(n):\n    return n * n\nresult = square(4)\nprint(result)`,
              answer: '16. square(4) returns 4 * 4 = 16, which is stored in result and printed.',
            },
            {
              kind: 'choice',
              q: 'What does a function return if it has no return statement?',
              options: ['0', 'An empty string', 'None', 'It raises an error'],
              correct: 2,
              why: 'A function with no return (or a bare return) gives back None, Python\'s "nothing here" value.',
            },
            {
              kind: 'order',
              q: 'Order these lines to define and use a function that doubles a number.',
              items: ['def double(n):', '    return n * 2', 'answer = double(5)', 'print(answer)'],
              why: 'You define the function first, then call it and use its returned value. Here double(5) returns 10, which is printed.',
            },
            {
              kind: 'multi',
              q: 'Which of these are true about return? (select all)',
              options: [
                'It sends a value back to the caller',
                'It ends the function immediately',
                'It prints to the screen',
                'A function without it returns None',
              ],
              correct: [0, 1, 3],
              why: 'return passes a value back, ends the function right there, and a function with no return gives back None. Printing is a separate job done by print().',
            },
          ],
        },
        {
          id: 'parameters-defaults',
          title: 'Parameters & defaults',
          exercises: [
            {
              kind: 'reveal',
              q: `What does this print?\ndef greet(name):\n    print("Hi " + name)\ngreet("Om")`,
              answer: 'Hi Om. The argument "Om" fills the parameter name, so it prints "Hi Om".',
            },
            {
              kind: 'reveal',
              q: `What does this print?\ndef greet(name="friend"):\n    print("Hi " + name)\ngreet()`,
              answer: 'Hi friend. name has a default of "friend", so calling greet() with no argument uses it.',
            },
            {
              kind: 'choice',
              q: 'What is a default parameter value for?',
              options: [
                'It makes the function run faster',
                'It is used when the caller does not pass that argument',
                'It is required on every parameter',
                'It stops the function from returning',
              ],
              correct: 1,
              why: 'A default such as name="friend" is used only when the caller leaves that argument out, which makes it optional.',
            },
            {
              kind: 'reveal',
              q: 'For def power(base, exp=2): return base ** exp, what does power(3) return?',
              answer: '9. exp defaults to 2, so it computes 3 ** 2 = 9.',
            },
            {
              kind: 'choice',
              q: 'In def add(a, b), what are a and b called?',
              options: ['Arguments', 'Parameters', 'Returns', 'Keywords'],
              correct: 1,
              why: 'In the definition they are parameters (the placeholders). The values you pass when calling, like add(2, 3), are the arguments.',
            },
            {
              kind: 'reveal',
              q: `What does this print?\ndef make_tag(text, tag="p"):\n    return "<" + tag + ">" + text + "</" + tag + ">"\nprint(make_tag("hi"))`,
              answer: '<p>hi</p>. tag defaults to "p", so it wraps "hi" in a pair of p tags.',
            },
          ],
        },
        {
          id: 'scope',
          title: 'Scope',
          exercises: [
            {
              kind: 'reveal',
              q: `What does this print?\ndef f():\n    x = 5\nf()\nprint(x)`,
              answer: 'It raises a NameError. x is a local variable inside f(), so it does not exist outside the function.',
            },
            {
              kind: 'choice',
              q: 'What is a local variable?',
              options: [
                'A variable that works everywhere',
                'A variable created inside a function, usable only there',
                'A variable that never changes',
                'A built-in function',
              ],
              correct: 1,
              why: 'A local variable lives only inside the function where it is created, and disappears when the function ends.',
            },
            {
              kind: 'reveal',
              q: `What does this print?\nx = 10\ndef show():\n    print(x)\nshow()`,
              answer: '10. A function can read a variable from the outer (global) scope, so it sees x = 10.',
            },
            {
              kind: 'reveal',
              q: `What does this print?\nx = 1\ndef change():\n    x = 99\nchange()\nprint(x)`,
              answer: '1. Inside change(), x = 99 makes a new local x. The global x stays 1.',
            },
            {
              kind: 'choice',
              q: 'Why keep variables local when you can?',
              options: [
                'It makes code slower',
                'It avoids accidental clashes and keeps functions self-contained',
                'Local variables are required by Python',
                'Global variables are not allowed',
              ],
              correct: 1,
              why: 'Local variables keep a function independent and stop it from accidentally changing something elsewhere, which makes bugs rarer.',
            },
            {
              kind: 'match',
              prompt: 'Match each term to its meaning.',
              pairs: [
                { term: 'parameter', def: 'A placeholder name in the function definition' },
                { term: 'argument', def: 'The actual value passed in when calling' },
                { term: 'local variable', def: 'A name that exists only inside the function' },
                { term: 'global variable', def: 'A name defined at the top level, readable inside functions' },
              ],
            },
          ],
        },
      ],
    },

    /* ---------------------------- Unit 9 ---------------------------- */
    {
      id: 'classes-fastapi',
      title: 'Classes & OOP, then FastAPI',
      icon: '🏛️',
      blurb: 'Model things with classes and objects, then see how Python powers the Cortex FastAPI backend.',
      lessons: [
        {
          id: 'classes-objects',
          title: 'Classes & objects',
          exercises: [
            {
              kind: 'choice',
              q: 'What is a class?',
              options: [
                'A single value',
                'A blueprint for creating objects',
                'A kind of loop',
                'A built-in function',
              ],
              correct: 1,
              why: 'A class is a blueprint that defines the data (attributes) and behavior (methods) its objects will have. You create objects, called instances, from it.',
            },
            {
              kind: 'reveal',
              q: 'What does __init__ do in a class?',
              answer: `It is the initializer (constructor). Python runs it automatically when you create an object, and you use it to set the object's starting attributes.`,
            },
            {
              kind: 'reveal',
              q: `What does this print?\nclass Dog:\n    def __init__(self, name):\n        self.name = name\nd = Dog("Rex")\nprint(d.name)`,
              answer: `Rex. Creating Dog("Rex") runs __init__ with name = "Rex" and stores it as self.name, so d.name is "Rex".`,
            },
            {
              kind: 'choice',
              q: 'What is self in a method?',
              options: [
                'The class itself',
                'The specific object the method is called on',
                'A keyword that ends the class',
                'The return value',
              ],
              correct: 1,
              why: 'self refers to the particular instance the method is working with, so each object can carry its own data.',
            },
            {
              kind: 'order',
              q: 'Order these lines to define a Cat class and print an instance name.',
              items: [
                'class Cat:',
                '    def __init__(self, name):',
                '        self.name = name',
                'c = Cat("Milo")',
                'print(c.name)',
              ],
              why: 'Define the class with __init__ to set attributes, then create an instance and read its attribute. This prints Milo.',
            },
            {
              kind: 'match',
              prompt: 'Match each OOP term to its meaning.',
              pairs: [
                { term: 'class', def: 'A blueprint for objects' },
                { term: 'object', def: 'A specific instance made from a class' },
                { term: 'attribute', def: 'A piece of data stored on an object' },
                { term: 'method', def: 'A function defined inside a class' },
                { term: '__init__', def: 'Runs when an object is created' },
              ],
            },
          ],
        },
        {
          id: 'methods',
          title: 'Methods',
          exercises: [
            {
              kind: 'reveal',
              q: `What does this print?\nclass Counter:\n    def __init__(self):\n        self.n = 0\n    def bump(self):\n        self.n = self.n + 1\nc = Counter()\nc.bump()\nc.bump()\nprint(c.n)`,
              answer: '2. Each bump() adds 1 to self.n. Starting at 0 and calling it twice gives 2.',
            },
            {
              kind: 'choice',
              q: 'How do you call a method named greet on object p?',
              options: ['greet(p)', 'p.greet()', 'p->greet()', 'greet.p()'],
              correct: 1,
              why: 'You call a method with dot syntax: p.greet(). Python passes p in as self automatically.',
            },
            {
              kind: 'reveal',
              q: 'Why does every method have self as its first parameter?',
              answer: `So the method can read and change that specific object's data. When you call p.greet(), Python passes p in as self.`,
            },
            {
              kind: 'reveal',
              q: `What does this print?\nclass Rect:\n    def __init__(self, w, h):\n        self.w = w\n        self.h = h\n    def area(self):\n        return self.w * self.h\nr = Rect(3, 4)\nprint(r.area())`,
              answer: '12. area() returns self.w * self.h = 3 * 4 = 12.',
            },
            {
              kind: 'choice',
              q: `Where do an object's attributes usually get created?`,
              options: [
                'In a loop',
                'Inside __init__, using self.attribute = value',
                'Outside the class',
                'They cannot be created',
              ],
              correct: 1,
              why: 'You normally set an object\'s starting attributes in __init__ with self.attribute = value, so every new object has them.',
            },
          ],
        },
        {
          id: 'python-for-cortex',
          title: 'Python for your Cortex FastAPI backend',
          exercises: [
            {
              kind: 'choice',
              q: 'What is FastAPI?',
              options: [
                'A database',
                'A Python web framework for building APIs',
                'A front-end design tool',
                'A Mendix module',
              ],
              correct: 1,
              why: 'FastAPI is a modern Python framework for building web APIs quickly, with automatic validation and docs. In Cortex it hosts the SM-2 scheduler.',
            },
            {
              kind: 'reveal',
              q: 'How would you define a simple GET route at /health that returns a status?',
              answer: `@app.get("/health")\ndef health():\n    return {"status": "ok"}\nThe decorator maps the URL to the function, and returning a dict sends it back as JSON.`,
            },
            {
              kind: 'reveal',
              q: `When a FastAPI route returns {"status": "ok"}, what does the client receive?`,
              answer: `The JSON {"status": "ok"}. FastAPI automatically converts the Python dict into a JSON response.`,
            },
            {
              kind: 'order',
              q: 'Order the steps of a FastAPI request, from the client call to the response.',
              items: [
                'The client sends an HTTP request to a route like POST /review',
                'FastAPI matches the URL to the right path operation function',
                'FastAPI validates the request body against a Pydantic model',
                'Your function runs the SM-2 logic and returns a dict',
                'FastAPI serializes the dict to JSON and sends the response',
              ],
              why: 'FastAPI routes the request, validates the input, runs your Python function, and turns the returned dict into a JSON response. That is the round trip your Cortex scheduler uses.',
            },
            {
              kind: 'choice',
              q: 'Why use Python for the Cortex SM-2 scheduler instead of doing it all in Mendix?',
              options: [
                'Python is the only language that can do math',
                'A small Python service cleanly owns the SM-2 algorithm and is easy to test and evolve',
                'Mendix cannot make HTTP calls',
                'Python is required by every web app',
              ],
              correct: 1,
              why: 'Isolating the SM-2 scheduling logic in a focused Python service keeps that algorithm easy to read, unit-test and change, while Mendix calls it over REST and owns the app and its data.',
            },
            {
              kind: 'choice',
              q: 'What is a Pydantic model used for in FastAPI?',
              options: [
                'Styling the web page',
                'Describing and validating the shape of request and response data',
                'Storing files on disk',
                'Running the server',
              ],
              correct: 1,
              why: 'A Pydantic model declares the fields and types of your data. FastAPI uses it to validate incoming JSON and to shape responses, catching bad input early.',
            },
            {
              kind: 'reveal',
              q: `In one line, why is Python a good fit for the algorithm behind Cortex's review scheduling?`,
              answer: `Python's clear syntax and strong ecosystem make an algorithm like SM-2 quick to write, read and test, so the scheduling rules stay easy to reason about and improve.`,
            },
            {
              kind: 'multi',
              q: 'Which of these are true about FastAPI? (select all)',
              options: [
                'It is written in and used from Python',
                'It builds web APIs',
                'It can validate request data with Pydantic models',
                'It is a Mendix widget',
              ],
              correct: [0, 1, 2],
              why: 'FastAPI is a Python framework for building APIs, and it validates request data with Pydantic. It is not a Mendix widget; Mendix simply calls it over REST.',
            },
          ],
        },
      ],
    },
  ],
}
