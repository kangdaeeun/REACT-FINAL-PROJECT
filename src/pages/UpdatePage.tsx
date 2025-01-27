import { useEffect, useState } from "react";
import FeedForm from "../components/FeedForm";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getFeedById, updateFeed } from "../api/feedApi";

const UpdatePage = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { data } = useQuery({
    queryKey: ["feed", id],
    queryFn: () => {
      if(!id) {
        throw new Error("id가 없습니다.")
      }
      return getFeedById(id)
    }
  })

  useEffect(() => {
    setTitle(data?.title || "");
    setContent(data?.content || "");
  }, [data])

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const editContentMutation = useMutation({
    mutationFn: () => {
      if (!id) {
        throw new Error("id가 없습니다.")
      }
      return updateFeed({id, content, title})
    },

    onSuccess: () => {
      alert("게시글 수정이 완료되었습니다.")
      navigate(`/feeds/${data.id}`)
    },
    onError: (error) => {
      alert(error.message)
    }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editContentMutation.mutate();
  }

  return <FeedForm purpose=""
  title={title}
  content={content}
  handleTitleChange={handleTitleChange}
  handleContentChange={handleContentChange}
  handleSubmit={handleSubmit} />;
};
export default UpdatePage;
