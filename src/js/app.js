document.addEventListener("alpine:init", () => {
  const API_URL = "https://fahimx.pythonanywhere.com/api";
  // const API_URL = "http://127.0.0.1:8000/api";

  let next = null;

  words = [];

  async function getWords() {
    try {
      const res = await axios.get(`${API_URL}/words/`);
      words = res.data.results;
      next = res.data.next;
      return words;
    } catch (error) {
      return [];
    }
  }

  async function loadWords() {
    try {
      const res = await axios.get(`${next}`);
      words = words.concat(res.data.results);
      next = res.data.next;
      return res.data.results;
    } catch (error) {
      console.log("something went wrong");
    }finally{
      // this.loading = false
    }
  }

  Alpine.data("wordlist", () => ({
    words: getWords(),
    loading: false,

    init() {
      const loader = document.getElementById("loader");

      const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      };

      const callback = (entries, observer) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            if (next === null) return;
            this.loading = true;
            new_items = await loadWords();
            items = await this.words;
            this.words = items.concat(new_items);
            this.loading = false;
          }
        });
      };

      const observer = new IntersectionObserver(callback, options);

      observer.observe(loader);
    },
  }));
});
