import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useAvaliarColetor() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const activeRating = hovered || rating;

  function handleSubmit() {
    if (rating === 0) return;
    setSubmitted(true);
  }

  function handleBack() {
    setSubmitted(false);
    navigate(-1);
  }

  return {
    rating,
    setRating,
    hovered,
    setHovered,
    comment,
    setComment,
    submitted,
    activeRating,
    handleSubmit,
    handleBack,
  };
}