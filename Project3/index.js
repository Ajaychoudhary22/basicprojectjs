document.addEventListener('DOMContentLoaded', () => {
  const jokeButton = document.getElementById('jokeButton');
  const jokeDisplay = document.getElementById('jokeDisplay');

  jokeButton.addEventListener('click', async () => {
    try {
      const response = await fetch('https://api.chucknorris.io/jokes/random');
      const data = await response.json();
      jokeDisplay.textContent = data.value;
      console.log(data.value);

       jokeDisplay.classList.remove('show-joke'); // Remove if already present
      void jokeDisplay.offsetWidth; // Reflow trick to restart animation
      jokeDisplay.classList.add('show-joke');
    } catch (error) {
      jokeDisplay.textContent = 'Error fetching joke';
      console.error(error);
    }
  });
});
