import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
// import UserPost from "../components/UserPost";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { Flex, Spinner } from "@chakra-ui/react";
import Post from "../components/Post";
import useGetUserProfile from "../hooks/useGetUserProfile";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";

const UserPage = () => {
	// const [user, setUser] = useState(null);
  const { user, loading } = useGetUserProfile();
	const { username } = useParams();
	const showToast = useShowToast();
	// const [loading, setLoading] = useState(true);
  // const [posts, setPosts] = useState([]);
  const [posts, setPosts] = useRecoilState(postsAtom);
	const [fetchingPosts, setFetchingPosts] = useState(true);

	useEffect(() => {
		const getUser = async () => {
			try {
				const res = await fetch(`/api/users/profile/${username}`);
				const data = await res.json();
				if (data.error) {
					// showToast("Error", data.error, "error");
          showToast("Error", error.message, "error");
					return;
				}
				setUser(data);
			} catch (error) {
				showToast("Error", error, "error");
			} finally {
				setLoading(false);
			}
		};

    const getPosts = async () => {
			setFetchingPosts(true);
			try {
				const res = await fetch(`/api/posts/user/${username}`);
				const data = await res.json();
				console.log(data);
				setPosts(data);
			} catch (error) {
				showToast("Error", error.message, "error");
				setPosts([]);
			} finally {
				setFetchingPosts(false);
			}
		};


		getUser();
    getPosts();
	}, [username, showToast, setPosts]);
	console.log("posts is here and it is recoil state", posts);

	// if (!user) return null;
	if (!user && loading) {
		return (
			<Flex justifyContent={"center"}>
				<Spinner size={"xl"} />
			</Flex>
		);
	}
	if (!user && !loading) return <h1>User not found</h1>;

	return (
		<>
			<UserHeader user={user} />
			{/* <UserPost likes={1200} replies={481} postImg='/post1.png' postTitle="Let's talk about threads." />
			<UserPost likes={451} replies={12} postImg='/post2.png' postTitle='Nice tutorial. Highly recommended.' />
			<UserPost
				likes={6721}
				replies={989}
				postImg='/post3.png'
				postTitle="I love this guy and can't wait to see him in cage. 💪"
			/>
			<UserPost likes={212} replies={56} postTitle='This is my first thread.' /> */}
      {!fetchingPosts && posts.length === 0 && <h1>User has not posts.</h1>}
			{fetchingPosts && (
				<Flex justifyContent={"center"} my={12}>
					<Spinner size={"xl"} />
				</Flex>
			)}

			{posts.map((post) => (
				<Post key={post._id} post={post} postedBy={post.postedBy} />
			))}
		</>
	);
};
export default UserPage;