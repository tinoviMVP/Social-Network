import { History } from './History';
import { Post } from './Post/Post';
import { WhatsNew } from './WhatsNew/WhatsNew';
import { useDeletePostMutation, useLazyGetPostListQuery } from '../store/Api/postApi';
import { Loader } from './UI/Loader/Loader';
import { Error } from './UI/Error/Error';
import { AddNewPost } from './Post/AddNewPost';
import { useEffect, useState } from 'react';
import { EditPost } from './Post/EditPost';
import { PostItem } from '../Types/post';

export const MainContent = () => {
  const [fetchPosts, { data, isSuccess, isLoading, isError }] = useLazyGetPostListQuery();
  const [deletePost, { isSuccess: isDeletePostSuccess, isLoading: isDeletePostLoaing }] =
    useDeletePostMutation();

  useEffect(() => {
    if (isDeletePostSuccess) {
      fetchPosts({});
    }
  }, [isDeletePostSuccess]);

  const handleDeletePost = (postId: number) => {
    deletePost({
      post_id: postId,
    });
  };

  const [isAddNewPostOpen, setAddNewPostOpen] = useState<boolean>(false);
  const [isEditPostOpen, setEditPostOpen] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<PostItem | null>(null);

  useEffect(() => {
    fetchPosts({});
  }, []);

  const onAddPostAdded = () => {
    fetchPosts({});
  };

  const handleEditPost = (post: PostItem) => {
    setSelectedPost(post);
  };

  const onPhotoAddedToPost = () => {
    fetchPosts({})
  }

  return (
    <main className="Main">
      <WhatsNew handleAddNewPostButtonClick={() => setAddNewPostOpen(true)} />
      <History />
      {isLoading || (isDeletePostLoaing && <Loader />)}
      {isError && <Error />}
      {isSuccess &&
        !!data.message.length &&
        [...data.message].reverse().map((postItem: any) => (
          <Post
            key={postItem.id}
            post={postItem}
            handleEditPost={handleEditPost}
            onDeletePostClick={() => {
              handleDeletePost(postItem.id);
            }}
            onPhotoAddedToPost={onPhotoAddedToPost}
          />
        ))}
      <AddNewPost
        isAddPostModalOpen={isAddNewPostOpen}
        handleAddPostSuccess={onAddPostAdded}
        onClose={() => setAddNewPostOpen(false)}
      />
      {selectedPost && (
        <EditPost
          post={selectedPost}
          isEditPostModalOpen={isEditPostOpen}
          onClose={() => {
            setSelectedPost(null);
            setEditPostOpen(false);
          }}
          handleEditPostSuccess={onAddPostAdded}
        />
      )}
    </main>
  );
};
