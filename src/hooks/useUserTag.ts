import { useEffect, useState } from "react";
import { apiClient } from "../config/apiClient";

type Skills = {
  name: null | string;
  id: number;
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

      data.sort((a, b) => {
        if (a.name === null && b.name !== null) {
          return 1;
        } else if (a.name !== null && b.name === null) {
          return -1;
        } else {
          return a.id - b.id;
        }
      });

      setTags(data as Array<Skills>);
    } catch (e) {
      setError("Failed to load tags");
    } finally {
      setLoading(false);
    }
  };

  const updateUserTags = async (data: Skills[], index: number, val: string) => {
    setTags(data);
    await apiClient
      .from("tags")
      .update({
        name: val,
      })
      .eq("id", index);

    data.sort((a, b) => {
      if (a.name === null && b.name !== null) {
        return 1;
      } else if (a.name !== null && b.name === null) {
        return -1;
      } else {
        return a.id - b.id;
      }
    });
  };

  const reorder = (data: Skills[]) => {
    setTags(data);
  };

  const deleteTags = async (id: number) => {
    const newTags = tags.map((el) => {
      if (el.id === id) {
        return {
          ...el,
          name: null,
        };
      } else {
        return el;
      }
    });

    newTags.sort((a, b) => {
      if (a.name === null && b.name !== null) {
        return 1;
      } else if (a.name !== null && b.name === null) {
        return -1;
      } else {
        return a.id - b.id;
      }
    });

    setTags(newTags);

    await apiClient
      .from("tags")
      .update({
        name: null,
      })
      .eq("id", id);
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
    deleteTags,
    reorder,
  };
};
