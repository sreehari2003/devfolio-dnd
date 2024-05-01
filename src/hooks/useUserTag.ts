import { useEffect, useState } from "react";
import { apiClient } from "../config/apiClient";

type Skills = {
  name: null | string;
  index: number;
};

export const useUserTags = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tags, setTags] = useState<Array<Skills>>([]);

  const getTags = async () => {
    try {
      setLoading(true);
      const { data, error } = await apiClient.from("tags").select("*");
      if (error) {
        throw new Error("Error fetching data");
      }
      setTags(data as Array<Skills>);
    } catch (e) {
      setError("Failed to load tags");
    } finally {
      setLoading(false);
    }
  };

  const updateUserTags = (data: Skills[]) => {
    setTags(data);
  };

  useEffect(() => {
    getTags();
  }, []);

  return {
    isLoading,
    userTags: tags,
    error,
    loadUserTags: getTags,
    updateUserTags,
  };
};
