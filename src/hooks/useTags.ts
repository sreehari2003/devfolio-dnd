import { useEffect, useState } from "react";

const url =
  "https://api.stackexchange.com/2.3/tags?order=desc&sort=popular&site=stackoverflow";

export const useTags = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tags, setTags] = useState<Array<string>>([]);

  const getTags = async () => {
    try {
      setLoading(true);
      const data = await fetch(url);
      const res = await data.json();
      const allTags = res.items.map((info: { name?: string }) => info?.name);
      setTags(allTags);
    } catch (e) {
      setError("Failed to load tags");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTags();
  }, []);

  return { isLoading, tags, error, getTags };
};
