import React,{useState} from 'react'
// import {Avatar,Flex,Image,Text,Box,Divider, Button} from '@chakra-ui/react';
import { Avatar, Box, Button, Divider, Flex, Image, Spinner, Text } from "@chakra-ui/react";
import { BsThreeDots } from 'react-icons/bs';
import Actions from '../components/Actions';
import Comment from '../components/comments';
import { useEffect } from "react";
import useGetUserProfile from "../hooks/useGetUserProfile";
import useShowToast from "../hooks/useShowToast";
import { useNavigate, useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { DeleteIcon } from "@chakra-ui/icons";
import postsAtom from "../atoms/postsAtom";

const PostPage = () => {
  // const [liked,setLiked]=useState(false);
  const { user, loading } = useGetUserProfile();
	// const [post, setPost] = useState(null);
  const [posts, setPosts] = useRecoilState(postsAtom);
	const showToast = useShowToast();
	const { pid } = useParams();
	const currentUser = useRecoilValue(userAtom);
	const navigate = useNavigate();
  const currentPost = posts[0];


	useEffect(() => {
		const getPost = async () => {
      setPosts([]);
			try {
				const res = await fetch(`/api/posts/${pid}`);
				const data = await res.json();
				if (data.error) {
					showToast("Error", data.error, "error");
					return;
				}
				// console.log(data);
				setPost([data]);
			} catch (error) {
				showToast("Error", error.message, "error");
			}
		};
		getPost();
	}, [showToast, pid, setPosts]);

	const handleDeletePost = async () => {
		try {
			if (!window.confirm("Are you sure you want to delete this post?")) return;

			const res = await fetch(`/api/posts/${currentPost._id}`, {
				method: "DELETE",
			});
			const data = await res.json();
			if (data.error) {
				showToast("Error", data.error, "error");
				return;
			}
			showToast("Success", "Post deleted", "success");
			navigate(`/${user.username}`);
		} catch (error) {
			showToast("Error", error.message, "error");
		}
	};

	if (!user && loading) {
		return (
			<Flex justifyContent={"center"}>
				<Spinner size={"xl"} />
			</Flex>
		);
	}

	if (!post) return null;
  if (!currentPost) return null;
  console.log("currentPost", currentPost);

//   return (
//     <>
//       <Flex>
//         <Flex w={"full"} alignItems={"center"} gap={3}>
//             <Avatar size={"md"} name="MarkZuckerberg" src='/zuck-avatar.png'/>
//             <Flex>
//               <Text fontSize={"sm"} fontWeight={"bold"}> MarkZuckerberg</Text>
//               <Image src="/verified.png" w={4} h={4} ml={4}/>
//             </Flex> 
//         </Flex>
//         <Flex gap={4} alignItems={"center"}>
//           <Text fontSize={"sm"} color={"gray.light"}>
//               1d
//           </Text>
//           <BsThreeDots/>
//         </Flex> 
//       </Flex>

//       <Text my={3}>Let's talk about Threads</Text>
//       <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
//           <Image src='/post1.png' w={"full"}/>
//       </Box>

//       <Flex gap={3} my={3}>
//         <Actions liked={liked} setLiked={setLiked}/>
//       </Flex>

//       <Flex gap={2} alignItems={"center"}>
//           <Text color={"gray.light"} fontSize={"sm"}>
//               238 replies
//           </Text>
//           <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
//           <Text color={"gray.light"} fontSize={"sm"}>
//             {200 + (liked ? 1 : 0)} likes
//           </Text>
//       </Flex>
//       <Divider my={4}/>

//       <Flex justifyContent={"space-between"}>
//         <Flex gap={2} alignItems={"center"}>
//           <Text fontSize={"2x1"}>
//                 👋🏻
//           </Text>
//           <Text color={"gray.light"} >
//             Get the app to Like, Reply & Post...
//           </Text>
//         </Flex>
//         <Button>
//           Get
//         </Button>
//       </Flex>

//       <Divider my={4}/>
//       <Comment 
//         comment="Looks really good"
//         createdAt='2d'
//         likes={21}
//         username='DanAbrahmov'
//         userAvatar='https://bit.ly/dan-abramov'
//       />
//       <Comment 
//         comment="Wow Amazing "
//         createdAt='4d'
//         likes={53}
//         username='ProsperOtemuyiwa'
//         userAvatar='https://bit.ly/prosper-baba'
//       />
//       <Comment 
//         comment="Brilliant m8"
//         createdAt='1d'
//         likes={31}
//         username='KentDodds'
//         userAvatar='https://bit.ly/kent-c-dodds'
//       />
//     </>
//   )
// }

// export default PostPage

return (
  <>
    <Flex>
      <Flex w={"full"} alignItems={"center"} gap={3}>
        {/* <Avatar src='/zuck-avatar.png' size={"md"} name='Mark Zuckerberg' /> */}
        <Avatar src={user.profilePic} size={"md"} name='Mark Zuckerberg' />
        <Flex>
          <Text fontSize={"sm"} fontWeight={"bold"}>
            {/* markzuckerberg */}
            {user.username}
          </Text>
          <Image src='/verified.png' w='4' h={4} ml={4} />
        </Flex>
      </Flex>
      <Flex gap={4} alignItems={"center"}>
        {/* <Text fontSize={"sm"} color={"gray.light"}>
          1d */}
        <Text fontSize={"xs"} width={36} textAlign={"right"} color={"gray.light"}>
          {/* {formatDistanceToNow(new Date(post.createdAt))} ago */}
          {formatDistanceToNow(new Date(currentPost.createdAt))} ago
        </Text>
        {/* <BsThreeDots /> */}

        {currentUser?._id === user._id && (
          <DeleteIcon size={20} cursor={"pointer"} onClick={handleDeletePost} />
        )}
      </Flex>
    </Flex>

    {/* <Text my={3}>Let&apos;s talk about Threads.</Text> */}
    {/* <Text my={3}>{post.text}</Text> */}
    <Text my={3}>{currentPost.text}</Text>


    {/* <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
      <Image src={"/post1.png"} w={"full"} />
    </Box> */}
    {currentPost.img && (
      <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
        <Image src={currentPost.img} w={"full"} />
        
      </Box>
    )}

    <Flex gap={3} my={3}>
      {/* <Actions liked={liked} setLiked={setLiked} /> */}
      <Actions post={currentPost} />
    </Flex>

    {/* <Flex gap={2} alignItems={"center"}>
      <Text color={"gray.light"} fontSize={"sm"}>
        238 replies
      </Text>
      <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
      <Text color={"gray.light"} fontSize={"sm"}>
        {200 + (liked ? 1 : 0)} likes
      </Text>
    </Flex> */}
    <Divider my={4} />

    <Flex justifyContent={"space-between"}>
      <Flex gap={2} alignItems={"center"}>
        <Text fontSize={"2xl"}>👋</Text>
        <Text color={"gray.light"}>Get the app to like, reply and post.</Text>
      </Flex>
      <Button>Get</Button>
    </Flex>

    <Divider my={4} />
    {/* <Comment
      comment='Looks really good!'
      createdAt='2d'
      likes={100}
      username='johndoe'
      userAvatar='https://bit.ly/dan-abramov'
    />
    <Comment
      comment='Amazing!'
      createdAt='1d'
      likes={21}
      username='janedoe'
      userAvatar='https://bit.ly/code-beast'
    />
    <Comment
      comment='Looks good!'
      createdAt='2d'
      likes={42}
      username='sallydoe'
      userAvatar='https://bit.ly/sage-adebayo'
    /> */}
    {currentPost.replies.map((reply) => (
      <Comment
        key={reply._id}
        reply={reply}
        lastReply={reply._id === currentPost.replies[post.replies.length - 1]._id}
      />
    ))}
  </>
);
};
export default PostPage;