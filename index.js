const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

const jokes = [
    "Why don’t scientists trust atoms? Because they make up everything!",
    "What do you call fake spaghetti? An impasta!",
    "Why did the scarecrow win an award? Because he was outstanding in his field!"
];

app.get('/api/jokes/random', (req, res) => {
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    res.json({ joke: randomJoke });
});
app.get('/api/images/random', async (req, res) => {
    try {
        const response = await axios.get('https://source.unsplash.com/random');
        res.json({ imageUrl: response.request.res.responseUrl });
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch image' });
    }
});

app.get('/api/random', async (req, res) => {
    try {
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        const imageResponse = await axios.get('https://source.unsplash.com/random');
        res.json({
            joke: randomJoke,
            imageUrl: imageResponse.request.res.responseUrl
        });
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
