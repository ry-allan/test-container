const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

const jokes = [
  "Why do programmers prefer dark mode? Because light attracts bugs.",
  "A SQL query walks into a bar, sees two tables, and asks... 'Can I JOIN you?'",
  "Why did the developer go broke? Because he used up all his cache.",
  "There are only 10 types of people in the world: those who understand binary and those who don't.",
  "Why do Java developers wear glasses? Because they can't C#.",
  "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
  "!false — it's funny because it's true.",
  "A programmer's wife tells him: 'Go to the store and buy a loaf of bread. If they have eggs, buy a dozen.' He comes home with 12 loaves.",
  "Why did the functions stop calling each other? Because they got too many arguments.",
  "What's the object-oriented way to become wealthy? Inheritance.",
  "There's no place like 127.0.0.1.",
  "The best thing about UDP jokes is I don't care if you get them.",
  "A QA engineer walks into a bar. Orders 1 beer. Orders 0 beers. Orders 99999 beers. Orders -1 beers. Orders a lizard. Orders NULL beers.",
];

app.get("/api/joke", (req, res) => {
  const joke = jokes[Math.floor(Math.random() * jokes.length)];
  res.json({ joke });
});

app.get("*", (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Joke Machine</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      min-height: 100vh; display: flex; align-items: center; justify-content: center;
      font-family: system-ui, -apple-system, sans-serif;
      background: #0f0f0f; color: #e0e0e0; padding: 2rem;
    }
    .card {
      max-width: 600px; background: #1a1a1a; border: 1px solid #333;
      border-radius: 12px; padding: 3rem; text-align: center;
    }
    h1 { font-size: 2.5rem; margin-bottom: 1.5rem; }
    p.joke { font-size: 1.25rem; line-height: 1.6; color: #f0c040; min-height: 3em; }
    .refresh {
      margin-top: 2rem; display: inline-block; padding: 0.5rem 1.5rem;
      background: #333; color: #fff; border: none; border-radius: 6px;
      font-size: 0.875rem; cursor: pointer; transition: background 0.2s;
    }
    .refresh:hover { background: #555; }
  </style>
</head>
<body>
  <div class="card">
    <h1>&#128514;</h1>
    <p class="joke" id="joke">Loading...</p>
    <button class="refresh" onclick="loadJoke()">Tell me another one</button>
  </div>
  <script>
    async function loadJoke() {
      try {
        const res = await fetch('/api/joke');
        const data = await res.json();
        document.getElementById('joke').textContent = data.joke;
      } catch {
        document.getElementById('joke').textContent = 'Failed to load joke :(';
      }
    }
    loadJoke();
  </script>
</body>
</html>`);
});

app.listen(PORT, () => {
  console.log("Joke server listening on :" + PORT);
});
