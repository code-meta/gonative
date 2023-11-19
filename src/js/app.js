document.addEventListener("alpine:init", () => {
  const API_URL = "https://fahimx.pythonanywhere.com/api";
  // const API_URL = "http://127.0.0.1:8000/api";

  async function getWords() {
    try {
      const res = await axios.get(`${API_URL}/words/`);
      return res.data;
    } catch (error) {
      return [];
    }
  }

  Alpine.data("wordlist", () => ({
    words: getWords(),
  }));
});
