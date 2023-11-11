const API_URL = "http://127.0.0.1:8000/api";

async function allWords() {
  try {
    const res = await axios.get(`${API_URL}/words/`);
    return res.data.reverse();
  } catch (error) {
    return [];
  }
}
