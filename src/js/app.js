const API_URL = "https://fahimx.pythonanywhere.com/api";

async function allWords() {
  try {
    const res = await axios.get(`${API_URL}/words/`);
    return res.data.reverse();
  } catch (error) {
    return [];
  }
}
