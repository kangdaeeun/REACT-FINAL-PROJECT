import { useState } from "react";
import FeedForm from "../components/FeedForm";
import useAuthStore from "../stores/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFeed } from "../api/feedApi";

const UpdatePage = () => {
  const { user } = useAuthStore();
  const [editTitle, setEditTitle] = useState();
  const [editFeedContent, setEditFeedContent] = useState();
  const navigate = useNavigate();

  const handleEditTitleChange = () => {
    setEditTitle();
  };

  const handleEditContentChange = () => {
    setEditFeedContent();
  };

  const queryClient = useQueryClient();

  const editContentMutation = useMutation({
    mutationFn: async () => {
      if (!user) {
        throw new Error("로그인 후 이용해 주세요")
      }
      await updateFeed({
        userId: user.id,
        content: editFeedContent,
        title: editTitle,
      }),
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["feeds", ]
      });
      setEditTitle()
      setEditFeedContent()
    }
  });

  return <FeedForm purpose="" />;
};
export default UpdatePage;
