export const topics = [
  "Number Theory",
  "Algebra",
  "Geometry",
  "Counting and Probability",
];

export const difficultyLabels = {
  1: "Beginner",
  2: "Intermediate",
  3: "Advanced",
  4: "Expert",
  5: "Competition",
};

export const questions = [
  // ═══════════════════════════════════════════
  // NUMBER THEORY
  // ═══════════════════════════════════════════

  // Difficulty 1
  { id: "nt_01", q: "What is the greatest common divisor of 12 and 18?", choices: ["2", "3", "6", "9"], answer: 2, topic: "Number Theory", difficulty: 1 },
  { id: "nt_02", q: "How many factors does 24 have?", choices: ["6", "8", "4", "12"], answer: 1, topic: "Number Theory", difficulty: 1 },
  { id: "nt_11", q: "What is the smallest prime number?", choices: ["0", "1", "2", "3"], answer: 2, topic: "Number Theory", difficulty: 1 },
  { id: "nt_12", q: "What is the least common multiple of 4 and 6?", choices: ["8", "10", "12", "24"], answer: 2, topic: "Number Theory", difficulty: 1 },
  { id: "nt_13", q: "Is 51 a prime number?", choices: ["Yes", "No, it is divisible by 3", "No, it is divisible by 7", "No, it is divisible by 11"], answer: 1, topic: "Number Theory", difficulty: 1 },
  { id: "nt_14", q: "What is the sum of the first five positive integers?", choices: ["10", "12", "15", "20"], answer: 2, topic: "Number Theory", difficulty: 1 },

  // Difficulty 2
  { id: "nt_03", q: "What is the greatest common divisor of 84 and 126?", choices: ["14", "21", "42", "7"], answer: 2, topic: "Number Theory", difficulty: 2 },
  { id: "nt_04", q: "How many prime numbers are less than 30?", choices: ["9", "10", "11", "8"], answer: 1, topic: "Number Theory", difficulty: 2 },
  { id: "nt_15", q: "What is the remainder when 47 is divided by 8?", choices: ["3", "5", "7", "1"], answer: 2, topic: "Number Theory", difficulty: 2 },
  { id: "nt_16", q: "What is the prime factorization of 180?", choices: ["2² × 3² × 5", "2 × 3³ × 5", "2² × 3 × 5²", "2³ × 3 × 5"], answer: 0, topic: "Number Theory", difficulty: 2 },
  { id: "nt_17", q: "How many positive divisors does 36 have?", choices: ["6", "7", "8", "9"], answer: 3, topic: "Number Theory", difficulty: 2 },
  { id: "nt_18", q: "What is the sum of the prime factors of 30?", choices: ["8", "10", "12", "15"], answer: 1, topic: "Number Theory", difficulty: 2 },

  // Difficulty 3
  { id: "nt_05", q: "What is the remainder when 2^40 is divided by 7?", choices: ["1", "2", "4", "6"], answer: 2, topic: "Number Theory", difficulty: 3 },
  { id: "nt_06", q: "What is the least common multiple of 12, 15, and 20?", choices: ["60", "120", "180", "300"], answer: 0, topic: "Number Theory", difficulty: 3 },
  { id: "nt_19", q: "How many trailing zeros does 25! have?", choices: ["4", "5", "6", "7"], answer: 2, topic: "Number Theory", difficulty: 3 },
  { id: "nt_20", q: "What is the remainder when 3^100 is divided by 4?", choices: ["0", "1", "2", "3"], answer: 1, topic: "Number Theory", difficulty: 3 },
  { id: "nt_21", q: "How many integers between 1 and 100 are divisible by both 3 and 7?", choices: ["3", "4", "5", "6"], answer: 1, topic: "Number Theory", difficulty: 3 },
  { id: "nt_22", q: "What is the greatest common divisor of 2^6 × 3^4 and 2^4 × 3^7?", choices: ["2^4 × 3^4", "2^6 × 3^7", "2^4 × 3^7", "2^6 × 3^4"], answer: 0, topic: "Number Theory", difficulty: 3 },

  // Difficulty 4
  { id: "nt_07", q: "How many positive divisors does 2^3 × 3^2 × 5 have?", choices: ["12", "24", "30", "48"], answer: 1, topic: "Number Theory", difficulty: 4 },
  { id: "nt_08", q: "What is the sum of all positive divisors of 28?", choices: ["28", "56", "57", "64"], answer: 1, topic: "Number Theory", difficulty: 4 },
  { id: "nt_23", q: "What is Euler's totient function φ(36)?", choices: ["8", "10", "12", "14"], answer: 2, topic: "Number Theory", difficulty: 4 },
  { id: "nt_24", q: "Find the last digit of 7^2024.", choices: ["1", "3", "7", "9"], answer: 0, topic: "Number Theory", difficulty: 4 },
  { id: "nt_25", q: "How many positive integers n satisfy n | 360 and n > 15?", choices: ["12", "14", "16", "18"], answer: 2, topic: "Number Theory", difficulty: 4 },
  { id: "nt_26", q: "What is the sum of all positive integers less than 100 that are coprime to 100?", choices: ["2000", "4000", "5000", "6000"], answer: 1, topic: "Number Theory", difficulty: 4 },

  // Difficulty 5
  { id: "nt_09", q: "Find the last two digits of 7^2023.", choices: ["07", "43", "49", "01"], answer: 1, topic: "Number Theory", difficulty: 5 },
  { id: "nt_10", q: "How many integers from 1 to 1000 are divisible by neither 3 nor 5?", choices: ["467", "533", "600", "400"], answer: 1, topic: "Number Theory", difficulty: 5 },
  { id: "nt_27", q: "What is the largest power of 2 that divides 100!?", choices: ["48", "89", "97", "64"], answer: 2, topic: "Number Theory", difficulty: 5 },
  { id: "nt_28", q: "Find the number of ordered pairs (a, b) of positive integers such that lcm(a, b) = 72.", choices: ["81", "91", "105", "119"], answer: 0, topic: "Number Theory", difficulty: 5 },
  { id: "nt_29", q: "What is the remainder when 1! + 2! + 3! + ... + 100! is divided by 12?", choices: ["1", "5", "9", "3"], answer: 2, topic: "Number Theory", difficulty: 5 },
  { id: "nt_30", q: "How many integers n, 1 ≤ n ≤ 1000, have the property that the sum of the digits of n is divisible by 7?", choices: ["124", "130", "142", "149"], answer: 2, topic: "Number Theory", difficulty: 5 },

  // ═══════════════════════════════════════════
  // ALGEBRA
  // ═══════════════════════════════════════════

  // Difficulty 1
  { id: "al_01", q: "If 3x + 5 = 20, what is x?", choices: ["3", "5", "7", "15"], answer: 1, topic: "Algebra", difficulty: 1 },
  { id: "al_02", q: "What is the value of 2^5?", choices: ["10", "16", "32", "64"], answer: 2, topic: "Algebra", difficulty: 1 },
  { id: "al_11", q: "Simplify: 4(x + 3) − 2x.", choices: ["2x + 12", "2x + 3", "6x + 12", "6x + 3"], answer: 0, topic: "Algebra", difficulty: 1 },
  { id: "al_12", q: "What is the value of x if x/4 = 7?", choices: ["3", "11", "28", "32"], answer: 2, topic: "Algebra", difficulty: 1 },
  { id: "al_13", q: "What is 15% of 80?", choices: ["8", "10", "12", "15"], answer: 2, topic: "Algebra", difficulty: 1 },
  { id: "al_14", q: "If y = 2x − 1 and x = 4, what is y?", choices: ["5", "6", "7", "9"], answer: 2, topic: "Algebra", difficulty: 1 },

  // Difficulty 2
  { id: "al_03", q: "If f(x) = 3x² + 7x − 4, what is f(2)?", choices: ["18", "22", "26", "14"], answer: 1, topic: "Algebra", difficulty: 2 },
  { id: "al_04", q: "What is the sum of the arithmetic sequence 2, 5, 8, ..., 29?", choices: ["150", "155", "160", "165"], answer: 1, topic: "Algebra", difficulty: 2 },
  { id: "al_15", q: "What are the solutions to x² − 5x + 6 = 0?", choices: ["x = 1, 6", "x = 2, 3", "x = −2, −3", "x = −1, 6"], answer: 1, topic: "Algebra", difficulty: 2 },
  { id: "al_16", q: "If 2^x = 64, what is x?", choices: ["4", "5", "6", "8"], answer: 2, topic: "Algebra", difficulty: 2 },
  { id: "al_17", q: "What is the slope of the line passing through (1, 3) and (4, 15)?", choices: ["3", "4", "5", "6"], answer: 1, topic: "Algebra", difficulty: 2 },
  { id: "al_18", q: "Simplify: (x³)² ÷ x⁴.", choices: ["x", "x²", "x⁵", "x¹⁰"], answer: 1, topic: "Algebra", difficulty: 2 },

  // Difficulty 3
  { id: "al_05", q: "If log₂(x) = 5, what is x?", choices: ["10", "25", "32", "64"], answer: 2, topic: "Algebra", difficulty: 3 },
  { id: "al_06", q: "What is the product of the roots of x² − 7x + 12 = 0?", choices: ["7", "12", "-7", "-12"], answer: 1, topic: "Algebra", difficulty: 3 },
  { id: "al_19", q: "What is the sum of the geometric series 1 + 3 + 9 + 27 + 81?", choices: ["111", "121", "131", "243"], answer: 1, topic: "Algebra", difficulty: 3 },
  { id: "al_20", q: "If |2x − 5| = 11, what is the sum of all possible values of x?", choices: ["3", "5", "8", "10"], answer: 1, topic: "Algebra", difficulty: 3 },
  { id: "al_21", q: "The sum of three consecutive even integers is 78. What is the largest?", choices: ["24", "26", "28", "30"], answer: 2, topic: "Algebra", difficulty: 3 },
  { id: "al_22", q: "What is the vertex of the parabola y = x² − 6x + 5?", choices: ["(3, −4)", "(3, 4)", "(−3, −4)", "(6, 5)"], answer: 0, topic: "Algebra", difficulty: 3 },

  // Difficulty 4
  { id: "al_07", q: "If a + b = 10 and ab = 21, what is a² + b²?", choices: ["58", "52", "48", "79"], answer: 0, topic: "Algebra", difficulty: 4 },
  { id: "al_08", q: "How many real solutions does x⁴ − 5x² + 4 = 0 have?", choices: ["0", "2", "4", "1"], answer: 2, topic: "Algebra", difficulty: 4 },
  { id: "al_23", q: "If x + y = 7 and x² + y² = 29, what is xy?", choices: ["8", "10", "12", "14"], answer: 1, topic: "Algebra", difficulty: 4 },
  { id: "al_24", q: "What is the sum of the infinite geometric series 8 + 4 + 2 + 1 + ...?", choices: ["15", "16", "20", "∞"], answer: 1, topic: "Algebra", difficulty: 4 },
  { id: "al_25", q: "If f(x) = x² and g(x) = 2x + 1, what is f(g(3))?", choices: ["36", "42", "49", "64"], answer: 2, topic: "Algebra", difficulty: 4 },
  { id: "al_26", q: "For how many real values of c does x² + 6x + c = 0 have exactly one real solution?", choices: ["0", "1", "2", "Infinitely many"], answer: 1, topic: "Algebra", difficulty: 4 },

  // Difficulty 5
  { id: "al_09", q: "If x + 1/x = 5, what is x³ + 1/x³?", choices: ["110", "125", "140", "80"], answer: 0, topic: "Algebra", difficulty: 5 },
  { id: "al_10", q: "Find the sum: 1/1·2 + 1/2·3 + 1/3·4 + ... + 1/99·100.", choices: ["99/100", "100/101", "1/2", "49/50"], answer: 0, topic: "Algebra", difficulty: 5 },
  { id: "al_27", q: "If the roots of x² + bx + c = 0 are each one more than the roots of x² + 3x + 1 = 0, what is c?", choices: ["−1", "1", "3", "5"], answer: 2, topic: "Algebra", difficulty: 5 },
  { id: "al_28", q: "What is the value of √(2 + √(2 + √(2 + ...))) ?", choices: ["1", "√2", "2", "1 + √2"], answer: 2, topic: "Algebra", difficulty: 5 },
  { id: "al_29", q: "If a, b, c are roots of x³ − 6x² + 11x − 6 = 0, what is a² + b² + c²?", choices: ["10", "14", "22", "36"], answer: 1, topic: "Algebra", difficulty: 5 },
  { id: "al_30", q: "Find the sum: 1² − 2² + 3² − 4² + ... + 99² − 100².", choices: ["-5050", "-4950", "-5150", "-5000"], answer: 0, topic: "Algebra", difficulty: 5 },

  // ═══════════════════════════════════════════
  // GEOMETRY
  // ═══════════════════════════════════════════

  // Difficulty 1
  { id: "ge_01", q: "What is the area of a rectangle with length 8 and width 5?", choices: ["13", "26", "40", "45"], answer: 2, topic: "Geometry", difficulty: 1 },
  { id: "ge_02", q: "How many degrees are in a right angle?", choices: ["45", "90", "180", "360"], answer: 1, topic: "Geometry", difficulty: 1 },
  { id: "ge_11", q: "What is the perimeter of a square with side length 7?", choices: ["14", "21", "28", "49"], answer: 2, topic: "Geometry", difficulty: 1 },
  { id: "ge_12", q: "How many sides does a pentagon have?", choices: ["4", "5", "6", "8"], answer: 1, topic: "Geometry", difficulty: 1 },
  { id: "ge_13", q: "What is the area of a triangle with base 10 and height 6?", choices: ["16", "30", "60", "20"], answer: 1, topic: "Geometry", difficulty: 1 },
  { id: "ge_14", q: "What is the circumference of a circle with radius 5? (Use π ≈ 3.14)", choices: ["15.7", "25.12", "31.4", "78.5"], answer: 2, topic: "Geometry", difficulty: 1 },

  // Difficulty 2
  { id: "ge_03", q: "A triangle has sides 5, 12, and 13. What is its area?", choices: ["30", "60", "65", "32.5"], answer: 0, topic: "Geometry", difficulty: 2 },
  { id: "ge_04", q: "What is the sum of interior angles of a hexagon?", choices: ["540°", "720°", "900°", "1080°"], answer: 1, topic: "Geometry", difficulty: 2 },
  { id: "ge_15", q: "What is the length of the hypotenuse of a right triangle with legs 6 and 8?", choices: ["7", "10", "12", "14"], answer: 1, topic: "Geometry", difficulty: 2 },
  { id: "ge_16", q: "What is the area of a circle with diameter 10?", choices: ["25π", "50π", "100π", "10π"], answer: 0, topic: "Geometry", difficulty: 2 },
  { id: "ge_17", q: "A rectangle has a diagonal of 13 and a width of 5. What is its length?", choices: ["8", "10", "12", "14"], answer: 2, topic: "Geometry", difficulty: 2 },
  { id: "ge_18", q: "Each exterior angle of a regular polygon is 40°. How many sides does it have?", choices: ["7", "8", "9", "10"], answer: 2, topic: "Geometry", difficulty: 2 },

  // Difficulty 3
  { id: "ge_05", q: "A circle has area 49π. What is its circumference?", choices: ["7π", "14π", "49π", "28π"], answer: 1, topic: "Geometry", difficulty: 3 },
  { id: "ge_06", q: "What is the diagonal of a square with side length 6?", choices: ["6√2", "6√3", "12", "9"], answer: 0, topic: "Geometry", difficulty: 3 },
  { id: "ge_19", q: "What is the area of an equilateral triangle with side length 8?", choices: ["16√3", "32√3", "64√3", "8√3"], answer: 0, topic: "Geometry", difficulty: 3 },
  { id: "ge_20", q: "A sector of a circle has radius 6 and central angle 60°. What is its area?", choices: ["3π", "6π", "12π", "36π"], answer: 1, topic: "Geometry", difficulty: 3 },
  { id: "ge_21", q: "In a 30-60-90 triangle, the side opposite 30° is 5. What is the hypotenuse?", choices: ["5√2", "5√3", "10", "15"], answer: 2, topic: "Geometry", difficulty: 3 },
  { id: "ge_22", q: "Two similar triangles have a side ratio of 3:5. What is the ratio of their areas?", choices: ["3:5", "6:10", "9:25", "27:125"], answer: 2, topic: "Geometry", difficulty: 3 },

  // Difficulty 4
  { id: "ge_07", q: "In triangle ABC, angle A = 40° and angle B = 60°. What is the measure of the arc BC (not containing A) in the circumscribed circle?", choices: ["80°", "120°", "160°", "200°"], answer: 2, topic: "Geometry", difficulty: 4 },
  { id: "ge_08", q: "A cone has radius 3 and slant height 5. What is its lateral surface area?", choices: ["15π", "12π", "9π", "25π"], answer: 0, topic: "Geometry", difficulty: 4 },
  { id: "ge_23", q: "What is the area of a rhombus with diagonals of length 10 and 24?", choices: ["60", "80", "120", "240"], answer: 2, topic: "Geometry", difficulty: 4 },
  { id: "ge_24", q: "A regular hexagon has side length 4. What is its area?", choices: ["24√3", "48√3", "16√3", "36√3"], answer: 0, topic: "Geometry", difficulty: 4 },
  { id: "ge_25", q: "In triangle ABC, AB = 13, BC = 14, and CA = 15. What is the area of triangle ABC?", choices: ["72", "84", "90", "96"], answer: 1, topic: "Geometry", difficulty: 4 },
  { id: "ge_26", q: "A sphere has surface area 100π. What is its volume?", choices: ["500π/3", "250π/3", "100π/3", "200π/3"], answer: 0, topic: "Geometry", difficulty: 4 },

  // Difficulty 5
  { id: "ge_09", q: "Two circles of radius 5 have centers 6 apart. What is the area of their overlap? (Use cos⁻¹(3/5) ≈ 0.9273)", choices: ["≈ 28.55", "≈ 22.10", "≈ 15.25", "≈ 34.38"], answer: 0, topic: "Geometry", difficulty: 5 },
  { id: "ge_10", q: "A regular tetrahedron has edge length 4. What is its volume?", choices: ["32√2/3", "16√2/3", "8√2", "64/3"], answer: 0, topic: "Geometry", difficulty: 5 },
  { id: "ge_27", q: "A circle is inscribed in a triangle with sides 5, 12, and 13. What is the radius of the inscribed circle?", choices: ["1", "2", "3", "4"], answer: 1, topic: "Geometry", difficulty: 5 },
  { id: "ge_28", q: "What is the volume of a regular octahedron with edge length 2?", choices: ["8√2/3", "4√2/3", "16√2/3", "4√2"], answer: 0, topic: "Geometry", difficulty: 5 },
  { id: "ge_29", q: "In triangle ABC, the medians have lengths 5, 7, and 8. What is the area of the triangle?", choices: ["4√66/3", "8√66/3", "2√66", "16√66/3"], answer: 1, topic: "Geometry", difficulty: 5 },
  { id: "ge_30", q: "A cube has a space diagonal of length 6√3. What is its surface area?", choices: ["108", "162", "216", "324"], answer: 2, topic: "Geometry", difficulty: 5 },

  // ═══════════════════════════════════════════
  // COUNTING AND PROBABILITY
  // ═══════════════════════════════════════════

  // Difficulty 1
  { id: "cp_01", q: "How many ways can you arrange the letters A, B, C?", choices: ["3", "6", "9", "12"], answer: 1, topic: "Counting and Probability", difficulty: 1 },
  { id: "cp_02", q: "If you flip a fair coin twice, what is the probability of getting two heads?", choices: ["1/2", "1/3", "1/4", "1/8"], answer: 2, topic: "Counting and Probability", difficulty: 1 },
  { id: "cp_11", q: "A bag has 2 red and 3 blue marbles. How many marbles are in the bag?", choices: ["3", "4", "5", "6"], answer: 2, topic: "Counting and Probability", difficulty: 1 },
  { id: "cp_12", q: "How many 2-digit numbers are there?", choices: ["89", "90", "91", "99"], answer: 1, topic: "Counting and Probability", difficulty: 1 },
  { id: "cp_13", q: "You roll a standard die. What is the probability of rolling an even number?", choices: ["1/6", "1/3", "1/2", "2/3"], answer: 2, topic: "Counting and Probability", difficulty: 1 },
  { id: "cp_14", q: "A pizza shop offers 3 sizes and 4 toppings. How many one-topping pizzas can you order?", choices: ["7", "12", "16", "24"], answer: 1, topic: "Counting and Probability", difficulty: 1 },

  // Difficulty 2
  { id: "cp_03", q: "In how many ways can 4 books be arranged on a shelf?", choices: ["12", "16", "24", "32"], answer: 2, topic: "Counting and Probability", difficulty: 2 },
  { id: "cp_04", q: "A bag has 3 red and 5 blue marbles. What is the probability of drawing a red marble?", choices: ["3/8", "5/8", "1/3", "3/5"], answer: 0, topic: "Counting and Probability", difficulty: 2 },
  { id: "cp_15", q: "How many ways can you choose 2 items from 5 distinct items?", choices: ["5", "10", "15", "20"], answer: 1, topic: "Counting and Probability", difficulty: 2 },
  { id: "cp_16", q: "What is 7!/(5! × 2!)?", choices: ["7", "14", "21", "42"], answer: 2, topic: "Counting and Probability", difficulty: 2 },
  { id: "cp_17", q: "A license plate has 2 letters followed by 3 digits. How many plates are possible?", choices: ["67,600", "676,000", "6,760,000", "175,760"], answer: 1, topic: "Counting and Probability", difficulty: 2 },
  { id: "cp_18", q: "Two cards are drawn from a standard deck without replacement. What is the probability both are aces?", choices: ["1/169", "1/221", "1/256", "1/13"], answer: 1, topic: "Counting and Probability", difficulty: 2 },

  // Difficulty 3
  { id: "cp_05", q: "How many 3-digit numbers have all digits distinct?", choices: ["648", "720", "504", "900"], answer: 0, topic: "Counting and Probability", difficulty: 3 },
  { id: "cp_06", q: "From a group of 8 people, how many ways can a committee of 3 be chosen?", choices: ["24", "56", "336", "120"], answer: 1, topic: "Counting and Probability", difficulty: 3 },
  { id: "cp_19", q: "How many subsets does a set with 6 elements have?", choices: ["32", "36", "64", "128"], answer: 2, topic: "Counting and Probability", difficulty: 3 },
  { id: "cp_20", q: "A word is formed by rearranging BANANA. How many distinct arrangements are there?", choices: ["30", "60", "120", "720"], answer: 1, topic: "Counting and Probability", difficulty: 3 },
  { id: "cp_21", q: "Three dice are rolled. What is the probability that the sum is 4?", choices: ["1/72", "1/36", "1/216", "1/108"], answer: 0, topic: "Counting and Probability", difficulty: 3 },
  { id: "cp_22", q: "How many paths are there from (0,0) to (4,3) if you can only move right or up?", choices: ["12", "24", "35", "70"], answer: 2, topic: "Counting and Probability", difficulty: 3 },

  // Difficulty 4
  { id: "cp_07", q: "How many ways can 5 people sit around a circular table?", choices: ["120", "24", "60", "720"], answer: 1, topic: "Counting and Probability", difficulty: 4 },
  { id: "cp_08", q: "Two dice are rolled. What is the probability the sum is 7?", choices: ["1/6", "1/12", "5/36", "7/36"], answer: 0, topic: "Counting and Probability", difficulty: 4 },
  { id: "cp_23", q: "How many ways can 8 people be divided into two groups of 4?", choices: ["35", "70", "140", "1680"], answer: 0, topic: "Counting and Probability", difficulty: 4 },
  { id: "cp_24", q: "How many 4-letter strings can be formed from the 26 letters if no letter is repeated and the string must be in alphabetical order?", choices: ["14,950", "15,600", "358,800", "26,000"], answer: 0, topic: "Counting and Probability", difficulty: 4 },
  { id: "cp_25", q: "A box has 5 red and 3 blue balls. Two balls are drawn. What is the probability at least one is red?", choices: ["25/28", "15/28", "13/14", "5/8"], answer: 0, topic: "Counting and Probability", difficulty: 4 },
  { id: "cp_26", q: "How many nonnegative integer solutions does x + y + z = 10 have?", choices: ["55", "66", "78", "120"], answer: 1, topic: "Counting and Probability", difficulty: 4 },

  // Difficulty 5
  { id: "cp_09", q: "How many ways can you distribute 10 identical balls into 3 distinct boxes?", choices: ["66", "120", "220", "45"], answer: 0, topic: "Counting and Probability", difficulty: 5 },
  { id: "cp_10", q: "A random permutation of {1,2,...,5} is chosen. What is the probability that no element is in its original position?", choices: ["11/30", "44/120", "53/120", "9/20"], answer: 1, topic: "Counting and Probability", difficulty: 5 },
  { id: "cp_27", q: "How many ways can the letters in MISSISSIPPI be arranged?", choices: ["34,650", "39,916,800", "69,300", "11,880"], answer: 0, topic: "Counting and Probability", difficulty: 5 },
  { id: "cp_28", q: "A committee of 5 is chosen from 6 men and 4 women. What is the probability the committee has at least 2 women?", choices: ["1/2", "2/3", "13/21", "8/21"], answer: 2, topic: "Counting and Probability", difficulty: 5 },
  { id: "cp_29", q: "How many surjective functions are there from a 4-element set to a 3-element set?", choices: ["24", "36", "48", "81"], answer: 1, topic: "Counting and Probability", difficulty: 5 },
  { id: "cp_30", q: "You have 12 people. How many ways can they be split into 3 groups of 4?", choices: ["5,775", "15,400", "34,650", "369,600"], answer: 0, topic: "Counting and Probability", difficulty: 5 },
];
