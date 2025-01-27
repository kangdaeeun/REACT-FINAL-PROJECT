import { useState } from "react";
import FeedForm from "../components/FeedForm";
import useAuthStore from "../stores/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { addFeed } from "../api/feedApi";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
  const { user } = useAuthStore();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const addFeedMutation = useMutation({
    mutationFn: async () => {
      if (!user) {
        alert("로그인 후 이용해주세요");
        return;
      }
      await addFeed({ title, content, userId: user.id });
    },
    onSuccess: () => {
      alert("게시글이 등록 되었습니다.")
      // 페이지 이동
      navigate("/");
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addFeedMutation.mutate();
  };

  return (
    <FeedForm
      purpose="작성"
      title={title}
      content={content}
      handleTitleChange={handleTitleChange}
      handleContentChange={handleContentChange}
      handleSubmit={handleSubmit}
    />
    // 병수튜터님 방식
    // <FeedForm pageTitle="글 추가">
    // 	<button className="bg-blue-600 text-white px-4 py-2 rounded-lg">추가</button>
    // </FeedForm>
  );
};

export default CreatePage;
