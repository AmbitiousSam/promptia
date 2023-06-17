"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="gradient_orange font-satoshi font-semibold text-base">Loading...</div>;
  }

  if (status === "error") {
    return <div className="gradient_orange font-satoshi font-semibold text-base">Error: {session.error.message}</div>;
  }

  if (status === "not-found") {
    return <div className="gradient_orange font-satoshi font-semibold text-base">Not found</div>;
  }

  if (status === "ok") {
    return (
      <div>
        <h1>Create Prompt</h1>
        <Form
          onSubmit={async (values) => {
            setSubmitting(true);
            await router.push("/");
            setSubmitting(false);
          }}
        />
      </div>
    );
  }
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/prompt/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setPost({
          prompt: "",
          tag: "",
        });
        setSubmitting(false);
        router.push("/");
      }
    } catch (err) {
      console.log(err);
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="create"
      post={post}
      setpost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
