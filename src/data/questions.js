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

  // Difficulty 2
  { id: "nt_03", q: "What is the greatest common divisor of 84 and 126?", choices: ["14", "21", "42", "7"], answer: 2, topic: "Number Theory", difficulty: 2 },
  { id: "nt_04", q: "How many prime numbers are less than 30?", choices: ["9", "10", "11", "8"], answer: 1, topic: "Number Theory", difficulty: 2 },

  // Difficulty 3
  { id: "nt_05", q: "What is the remainder when 2^40 is divided by 7?", choices: ["1", "2", "4", "6"], answer: 2, topic: "Number Theory", difficulty: 3 },
  { id: "nt_06", q: "What is the least common multiple of 12, 15, and 20?", choices: ["60", "120", "180", "300"], answer: 0, topic: "Number Theory", difficulty: 3 },

  // Difficulty 4
  { id: "nt_07", q: "How many positive divisors does 2^3 × 3^2 × 5 have?", choices: ["12", "24", "30", "48"], answer: 1, topic: "Number Theory", difficulty: 4 },
  { id: "nt_08", q: "What is the sum of all positive divisors of 28?", choices: ["28", "56", "57", "64"], answer: 1, topic: "Number Theory", difficulty: 4 },

  // Difficulty 5
  { id: "nt_09", q: "Find the last two digits of 7^2023.", choices: ["07", "43", "49", "01"], answer: 1, topic: "Number Theory", difficulty: 5 },
  { id: "nt_10", q: "How many integers from 1 to 1000 are divisible by neither 3 nor 5?", choices: ["467", "533", "600", "400"], answer: 1, topic: "Number Theory", difficulty: 5 },

  // ═══════════════════════════════════════════
  // ALGEBRA
  // ═══════════════════════════════════════════

  // Difficulty 1
  { id: "al_01", q: "If 3x + 5 = 20, what is x?", choices: ["3", "5", "7", "15"], answer: 1, topic: "Algebra", difficulty: 1 },
  { id: "al_02", q: "What is the value of 2^5?", choices: ["10", "16", "32", "64"], answer: 2, topic: "Algebra", difficulty: 1 },

  // Difficulty 2
  { id: "al_03", q: "If f(x) = 3x² + 7x − 4, what is f(2)?", choices: ["18", "22", "26", "14"], answer: 1, topic: "Algebra", difficulty: 2 },
  { id: "al_04", q: "What is the sum of the arithmetic sequence 2, 5, 8, ..., 29?", choices: ["150", "155", "160", "165"], answer: 1, topic: "Algebra", difficulty: 2 },

  // Difficulty 3
  { id: "al_05", q: "If log₂(x) = 5, what is x?", choices: ["10", "25", "32", "64"], answer: 2, topic: "Algebra", difficulty: 3 },
  { id: "al_06", q: "What is the product of the roots of x² − 7x + 12 = 0?", choices: ["7", "12", "-7", "-12"], answer: 1, topic: "Algebra", difficulty: 3 },

  // Difficulty 4
  { id: "al_07", q: "If a + b = 10 and ab = 21, what is a² + b²?", choices: ["58", "52", "48", "79"], answer: 0, topic: "Algebra", difficulty: 4 },
  { id: "al_08", q: "How many real solutions does x⁴ − 5x² + 4 = 0 have?", choices: ["0", "2", "4", "1"], answer: 2, topic: "Algebra", difficulty: 4 },

  // Difficulty 5
  { id: "al_09", q: "If x + 1/x = 5, what is x³ + 1/x³?", choices: ["110", "125", "140", "80"], answer: 0, topic: "Algebra", difficulty: 5 },
  { id: "al_10", q: "Find the sum: 1/1·2 + 1/2·3 + 1/3·4 + ... + 1/99·100.", choices: ["99/100", "100/101", "1/2", "49/50"], answer: 0, topic: "Algebra", difficulty: 5 },

  // ═══════════════════════════════════════════
  // GEOMETRY
  // ═══════════════════════════════════════════

  // Difficulty 1
  { id: "ge_01", q: "What is the area of a rectangle with length 8 and width 5?", choices: ["13", "26", "40", "45"], answer: 2, topic: "Geometry", difficulty: 1 },
  { id: "ge_02", q: "How many degrees are in a right angle?", choices: ["45", "90", "180", "360"], answer: 1, topic: "Geometry", difficulty: 1 },

  // Difficulty 2
  { id: "ge_03", q: "A triangle has sides 5, 12, and 13. What is its area?", choices: ["30", "60", "65", "32.5"], answer: 0, topic: "Geometry", difficulty: 2 },
  { id: "ge_04", q: "What is the sum of interior angles of a hexagon?", choices: ["540°", "720°", "900°", "1080°"], answer: 1, topic: "Geometry", difficulty: 2 },

  // Difficulty 3
  { id: "ge_05", q: "A circle has area 49π. What is its circumference?", choices: ["7π", "14π", "49π", "28π"], answer: 1, topic: "Geometry", difficulty: 3 },
  { id: "ge_06", q: "What is the diagonal of a square with side length 6?", choices: ["6√2", "6√3", "12", "9"], answer: 0, topic: "Geometry", difficulty: 3 },

  // Difficulty 4
  { id: "ge_07", q: "In triangle ABC, angle A = 40° and angle B = 60°. What is the measure of the arc BC (not containing A) in the circumscribed circle?", choices: ["80°", "120°", "160°", "200°"], answer: 2, topic: "Geometry", difficulty: 4 },
  { id: "ge_08", q: "A cone has radius 3 and slant height 5. What is its lateral surface area?", choices: ["15π", "12π", "9π", "25π"], answer: 0, topic: "Geometry", difficulty: 4 },

  // Difficulty 5
  { id: "ge_09", q: "Two circles of radius 5 have centers 6 apart. What is the area of their overlap? (Use cos⁻¹(3/5) ≈ 0.9273)", choices: ["≈ 28.55", "≈ 22.10", "≈ 15.25", "≈ 34.38"], answer: 0, topic: "Geometry", difficulty: 5 },
  { id: "ge_10", q: "A regular tetrahedron has edge length 4. What is its volume?", choices: ["32√2/3", "16√2/3", "8√2", "64/3"], answer: 0, topic: "Geometry", difficulty: 5 },

  // ═══════════════════════════════════════════
  // COUNTING AND PROBABILITY
  // ═══════════════════════════════════════════

  // Difficulty 1
  { id: "cp_01", q: "How many ways can you arrange the letters A, B, C?", choices: ["3", "6", "9", "12"], answer: 1, topic: "Counting and Probability", difficulty: 1 },
  { id: "cp_02", q: "If you flip a fair coin twice, what is the probability of getting two heads?", choices: ["1/2", "1/3", "1/4", "1/8"], answer: 2, topic: "Counting and Probability", difficulty: 1 },

  // Difficulty 2
  { id: "cp_03", q: "In how many ways can 4 books be arranged on a shelf?", choices: ["12", "16", "24", "32"], answer: 2, topic: "Counting and Probability", difficulty: 2 },
  { id: "cp_04", q: "A bag has 3 red and 5 blue marbles. What is the probability of drawing a red marble?", choices: ["3/8", "5/8", "1/3", "3/5"], answer: 0, topic: "Counting and Probability", difficulty: 2 },

  // Difficulty 3
  { id: "cp_05", q: "How many 3-digit numbers have all digits distinct?", choices: ["648", "720", "504", "900"], answer: 0, topic: "Counting and Probability", difficulty: 3 },
  { id: "cp_06", q: "From a group of 8 people, how many ways can a committee of 3 be chosen?", choices: ["24", "56", "336", "120"], answer: 1, topic: "Counting and Probability", difficulty: 3 },

  // Difficulty 4
  { id: "cp_07", q: "How many ways can 5 people sit around a circular table?", choices: ["120", "24", "60", "720"], answer: 1, topic: "Counting and Probability", difficulty: 4 },
  { id: "cp_08", q: "Two dice are rolled. What is the probability the sum is 7?", choices: ["1/6", "1/12", "5/36", "7/36"], answer: 0, topic: "Counting and Probability", difficulty: 4 },

  // Difficulty 5
  { id: "cp_09", q: "How many ways can you distribute 10 identical balls into 3 distinct boxes?", choices: ["66", "120", "220", "45"], answer: 0, topic: "Counting and Probability", difficulty: 5 },
  { id: "cp_10", q: "A random permutation of {1,2,...,5} is chosen. What is the probability that no element is in its original position?", choices: ["11/30", "44/120", "53/120", "9/20"], answer: 1, topic: "Counting and Probability", difficulty: 5 },
];
